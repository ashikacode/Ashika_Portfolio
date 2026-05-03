import { motion } from "framer-motion";

/* ─── single plant silhouette ─── */
interface PlantProps { x: number; y: number; h: number; delay: number }

function Plant({ x, y, h, delay }: PlantProps) {
  const tip = y - h;
  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${y}px` }}
      animate={{ rotate: [-1.8, 1.8, -1.8] }}
      transition={{ duration: 3.2 + delay * 0.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {/* stem */}
      <line x1={x} y1={y} x2={x} y2={tip + 6} stroke="#4a8a5a" strokeWidth={1.4} strokeLinecap="round" />
      {/* left leaf */}
      <path
        d={`M${x},${tip + h * 0.45} C${x - 10},${tip + h * 0.28} ${x - 16},${tip + h * 0.12} ${x - 14},${tip}`}
        stroke="#5aaa6a" strokeWidth={1.1} fill="none" strokeLinecap="round"
      />
      {/* right leaf */}
      <path
        d={`M${x},${tip + h * 0.55} C${x + 9},${tip + h * 0.38} ${x + 14},${tip + h * 0.22} ${x + 12},${tip + h * 0.08}`}
        stroke="#5aaa6a" strokeWidth={1.1} fill="none" strokeLinecap="round"
      />
      {/* fascine dot at base */}
      <ellipse cx={x} cy={y} rx={5} ry={3.5} fill="#9a5828" />
    </motion.g>
  );
}

/* ─── animated water lines ─── */
interface WaveProps { y: number; x1: number; x2: number; delay: number; color: string }
function WaveLine({ y, x1, x2, delay, color }: WaveProps) {
  return (
    <motion.path
      d={`M${x1},${y} Q${(x1 + x2) / 2 - 20},${y - 4} ${(x1 + x2) / 2},${y} Q${(x1 + x2) / 2 + 20},${y + 4} ${x2},${y}`}
      stroke={color} strokeWidth={1} fill="none" strokeLinecap="round"
      animate={{ opacity: [0.15, 0.45, 0.15], y: [0, -2, 0] } as never}
      transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

const PLANTS = [
  { x: 490, h: 52, delay: 0    },
  { x: 514, h: 44, delay: 0.5  },
  { x: 537, h: 56, delay: 1.1  },
  { x: 560, h: 46, delay: 0.3  },
  { x: 582, h: 52, delay: 0.8  },
  { x: 604, h: 58, delay: 0.1  },
  { x: 626, h: 48, delay: 0.6  },
  { x: 648, h: 54, delay: 1.3  },
  { x: 670, h: 44, delay: 0.4  },
  { x: 692, h: 50, delay: 0.9  },
  { x: 712, h: 42, delay: 0.2  },
  { x: 731, h: 46, delay: 0.7  },
  { x: 748, h: 38, delay: 1.0  },
  { x: 764, h: 34, delay: 0.5  },
  { x: 778, h: 28, delay: 0.3  },
];

/* y-coordinate where plants sit (waterline) */
const WATERLINE = 230;

export function RiverRenewCard() {
  return (
    <div className="w-full h-full" style={{ background: "#0f080a" }}>
      <svg
        viewBox="0 0 860 380"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-label="RiverRenew Mataniko — before and after riverbank restoration"
      >
        <defs>
          {/* left-side clip */}
          <clipPath id="clip-left">
            <rect x="0" y="0" width="430" height="380" />
          </clipPath>
          {/* right-side clip */}
          <clipPath id="clip-right">
            <rect x="430" y="0" width="430" height="380" />
          </clipPath>
          {/* subtle vignette */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="#0f080a" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* ══════════════════════════════
            BEFORE — left half
        ══════════════════════════════ */}
        <g clipPath="url(#clip-left)">
          {/* sky tint */}
          <rect x="0" y="0" width="430" height="380" fill="#1c0e0a" />

          {/* top ground layer — warm sienna */}
          <path
            d="M-10,110 Q70,92 150,108 Q240,126 320,106 Q380,92 440,108 L440,380 L-10,380 Z"
            fill="#7a4422"
          />
          {/* mid ground — deep brown */}
          <path
            d="M-10,165 Q80,148 170,163 Q270,178 350,162 Q395,152 440,164 L440,380 L-10,380 Z"
            fill="#542e14"
          />
          {/* eroded bank face */}
          <path
            d="M-10,218 Q70,204 150,217 Q240,231 330,215 Q385,204 440,218 L440,380 L-10,380 Z"
            fill="#3a1e0c"
          />
          {/* deep base */}
          <rect x="-10" y="275" width="450" height="110" fill="#250e06" />

          {/* erosion cracks / detail lines */}
          <path d="M80,172 Q95,185 88,210" stroke="#7a4422" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M200,168 Q212,180 206,198" stroke="#7a4422" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M310,165 Q320,175 316,192" stroke="#7a4422" strokeWidth="1.5" fill="none" opacity="0.4" />

          {/* dead root stumps */}
          <rect x="72"  y="122" width="18" height="14" rx="2" fill="#4a2a10" />
          <rect x="104" y="119" width="24" height="17" rx="2" fill="#4a2a10" />
          <rect x="218" y="120" width="16" height="13" rx="2" fill="#4a2a10" />
          <rect x="246" y="117" width="22" height="16" rx="2" fill="#4a2a10" />

          {/* label */}
          <text x="22" y="252" fontFamily="monospace" fontSize="8" letterSpacing="2.5" fill="#c4a080" opacity="0.65">
            DEGRADED BANK
          </text>
        </g>

        {/* ══════════════════════════════
            AFTER — right half
        ══════════════════════════════ */}
        <g clipPath="url(#clip-right)">
          {/* sky tint */}
          <rect x="430" y="0" width="430" height="380" fill="#0e1a14" />

          {/* stable ground — dark forest */}
          <path
            d="M420,110 Q500,92 580,108 Q660,126 740,106 Q800,92 870,108 L870,380 L420,380 Z"
            fill="#1a3a26"
          />
          {/* mid earth */}
          <path
            d="M420,165 Q500,148 580,163 Q660,178 740,162 Q800,152 870,165 L870,380 L420,380 Z"
            fill="#122e1e"
          />
          {/* bank face (restored, compact) */}
          <path
            d="M420,218 Q500,204 580,217 Q660,231 740,215 Q800,204 870,218 L870,380 L420,380 Z"
            fill="#0c2418"
          />
          {/* water */}
          <path
            d="M420,255 Q500,242 580,254 Q660,267 740,252 Q800,241 870,254 L870,380 L420,380 Z"
            fill="#0a1e2e"
          />

          {/* water ripple lines */}
          {[
            { y: 272, x1: 440, x2: 560, delay: 0   },
            { y: 282, x1: 510, x2: 640, delay: 1   },
            { y: 292, x1: 460, x2: 590, delay: 0.5 },
            { y: 302, x1: 540, x2: 660, delay: 1.5 },
            { y: 314, x1: 480, x2: 620, delay: 0.8 },
          ].map((w, i) => (
            <WaveLine key={i} y={w.y} x1={w.x1} x2={w.x2} delay={w.delay} color="#1a4a6a" />
          ))}

          {/* rock line at waterline */}
          {[
            { cx: 498, rx: 18, ry: 9  },
            { cx: 528, rx: 22, ry: 11 },
            { cx: 560, rx: 17, ry: 9  },
            { cx: 591, rx: 24, ry: 12 },
            { cx: 625, rx: 20, ry: 10 },
            { cx: 656, rx: 25, ry: 12 },
            { cx: 690, rx: 19, ry: 10 },
            { cx: 720, rx: 22, ry: 11 },
            { cx: 750, rx: 17, ry: 9  },
            { cx: 775, rx: 20, ry: 10 },
          ].map((r, i) => (
            <ellipse key={i} cx={r.cx} cy={WATERLINE + 15} rx={r.rx} ry={r.ry} fill="#3a2a4a" />
          ))}

          {/* plants */}
          {PLANTS.map((p, i) => (
            <Plant key={i} x={p.x} y={WATERLINE} h={p.h} delay={p.delay} />
          ))}

          {/* annotation lines */}
          <line x1="540" y1="192" x2="553" y2="218" stroke="#5ecfbf" strokeWidth="0.7" opacity="0.4" />
          <text x="526" y="188" fontFamily="monospace" fontSize="7" letterSpacing="1" fill="#5ecfbf" opacity="0.55">fascines</text>

          <line x1="640" y1="258" x2="650" y2="248" stroke="#8ab8c8" strokeWidth="0.7" opacity="0.4" />
          <text x="614" y="274" fontFamily="monospace" fontSize="7" letterSpacing="1" fill="#8ab8c8" opacity="0.5">rock bags</text>

          {/* label */}
          <text x="446" y="252" fontFamily="monospace" fontSize="8" letterSpacing="2.5" fill="#5ecfbf" opacity="0.65">
            RESTORED RIVERBANK
          </text>
        </g>

        {/* ══════════════════════════════
            DIVIDER
        ══════════════════════════════ */}
        <line x1="430" y1="50" x2="430" y2="380" stroke="#c4a080" strokeWidth="0.6" opacity="0.3" />

        {/* ══════════════════════════════
            UI CHROME
        ══════════════════════════════ */}

        {/* tag pill — top right */}
        <rect x="530" y="18" width="308" height="26" rx="2" fill="none" stroke="#5ecfbf" strokeWidth="0.9" opacity="0.7" />
        <text x="545" y="35" fontFamily="monospace" fontSize="8.5" letterSpacing="1.8" fill="#5ecfbf" opacity="0.85">
          PARTICIPATORY DESIGN · CLIMATE · 2023
        </text>

        {/* BEFORE chip */}
        <rect x="20" y="318" width="88" height="28" rx="2" fill="none" stroke="#c4a080" strokeWidth="0.9" opacity="0.7" />
        <text x="33" y="336" fontFamily="monospace" fontSize="8.5" letterSpacing="2" fill="#c4a080" opacity="0.85">BEFORE</text>

        {/* arrow */}
        <text x="114" y="336" fontFamily="sans-serif" fontSize="13" fill="#c4a080" opacity="0.4">→</text>

        {/* AFTER chip */}
        <rect x="132" y="318" width="174" height="28" rx="2" fill="none" stroke="#5ecfbf" strokeWidth="1.2" />
        <text x="146" y="336" fontFamily="monospace" fontSize="8.5" letterSpacing="2" fill="#5ecfbf">AFTER RIVERRENEW</text>

        {/* vignette overlay */}
        <rect x="0" y="0" width="860" height="380" fill="url(#vignette)" />
      </svg>
    </div>
  );
}
