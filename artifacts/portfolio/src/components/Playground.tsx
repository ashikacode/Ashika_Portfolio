import { useRef, useState } from "react";
import { motion } from "framer-motion";

const notes = [
  { id: 1, text: "Empathy before solutions", color: "cream" },
  { id: 2, text: "Research reveals what assumptions hide", color: "teal" },
  { id: 3, text: "Systems over symptoms", color: "cream" },
  { id: 4, text: "The user is not like me", color: "muted" },
  { id: 5, text: "Co-design > design for", color: "teal" },
  { id: 6, text: "Complexity wants to be legible", color: "cream" },
  { id: 7, text: "Evidence-informed intuition", color: "muted" },
  { id: 8, text: "Good design is invisible", color: "cream" },
  { id: 9, text: "The map is not the territory", color: "teal" },
  { id: 10, text: "Design for the edge case", color: "muted" },
];

// Stable initial layout — two rows of 5
const initialPositions = [
  { x: "3%",  y: "8%",  rotate: -3 },
  { x: "22%", y: "4%",  rotate:  2 },
  { x: "41%", y: "7%",  rotate: -1 },
  { x: "60%", y: "3%",  rotate:  3 },
  { x: "78%", y: "6%",  rotate: -2 },
  { x: "6%",  y: "52%", rotate:  2 },
  { x: "25%", y: "48%", rotate: -4 },
  { x: "44%", y: "51%", rotate:  1 },
  { x: "63%", y: "47%", rotate: -2 },
  { x: "80%", y: "50%", rotate:  3 },
];

const colorMap = {
  cream: {
    bg: "hsl(40 33% 90%)",
    text: "hsl(350 60% 15%)",
    border: "hsl(40 33% 80%)",
  },
  teal: {
    bg: "hsl(178 60% 44%)",
    text: "hsl(350 60% 12%)",
    border: "hsl(178 60% 36%)",
  },
  muted: {
    bg: "hsl(350 40% 28%)",
    text: "hsl(40 33% 88%)",
    border: "hsl(350 40% 36%)",
  },
};

export default function Playground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragged, setDragged] = useState(false);
  const [zOrders, setZOrders] = useState<Record<number, number>>(
    Object.fromEntries(notes.map((n, i) => [n.id, i + 1]))
  );
  const zCounter = useRef(notes.length + 1);

  const bringToFront = (id: number) => {
    zCounter.current += 1;
    setZOrders((prev) => ({ ...prev, [id]: zCounter.current }));
  };

  return (
    <section className="py-32">
      {/* Label */}
      <div className="border-b border-border/30 pb-4 mb-0 flex items-center justify-between">
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
          PLAYGROUND
        </p>
        <motion.p
          className="text-xs font-mono tracking-[0.2em] text-muted-foreground/40 uppercase"
          animate={{ opacity: dragged ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          drag me →
        </motion.p>
      </div>

      {/* Board */}
      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden"
        style={{
          height: "340px",
          backgroundImage: `radial-gradient(hsl(40 33% 93% / 0.06) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      >
        {notes.map((note, i) => {
          const pos = initialPositions[i];
          const colors = colorMap[note.color as keyof typeof colorMap];

          return (
            <motion.div
              key={note.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.12}
              dragTransition={{ bounceStiffness: 260, bounceDamping: 20 }}
              onDragStart={() => {
                setDragged(true);
                bringToFront(note.id);
              }}
              onTapStart={() => bringToFront(note.id)}
              whileDrag={{ scale: 1.06, rotate: 0 }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="absolute cursor-grab active:cursor-grabbing"
              style={{
                left: pos.x,
                top: pos.y,
                zIndex: zOrders[note.id],
                rotate: pos.rotate,
                width: "clamp(130px, 17%, 175px)",
              }}
              initial={{ opacity: 0, scale: 0.85, rotate: pos.rotate }}
              animate={{ opacity: 1, scale: 1, rotate: pos.rotate }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Pin dot */}
              <div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2"
                style={{
                  backgroundColor: colors.border,
                  borderColor: colors.text + "33",
                  zIndex: 1,
                }}
              />

              {/* Card */}
              <div
                className="px-4 pt-6 pb-5 text-xs font-mono leading-relaxed tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
                style={{
                  backgroundColor: colors.bg,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {note.text}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
