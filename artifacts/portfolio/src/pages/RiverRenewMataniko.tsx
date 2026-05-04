import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const cs = {
  label: { color: "#003049", opacity: 0.55 },
  box: { backgroundColor: "#003049", color: "#fcf5e9" },
};

function RiverIllustration() {
  return (
    <div
      className="w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden flex flex-col"
      style={{ backgroundColor: "#003049" }}
    >
      <svg
        viewBox="0 0 900 380"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Sky */}
        <rect width="900" height="380" fill="#003049" />

        {/* Subtle grid lines */}
        {[100, 200, 300, 400, 500, 600, 700, 800].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="380" stroke="#fcf5e9" strokeOpacity="0.04" strokeWidth="1" />
        ))}
        {[80, 160, 240, 320].map(y => (
          <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="#fcf5e9" strokeOpacity="0.04" strokeWidth="1" />
        ))}

        {/* Divider */}
        <line x1="450" y1="20" x2="450" y2="360" stroke="#fcf5e9" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="6 4" />

        {/* ── BEFORE (left) ── */}
        {/* Ground / eroded bank */}
        <path d="M0,200 Q80,185 160,200 Q240,215 330,195 Q390,185 450,200 L450,380 L0,380 Z" fill="#6b3a1f" />
        {/* Erosion cracks */}
        <path d="M60,220 Q80,240 90,230" stroke="#4a2610" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M150,210 Q170,235 185,220" stroke="#4a2610" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M280,205 Q300,228 315,212" stroke="#4a2610" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M370,198 Q390,220 405,205" stroke="#4a2610" strokeWidth="2" fill="none" opacity="0.6" />
        {/* Slumping soil chunks */}
        <ellipse cx="100" cy="215" rx="28" ry="12" fill="#5a2e14" opacity="0.7" />
        <ellipse cx="250" cy="208" rx="22" ry="9" fill="#5a2e14" opacity="0.7" />
        <ellipse cx="390" cy="202" rx="18" ry="8" fill="#5a2e14" opacity="0.7" />
        {/* Polluted river water */}
        <path d="M0,255 Q120,245 240,260 Q360,270 450,258 L450,310 Q360,315 240,308 Q120,300 0,310 Z" fill="#1a3a2a" opacity="0.85" />
        <path d="M0,268 Q90,260 200,272 Q330,282 450,270" stroke="#0d2e1d" strokeWidth="1.5" fill="none" opacity="0.5" />
        {/* Pollution ripples */}
        <ellipse cx="150" cy="278" rx="40" ry="6" fill="none" stroke="#2d6b3e" strokeWidth="1" opacity="0.4" />
        <ellipse cx="330" cy="285" rx="30" ry="5" fill="none" stroke="#2d6b3e" strokeWidth="1" opacity="0.3" />
        {/* "DEGRADED BANK" label */}
        <text x="225" y="180" textAnchor="middle" fill="#fcf5e9" fillOpacity="0.45" fontFamily="monospace" fontSize="9" letterSpacing="2">DEGRADED BANK</text>

        {/* ── AFTER (right) ── */}
        {/* Stabilized ground */}
        <path d="M450,200 Q510,192 570,196 Q650,200 730,193 Q800,188 900,195 L900,380 L450,380 Z" fill="#4a6741" />
        {/* Rip-rap toe rocks */}
        {[480, 510, 545, 580, 615, 650, 690, 730, 770, 810, 850].map((x, i) => (
          <ellipse key={x} cx={x} cy={248 + (i % 2) * 4} rx="14" ry="9" fill={i % 2 === 0 ? "#7a8c7f" : "#6b7d70"} opacity="0.9" />
        ))}
        {/* Filter pots */}
        {[500, 560, 625, 690, 755, 820, 875].map((x, i) => (
          <g key={x} transform={`translate(${x}, ${175 + (i % 2) * 8})`}>
            {/* Pot body */}
            <path d="M-8,0 L-10,28 Q0,34 10,28 L8,0 Z" fill="#c8a96a" opacity="0.9" />
            {/* Rim */}
            <ellipse cx="0" cy="0" rx="8" ry="3" fill="#d4b578" opacity="0.9" />
            {/* Layers */}
            <line x1="-9" y1="8" x2="9" y2="8" stroke="#8b6914" strokeWidth="1" opacity="0.5" />
            <line x1="-10" y1="16" x2="10" y2="16" stroke="#8b6914" strokeWidth="1" opacity="0.5" />
            {/* Stem going up */}
            <line x1="0" y1="-3" x2="0" y2={-22 - (i % 3) * 8} stroke="#2d5a27" strokeWidth="2" opacity="0.8" />
            {/* Leaves */}
            <path d={`M0,${-22 - (i % 3) * 8} Q-10,${-35 - (i % 3) * 8} -5,${-42 - (i % 3) * 8}`} stroke="#3d7a35" strokeWidth="2" fill="none" opacity="0.9" />
            <path d={`M0,${-22 - (i % 3) * 8} Q10,${-35 - (i % 3) * 8} 5,${-42 - (i % 3) * 8}`} stroke="#3d7a35" strokeWidth="2" fill="none" opacity="0.9" />
          </g>
        ))}
        {/* Vetiver grass tufts */}
        {[470, 540, 605, 670, 740, 800, 860].map((x, i) => (
          <g key={x}>
            <line x1={x} y1={200 + (i % 2) * 5} x2={x - 8} y2={165 + (i % 2) * 5} stroke="#5a9e50" strokeWidth="2.5" opacity="0.8" />
            <line x1={x} y1={200 + (i % 2) * 5} x2={x} y2={158 + (i % 2) * 5} stroke="#4d8f43" strokeWidth="2.5" opacity="0.8" />
            <line x1={x} y1={200 + (i % 2) * 5} x2={x + 8} y2={165 + (i % 2) * 5} stroke="#5a9e50" strokeWidth="2.5" opacity="0.8" />
            <line x1={x} y1={200 + (i % 2) * 5} x2={x - 5} y2={152 + (i % 2) * 5} stroke="#3d7a35" strokeWidth="1.5" opacity="0.7" />
            <line x1={x} y1={200 + (i % 2) * 5} x2={x + 5} y2={155 + (i % 2) * 5} stroke="#3d7a35" strokeWidth="1.5" opacity="0.7" />
          </g>
        ))}
        {/* Clean river water */}
        <path d="M450,255 Q570,244 690,252 Q800,258 900,250 L900,308 Q800,316 690,310 Q570,302 450,312 Z" fill="#1a5276" opacity="0.8" />
        <path d="M450,265 Q580,256 700,263 Q820,270 900,262" stroke="#2874a6" strokeWidth="1.5" fill="none" opacity="0.5" />
        {/* Clean water ripples */}
        <ellipse cx="600" cy="278" rx="45" ry="6" fill="none" stroke="#5dade2" strokeWidth="1" opacity="0.35" />
        <ellipse cx="780" cy="285" rx="35" ry="5" fill="none" stroke="#5dade2" strokeWidth="1" opacity="0.3" />
        {/* "RESTORED RIVERBANK" label */}
        <text x="675" y="180" textAnchor="middle" fill="#fcf5e9" fillOpacity="0.45" fontFamily="monospace" fontSize="9" letterSpacing="2">RESTORED RIVERBANK</text>

        {/* ── Labels row ── */}
        {/* Before box */}
        <rect x="60" y="320" width="120" height="28" rx="2" fill="none" stroke="#fcf5e9" strokeOpacity="0.35" strokeWidth="1" />
        <text x="120" y="338" textAnchor="middle" fill="#fcf5e9" fillOpacity="0.7" fontFamily="monospace" fontSize="10" letterSpacing="1.5">BEFORE</text>
        {/* Arrow */}
        <text x="220" y="338" textAnchor="middle" fill="#fcf5e9" fillOpacity="0.4" fontFamily="monospace" fontSize="12">→</text>
        {/* After box */}
        <rect x="255" y="320" width="180" height="28" rx="2" fill="#fcf5e9" fillOpacity="0.12" stroke="#fcf5e9" strokeOpacity="0.5" strokeWidth="1" />
        <text x="345" y="338" textAnchor="middle" fill="#fcf5e9" fillOpacity="0.9" fontFamily="monospace" fontSize="10" letterSpacing="1.5">AFTER RIVERRENEW</text>

        {/* ── Top tag ── */}
        <rect x="560" y="22" width="318" height="26" rx="2" fill="none" stroke="#fcf5e9" strokeOpacity="0.25" strokeWidth="1" />
        <text x="719" y="39" textAnchor="middle" fill="#fcf5e9" fillOpacity="0.55" fontFamily="monospace" fontSize="9.5" letterSpacing="1.5">PARTICIPATORY DESIGN  ·  CLIMATE  ·  2023</text>
      </svg>
    </div>
  );
}

export default function RiverRenewMataniko() {
  const [, navigate] = useLocation();
  return (
    <>
      <Helmet>
        <title>RiverRenew Mataniko | Ashika Ramesh</title>
        <meta name="description" content="A nature-based riverbank restoration system designed to stabilize riverbanks and purify water for Honiara's most vulnerable settlements." />
      </Helmet>

      <motion.article
        className="flex flex-col gap-24 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-xs font-mono tracking-widest mt-12">
          <button
            onClick={() => navigate("/work")}
            className="cursor-pointer bg-transparent border-none p-0 font-mono text-xs tracking-widest"
            style={{ color: "#003049", opacity: 0.7 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
          >
            ← WORK
          </button>
          <span style={{ color: "#003049", opacity: 0.3 }}>/</span>
          <span style={{ color: "#003049", opacity: 0.45 }}>RIVERRENEW MATANIKO</span>
        </nav>

        {/* ── Hero ── */}
        <header className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 items-start">
            <span
              className="text-xs font-mono tracking-widest px-3 py-1 rounded-sm border"
              style={{ color: "#003049", borderColor: "#003049", opacity: 0.65 }}
            >
              03 · SUSTAINABLE SYSTEMS · NATURE-BASED SOLUTIONS
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: "#003049" }}>
              RIVERRENEW MATANIKO
            </h1>
          </div>

          <RiverIllustration />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* ── Main Content ── */}
          <div className="lg:col-span-8 flex flex-col gap-20">

            {/* The Problem */}
            <section className="flex flex-col gap-6">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049" }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={cs.label}>
                  THE PROBLEM
                </h2>
              </div>
              <div className="flex flex-col gap-5 leading-relaxed text-lg" style={{ color: "#0a0a0a" }}>
                <p>
                  The Mataniko River Catchment in Honiara faces critical ecological and public health crises. Rapid urbanization and the expansion of informal settlements have led to the discharge of untreated sewage and industrial waste directly into the waterway. Consequently, the river shows dangerously high levels of E. coli and faecal coliforms, particularly in high-density downstream areas like Koa Hill and Lord Howe.
                </p>
                <p>
                  Additionally, climate-induced heavy rainfall and unstable soil structures cause significant riverbank erosion and slumping, which threatens the physical safety of riverside dwellings.
                </p>
              </div>
            </section>

            {/* The Objective */}
            <section className="flex flex-col gap-10">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049" }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={cs.label}>
                  THE OBJECTIVE
                </h2>
              </div>

              <p className="text-2xl font-bold leading-snug max-w-2xl" style={{ color: "#003049" }}>
                The primary goal is to restore the Mataniko riverbanks using innovative, low-cost, and nature-based solutions (NbS).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "STABILIZE SLOPES", body: "Implement structural support to combat soil erosion and bank collapse." },
                  { title: "IMPROVE WATER QUALITY", body: "Use natural filtration to remove sediments, chemical toxins, and pathogens from runoff." },
                  { title: "EMPOWER COMMUNITIES", body: "Foster long-term stewardship through a participatory design approach with local residents." },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col gap-3 pl-4" style={{ borderLeft: "2px solid #003049" }}>
                    <h4 className="font-bold tracking-widest text-xs" style={{ color: "#003049" }}>{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#0a0a0a", opacity: 0.7 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* The Solutions */}
            <section className="flex flex-col gap-10">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049" }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={cs.label}>
                  THE SOLUTIONS
                </h2>
              </div>

              <p className="text-lg leading-relaxed" style={{ color: "#0a0a0a" }}>
                The intervention utilizes a modular system of soft engineering that employs locally sourced, biodegradable materials.
              </p>

              {/* Prototype image — standalone */}
              <div className="flex justify-center py-6">
                <img
                  src="/riverrenew-prototype-nobg.png"
                  alt="Layered filter pot cross-section"
                  className="max-h-80 w-auto object-contain"
                />
              </div>

              {/* Solution cards */}
              <div className="flex flex-col gap-6">
                {[
                  {
                    title: "Layered Filter Pots",
                    body: "Woven coir baskets containing sandstone for debris, volcanic soil for microbial remediation, and charcoal for chemical adsorption.",
                  },
                  {
                    title: "Coir-Woven Rock Bags",
                    body: "Flexible gabion-style units filled with angular stones to reinforce the Rip-Rap Toe below the water line and dissipate wave energy.",
                  },
                  {
                    title: "Phytoremediation (Bio-Barriers)",
                    body: "Strategic planting of Vetiver Grass, which features a massive root system reaching depths of 5 meters to bind soil, and Dianella, a hardy shrub that traps surface sediment.",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-7 rounded-sm" style={cs.box}>
                    <h4 className="text-base font-bold mb-3 font-mono tracking-wide" style={{ color: "#fcf5e9" }}>
                      {item.title}
                    </h4>
                    <p className="leading-relaxed text-sm" style={{ color: "#fcf5e9", opacity: 0.78 }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-4 sticky top-32">
            <div className="p-8 rounded-sm flex flex-col gap-8 text-sm" style={cs.box}>
              <h3 className="font-bold tracking-widest uppercase pb-3" style={{ color: "#fcf5e9", opacity: 0.55, borderBottom: "1px solid rgba(252,245,233,0.2)" }}>
                PROJECT DETAILS
              </h3>
              <dl className="flex flex-col gap-6">
                {[
                  { label: "LOCATION", value: "Mataniko River Catchment, Honiara, Solomon Islands" },
                  { label: "FIELD", value: "Nature-based solutions · Bank Stabilization · Community-Led · Climate Adaptation" },
                  { label: "YEAR", value: "2023" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-2">
                    <dt className="font-mono text-xs" style={{ color: "#fcf5e9", opacity: 0.5 }}>{item.label}</dt>
                    <dd className="leading-snug" style={{ color: "#fcf5e9" }}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

        </div>
      </motion.article>
    </>
  );
}
