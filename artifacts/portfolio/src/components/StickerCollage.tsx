import { useState, useRef } from "react";
import { motion } from "framer-motion";

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
  left: string;
  top: string;
  rotate: number;
  size: number;
  delay: number;
}

const STICKERS: Sticker[] = [
  { id: "kolam", src: img2182, label: "Kolam", left: "1%", top: "2%", rotate: -8, size: 112, delay: 0.05 },
  { id: "mudra", src: img2183, label: "Bharatanatyam Mudra", left: "38%", top: "-2%", rotate: 7, size: 94, delay: 0.1 },
  { id: "neembu", src: img2184, label: "Neembu Mirchi", left: "76%", top: "3%", rotate: -13, size: 88, delay: 0.15 },
  { id: "sewing", src: img2185, label: "Sewing Machine", left: "0%", top: "60%", rotate: 11, size: 118, delay: 0.2 },
  { id: "auto", src: img2186, label: "Auto Rickshaw", left: "33%", top: "80%", rotate: -4, size: 126, delay: 0.25 },
  { id: "lotus", src: img2187, label: "Lotus", left: "74%", top: "62%", rotate: 9, size: 110, delay: 0.3 },
  { id: "coffee", src: img2188, label: "Filter Coffee", left: "78%", top: "34%", rotate: -9, size: 94, delay: 0.35 },
];

interface StickerItemProps {
  sticker: Sticker;
  isTop: boolean;
  onLift: () => void;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

function StickerItem({ sticker, isTop, onLift, constraintsRef }: StickerItemProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.12}
      dragConstraints={constraintsRef}
      onDragStart={onLift}
      onPointerDown={onLift}
      whileHover={{ scale: 1.12, rotate: sticker.rotate + (sticker.rotate >= 0 ? 4 : -4) }}
      whileTap={{ scale: 1.04, cursor: "grabbing" }}
      whileDrag={{ scale: 1.08, cursor: "grabbing" }}
      initial={{ opacity: 0, scale: 0.5, rotate: sticker.rotate - 6 }}
      animate={{ opacity: 1, scale: 1, rotate: sticker.rotate }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: sticker.delay }}
      style={{
        position: "absolute",
        left: sticker.left,
        top: sticker.top,
        width: sticker.size,
        height: sticker.size,
        cursor: "grab",
        zIndex: isTop ? 30 : 20,
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
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.35))",
        }}
      />
    </motion.div>
  );
}

export default function StickerCollage() {
  const [topId, setTopId] = useState<string>("kolam");
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {STICKERS.map((s) => (
        <StickerItem
          key={s.id}
          sticker={s}
          isTop={topId === s.id}
          onLift={() => setTopId(s.id)}
          constraintsRef={containerRef}
        />
      ))}
    </div>
  );
}
