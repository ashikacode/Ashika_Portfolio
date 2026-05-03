import { motion } from "framer-motion";

interface PlantProps {
  x: number;
  delay?: number;
  height?: number;
}

function Plant({ x, delay = 0, height = 48 }: PlantProps) {
  const base = 234;
  const tip = base - height;
  return (
    <motion.g
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 2.8 + delay * 0.4, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ transformOrigin: `${x}px ${base}px` }}
    >
      <rect x={x - 7} y={226} width={14} height={18} rx={4} fill="#b06830" />
      <line x1={x - 7} y1={233} x2={x + 7} y2={233} stroke="#7a4018" strokeWidth={0.8} />
      <line x1={x} y1={226} x2={x} y2={tip + 8} stroke="#3a6a3a" strokeWidth={2} strokeLinecap="round" />
      <path d={`M${x},${tip + 22} Q${x - 13},${tip + 8} ${x - 15},${tip}`} stroke="#4a8a4a" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <path d={`M${x},${tip + 28} Q${x + 11},${tip + 13} ${x + 13},${tip + 4}`} stroke="#4a8a4a" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <path d={`M${x},${tip + 18} Q${x - 7},${tip + 4} ${x - 8},${tip - 2}`} stroke="#5a9a4a" strokeWidth={1.2} fill="none" strokeLinecap="round" />
    </motion.g>
  );
}

const PLANTS = [
  { x: 437, delay: 0,   height: 52 },
  { x: 462, delay: 0.4, height: 44 },
  { x: 489, delay: 0.8, height: 56 },
  { x: 517, delay: 0.2, height: 48 },
  { x: 545, delay: 0.6, height: 50 },
  { x: 573, delay: 1.0, height: 54 },
  { x: 600, delay: 0.3, height: 46 },
  { x: 627, delay: 0.7, height: 52 },
  { x: 653, delay: 0.1, height: 48 },
  { x: 677, delay: 0.5, height: 44 },
  { x: 700, delay: 0.9, height: 50 },
  { x: 722, delay: 0.2, height: 40 },
  { x: 742, delay: 0.6, height: 44 },
  { x: 760, delay: 0.4, height: 36 },
  { x: 776, delay: 0.8, height: 30 },
];

const ROCKS = [
  { cx: 448, cy: 253, rx: 15, ry: 10 },
  { cx: 478, cy: 258, rx: 19, ry: 12 },
  { cx: 511, cy: 254, rx: 16, ry: 10 },
  { cx: 542, cy: 259, rx: 21, ry: 13 },
  { cx: 575, cy: 254, rx: 17, ry: 11 },
  { cx: 607, cy: 260, rx: 23, ry: 13 },
  { cx: 641, cy: 255, rx: 18, ry: 11 },
  { cx: 672, cy: 259, rx: 20, ry: 12 },
  { cx: 703, cy: 254, rx: 16, ry: 10 },
  { cx: 729, cy: 257, rx: 18, ry: 11 },
  { cx: 754, cy: 254, rx: 14, ry: 9  },
  { cx: 774, cy: 257, rx: 12, ry: 8  },
];

export function RiverRenewCard() {
  return (
    <div className="w-full h-full overflow-hidden" style={{ background: "#1a0c0e" }}>
      <svg
        viewBox="0 0 800 360"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-label="RiverRenew Mataniko — before and after riverbank restoration"
      >
        {/* ── BEFORE (left) ── */}
        <path d="M0,85 Q60,70 130,84 Q210,100 290,83 Q350,70 400,85 L400,360 L0,360 Z" fill="#6b3820" />
        <path d="M0,138 Q80,122 165,136 Q250,150 330,136 Q365,128 400,138 L400,360 L0,360 Z" fill="#4a2415" />
        <path d="M0,210 Q80,194 165,208 Q250,222 330,208 Q365,200 400,210 L400,360 L0,360 Z" fill="#2c100a" />

        {/* degraded stumps */}
        <rect x={68}  y={127} width={22} height={18} rx={2} fill="#5a3018" opacity={0.65} />
        <rect x={103} y={124} width={28} height={21} rx={2} fill="#5a3018" opacity={0.55} />
        <rect x={208} y={126} width={20} height={17} rx={2} fill="#5a3018" opacity={0.50} />
        <rect x={236} y={123} width={26} height={20} rx={2} fill="#5a3018" opacity={0.45} />

        <text x={20} y={240} fontFamily="monospace" fontSize={8.5} letterSpacing={2} fill="#c4a080" opacity={0.75}>
          DEGRADED BANK
        </text>

        {/* ── AFTER (right) ── */}
        <path d="M400,85 Q460,70 540,84 Q620,100 700,83 Q750,70 800,85 L800,360 L400,360 Z" fill="#1a3a28" />
        <path d="M400,138 Q480,122 565,136 Q650,150 730,136 Q765,128 800,138 L800,360 L400,360 Z" fill="#142e22" />
        <path d="M400,210 Q480,194 565,208 Q650,222 730,208 Q765,200 800,210 L800,360 L400,360 Z" fill="#0c1e2e" />

        {/* animated water ripples */}
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M${420 + i * 60},${240 + i * 10} Q${460 + i * 60},${236 + i * 10} ${500 + i * 60},${240 + i * 10}`}
            stroke="#1e4a6a"
            strokeWidth={1}
            fill="none"
            opacity={0.45}
            animate={{ pathLength: [0.4, 1, 0.4], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}

        <text x={416} y={240} fontFamily="monospace" fontSize={8.5} letterSpacing={2} fill="#5ecfbf" opacity={0.75}>
          RESTORED RIVERBANK
        </text>

        {/* annotation: fascines */}
        <text x={490} y={188} fontFamily="monospace" fontSize={7} fill="#5ecfbf" opacity={0.55} letterSpacing={1}>
          fascines
        </text>
        <line x1={506} y1={191} x2={516} y2={210} stroke="#5ecfbf" strokeWidth={0.7} opacity={0.45} />

        {/* annotation: rock bags */}
        <text x={575} y={285} fontFamily="monospace" fontSize={7} fill="#8ab0c0" opacity={0.55} letterSpacing={1}>
          rock bags
        </text>
        <line x1={601} y1={282} x2={610} y2={267} stroke="#8ab0c0" strokeWidth={0.7} opacity={0.45} />

        {/* rocks */}
        {ROCKS.map((r, i) => (
          <ellipse key={i} cx={r.cx} cy={r.cy} rx={r.rx} ry={r.ry} fill="#4a3a5a" />
        ))}

        {/* plants */}
        {PLANTS.map((p, i) => (
          <Plant key={i} x={p.x} delay={p.delay} height={p.height} />
        ))}

        {/* ── divider ── */}
        <line x1={400} y1={55} x2={400} y2={360} stroke="#c4a080" strokeWidth={0.5} opacity={0.35} />

        {/* ── UI chrome ── */}

        {/* tag pill top-right */}
        <rect x={500} y={16} width={282} height={26} rx={2} fill="none" stroke="#5ecfbf" strokeWidth={1} opacity={0.8} />
        <text x={514} y={33} fontFamily="monospace" fontSize={8.5} letterSpacing={1.5} fill="#5ecfbf" opacity={0.9}>
          PARTICIPATORY DESIGN · CLIMATE · 2023
        </text>

        {/* BEFORE button */}
        <rect x={18} y={300} width={88} height={28} rx={2} fill="none" stroke="#c4a080" strokeWidth={1} opacity={0.75} />
        <text x={29} y={318} fontFamily="monospace" fontSize={8.5} letterSpacing={2} fill="#c4a080">BEFORE</text>

        {/* arrow */}
        <text x={112} y={318} fontFamily="monospace" fontSize={11} fill="#c4a080" opacity={0.55}>→</text>

        {/* AFTER RIVERRENEW button */}
        <rect x={128} y={300} width={166} height={28} rx={2} fill="none" stroke="#5ecfbf" strokeWidth={1.5} />
        <text x={140} y={318} fontFamily="monospace" fontSize={8.5} letterSpacing={2} fill="#5ecfbf">AFTER RIVERRENEW</text>
      </svg>
    </div>
  );
}
