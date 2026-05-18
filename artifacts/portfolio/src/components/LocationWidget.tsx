import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cloud, X } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface WeatherData {
  temp: number;
  code: number;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

function wmoLabel(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 3) return "Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 55) return "Drizzle";
  if (code <= 65) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 99) return "Storm";
  return "—";
}

function wmoEmoji(code: number): string {
  if (code === 0) return "☀";
  if (code <= 2) return "⛅";
  if (code <= 3) return "☁";
  if (code <= 48) return "🌫";
  if (code <= 55) return "🌦";
  if (code <= 65) return "🌧";
  if (code <= 77) return "🌨";
  if (code <= 82) return "🌧";
  if (code <= 99) return "⛈";
  return "—";
}

async function getLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      fetchIPLocation().then(resolve).catch(() => resolve({ lat: -37.81, lon: 144.96 }));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => fetchIPLocation().then(resolve).catch(() => resolve({ lat: -37.81, lon: 144.96 })),
      { timeout: 5000 }
    );
  });
}

async function fetchIPLocation(): Promise<{ lat: number; lon: number }> {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  return { lat: data.latitude, lon: data.longitude };
}

async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const [weatherRes, geoRes] = await Promise.all([
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=celsius`
    ),
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { "Accept-Language": "en" } }
    ),
  ]);

  const weather = await weatherRes.json();
  const geo = await geoRes.json();

  const city =
    geo.address?.city ||
    geo.address?.town ||
    geo.address?.village ||
    geo.address?.suburb ||
    "Unknown";
  const country = geo.address?.country_code?.toUpperCase() || "";

  return {
    temp: Math.round(weather.current.temperature_2m),
    code: weather.current.weather_code,
    city,
    country,
    lat,
    lon,
  };
}

function MapPanel({ data }: { data: WeatherData }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return;

    let map: import("leaflet").Map;
    let alive = true;

    (async () => {
      await new Promise((r) => setTimeout(r, 0));
      if (!alive || !mapRef.current) return;

      const L = (await import("leaflet")).default;

      map = L.map(mapRef.current, {
        center: [data.lat, data.lon],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      const pulseIcon = L.divIcon({
        className: "",
        html: `<span style="
          display:block;width:10px;height:10px;
          background:#2dd4bf;border-radius:50%;
          box-shadow:0 0 0 3px rgba(45,212,191,0.3),0 0 12px rgba(45,212,191,0.6);
        "></span>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });

      L.marker([data.lat, data.lon], { icon: pulseIcon }).addTo(map);
      leafletRef.current = map;
    })();

    return () => {
      alive = false;
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, [data]);

  return (
    <div style={{ width: "100%", height: 130, position: "relative", overflow: "hidden" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(14,5,8,0.65) 100%)",
        }}
      />
    </div>
  );
}

export default function LocationWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

  const handleOpen = () => {
    setIsOpen((v) => !v);
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      setLoading(true);
      (async () => {
        try {
          const { lat, lon } = await getLocation();
          const weather = await fetchWeather(lat, lon);
          setData(weather);
        } catch {
          // silently fail
        } finally {
          setLoading(false);
        }
      })();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-mono flex flex-col items-end gap-2">
      {/* Expanded panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            style={{
              width: 210,
              borderRadius: 12,
              border: "1px solid rgba(252,245,233,0.12)",
              background: "rgba(14,5,8,0.82)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              overflow: "hidden",
              transformOrigin: "bottom right",
            }}
          >
            {/* Map or loading */}
            {loading ? (
              <div
                style={{
                  height: 130, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#0e0508",
                }}
              >
                <span style={{ color: "rgba(252,245,233,0.3)", fontSize: 10, letterSpacing: "0.12em" }}>
                  LOCATING…
                </span>
              </div>
            ) : data ? (
              <MapPanel data={data} />
            ) : null}

            {/* Info strip */}
            <div style={{ padding: "10px 12px" }}>
              {data ? (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                    <span style={{ color: "#fcf5e9", fontSize: 11, letterSpacing: "0.07em" }}>
                      {data.city}{data.country ? `, ${data.country}` : ""}
                    </span>
                    <span style={{ color: "#2dd4bf", fontSize: 13, fontWeight: 600 }}>
                      {data.temp}°
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontSize: 12 }}>{wmoEmoji(data.code)}</span>
                    <span style={{ color: "rgba(252,245,233,0.4)", fontSize: 10, letterSpacing: "0.1em" }}>
                      {wmoLabel(data.code).toUpperCase()}
                    </span>
                  </div>
                </>
              ) : !loading ? (
                <div style={{ color: "rgba(252,245,233,0.25)", fontSize: 10, letterSpacing: "0.1em" }}>
                  UNAVAILABLE
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cloud toggle button */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        style={{
          width: 42, height: 42,
          borderRadius: "50%",
          border: "1px solid rgba(252,245,233,0.18)",
          background: isOpen ? "rgba(45,212,191,0.15)" : "rgba(14,5,8,0.72)",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "none",
          boxShadow: isOpen
            ? "0 0 16px rgba(45,212,191,0.25), 0 4px 16px rgba(0,0,0,0.4)"
            : "0 4px 16px rgba(0,0,0,0.4)",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
        aria-label="Toggle location & weather"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <X size={16} color="rgba(252,245,233,0.7)" strokeWidth={1.5} />
            </motion.span>
          ) : (
            <motion.span
              key="cloud"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <Cloud size={18} color="rgba(252,245,233,0.7)" strokeWidth={1.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
