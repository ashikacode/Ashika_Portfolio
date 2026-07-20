import { useState, useRef, useEffect } from "react";
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
  top: string;
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
      "Kolam — something my mom drew every day and that I was always in awe of. Maybe my first ever experience of art.",
    left: "2%",
    top: "18%",
    rotate: -8,
    size: 140,
    delay: 0.05,
  },
  {
    id: "mudra",
    src: img2183,
    label: "Bharatanatyam Mudra",
    description: "A hand sign in Bharatanatyam, the classical dance form I still practise to this day.",
    left: "80%",
    top: "8%",
    rotate: 7,
    size: 124,
    delay: 0.1,
  },
  {
    id: "neembu",
    src: img2184,
    label: "Neembu Mirchi",
    description:
      "An Indian charm of one lemon and seven green chillies strung together — to ward off the evil eye and bring good fortune.",
    left: "86%",
    top: "45%",
    rotate: -13,
    size: 118,
    delay: 0.15,
  },
  {
    id: "sewing",
    src: img2185,
    label: "Sewing Machine",
    description:
      "Close to me since childhood — I watched my grandma stitch and knit for me, and that love carried me into fashion design.",
    left: "3%",
    top: "60%",
    rotate: 11,
    size: 150,
    delay: 0.2,
  },
  {
    id: "auto",
    src: img2186,
    label: "Auto Rickshaw",
    description:
      "The auto rickshaw (tuk tuk) I rode every day around Chennai. It's a sound, a smell, a whole feeling of home.",
    left: "75%",
    top: "72%",
    rotate: -4,
    size: 160,
    delay: 0.25,
  },
  {
    id: "lotus",
    src: img2187,
    label: "Lotus",
    description:
      "A symbol of purity, spiritual enlightenment and resilience — something I want to bring into everything I make.",
    left: "42%",
    top: "82%",
    rotate: 9,
    size: 142,
    delay: 0.3,
  },
  {
    id: "coffee",
    src: img2188,
    label: "Filter Coffee",
    description:
      "South Indian filter coffee I genuinely cannot live without. The decoction, the froth, the dabara set — it's ritual.",
    left: "16%",
    top: "35%",
    rotate: -9,
    size: 126,
    delay: 0.35,
  },
];


interface StickerItemProps {
  sticker: Sticker;
  isTop: boolean;
  showBubble: boolean;
  onLift: () => void;
  onTap: () => void;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

function StickerItem({ sticker, isTop, showBubble, onLift, onTap, constraintsRef }: StickerItemProps) {
  const sizeCss = `clamp(${Math.round(sticker.size * 0.66)}px, ${(sticker.size / 12.8).toFixed(2)}vw, ${sticker.size}px)`;

  return (
    <motion.div
      drag
      dragElastic={0.18}
      dragConstraints={constraintsRef}
      dragTransition={{ power: 0.2, timeConstant: 220, bounceStiffness: 260, bounceDamping: 22 }}
      onPointerDown={onLift}
      onDragStart={onLift}
      onTap={onTap}
      whileHover={{ scale: 1.08, rotate: sticker.rotate + (sticker.rotate >= 0 ? 3 : -3) }}
      whileTap={{ scale: 1.04 }}
      whileDrag={{ scale: 1.07, cursor: "grabbing" }}
      initial={{ opacity: 0, scale: 0.5, rotate: sticker.rotate - 6 }}
      animate={{ opacity: 1, scale: 1, rotate: sticker.rotate }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: sticker.delay }}
      style={{
        position: "absolute",
        left: sticker.left,
        top: sticker.top,
        width: sizeCss,
        height: sizeCss,
        cursor: "grab",
        zIndex: isTop ? 14 : 11,
        touchAction: "none",
        userSelect: "none",
        pointerEvents: "auto",
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
          filter: "drop-shadow(0 5px 14px rgba(0,0,0,0.4))",
        }}
      />

      <AnimatePresence>
        {showBubble && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, scale: 0.7, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 6 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: `translateX(-50%) rotate(${-sticker.rotate}deg)`,
              transformOrigin: "top center",
              marginTop: 14,
              width: 212,
              backgroundColor: "#fcf5e9",
              color: "#1c1c1c",
              borderRadius: 14,
              padding: "12px 15px",
              boxShadow: "0 12px 34px rgba(0,0,0,0.4)",
              pointerEvents: "none",
              zIndex: 60,
            }}
          >
            <span
              style={{
                position: "absolute",
                top: -6,
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: 13,
                height: 13,
                backgroundColor: "#fcf5e9",
                borderRadius: 3,
              }}
            />
            <p
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {sticker.label}
            </p>
            <p style={{ fontSize: 12, lineHeight: 1.65, opacity: 0.78 }}>{sticker.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function StickerCollage() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [topId, setTopId] = useState<string>("kolam");
  const [bubbleId, setBubbleId] = useState<string | null>(null);
  const timerRef = useRef<number>(0);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const handleTap = (id: string) => {
    window.clearTimeout(timerRef.current);
    if (bubbleId === id) {
      setBubbleId(null);
      return;
    }
    setBubbleId(id);
    timerRef.current = window.setTimeout(() => setBubbleId(null), 5000);
  };

  // Pinned to the viewport so stickers roam the whole page as you scroll —
  // drag constraints are the viewport bounds, not any single section.
  return (
    <div
      ref={viewportRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {STICKERS.map((s) => (
        <StickerItem
          key={s.id}
          sticker={s}
          isTop={topId === s.id}
          showBubble={bubbleId === s.id}
          onLift={() => setTopId(s.id)}
          onTap={() => handleTap(s.id)}
          constraintsRef={viewportRef}
        />
      ))}
    </div>
  );
}
