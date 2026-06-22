import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const ac = "#cc2222"; // primary accent — RMIT red

const cs = {
  label: { color: "#1c1c1c", opacity: 0.55 },
  box:   { backgroundColor: "#1c1c1c", color: "#fcf5e9" },
};

/* ─── Game Hero ──────────────────────────────────────────────── */
function GameHero() {
  return (
    <div style={{ position: "relative", width: "100%", height: 420, overflow: "hidden", background: "#0a1628", borderRadius: 2 }}>
      {/* Pixel grid */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, opacity: 0.07 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#fcf5e9" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0a1628 0%, #0d2d52 60%, #1a4a6b 100%)", zIndex: 0 }} />

      {/* Stars */}
      {[[12,18],[80,35],[140,12],[220,48],[300,22],[400,38],[500,15],[580,42],[650,28],[720,10],[800,36],[900,20],[1050,44],[1150,18],[1200,32]].map(([x,y],i) => (
        <motion.div key={i} style={{ position:"absolute", left:x, top:y, width:2, height:2, borderRadius:"50%", background:"#fcf5e9", zIndex:2 }}
          animate={{ opacity:[0.3,1,0.3] }} transition={{ repeat:Infinity, duration:2+(i%3), delay:i*0.2, ease:"easeInOut" }}/>
      ))}

      {/* Clouds */}
      <motion.svg viewBox="0 0 120 40" style={{ position:"absolute", top:60, left:80, width:100, zIndex:3 }} animate={{ x:[0,12,0] }} transition={{ repeat:Infinity, duration:7, ease:"easeInOut" }}>
        <ellipse cx="60" cy="25" rx="50" ry="15" fill="white" fillOpacity="0.07"/>
        <ellipse cx="40" cy="20" rx="30" ry="18" fill="white" fillOpacity="0.07"/>
      </motion.svg>
      <motion.svg viewBox="0 0 120 40" style={{ position:"absolute", top:40, right:120, width:80, zIndex:3 }} animate={{ x:[0,-10,0] }} transition={{ repeat:Infinity, duration:9, ease:"easeInOut" }}>
        <ellipse cx="60" cy="25" rx="50" ry="14" fill="white" fillOpacity="0.06"/>
        <ellipse cx="38" cy="20" rx="28" ry="17" fill="white" fillOpacity="0.06"/>
      </motion.svg>

      {/* HUD */}
      <svg style={{ position:"absolute", top:18, left:0, width:"100%", zIndex:10 }} height="40">
        <text x="20" y="14" fontFamily="monospace" fontSize="8" fill="#fcf5e9" fillOpacity="0.6" letterSpacing="1">BLOOD SUGAR</text>
        <rect x="20" y="18" width="160" height="10" rx="2" fill="none" stroke="#fcf5e9" strokeOpacity="0.3" strokeWidth="1"/>
        <motion.rect x="21" y="19" height="8" rx="1" fill="#2dd4bf" animate={{ width:[60,95,55,80,60] }} transition={{ repeat:Infinity, duration:6, ease:"easeInOut" }}/>
        <text x="200" y="14" fontFamily="monospace" fontSize="8" fill="#fcf5e9" fillOpacity="0.6" letterSpacing="1">INSULIN</text>
        <rect x="200" y="18" width="120" height="10" rx="2" fill="none" stroke="#fcf5e9" strokeOpacity="0.3" strokeWidth="1"/>
        <motion.rect x="201" y="19" height="8" rx="1" fill="#e0457b" animate={{ width:[40,65,30,50,40] }} transition={{ repeat:Infinity, duration:6, ease:"easeInOut", delay:0.5 }}/>
        <text x="340" y="14" fontFamily="monospace" fontSize="8" fill="#fcf5e9" fillOpacity="0.4" letterSpacing="1">SCORE  02400</text>
        <text x="340" y="26" fontFamily="monospace" fontSize="7" fill="#fcf5e9" fillOpacity="0.25" letterSpacing="1">LEVEL  01 · BLOOD SUGAR MANAGEMENT</text>
      </svg>

      {/* Ground */}
      <svg style={{ position:"absolute", bottom:0, left:0, width:"100%", zIndex:5 }} height="80">
        {Array.from({length:60},(_,i) => (
          <rect key={i} x={i*22} y="46" width="20" height="20" rx="1" fill={i%2===0?"#5c3a1e":"#6e4a2a"} stroke="#3a2010" strokeWidth="0.5"/>
        ))}
        <rect x="0" y="42" width="100%" height="6" fill="#2d6a2d"/>
      </svg>

      {/* Platforms */}
      <svg style={{ position:"absolute", bottom:120, left:"25%", width:110, zIndex:4 }} height="20">
        {[0,1,2,3,4].map(i => <rect key={i} x={i*22} y="0" width="20" height="18" rx="1" fill="#8b4513" stroke="#5c2d0a" strokeWidth="0.5"/>)}
      </svg>
      <svg style={{ position:"absolute", bottom:180, right:"22%", width:90, zIndex:4 }} height="20">
        {[0,1,2,3].map(i => <rect key={i} x={i*22} y="0" width="20" height="18" rx="1" fill="#8b4513" stroke="#5c2d0a" strokeWidth="0.5"/>)}
      </svg>

      {/* Food items */}
      <motion.svg viewBox="0 0 24 24" style={{ position:"absolute", bottom:160, left:"18%", width:28, zIndex:6 }} animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity, duration:2.2, ease:"easeInOut" }}>
        <circle cx="12" cy="14" r="9" fill="#e05050"/>
        <path d="M12 5 Q14 2 16 3" stroke="#4a8a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="9" cy="12" rx="2" ry="3" fill="white" fillOpacity="0.2"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" style={{ position:"absolute", bottom:200, right:"28%", width:26, zIndex:6 }} animate={{ y:[0,-6,0] }} transition={{ repeat:Infinity, duration:2.8, ease:"easeInOut", delay:0.4 }}>
        <rect x="10" y="15" width="4" height="7" rx="1" fill="#5c8a2a"/>
        <circle cx="12" cy="12" r="7" fill="#3a7a1a"/>
        <circle cx="8" cy="10" r="4" fill="#4a8a2a"/>
        <circle cx="16" cy="10" r="4" fill="#4a8a2a"/>
      </motion.svg>
      <motion.svg viewBox="0 0 28 28" style={{ position:"absolute", bottom:170, left:"45%", width:30, zIndex:6 }} animate={{ y:[0,-9,0] }} transition={{ repeat:Infinity, duration:3.1, ease:"easeInOut", delay:0.7 }}>
        <ellipse cx="14" cy="8" rx="11" ry="6" fill="#c4703a"/>
        <rect x="3" y="12" width="22" height="5" fill="#e8c870"/>
        <rect x="3" y="14" width="22" height="3" fill="#8a3a1a"/>
        <ellipse cx="14" cy="22" rx="11" ry="4" fill="#c4703a"/>
      </motion.svg>
      <motion.svg viewBox="0 0 20 30" style={{ position:"absolute", bottom:220, right:"18%", width:22, zIndex:6 }} animate={{ y:[0,-7,0] }} transition={{ repeat:Infinity, duration:2.5, ease:"easeInOut", delay:1.1 }}>
        <rect x="2" y="4" width="16" height="22" rx="3" fill="#cc2222"/>
        <rect x="2" y="4" width="16" height="4" rx="2" fill="#aa1a1a"/>
        <rect x="6" y="8" width="8" height="2" rx="1" fill="white" fillOpacity="0.2"/>
        <text x="5" y="18" fontFamily="monospace" fontSize="5" fill="white" fillOpacity="0.7">COLA</text>
      </motion.svg>
      <motion.svg viewBox="0 0 20 30" style={{ position:"absolute", bottom:155, right:"40%", width:20, zIndex:6 }} animate={{ y:[0,-10,0], rotate:[0,5,0] }} transition={{ repeat:Infinity, duration:3.5, ease:"easeInOut", delay:0.3 }}>
        <rect x="7" y="2" width="6" height="22" rx="3" fill="#b0c4de"/>
        <rect x="7" y="2" width="6" height="6" rx="2" fill="#6080a0"/>
        <rect x="8" y="10" width="4" height="8" rx="1" fill="white" fillOpacity="0.5"/>
        <rect x="5" y="18" width="10" height="3" rx="1" fill="#8080a0"/>
        <path d="M10 24 L10 28" stroke="#8080a0" strokeWidth="1.5" strokeLinecap="round"/>
      </motion.svg>

      {/* Mario */}
      <motion.svg viewBox="0 0 32 48" style={{ position:"absolute", bottom:62, left:"35%", width:32, zIndex:8 }}
        animate={{ x:[0,4,0,-2,0] }} transition={{ repeat:Infinity, duration:1.8, ease:"linear" }}>
        <rect x="8" y="0" width="18" height="6" rx="1" fill="#cc2222"/>
        <rect x="4" y="5" width="24" height="3" fill="#cc2222"/>
        <rect x="6" y="8" width="20" height="14" rx="2" fill="#f4c27a"/>
        <rect x="10" y="11" width="4" height="4" fill="#1a1a1a"/>
        <rect x="18" y="11" width="4" height="4" fill="#1a1a1a"/>
        <rect x="8" y="16" width="16" height="3" rx="1" fill="#5c3a1e"/>
        <rect x="5" y="22" width="22" height="14" rx="2" fill="#3a4a8a"/>
        <rect x="11" y="24" width="4" height="4" rx="1" fill="#f4c27a"/>
        <rect x="17" y="24" width="4" height="4" rx="1" fill="#f4c27a"/>
        <rect x="5" y="36" width="10" height="10" rx="1" fill="#cc2222"/>
        <rect x="17" y="36" width="10" height="10" rx="1" fill="#cc2222"/>
        <rect x="3" y="44" width="12" height="4" rx="1" fill="#3a2010"/>
        <rect x="17" y="44" width="12" height="4" rx="1" fill="#3a2010"/>
      </motion.svg>

      {/* Dr Mario */}
      <motion.svg viewBox="0 0 32 48" style={{ position:"absolute", bottom:62, right:"28%", width:28, zIndex:7, opacity:0.7 }}
        animate={{ y:[0,-3,0] }} transition={{ repeat:Infinity, duration:3, ease:"easeInOut" }}>
        <rect x="6" y="0" width="20" height="8" rx="2" fill="white"/>
        <rect x="10" y="4" width="4" height="4" fill="#cc2222"/>
        <rect x="4" y="7" width="24" height="3" fill="white"/>
        <rect x="6" y="10" width="20" height="12" rx="2" fill="#f4c27a"/>
        <rect x="9" y="13" width="3" height="3" fill="#1a1a1a"/>
        <rect x="18" y="13" width="3" height="3" fill="#1a1a1a"/>
        <rect x="8" y="17" width="14" height="2" rx="1" fill="#5c3a1e"/>
        <rect x="4" y="22" width="24" height="14" rx="2" fill="white"/>
        <rect x="12" y="24" width="8" height="8" rx="1" fill="#e0e8f0"/>
        <rect x="5" y="36" width="10" height="10" rx="1" fill="#3a4a8a"/>
        <rect x="17" y="36" width="10" height="10" rx="1" fill="#3a4a8a"/>
        <rect x="3" y="44" width="12" height="4" rx="1" fill="#3a2010"/>
        <rect x="17" y="44" width="12" height="4" rx="1" fill="#3a2010"/>
      </motion.svg>

      {/* Speech bubble */}
      <div style={{ position:"absolute", bottom:120, right:"12%", zIndex:9, background:"white", borderRadius:4, padding:"6px 10px", fontFamily:"monospace", fontSize:"0.55rem", color:"#1a1a1a", border:"1.5px solid rgba(0,0,0,0.15)", maxWidth:140, lineHeight:1.4, letterSpacing:"0.05em" }}>
        Keep blood sugar in the 40–60% range!
        <div style={{ position:"absolute", bottom:-7, left:"60%", width:0, height:0, borderLeft:"6px solid transparent", borderRight:"6px solid transparent", borderTop:"8px solid white" }}/>
      </div>
    </div>
  );
}

/* ─── Impact Map ─────────────────────────────────────────────── */
function ImpactMap() {
  // viewBox 0 0 900 680 — origin of axes at (450, 340)
  const cx = 450, cy = 340;

  const items: { label: string; x: number; y: number; w: number }[] = [
    { label: "Menzies  |  yt2p",       x: 660, y: 110, w: 160 },
    { label: "My life  Diabetescare",  x: 490, y: 195, w: 175 },
    { label: "DIABETESOPOLY",          x: 328, y: 335, w: 154 },
    { label: "Diabetes in Schools",    x: 530, y: 430, w: 155 },
    { label: "Diabetes\nQualified",    x: 668, y: 478, w: 130 },
    { label: "Know Your Risk",         x: 510, y: 555, w: 130 },
    { label: "Blood Sugar\nBalance",   x: 190, y: 580, w: 125 },
  ];

  return (
    <div style={{ width:"100%", overflowX:"auto" }}>
      <svg viewBox="0 0 900 680" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", minWidth:600, display:"block", borderRadius:2 }}>
        <rect width="900" height="680" fill="#1a1a1a"/>

        {/* Axes */}
        {/* Y axis */}
        <line x1={cx} y1="30" x2={cx} y2="650" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1"/>
        {/* X axis */}
        <line x1="30" y1={cy} x2="870" y2={cy} stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1"/>

        {/* Axis arrowheads */}
        <polygon points={`${cx-5},38 ${cx+5},38 ${cx},26`} fill="white" fillOpacity="0.3"/>
        <polygon points={`${cx-5},642 ${cx+5},642 ${cx},654`} fill="white" fillOpacity="0.3"/>
        <polygon points="862,335 862,345 874,340" fill="white" fillOpacity="0.3"/>
        <polygon points="38,335 38,345 26,340" fill="white" fillOpacity="0.3"/>

        {/* Axis labels */}
        <text x={cx} y="18" textAnchor="middle" fill="white" fillOpacity="0.65" fontFamily="monospace" fontSize="11" letterSpacing="0.5">Low Complexity</text>
        <text x={cx} y="672" textAnchor="middle" fill="white" fillOpacity="0.65" fontFamily="monospace" fontSize="11" letterSpacing="0.5">High Complexity</text>
        <text x="60"  y={cy-10} textAnchor="middle" fill="white" fillOpacity="0.65" fontFamily="monospace" fontSize="11" letterSpacing="0.5">Tangible</text>
        <text x={cx}  y={cy-10} textAnchor="middle" fill="white" fillOpacity="0.55" fontFamily="monospace" fontSize="11" letterSpacing="0.5">Visual</text>
        <text x="840" y={cy-10} textAnchor="middle" fill="white" fillOpacity="0.65" fontFamily="monospace" fontSize="11" letterSpacing="0.5">Textual</text>

        {/* Existing items */}
        {items.map((item) => {
          const lines = item.label.split("\n");
          const h = lines.length > 1 ? 46 : 34;
          return (
            <g key={item.label}>
              <rect x={item.x - item.w/2} y={item.y - h/2} width={item.w} height={h} rx="4"
                fill="#2a2a2a" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
              {lines.map((ln, j) => (
                <text key={j} x={item.x} y={item.y + (lines.length>1 ? -6 + j*16 : 5)}
                  textAnchor="middle" fill="white" fillOpacity="0.82" fontFamily="monospace"
                  fontSize={item.label === "DIABETESOPOLY" ? "11" : "9.5"} letterSpacing="0.3"
                  fontWeight={item.label === "DIABETESOPOLY" ? "bold" : "normal"}>
                  {ln}
                </text>
              ))}
            </g>
          );
        })}

        {/* DiaCare — highlighted */}
        <circle cx="380" cy="590" r="22" fill={ac} fillOpacity="0.18" stroke={ac} strokeWidth="1.5"/>
        <circle cx="380" cy="590" r="10" fill={ac} fillOpacity="0.7"/>
        <text x="380" y="623" textAnchor="middle" fill={ac} fontFamily="monospace" fontSize="9" letterSpacing="1" fontWeight="bold">DIACARE</text>
        <text x="380" y="634" textAnchor="middle" fill={ac} fillOpacity="0.6" fontFamily="monospace" fontSize="7.5" letterSpacing="0.5">Digital Game · High</text>
      </svg>
    </div>
  );
}

/* ─── HLOC Diagram ───────────────────────────────────────────── */
function HLOCDiagram() {
  return (
    <svg viewBox="0 0 780 400" xmlns="http://www.w3.org/2000/svg"
      style={{ width:"100%", display:"block", borderRadius:2, ...cs.box }}>
      <rect width="780" height="400" fill="#1c1c1c"/>

      {/* Dividers */}
      <line x1="390" y1="20" x2="390" y2="380" stroke="#fcf5e9" strokeOpacity="0.1" strokeWidth="1"/>
      <line x1="20"  y1="200" x2="760" y2="200" stroke="#fcf5e9" strokeOpacity="0.1" strokeWidth="1"/>

      {/* Centre circle */}
      <circle cx="390" cy="200" r="28" fill="#1c1c1c" stroke="#fcf5e9" strokeOpacity="0.15" strokeWidth="1.5"/>
      <text x="390" y="196" fill="#fcf5e9" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="1">HEALTH</text>
      <text x="390" y="207" fill="#fcf5e9" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="1">LOCUS</text>
      <text x="390" y="218" fill="#fcf5e9" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="1">CONTROL</text>

      {/* ── Quadrant 1: Internal (top-left) — highlighted ── */}
      <rect x="28" y="28" width="340" height="158" rx="4" fill={ac} fillOpacity="0.07" stroke={ac} strokeOpacity="0.4" strokeWidth="1.2"/>
      <rect x="28" y="28" width="6" height="158" rx="3" fill={ac}/>
      <text x="46" y="55" fill="#fcf5e9" fontFamily="monospace" fontSize="10" letterSpacing="2" fontWeight="bold">INTERNAL HLOC</text>
      <text x="46" y="74" fill="#fcf5e9" fillOpacity="0.6" fontFamily="monospace" fontSize="8.5">Belief that you are responsible</text>
      <text x="46" y="87" fill="#fcf5e9" fillOpacity="0.6" fontFamily="monospace" fontSize="8.5">for your own health outcomes</text>
      <rect x="46" y="102" width="290" height="1" fill="#fcf5e9" fillOpacity="0.08"/>
      <text x="46" y="122" fill={ac} fontFamily="monospace" fontSize="8" letterSpacing="0.5">↑ Strongest predictor of self-care</text>
      <text x="46" y="135" fill={ac} fontFamily="monospace" fontSize="8" letterSpacing="0.5">in Type 2 diabetes patients</text>
      <text x="46" y="153" fill="#fcf5e9" fillOpacity="0.3" fontFamily="monospace" fontSize="7">Zeidi, Morshedi & Otaghvar 2020</text>

      {/* ── Quadrant 2: External (top-right) ── */}
      <rect x="412" y="28" width="340" height="158" rx="4" fill="#fcf5e9" fillOpacity="0.02" stroke="#fcf5e9" strokeOpacity="0.08" strokeWidth="1"/>
      <rect x="412" y="28" width="6" height="158" rx="3" fill="#fcf5e9" fillOpacity="0.2"/>
      <text x="430" y="55" fill="#fcf5e9" fontFamily="monospace" fontSize="10" letterSpacing="2" fontWeight="bold">EXTERNAL HLOC</text>
      <text x="430" y="74" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">Belief that health is controlled</text>
      <text x="430" y="87" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">by others — family, friends</text>
      <text x="430" y="108" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">Person has limited perceived</text>
      <text x="430" y="121" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">control over their wellbeing</text>

      {/* ── Quadrant 3: Doctors (bottom-left) ── */}
      <rect x="28" y="214" width="340" height="158" rx="4" fill="#fcf5e9" fillOpacity="0.02" stroke="#fcf5e9" strokeOpacity="0.08" strokeWidth="1"/>
      <rect x="28" y="214" width="6" height="158" rx="3" fill="#fcf5e9" fillOpacity="0.2"/>
      <text x="46" y="241" fill="#fcf5e9" fontFamily="monospace" fontSize="10" letterSpacing="2" fontWeight="bold">DOCTORS HLOC</text>
      <text x="46" y="260" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">Belief in the physician's role</text>
      <text x="46" y="273" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">in managing personal health</text>
      <text x="46" y="294" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">More likely to attend check-ups</text>
      <text x="46" y="307" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">and follow clinical guidelines</text>

      {/* ── Quadrant 4: Chance (bottom-right) ── */}
      <rect x="412" y="214" width="340" height="158" rx="4" fill="#fcf5e9" fillOpacity="0.02" stroke="#fcf5e9" strokeOpacity="0.08" strokeWidth="1"/>
      <rect x="412" y="214" width="6" height="158" rx="3" fill="#fcf5e9" fillOpacity="0.2"/>
      <text x="430" y="241" fill="#fcf5e9" fontFamily="monospace" fontSize="10" letterSpacing="2" fontWeight="bold">CHANCE HLOC</text>
      <text x="430" y="260" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">Belief that health is governed</text>
      <text x="430" y="273" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">by luck, fate or circumstance</text>
      <text x="430" y="294" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">Low perceived personal agency</text>
      <text x="430" y="307" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="8.5">over health outcomes</text>

      {/* Axis labels */}
      <text x="390" y="392" textAnchor="middle" fill="#fcf5e9" fillOpacity="0.2" fontFamily="monospace" fontSize="7" letterSpacing="1">HEALTH LOCUS OF CONTROL MODEL</text>
    </svg>
  );
}

/* ─── Fade-up variant ────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const } }),
};

/* ─── Page ───────────────────────────────────────────────────── */
export default function DiaCare() {
  const [, navigate] = useLocation();

  return (
    <>
      <Helmet>
        <title>DiaCare | Ashika Ramesh</title>
        <meta name="description" content="DiaCare — gamifying Type 2 diabetes education for children and teenagers through an adapted Mario Brothers game." />
      </Helmet>

      {/* Header */}
      <header className="mb-16 flex flex-col gap-8">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase" style={cs.label}>
          <button onClick={() => navigate("/work")} style={{ background:"none", border:"none", padding:0, cursor:"pointer", ...cs.label }}>← WORK</button>
          <span>/</span>
          <span>DICARE</span>
        </div>

        <div>
          <span className="inline-block font-mono text-xs tracking-widest uppercase border px-3 py-1" style={{ ...cs.label, borderColor:"rgba(28,28,28,0.2)" }}>
            01 · LEARNING DESIGNER · HEALTH EDUCATION · GAME DESIGN
          </span>
        </div>

        <h1 className="font-bold tracking-tight" style={{ fontSize:"clamp(2.5rem, 8vw, 6rem)", lineHeight:0.95, color:"#1c1c1c" }}>
          DIACARE
        </h1>

        <GameHero />
      </header>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

        {/* Sidebar */}
        <motion.aside className="lg:col-span-3 flex flex-col gap-8 font-mono text-xs tracking-wider"
          initial="hidden" animate="visible" variants={fadeUp}>
          {[
            { label: "ROLE",     value: "Learning Designer\nGame Designer\nResearcher" },
            { label: "KEYWORDS", value: "Health Literacy\nHealth Locus of Control\nType 2 Diabetes\nGame Design\nChildren's Education" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="mb-2" style={cs.label}>{label}</p>
              {value.split("\n").map((v, i) => <p key={i} style={{ color:"#1c1c1c" }}>{v}</p>)}
            </div>
          ))}

          <div>
            <p className="mb-2" style={cs.label}>LINKS</p>
            <a href="https://vimeo.com/955784249" target="_blank" rel="noopener noreferrer"
              className="block underline underline-offset-4 mb-1 hover:opacity-70 transition-opacity"
              style={{ color:"#1c1c1c", fontSize:"0.7rem" }}>↗ Gameplay Video</a>
            <a href="https://github.com/ashikacode/DiaCare-Mario-" target="_blank" rel="noopener noreferrer"
              className="block underline underline-offset-4 hover:opacity-70 transition-opacity"
              style={{ color:"#1c1c1c", fontSize:"0.7rem" }}>↗ GitHub Repository</a>
          </div>
        </motion.aside>

        {/* Main content */}
        <div className="lg:col-span-9 flex flex-col gap-16">

          {/* Abstract */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }} variants={fadeUp}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={cs.label}>OVERVIEW</p>
            <p className="font-mono text-base leading-relaxed" style={{ color:"#1c1c1c" }}>
              As Type 2 diabetes rises among children, traditional textual resources fail to engage young learners — leading to poor self-care and low health literacy. DiaCare transforms diabetes education by embedding it into a modified Super Mario Brothers game, where players must help Mario manage his blood sugar and insulin levels through food choices and physical activity.
            </p>
          </motion.section>

          {/* Stats */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }} variants={fadeUp} custom={1}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={cs.label}>THE SCALE OF THE PROBLEM</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { stat:"537M",   sub:"adults living with\ndiabetes globally (2021)" },
                { stat:"643M",   sub:"projected by 2030 —\n1 in 9 adults" },
                { stat:"312/day",sub:"new registrations in\nAustralia alone" },
              ].map(({ stat, sub }) => (
                <div key={stat} className="p-6 font-mono" style={cs.box}>
                  <p className="text-3xl font-bold mb-2" style={{ color: ac }}>{stat}</p>
                  {sub.split("\n").map((s,i) => <p key={i} className="text-xs leading-relaxed" style={{ color:"#fcf5e9", opacity:0.7 }}>{s}</p>)}
                </div>
              ))}
            </div>
            <div className="mt-4 p-5 font-mono border-l-2" style={{ borderColor: ac, background:"rgba(28,28,28,0.06)" }}>
              <p className="text-xs leading-relaxed italic" style={{ color:"#1c1c1c" }}>
                "There is a significant lack of literature and resources tailored to those diagnosed under the age of 30. Educational programs designed for older adults may not meet the specific needs of younger individuals."
              </p>
            </div>
          </motion.section>

          {/* HLOC */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }} variants={fadeUp} custom={2}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={cs.label}>RESEARCH FRAMEWORK</p>
            <p className="font-mono text-sm leading-relaxed mb-6" style={{ color:"#1c1c1c", opacity:0.75 }}>
              Two psychological frameworks shaped the design: <strong>Health Locus of Control (HLOC)</strong> — predicting self-management behaviours — and <strong>Health Literacy</strong>, which determines a person's ability to find, understand, and act on health information. Research shows internal HLOC has the greatest influence on self-care in T2D patients.
            </p>
            <HLOCDiagram />
          </motion.section>

          {/* Design approach */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }} variants={fadeUp} custom={3}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={cs.label}>DESIGN APPROACH — FLOW THEORY</p>
            <p className="font-mono text-sm leading-relaxed mb-6" style={{ color:"#1c1c1c", opacity:0.75 }}>
              Based on Malone (1980) and Csikszentmihalyi's Flow Theory, three core strategies guided how educational content was woven into the game without breaking immersion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { code:"CE", title:"Challenge Enhancement",   body:"Progressively increase difficulty across levels — from blood sugar management to pre-diabetic and diabetic scenarios — embedding more complex concepts as players advance." },
                { code:"FE", title:"Feedback Enhancement",    body:"Immediate visual feedback through colour-changing health bars, pop-up messages, and performance indicators when blood sugar moves outside the 40–60% ideal range." },
                { code:"SE", title:"Structure Enhancement",   body:"Educational features integrated seamlessly into gameplay — not bolted on as rewards, but as the core mechanic — so learning and play are indistinguishable." },
              ].map(({ code, title, body }) => (
                <div key={code} className="p-6 font-mono" style={cs.box}>
                  <p className="text-2xl font-bold mb-1" style={{ color: ac }}>{code}</p>
                  <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:"#fcf5e9" }}>{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color:"#fcf5e9", opacity:0.7 }}>{body}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Impact Map */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }} variants={fadeUp} custom={4}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={cs.label}>IMPACT MAP</p>
            <p className="font-mono text-sm leading-relaxed mb-6" style={{ color:"#1c1c1c", opacity:0.75 }}>
              Charting DiaCare within the landscape of existing diabetes education tools — by media type and complexity — to show where it sits and the gap it fills.
            </p>
            <ImpactMap />
          </motion.section>

          {/* Game mechanics */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }} variants={fadeUp} custom={5}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={cs.label}>THE GAME — HOW IT WORKS</p>
            <p className="font-mono text-sm leading-relaxed mb-8" style={{ color:"#1c1c1c", opacity:0.75 }}>
              Mario discovers his future self is at risk from diabetes due to unhealthy habits. Players must navigate him through three progressively challenging levels, making food and activity choices that directly affect his blood sugar and insulin readings displayed at the top of the screen.
            </p>

            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ ...cs.label, opacity:0.4 }}>COLLECTIBLE ITEMS</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label:"Apple / Broccoli",  type:"HEALTHY CARB",    effect:"Gradual blood sugar rise",                      bg:"#1a2a1a", accent:"#5ab05a" },
                { label:"Insulin Boost",     type:"POWER-UP",         effect:"Lowers blood sugar · Mario grows larger",       bg:"#1a2038", accent:"#6090cc" },
                { label:"Exercise Boost",    type:"POWER-UP",         effect:"Stimulates insulin production",                 bg:"#101e28", accent:"#2dd4bf" },
                { label:"Burger / Coke",     type:"UNHEALTHY CARB",   effect:"Rapid blood sugar spike",                       bg:"#2a1010", accent: ac },
              ].map(({ label, type, effect, bg, accent }) => (
                <div key={label} className="p-4 font-mono" style={{ backgroundColor:bg, color:"#fcf5e9", borderRadius:2, border:`1px solid ${accent}33` }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color:accent }}>{type}</p>
                  <p className="text-sm font-bold mb-2">{label}</p>
                  <p className="text-xs leading-relaxed" style={{ opacity:0.7 }}>{effect}</p>
                </div>
              ))}
            </div>

            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ ...cs.label, opacity:0.4 }}>THREE LEVELS</p>
            <div className="flex flex-col gap-2">
              {[
                { num:"01", title:"Blood Sugar Management", desc:"Establish baseline — maintain blood sugar in the 40–60% range by choosing foods wisely and keeping Mario active." },
                { num:"02", title:"Pre-Diabetic",           desc:"Increased complexity — tighter tolerances, more decision points, introduction of insulin boost mechanics." },
                { num:"03", title:"Diabetic",               desc:"Full management scenario — every action has measurable consequences, mirroring real-life diabetes self-care." },
              ].map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4 p-5 font-mono" style={{ ...cs.box, borderBottom:"1px solid rgba(252,245,233,0.08)" }}>
                  <span className="text-2xl font-bold shrink-0" style={{ color: ac, opacity:0.6 }}>{num}</span>
                  <div>
                    <p className="text-sm font-bold tracking-wide mb-1">{title}</p>
                    <p className="text-xs leading-relaxed" style={{ opacity:0.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Vimeo */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }} variants={fadeUp} custom={6}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={cs.label}>GAMEPLAY VIDEO</p>
            <div style={{ position:"relative", paddingBottom:"56.25%", height:0, overflow:"hidden", background:"#0a1010", borderRadius:2 }}>
              <iframe
                src="https://player.vimeo.com/video/955784249?badge=0&autopause=0&player_id=0&app_id=58479"
                style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", border:"none" }}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                title="DiaCare Gameplay"
              />
            </div>
          </motion.section>

          {/* Testing */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }} variants={fadeUp} custom={7}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={cs.label}>TESTING</p>
            <p className="font-mono text-sm leading-relaxed mb-8" style={{ color:"#1c1c1c", opacity:0.75 }}>
              The game was tested with children aged 10 and 13 in an early user evaluation session to measure educational engagement and comprehension.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { phase:"INITIAL REACTION",    icon:"👀", finding:"Children were curious about the game's characters and visual design — the pixel aesthetic and health bars immediately prompted questions." },
                { phase:"UNDERSTANDING LOGIC", icon:"🧠", finding:"Some challenges initially understanding the mechanics — once they grasped the blood sugar objective, engagement increased significantly." },
                { phase:"EDUCATIONAL IMPACT",  icon:"💡", finding:"The experience sparked genuine interest in blood sugar and insulin as concepts — children began asking questions that went beyond the game." },
                { phase:"TAKEAWAY",            icon:"🎮", finding:"Learning and fun were not at odds — the game structure supported curiosity-driven exploration of health concepts without feeling like a lesson." },
              ].map(({ phase, finding, icon }) => (
                <div key={phase} className="p-6 font-mono" style={{ ...cs.box, borderLeft:`2px solid ${ac}66` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{icon}</span>
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: ac }}>{phase}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ opacity:0.7 }}>{finding}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Future work */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }} variants={fadeUp} custom={8}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={cs.label}>FUTURE WORK</p>
            <div className="flex flex-col gap-3">
              {[
                "Introduce detailed feedback mechanisms to guide player choices, improving educational outcomes",
                "Develop additional levels catering to older children, increasing challenge and appeal",
                "Integrate real-world patient data to simulate authentic scenarios within the game environment",
                "Implement dynamic health consequences — the character experiences crises if blood sugar is poorly managed",
                "Integrate DiaCare into preschool and middle school curricula as part of health education",
                "Develop an activity kit used post-gameplay to extend discussion of diabetes management and healthy lifestyle choices",
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 font-mono text-xs leading-relaxed" style={{ background:"rgba(28,28,28,0.06)", borderLeft:`2px solid rgba(28,28,28,0.15)` }}>
                  <span style={{ color:"#1c1c1c", opacity:0.3, minWidth:20 }}>{String(i+1).padStart(2,"0")}</span>
                  <span style={{ color:"#1c1c1c", opacity:0.75 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Closing quote */}
          <motion.div className="py-10 font-mono text-center border-t border-b" style={{ borderColor:"rgba(28,28,28,0.12)" }}
            initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} custom={9}>
            <p className="text-sm italic leading-relaxed max-w-2xl mx-auto" style={{ color:"#1c1c1c", opacity:0.6 }}>
              "Games should not be treated simply as educational sugar coating, making the hard work of learning easier to swallow."
            </p>
            <p className="text-xs mt-3 tracking-widest uppercase" style={{ color:"#1c1c1c", opacity:0.3 }}>
              — Rieber et al., 1998
            </p>
          </motion.div>

        </div>
      </div>
    </>
  );
}
