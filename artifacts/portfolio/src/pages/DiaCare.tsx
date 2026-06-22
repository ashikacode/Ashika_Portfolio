import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const cs = {
  label: { color: "#003049", opacity: 0.55 },
  box: { backgroundColor: "#003049", color: "#fcf5e9" },
};

function GameHero() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 420,
        overflow: "hidden",
        background: "#0a1628",
        borderRadius: 2,
      }}
    >
      {/* Pixel grid overlay */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, opacity: 0.07 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#fcf5e9" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Sky gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0a1628 0%, #0d2d52 60%, #1a4a6b 100%)", zIndex: 0 }} />

      {/* Stars */}
      {[
        [12,18],[80,35],[140,12],[220,48],[300,22],[400,38],[500,15],[580,42],[650,28],[720,10],[800,36],[900,20],[1050,44],[1150,18],[1200,32],
      ].map(([x,y], i) => (
        <motion.div
          key={i}
          style={{ position: "absolute", left: x, top: y, width: 2, height: 2, borderRadius: "50%", background: "#fcf5e9", zIndex: 2 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 + (i % 3), delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}

      {/* Clouds */}
      <motion.svg viewBox="0 0 120 40" style={{ position: "absolute", top: 60, left: 80, width: 100, zIndex: 3 }}
        animate={{ x: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}>
        <ellipse cx="60" cy="25" rx="50" ry="15" fill="white" fillOpacity="0.07"/>
        <ellipse cx="40" cy="20" rx="30" ry="18" fill="white" fillOpacity="0.07"/>
        <ellipse cx="80" cy="18" rx="25" ry="16" fill="white" fillOpacity="0.07"/>
      </motion.svg>
      <motion.svg viewBox="0 0 120 40" style={{ position: "absolute", top: 40, right: 120, width: 80, zIndex: 3 }}
        animate={{ x: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}>
        <ellipse cx="60" cy="25" rx="50" ry="14" fill="white" fillOpacity="0.06"/>
        <ellipse cx="38" cy="20" rx="28" ry="17" fill="white" fillOpacity="0.06"/>
        <ellipse cx="82" cy="19" rx="22" ry="15" fill="white" fillOpacity="0.06"/>
      </motion.svg>

      {/* HUD — Blood Sugar & Insulin bars */}
      <svg style={{ position: "absolute", top: 18, left: 0, width: "100%", zIndex: 10 }} height="40">
        {/* Blood Sugar */}
        <text x="20" y="14" fontFamily="monospace" fontSize="8" fill="#fcf5e9" fillOpacity="0.6" letterSpacing="1">BLOOD SUGAR</text>
        <rect x="20" y="18" width="160" height="10" rx="2" fill="none" stroke="#fcf5e9" strokeOpacity="0.3" strokeWidth="1"/>
        <motion.rect x="21" y="19" height="8" rx="1" fill="#2dd4bf"
          animate={{ width: [60, 95, 55, 80, 60] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}/>
        {/* Insulin */}
        <text x="200" y="14" fontFamily="monospace" fontSize="8" fill="#fcf5e9" fillOpacity="0.6" letterSpacing="1">INSULIN</text>
        <rect x="200" y="18" width="120" height="10" rx="2" fill="none" stroke="#fcf5e9" strokeOpacity="0.3" strokeWidth="1"/>
        <motion.rect x="201" y="19" height="8" rx="1" fill="#e0457b"
          animate={{ width: [40, 65, 30, 50, 40] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}/>
        {/* Score */}
        <text x="340" y="14" fontFamily="monospace" fontSize="8" fill="#fcf5e9" fillOpacity="0.4" letterSpacing="1">SCORE  02400</text>
        <text x="340" y="26" fontFamily="monospace" fontSize="7" fill="#fcf5e9" fillOpacity="0.25" letterSpacing="1">LEVEL  01 · BLOOD SUGAR MANAGEMENT</text>
      </svg>

      {/* Ground platform */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 5 }} height="80">
        {/* Ground blocks */}
        {Array.from({ length: 60 }, (_, i) => (
          <rect key={i} x={i * 22} y="46" width="20" height="20" rx="1"
            fill={i % 2 === 0 ? "#5c3a1e" : "#6e4a2a"} stroke="#3a2010" strokeWidth="0.5"/>
        ))}
        {/* Grass top */}
        <rect x="0" y="42" width="100%" height="6" fill="#2d6a2d"/>
      </svg>

      {/* Platforms */}
      <svg style={{ position: "absolute", bottom: 120, left: "25%", width: 110, zIndex: 4 }} height="20">
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={i * 22} y="0" width="20" height="18" rx="1" fill="#8b4513" stroke="#5c2d0a" strokeWidth="0.5"/>
        ))}
      </svg>
      <svg style={{ position: "absolute", bottom: 180, right: "22%", width: 90, zIndex: 4 }} height="20">
        {[0,1,2,3].map(i => (
          <rect key={i} x={i * 22} y="0" width="20" height="18" rx="1" fill="#8b4513" stroke="#5c2d0a" strokeWidth="0.5"/>
        ))}
      </svg>

      {/* Floating food items */}
      {/* Apple (healthy) */}
      <motion.svg viewBox="0 0 24 24" style={{ position: "absolute", bottom: 160, left: "18%", width: 28, zIndex: 6 }}
        animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
        <circle cx="12" cy="14" r="9" fill="#e05050"/>
        <path d="M12 5 Q14 2 16 3" stroke="#4a8a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="9" cy="12" rx="2" ry="3" fill="white" fillOpacity="0.2"/>
      </motion.svg>
      {/* Broccoli (healthy) */}
      <motion.svg viewBox="0 0 24 24" style={{ position: "absolute", bottom: 200, right: "28%", width: 26, zIndex: 6 }}
        animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.4 }}>
        <rect x="10" y="15" width="4" height="7" rx="1" fill="#5c8a2a"/>
        <circle cx="12" cy="12" r="7" fill="#3a7a1a"/>
        <circle cx="8" cy="10" r="4" fill="#4a8a2a"/>
        <circle cx="16" cy="10" r="4" fill="#4a8a2a"/>
      </motion.svg>
      {/* Burger (unhealthy) */}
      <motion.svg viewBox="0 0 28 28" style={{ position: "absolute", bottom: 170, left: "45%", width: 30, zIndex: 6 }}
        animate={{ y: [0, -9, 0] }} transition={{ repeat: Infinity, duration: 3.1, ease: "easeInOut", delay: 0.7 }}>
        <ellipse cx="14" cy="8" rx="11" ry="6" fill="#c4703a"/>
        <rect x="3" y="12" width="22" height="5" fill="#e8c870"/>
        <rect x="3" y="14" width="22" height="3" fill="#8a3a1a"/>
        <ellipse cx="14" cy="22" rx="11" ry="4" fill="#c4703a"/>
      </motion.svg>
      {/* Coke can (unhealthy) */}
      <motion.svg viewBox="0 0 20 30" style={{ position: "absolute", bottom: 220, right: "18%", width: 22, zIndex: 6 }}
        animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1.1 }}>
        <rect x="2" y="4" width="16" height="22" rx="3" fill="#cc2222"/>
        <rect x="2" y="4" width="16" height="4" rx="2" fill="#aa1a1a"/>
        <rect x="6" y="8" width="8" height="2" rx="1" fill="white" fillOpacity="0.2"/>
        <text x="5" y="18" fontFamily="monospace" fontSize="5" fill="white" fillOpacity="0.7">COLA</text>
      </motion.svg>
      {/* Insulin boost */}
      <motion.svg viewBox="0 0 20 30" style={{ position: "absolute", bottom: 155, right: "40%", width: 20, zIndex: 6 }}
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.3 }}>
        <rect x="7" y="2" width="6" height="22" rx="3" fill="#b0c4de"/>
        <rect x="7" y="2" width="6" height="6" rx="2" fill="#6080a0"/>
        <rect x="8" y="10" width="4" height="8" rx="1" fill="white" fillOpacity="0.5"/>
        <rect x="5" y="18" width="10" height="3" rx="1" fill="#8080a0"/>
        <path d="M10 24 L10 28" stroke="#8080a0" strokeWidth="1.5" strokeLinecap="round"/>
      </motion.svg>

      {/* Mario character (pixel art) */}
      <motion.svg
        viewBox="0 0 32 48"
        style={{ position: "absolute", bottom: 62, left: "35%", width: 32, zIndex: 8, imageRendering: "pixelated" }}
        animate={{ x: [0, 4, 0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
      >
        {/* Hat */}
        <rect x="8" y="0" width="18" height="6" rx="1" fill="#cc2222"/>
        <rect x="4" y="5" width="24" height="3" fill="#cc2222"/>
        {/* Face */}
        <rect x="6" y="8" width="20" height="14" rx="2" fill="#f4c27a"/>
        {/* Eyes */}
        <rect x="10" y="11" width="4" height="4" fill="#1a1a1a"/>
        <rect x="18" y="11" width="4" height="4" fill="#1a1a1a"/>
        {/* Moustache */}
        <rect x="8" y="16" width="16" height="3" rx="1" fill="#5c3a1e"/>
        {/* Body — blue overalls */}
        <rect x="5" y="22" width="22" height="14" rx="2" fill="#3a4a8a"/>
        {/* Buttons */}
        <rect x="11" y="24" width="4" height="4" rx="1" fill="#f4c27a"/>
        <rect x="17" y="24" width="4" height="4" rx="1" fill="#f4c27a"/>
        {/* Legs */}
        <rect x="5" y="36" width="10" height="10" rx="1" fill="#cc2222"/>
        <rect x="17" y="36" width="10" height="10" rx="1" fill="#cc2222"/>
        {/* Shoes */}
        <rect x="3" y="44" width="12" height="4" rx="1" fill="#3a2010"/>
        <rect x="17" y="44" width="12" height="4" rx="1" fill="#3a2010"/>
      </motion.svg>

      {/* Dr Mario NPC */}
      <motion.svg
        viewBox="0 0 32 48"
        style={{ position: "absolute", bottom: 62, right: "28%", width: 28, zIndex: 7, opacity: 0.7 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {/* White doctor hat */}
        <rect x="6" y="0" width="20" height="8" rx="2" fill="white"/>
        <rect x="10" y="4" width="4" height="4" fill="#cc2222"/>
        <rect x="4" y="7" width="24" height="3" fill="white"/>
        {/* Face */}
        <rect x="6" y="10" width="20" height="12" rx="2" fill="#f4c27a"/>
        <rect x="9" y="13" width="3" height="3" fill="#1a1a1a"/>
        <rect x="18" y="13" width="3" height="3" fill="#1a1a1a"/>
        <rect x="8" y="17" width="14" height="2" rx="1" fill="#5c3a1e"/>
        {/* White coat */}
        <rect x="4" y="22" width="24" height="14" rx="2" fill="white"/>
        <rect x="12" y="24" width="8" height="8" rx="1" fill="#e0e8f0"/>
        {/* Legs */}
        <rect x="5" y="36" width="10" height="10" rx="1" fill="#3a4a8a"/>
        <rect x="17" y="36" width="10" height="10" rx="1" fill="#3a4a8a"/>
        <rect x="3" y="44" width="12" height="4" rx="1" fill="#3a2010"/>
        <rect x="17" y="44" width="12" height="4" rx="1" fill="#3a2010"/>
      </motion.svg>

      {/* Speech bubble from Dr Mario */}
      <div style={{
        position: "absolute", bottom: 120, right: "12%", zIndex: 9,
        background: "white", borderRadius: 4, padding: "6px 10px",
        fontFamily: "monospace", fontSize: "0.55rem", color: "#1a1a1a",
        border: "1.5px solid rgba(0,0,0,0.15)", maxWidth: 140, lineHeight: 1.4,
        letterSpacing: "0.05em",
      }}>
        Keep blood sugar in the 40–60% range!
        <div style={{ position: "absolute", bottom: -7, left: "60%", width: 0, height: 0,
          borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
          borderTop: "8px solid white" }} />
      </div>
    </div>
  );
}

function ImpactMap() {
  const items = [
    { x: 120, y: 80,  label: "Diabetes Life Course\n(Brochure)", complexity: "Low", media: "Textual", color: "#8a9ab0" },
    { x: 280, y: 65,  label: "My Life\nDiabetes Care", complexity: "Low", media: "Visual", color: "#8a9ab0" },
    { x: 480, y: 55,  label: "Diabetes UK", complexity: "High", media: "Visual", color: "#6a8a9a" },
    { x: 650, y: 80,  label: "Diabetesopoly\nGame", complexity: "Low", media: "Tangible", color: "#8a9ab0" },
    { x: 150, y: 200, label: "Diabetes\nin Schools", complexity: "High", media: "Textual", color: "#6a8a9a" },
    { x: 350, y: 220, label: "Diabetes\nQualified", complexity: "High", media: "Textual", color: "#6a8a9a" },
    { x: 580, y: 200, label: "Blood Sugar\nBalance Game", complexity: "High", media: "Visual", color: "#6a8a9a" },
  ];

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", minWidth: 600, ...cs.box, borderRadius: 2, display: "block", padding: "0" }}>
        {/* Background */}
        <rect width="820" height="360" fill="#003049"/>
        {/* Grid lines */}
        {[120,240,360,480,600,720].map(x => (
          <line key={x} x1={x} y1="20" x2={x} y2="340" stroke="#fcf5e9" strokeOpacity="0.06" strokeWidth="1"/>
        ))}
        {[80,160,240,320].map(y => (
          <line key={y} x1="20" y1={y} x2="800" y2={y} stroke="#fcf5e9" strokeOpacity="0.06" strokeWidth="1"/>
        ))}
        {/* Axes */}
        <line x1="50" y1="30" x2="50" y2="330" stroke="#fcf5e9" strokeOpacity="0.3" strokeWidth="1"/>
        <line x1="50" y1="330" x2="800" y2="330" stroke="#fcf5e9" strokeOpacity="0.3" strokeWidth="1"/>
        {/* Axis labels */}
        <text x="30" y="80" fill="#fcf5e9" fillOpacity="0.4" fontSize="7" fontFamily="monospace" letterSpacing="1" transform="rotate(-90,30,180)" textAnchor="middle">COMPLEXITY →</text>
        <text x="420" y="350" fill="#fcf5e9" fillOpacity="0.4" fontSize="7" fontFamily="monospace" letterSpacing="1" textAnchor="middle">INTERACTIVITY →</text>
        {/* Quadrant labels */}
        <text x="200" y="50" fill="#fcf5e9" fillOpacity="0.18" fontSize="8" fontFamily="monospace" letterSpacing="2" textAnchor="middle">SIMPLE · PASSIVE</text>
        <text x="640" y="50" fill="#fcf5e9" fillOpacity="0.18" fontSize="8" fontFamily="monospace" letterSpacing="2" textAnchor="middle">COMPLEX · INTERACTIVE</text>
        {/* Existing items */}
        {items.map((item, i) => (
          <g key={i}>
            <circle cx={item.x + 50} cy={item.y + 60} r="5" fill={item.color} fillOpacity="0.7" stroke="#fcf5e9" strokeOpacity="0.2" strokeWidth="0.5"/>
            {item.label.split("\n").map((line, j) => (
              <text key={j} x={item.x + 50} y={item.y + 79 + j * 9} fill="#fcf5e9" fillOpacity="0.5" fontSize="6.5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">{line}</text>
            ))}
          </g>
        ))}
        {/* DiaCare — highlighted */}
        <circle cx="720" cy="200" r="16" fill="#2dd4bf" fillOpacity="0.2" stroke="#2dd4bf" strokeWidth="1.5"/>
        <circle cx="720" cy="200" r="8"  fill="#2dd4bf" fillOpacity="0.6"/>
        <text x="720" y="226" fill="#2dd4bf" fontSize="7.5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">DIACARE</text>
        <text x="720" y="236" fill="#2dd4bf" fillOpacity="0.6" fontSize="6" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">Game · Digital · High</text>
        {/* Title */}
        <text x="420" y="24" fill="#fcf5e9" fillOpacity="0.45" fontSize="8" fontFamily="monospace" letterSpacing="2" textAnchor="middle">IMPACT MAP — DIABETES EDUCATION LANDSCAPE</text>
      </svg>
    </div>
  );
}

function HLOCDiagram() {
  const quadrants = [
    { label: "INTERNAL HLOC", sub: "Belief that you control\nyour own health outcomes", x: 30, y: 30, accent: "#2dd4bf" },
    { label: "EXTERNAL HLOC", sub: "Belief that others\ncontrol your health", x: 400, y: 30, accent: "#8aacbf" },
    { label: "DOCTORS HLOC", sub: "Belief in physician\nrole for health", x: 30, y: 185, accent: "#8aacbf" },
    { label: "CHANCE HLOC", sub: "Belief health is\naffected by luck/fate", x: 400, y: 185, accent: "#6a8a9a" },
  ];

  return (
    <svg viewBox="0 0 740 330" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", ...cs.box, borderRadius: 2, display: "block" }}>
      <rect width="740" height="330" fill="#003049"/>
      {/* Cross lines */}
      <line x1="370" y1="20" x2="370" y2="310" stroke="#fcf5e9" strokeOpacity="0.15" strokeWidth="1"/>
      <line x1="20" y1="165" x2="720" y2="165" stroke="#fcf5e9" strokeOpacity="0.15" strokeWidth="1"/>
      {/* Centre label */}
      <circle cx="370" cy="165" r="18" fill="#003049" stroke="#fcf5e9" strokeOpacity="0.2" strokeWidth="1"/>
      <text x="370" y="161" fill="#fcf5e9" fillOpacity="0.5" fontSize="6" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">HLOC</text>
      <text x="370" y="172" fill="#fcf5e9" fillOpacity="0.5" fontSize="6" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">MODEL</text>
      {quadrants.map((q, i) => (
        <g key={i}>
          <rect x={q.x + 10} y={q.y + 10} width="320" height="130" rx="4" fill="#fcf5e9" fillOpacity="0.04" stroke={q.accent} strokeOpacity="0.3" strokeWidth="1"/>
          <rect x={q.x + 10} y={q.y + 10} width="8" height="130" rx="2" fill={q.accent} fillOpacity="0.5"/>
          <text x={q.x + 30} y={q.y + 38} fill="#fcf5e9" fontSize="9" fontFamily="monospace" letterSpacing="1.5" fontWeight="bold">{q.label}</text>
          {q.sub.split("\n").map((line, j) => (
            <text key={j} x={q.x + 30} y={q.y + 58 + j * 14} fill="#fcf5e9" fillOpacity="0.55" fontSize="8" fontFamily="monospace">{line}</text>
          ))}
          {i === 0 && (
            <text x={q.x + 30} y={q.y + 100} fill="#2dd4bf" fontSize="7.5" fontFamily="monospace" fillOpacity="0.8">
              ↑ Strongest predictor of
            </text>
          )}
          {i === 0 && (
            <text x={q.x + 30} y={q.y + 113} fill="#2dd4bf" fontSize="7.5" fontFamily="monospace" fillOpacity="0.8">
              self-care in T2D
            </text>
          )}
        </g>
      ))}
      <text x="370" y="322" fill="#fcf5e9" fillOpacity="0.25" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="1">HEALTH LOCUS OF CONTROL — Zeidi, Morshedi & Otaghvar 2020</text>
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase" style={cs.label}>
          <button onClick={() => navigate("/work")} className="hover:opacity-100 transition-opacity" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", ...cs.label }}>
            ← WORK
          </button>
          <span>/</span>
          <span>DICARE</span>
        </div>

        {/* Categories */}
        <div>
          <span className="inline-block font-mono text-xs tracking-widest uppercase border px-3 py-1" style={{ ...cs.label, borderColor: "rgba(0,48,73,0.2)" }}>
            01 · LEARNING DESIGNER · HEALTH EDUCATION · GAME DESIGN
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: 0.95, color: "#003049" }}
        >
          DIACARE
        </h1>

        {/* Hero */}
        <GameHero />
      </header>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

        {/* Left sidebar */}
        <motion.aside
          className="lg:col-span-3 flex flex-col gap-8 font-mono text-xs tracking-wider"
          initial="hidden" animate="visible" variants={fadeUp}
        >
          {[
            { label: "ROLE", value: "Learning Designer\nGame Designer\nResearcher" },
            { label: "CONTEXT", value: "Master of Design,\nInnovation & Technology\nRMIT University" },
            { label: "YEAR", value: "Semester 1, 2024" },
            { label: "SUPERVISORS", value: "Michelle Woulahan\nLawrence Harvey" },
            { label: "KEYWORDS", value: "Health Literacy\nHealth Locus of Control\nType 2 Diabetes\nGame Design\nChildren's Education" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="mb-2" style={cs.label}>{label}</p>
              {value.split("\n").map((v, i) => (
                <p key={i} style={{ color: "#003049" }}>{v}</p>
              ))}
            </div>
          ))}

          {/* Links */}
          <div>
            <p className="mb-2" style={cs.label}>LINKS</p>
            <a
              href="https://vimeo.com/955784249"
              target="_blank" rel="noopener noreferrer"
              className="block underline underline-offset-4 mb-1 hover:opacity-70 transition-opacity"
              style={{ color: "#003049", fontSize: "0.7rem" }}
            >
              ↗ Gameplay Video
            </a>
            <a
              href="https://github.com/ashikacode/DiaCare-Mario-"
              target="_blank" rel="noopener noreferrer"
              className="block underline underline-offset-4 hover:opacity-70 transition-opacity"
              style={{ color: "#003049", fontSize: "0.7rem" }}
            >
              ↗ GitHub Repository
            </a>
          </div>
        </motion.aside>

        {/* Main content */}
        <div className="lg:col-span-9 flex flex-col gap-16">

          {/* Abstract */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={cs.label}>OVERVIEW</p>
            <p className="font-mono text-base leading-relaxed" style={{ color: "#003049" }}>
              As Type 2 diabetes rises among children, traditional textual resources fail to engage young learners — leading to poor self-care and low health literacy. DiaCare transforms diabetes education by embedding it into a modified Super Mario Brothers game, where players must help Mario manage his blood sugar and insulin levels through food choices and physical activity.
            </p>
          </motion.section>

          {/* Stats */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={1}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={cs.label}>THE SCALE OF THE PROBLEM</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { stat: "537M", sub: "adults living with\ndiabetes globally (2021)" },
                { stat: "643M", sub: "projected by 2030 —\n1 in 9 adults" },
                { stat: "312/day", sub: "new registrations in\nAustralia alone" },
              ].map(({ stat, sub }) => (
                <div key={stat} className="p-6 font-mono" style={cs.box}>
                  <p className="text-3xl font-bold mb-2" style={{ color: "#2dd4bf" }}>{stat}</p>
                  {sub.split("\n").map((s, i) => (
                    <p key={i} className="text-xs leading-relaxed" style={{ color: "#fcf5e9", opacity: 0.7 }}>{s}</p>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-4 p-5 font-mono border-l-2" style={{ borderColor: "#2dd4bf", background: "rgba(0,48,73,0.06)" }}>
              <p className="text-xs leading-relaxed italic" style={{ color: "#003049" }}>
                "There is a significant lack of literature and resources tailored to those diagnosed under the age of 30. Educational programs designed for older adults may not meet the specific needs of younger individuals."
              </p>
            </div>
          </motion.section>

          {/* HLOC */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={2}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={cs.label}>RESEARCH FRAMEWORK</p>
            <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: "#003049", opacity: 0.75 }}>
              Two psychological frameworks shaped the design: <strong>Health Locus of Control (HLOC)</strong> — predicting self-management behaviours — and <strong>Health Literacy</strong>, which determines a person's ability to find, understand, and act on health information. Research shows internal HLOC has the greatest influence on self-care in T2D patients.
            </p>
            <HLOCDiagram />
          </motion.section>

          {/* Design approach */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={3}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={cs.label}>DESIGN APPROACH — FLOW THEORY</p>
            <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: "#003049", opacity: 0.75 }}>
              Based on Malone (1980) and Csikszentmihalyi's Flow Theory, three core strategies guided how educational content was woven into the game without breaking immersion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  code: "CE",
                  title: "Challenge Enhancement",
                  body: "Progressively increase difficulty across levels — from blood sugar management to pre-diabetic and diabetic scenarios — embedding more complex concepts as players advance.",
                },
                {
                  code: "FE",
                  title: "Feedback Enhancement",
                  body: "Immediate visual feedback through colour-changing health bars, pop-up messages, and performance indicators when blood sugar moves outside the 40–60% ideal range.",
                },
                {
                  code: "SE",
                  title: "Structure Enhancement",
                  body: "Educational features integrated seamlessly into gameplay — not bolted on as rewards, but as the core mechanic — so learning and play are indistinguishable.",
                },
              ].map(({ code, title, body }) => (
                <div key={code} className="p-6 font-mono" style={cs.box}>
                  <p className="text-2xl font-bold mb-1" style={{ color: "#2dd4bf" }}>{code}</p>
                  <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#fcf5e9" }}>{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#fcf5e9", opacity: 0.7 }}>{body}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Impact Map */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={4}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={cs.label}>IMPACT MAP</p>
            <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: "#003049", opacity: 0.75 }}>
              This map positions DiaCare within the landscape of existing diabetes education tools — charting where it sits in terms of complexity and interactivity, and identifying the gap it fills.
            </p>
            <ImpactMap />
          </motion.section>

          {/* Game mechanics */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={5}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={cs.label}>THE GAME — HOW IT WORKS</p>
            <p className="font-mono text-sm leading-relaxed mb-8" style={{ color: "#003049", opacity: 0.75 }}>
              Mario discovers his future self is at risk from diabetes due to unhealthy habits. Players must navigate him through three progressively challenging levels, making food and activity choices that directly affect his blood sugar and insulin readings displayed at the top of the screen.
            </p>

            {/* Food items grid */}
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ ...cs.label, opacity: 0.4 }}>COLLECTIBLE ITEMS</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label: "Apple / Broccoli", type: "HEALTHY CARB", effect: "Gradual blood sugar rise", color: "#2a6a2a", accent: "#5ab05a" },
                { label: "Insulin Boost", type: "POWER-UP", effect: "Lowers blood sugar · Mario grows larger", color: "#1a3a6a", accent: "#4a7ab0" },
                { label: "Exercise Boost", type: "POWER-UP", effect: "Stimulates insulin production", color: "#1a4a4a", accent: "#2dd4bf" },
                { label: "Burger / Coke", type: "UNHEALTHY CARB", effect: "Rapid blood sugar spike", color: "#6a1a1a", accent: "#cc4444" },
              ].map(({ label, type, effect, color, accent }) => (
                <div key={label} className="p-4 font-mono" style={{ backgroundColor: color, color: "#fcf5e9", borderRadius: 2, border: `1px solid ${accent}33` }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: accent }}>{type}</p>
                  <p className="text-sm font-bold mb-2">{label}</p>
                  <p className="text-xs leading-relaxed" style={{ opacity: 0.7 }}>{effect}</p>
                </div>
              ))}
            </div>

            {/* Levels */}
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ ...cs.label, opacity: 0.4 }}>THREE LEVELS</p>
            <div className="flex flex-col gap-2">
              {[
                { num: "01", title: "Blood Sugar Management", desc: "Establish baseline — maintain blood sugar in the 40–60% range by choosing foods wisely and keeping Mario active." },
                { num: "02", title: "Pre-Diabetic", desc: "Increased complexity — tighter tolerances, more decision points, introduction of insulin boost mechanics." },
                { num: "03", title: "Diabetic", desc: "Full management scenario — every action has measurable consequences, mirroring real-life diabetes self-care." },
              ].map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4 p-5 font-mono" style={{ ...cs.box, borderBottom: "1px solid rgba(252,245,233,0.08)" }}>
                  <span className="text-2xl font-bold shrink-0" style={{ color: "#2dd4bf", opacity: 0.5 }}>{num}</span>
                  <div>
                    <p className="text-sm font-bold tracking-wide mb-1">{title}</p>
                    <p className="text-xs leading-relaxed" style={{ opacity: 0.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Vimeo embed */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={6}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={cs.label}>GAMEPLAY VIDEO</p>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", background: "#001929", borderRadius: 2 }}>
              <iframe
                src="https://player.vimeo.com/video/955784249?badge=0&autopause=0&player_id=0&app_id=58479"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                title="DiaCare Gameplay"
              />
            </div>
          </motion.section>

          {/* Testing */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={7}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={cs.label}>TESTING</p>
            <p className="font-mono text-sm leading-relaxed mb-8" style={{ color: "#003049", opacity: 0.75 }}>
              The game was tested with children aged 10 and 13 in an early user evaluation session to measure educational engagement and comprehension.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { phase: "INITIAL REACTION", finding: "Children were curious about the game's characters and visual design — the pixel aesthetic and health bars immediately prompted questions.", icon: "👀" },
                { phase: "UNDERSTANDING GAME LOGIC", finding: "Some challenges initially understanding the mechanics — once they grasped the blood sugar objective, engagement increased significantly.", icon: "🧠" },
                { phase: "EDUCATIONAL IMPACT", finding: "The experience sparked genuine interest in blood sugar and insulin as concepts — children began asking questions that went beyond the game.", icon: "💡" },
                { phase: "TAKEAWAY", finding: "Learning and fun were not at odds — the game structure supported curiosity-driven exploration of health concepts without feeling like a lesson.", icon: "🎮" },
              ].map(({ phase, finding, icon }) => (
                <div key={phase} className="p-6 font-mono" style={{ ...cs.box, borderLeft: "2px solid rgba(45,212,191,0.4)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{icon}</span>
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#2dd4bf" }}>{phase}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ opacity: 0.7 }}>{finding}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Future work */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={8}>
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
                <div key={i} className="flex gap-4 p-4 font-mono text-xs leading-relaxed" style={{ background: "rgba(0,48,73,0.06)", borderLeft: "2px solid rgba(0,48,73,0.15)" }}>
                  <span style={{ color: "#003049", opacity: 0.3, minWidth: 20 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: "#003049", opacity: 0.75 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Closing quote */}
          <motion.div
            className="py-10 font-mono text-center border-t border-b"
            style={{ borderColor: "rgba(0,48,73,0.12)" }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={9}
          >
            <p className="text-sm italic leading-relaxed max-w-2xl mx-auto" style={{ color: "#003049", opacity: 0.6 }}>
              "Games should not be treated simply as educational sugar coating, making the hard work of learning easier to swallow."
            </p>
            <p className="text-xs mt-3 tracking-widest uppercase" style={{ color: "#003049", opacity: 0.3 }}>
              — Rieber et al., 1998
            </p>
          </motion.div>

        </div>
      </div>
    </>
  );
}
