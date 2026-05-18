import { useEffect, useRef, useState } from "react";
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

export default function LocationWidget() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<import("leaflet").Map | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { lat, lon } = await getLocation();
        const weather = await fetchWeather(lat, lon);
        if (!cancelled) setData(weather);
      } catch {
        if (!cancelled) setLoading(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!data || !mapRef.current || leafletRef.current) return;

    let map: import("leaflet").Map;

    (async () => {
      const L = (await import("leaflet")).default;

      map = L.map(mapRef.current!, {
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
          display:block;
          width:10px;height:10px;
          background:#2dd4bf;
          border-radius:50%;
          box-shadow:0 0 0 3px rgba(45,212,191,0.3),0 0 12px rgba(45,212,191,0.6);
        "></span>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });

      L.marker([data.lat, data.lon], { icon: pulseIcon }).addTo(map);
      leafletRef.current = map;
    })();

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, [data]);

  if (!loading && !data) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 font-mono overflow-hidden"
      style={{
        width: 200,
        borderRadius: 10,
        border: "1px solid rgba(252,245,233,0.12)",
        background: "rgba(14,5,8,0.75)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* Map */}
      <div
        style={{ width: "100%", height: 120, position: "relative", overflow: "hidden" }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#0e0508",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <span style={{ color: "rgba(252,245,233,0.3)", fontSize: 11, letterSpacing: "0.1em" }}>
              LOCATING…
            </span>
          </div>
        )}
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        {/* vignette overlay so edges fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(14,5,8,0.6) 100%)",
          }}
        />
      </div>

      {/* Info strip */}
      <div style={{ padding: "10px 12px" }}>
        {data ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 4,
              }}
            >
              <span style={{ color: "#fcf5e9", fontSize: 11, letterSpacing: "0.08em" }}>
                {data.city}
                {data.country ? `, ${data.country}` : ""}
              </span>
              <span style={{ color: "#2dd4bf", fontSize: 13, fontWeight: 600 }}>
                {data.temp}°
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 12 }}>{wmoEmoji(data.code)}</span>
              <span style={{ color: "rgba(252,245,233,0.45)", fontSize: 10, letterSpacing: "0.1em" }}>
                {wmoLabel(data.code).toUpperCase()}
              </span>
            </div>
          </>
        ) : (
          <div style={{ color: "rgba(252,245,233,0.3)", fontSize: 10, letterSpacing: "0.1em" }}>
            LOADING…
          </div>
        )}
      </div>
    </div>
  );
}
