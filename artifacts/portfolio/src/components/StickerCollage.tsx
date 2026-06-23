import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img2182 from "@assets/IMG_2182_1782223190799.PNG";
import img2183 from "@assets/IMG_2183_1782223190799.PNG";
import img2184 from "@assets/IMG_2184_1782223190799.PNG";
import img2185 from "@assets/IMG_2185_1782223190799.PNG";
import img2186 from "@assets/IMG_2186_1782223190799.PNG";
import img2187 from "@assets/IMG_2187_1782223190799.PNG";
import img2188 from "@assets/IMG_2188_1782223190799.PNG";

interface Sticker {
  id: string;
  src: string;
  label: string;
  description: string;
  left: string;
  top: number;
  rotate: number;
  size: number;
  delay: number;
}

const STICKERS: Sticker[] = [
  {
    id: "kolam",
    src: img2182,
    label: "Kolam",
    description:
      "This is called Kolam, something my mom used to draw every day and something I used to be in awe of — maybe the first experience of art for me.",
    left: "3%",
    top: 24,
    rotate: -8,
    size: 128,
    delay: 0.05,
  },
  {
    id: "mudra",
    src: img2183,
    label: "Bharatanatyam Mudra",
    description:
      "A hand sign in the dance form I do to this day, called Bharatanatyam.",
    left: "30%",
    top: 38,
    rotate: 7,
    size: 112,
    delay: 0.1,
  },
  {
    id: "neembu",
    src: img2184,
    label: "Neembu Mirchi",
    description:
      "An Indian charm made by stringing one lemon and seven green chilies together to ward off the evil eye and bring good fortune.",
    left: "62%",
    top: 14,
    rotate: -13,
    size: 100,
    delay: 0.15,
  },
  {
    id: "sewing",
    src: img2185,
    label: "Sewing Machine",
    description:
      "Something close to me since childhood. I watched my grandma stitch and knit for me, and that love carried me all the way into fashion design.",
    left: "7%",
    top: 238,
    rotate: 11,
    size: 142,
    delay: 0.2,
  },
  {
    id: "auto",
    src: img2186,
    label: "Auto Rickshaw",
    description:
      "The Auto Rickshaw (Tuk tuk) — local transport I used every day to travel around Chennai. It's a sound, a smell, a whole feeling of home.",
    left: "40%",
    top: 218,
    rotate: -4,
    size: 150,
    delay: 0.25,
  },
  {
    id: "lotus",
    src: img2187,
    label: "Lotus",
    description:
      "A symbol of purity, spiritual enlightenment, fertility, and resilience. Something I want to bring into everything I make.",
    left: "62%",
    top: 252,
    rotate: 9,
    size: 132,
    delay: 0.3,
  },
  {
    id: "coffee",
    src: img2188,
    label: "Filter Coffee",
    description:
      "A traditional South Indian method of brewing that I love and genuinely cannot live without. The decoction, the froth, the dabara set — it's ritual.",
    left: "24%",
    top: 385,
    rotate: -9,
    size: 118,
    delay: 0.35,
  },
];

interface StickerItemProps {
  sticker: Sticker;
  isTop: boolean;
  onTap: () => void;
  onLift: () => void;
}

function StickerItem({ sticker, isTop, onTap, onLift }: StickerItemProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      onDragStart={onLift}
      onTap={onTap}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, scale: 0.5, rotate: sticker.rotate - 4 }}
      animate={{ opacity: 1, scale: 1, rotate: sticker.rotate }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: sticker.delay,
      }}
      style={{
        position: "absolute",
        left: sticker.left,
        top: sticker.top,
        width: sticker.size,
        height: sticker.size,
        cursor: "grab",
        zIndex: isTop ? 20 : 10,
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <img
        src={sticker.src}
        alt={sticker.label}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
          display: "block",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.35))",
        }}
      />
    </motion.div>
  );
}

export default function StickerCollage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [topId, setTopId] = useState<string>("kolam");

  const activeSticker = STICKERS.find((s) => s.id === activeId) ?? null;

  const handleTap = (id: string) => {
    setTopId(id);
    setActiveId(id);
  };

  const handleLift = (id: string) => {
    setTopId(id);
  };

  return (
    <>
      {/* Section header */}
      <div className="border-b border-border/30 pb-4 mb-6">
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
          THINGS THAT SHAPED ME
        </p>
      </div>
      <p className="text-sm font-mono text-muted-foreground/50 tracking-wider mb-8">
        Tap any object to find out more · drag them around
      </p>

      {/* Collage canvas */}
      <div
        style={{
          position: "relative",
          minHeight: 540,
          width: "100%",
          overflow: "visible",
        }}
      >
        {STICKERS.map((s) => (
          <StickerItem
            key={s.id}
            sticker={s}
            isTop={topId === s.id}
            onTap={() => handleTap(s.id)}
            onLift={() => handleLift(s.id)}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeSticker && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveId(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(20, 6, 10, 0.75)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              padding: "1.5rem",
            }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.82, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, y: 24 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#fcf5e9",
                maxWidth: 340,
                width: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Image panel — maroon bg so cream/black illustration pops */}
              <div
                style={{
                  backgroundColor: "hsl(350, 60%, 18%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "32px",
                  minHeight: 200,
                }}
              >
                <motion.img
                  src={activeSticker.src}
                  alt={activeSticker.label}
                  initial={{ scale: 0.8, rotate: activeSticker.rotate * 0.5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 24 }}
                  style={{
                    width: 180,
                    height: 180,
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* Text panel */}
              <div style={{ padding: "24px 28px 28px" }}>
                <p
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: 9,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#1c1c1c",
                    opacity: 0.38,
                    marginBottom: 10,
                  }}
                >
                  FROM MY STORY
                </p>
                <h3
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#1c1c1c",
                    marginBottom: 14,
                    lineHeight: 1.3,
                  }}
                >
                  {activeSticker.label}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.8,
                    color: "#1c1c1c",
                    opacity: 0.72,
                  }}
                >
                  {activeSticker.description}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setActiveId(null)}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 14,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Space Mono, monospace",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "hsl(40, 33%, 93%)",
                  opacity: 0.6,
                  textTransform: "uppercase",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")
                }
              >
                ✕ close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
