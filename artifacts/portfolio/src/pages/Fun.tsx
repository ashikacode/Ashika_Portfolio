import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import StickerCollage from "@/components/StickerCollage";

const INSTAGRAM_URL = "https://www.instagram.com/tinte.it/";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
  }),
};

// Word-by-word spring drop, each word landing with a tiny rotation wobble.
const wordVariants: Variants = {
  hidden: { opacity: 0, y: "110%", rotate: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 320, damping: 22, delay: 0.08 + i * 0.09 },
  }),
};

const HEADLINE: { text: string; accent: boolean }[][] = [
  [
    { text: "BITS", accent: false },
    { text: "OF", accent: false },
    { text: "ME,", accent: false },
  ],
  [
    { text: "WHEREVER", accent: true },
    { text: "I", accent: true },
    { text: "GO.", accent: true },
  ],
];

const MARQUEE_ITEMS = [
  "STICKERS",
  "DOODLES",
  "FILTER COFFEE",
  "BHARATANATYAM",
  "PROCREATE LOOPS",
  "KOLAM",
  "NO KPIs HERE",
];

interface Piece {
  id: string;
  kind: "image" | "video";
  src: string;
  alt: string;
  /** Handwritten caption — sketchbook pieces only; letterforms speak for themselves. */
  caption?: string;
  /** Resting tilt in degrees for the polaroid frames. */
  rotate?: number;
}

/**
 * The letterform series — square, flat-colour pieces that read as one wall.
 * To add one: drop the export in public/art/ and append its path here.
 */
const LETTERFORMS: Piece[] = Array.from({ length: 22 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `letter-${n}`,
    kind: "image" as const,
    src: `/art/letter-${n}.jpg`,
    alt: "Hand-drawn ornamental letterform",
  };
});

/**
 * Everything else — paintings, pen studies and loops, in mixed sizes.
 * Rotation is degrees; keep it within about ±4 so the wall stays readable.
 */
const SKETCHBOOK: Piece[] = [
  { id: "worryin", kind: "image", src: "/art/worryin.jpg", alt: "Hand-lettered drawing reading 'worryin' is a waste of your imagination, amigo'", caption: "worryin' is a waste of your imagination", rotate: -2 },
  { id: "cat-and-coffee", kind: "image", src: "/art/cat-and-coffee.jpg", alt: "Painting of a tuxedo cat beside a cup of coffee", caption: "the cat and the coffee", rotate: 2 },
  { id: "scribbles", kind: "video", src: "/art/scribbles.mp4", alt: "Animated line drawing of a figure under a scribbled cloud of thought", caption: "a head full of scribbles", rotate: -1.5 },
  { id: "need-a-minute", kind: "image", src: "/art/need-a-minute.jpg", alt: "Drawing of a green bird holding a mug, captioned 'I'm gonna need a minute'", caption: "gonna need a minute", rotate: -3 },
  { id: "just-smile", kind: "image", src: "/art/just-smile.jpg", alt: "Marker portrait of the Joker with the words 'just smile'", caption: "just smile", rotate: 2.5 },
  { id: "the-hallway", kind: "image", src: "/art/the-hallway.jpg", alt: "Dense pen drawing of a figure with a sword in an ornate hallway", caption: "the hallway", rotate: -1 },
  { id: "name-lettering", kind: "image", src: "/art/name-lettering.gif", alt: "Animated hand-lettering of the name Ashika Ramesh", caption: "my name, on loop", rotate: 1 },
  { id: "frog", kind: "image", src: "/art/frog.jpg", alt: "Painting of a green frog on a red background", caption: "frog, on red", rotate: -2.5 },
  { id: "nostalgic", kind: "image", src: "/art/nostalgic.jpg", alt: "Line drawing of a figure sitting with a cup, captioned about nostalgia", caption: "nostalgic for memories i might have in the future", rotate: 1.5 },
  { id: "three-faces", kind: "image", src: "/art/three-faces.jpg", alt: "Pen drawing of three faces merging into each other on lined paper", caption: "three faces, one page", rotate: 2 },
  { id: "move-forward", kind: "image", src: "/art/move-forward.jpg", alt: "Blue line illustration of the sea with a note reading 'yet, we move forward'", caption: "yet, we move forward", rotate: -2 },
  { id: "face-on-red", kind: "image", src: "/art/face-on-red.jpg", alt: "Painting of an anguished face on a red background", caption: "a face, mid-feeling", rotate: 1 },
  { id: "one-line-faces", kind: "image", src: "/art/one-line-faces.jpg", alt: "Continuous line drawing of overlapping faces in coloured pencil", caption: "faces, without lifting the pen", rotate: -1.5 },
  { id: "beanies", kind: "image", src: "/art/beanies.jpg", alt: "Pencil sketch of two people in beanies, dated July 2024", caption: "two beanies, july", rotate: 2.5 },
  { id: "ink-portrait", kind: "image", src: "/art/ink-portrait.jpg", alt: "Pen portrait of a bearded man", caption: "pen study", rotate: -2 },
  { id: "pen-portrait", kind: "image", src: "/art/pen-portrait.jpg", alt: "Cut-out pen portrait of a couple", caption: "the two of them", rotate: 1.5 },
  { id: "kathakali", kind: "image", src: "/art/kathakali.jpg", alt: "Black and white photo of the artist painting a Kathakali dancer", caption: "kathakali, in progress", rotate: -1 },
  { id: "break-the-chain", kind: "image", src: "/art/break-the-chain.jpg", alt: "Watercolour of a woman and child in masks beside a 'break the chain' poster", caption: "break the chain", rotate: 2 },
];

/** Flat list backing the lightbox, in the order the page renders them. */
const ALL_PIECES: Piece[] = [...LETTERFORMS, ...SKETCHBOOK];

const TAPE_STYLE: React.CSSProperties = {
  position: "absolute",
  top: -14,
  left: "50%",
  transform: "translateX(-50%) rotate(-3deg)",
  width: 92,
  height: 28,
  backgroundColor: "hsl(178 60% 50% / 0.55)",
  boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
  zIndex: 2,
};

function PieceMedia({ piece, className }: { piece: Piece; className?: string }) {
  if (piece.kind === "video") {
    return (
      <video
        src={piece.src}
        autoPlay
        loop
        muted
        playsInline
        aria-label={piece.alt}
        className={className}
      />
    );
  }
  return (
    <img
      src={piece.src}
      alt={piece.alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

export default function Fun() {
  // Index into ALL_PIECES, or null when the lightbox is closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const step = useCallback((delta: number) => {
    setOpenIndex((current) =>
      current === null ? current : (current + delta + ALL_PIECES.length) % ALL_PIECES.length,
    );
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    // Freeze the page behind the overlay, restoring whatever was set before.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, step]);

  const openPiece = openIndex === null ? null : ALL_PIECES[openIndex];

  return (
    <>
      <Helmet>
        <title>Fun | Ashika Ramesh</title>
        <meta
          name="description"
          content="The creative break — draggable stickers of home, letterforms, paintings and doodles by Ashika Ramesh (@tinte.it)."
        />
      </Helmet>

      <div className="flex flex-col gap-0 pb-24 overflow-x-clip">
        {/* ── Page label ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="border-b border-border/30 pb-4"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
            FUN — A CREATIVE BREAK
          </span>
        </motion.div>

        {/* ── Hero headline — words spring in one by one ── */}
        <h1
          className="flex flex-col mt-16 font-bold uppercase"
          style={{
            fontSize: "clamp(2.4rem, 7.5vw, 8rem)",
            lineHeight: 0.98,
            letterSpacing: "0.01em",
          }}
        >
          {HEADLINE.map((line, lineIndex) => (
            <span key={lineIndex} className="flex flex-wrap gap-x-[0.3em] overflow-hidden pb-[0.08em]">
              {line.map((word, wordIndex) => (
                <motion.span
                  key={word.text}
                  custom={lineIndex * 3 + wordIndex}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: "inline-block",
                    transformOrigin: "0% 100%",
                    color: word.accent ? "hsl(178 60% 50%)" : "hsl(40 33% 93%)",
                  }}
                >
                  {word.text}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {/* ── Marquee strip — endless drift, à la a motion-graphics bumper ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 border-y border-border/25 py-3 overflow-hidden select-none"
          aria-hidden="true"
        >
          <motion.div
            className="flex shrink-0 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {/* Two identical halves so the -50% loop point is seamless */}
            {[0, 1].map((half) => (
              <div key={half} className="flex">
                {MARQUEE_ITEMS.map((item) => (
                  <span
                    key={`${half}-${item}`}
                    className="font-mono text-xs tracking-[0.25em] uppercase text-foreground/45 flex items-center"
                  >
                    <span className="px-5">{item}</span>
                    <span className="text-primary">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/*
         * Stickers are viewport-fixed (see StickerCollage.tsx), so they float
         * loose over the whole page and this renders nothing inline.
         */}
        <StickerCollage />

        {/* ── Letterforms — one uniform wall of colour ── */}
        <motion.section
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-24"
        >
          <div className="border-b border-border/30 pb-4 mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
              LETTERFORMS
            </p>
            <p className="text-xs font-mono tracking-[0.15em] text-primary/80">
              ( click any piece to open it )
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {LETTERFORMS.map((piece, i) => (
              <motion.button
                key={piece.id}
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Open ${piece.alt}`}
                data-testid={`tile-${piece.id}`}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 24, delay: (i % 8) * 0.03 }}
                className="relative block aspect-square overflow-hidden cursor-none"
              >
                <PieceMedia piece={piece} className="w-full h-full object-cover block" />
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* ── Sketchbook — mixed sizes, so a masonry rather than a grid ── */}
        <motion.section
          custom={5}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-24"
        >
          <div className="border-b border-border/30 pb-4 mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
              FROM THE SKETCHBOOK
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono tracking-[0.15em] text-primary hover:underline"
              data-testid="link-instagram-label"
            >
              @tinte.it ↗
            </a>
          </div>

          <p
            className="mb-12"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
              color: "hsl(40 33% 93% / 0.8)",
              transform: "rotate(-1deg)",
              width: "fit-content",
            }}
          >
            “draws things / ~ sometimes”
          </p>

          {/*
           * True masonry via CSS columns — each card's height is driven by its
           * own image's aspect ratio, so it scales cleanly to any number of
           * pieces without layout math.
           */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
            {SKETCHBOOK.map((piece, i) => {
              const rotate = piece.rotate ?? 0;
              return (
                <motion.figure
                  key={piece.id}
                  initial={{ opacity: 0, y: 32, rotate: rotate * 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate }}
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative w-full break-inside-avoid mb-6 md:mb-8"
                  style={{
                    // Deeper bottom edge keeps the polaroid shape now that
                    // there is no caption sitting under the image.
                    backgroundColor: "#fcf5e9",
                    padding: "14px 14px 30px",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                  }}
                >
                  <span style={TAPE_STYLE} aria-hidden="true" />
                  <button
                    type="button"
                    onClick={() => setOpenIndex(LETTERFORMS.length + i)}
                    aria-label={`Open ${piece.alt}`}
                    data-testid={`tile-${piece.id}`}
                    className="block w-full overflow-hidden bg-[#efe6d6] cursor-none"
                  >
                    <PieceMedia piece={piece} className="w-full h-auto block" />
                  </button>
                </motion.figure>
              );
            })}

            {/* Instagram CTA styled as one more polaroid */}
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="card-instagram"
              initial={{ opacity: 0, y: 32, rotate: 6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-full break-inside-avoid mb-6 md:mb-8 block"
              style={{
                backgroundColor: "hsl(178 60% 50%)",
                padding: "14px 14px 30px",
                boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
              }}
            >
              <span
                style={{ ...TAPE_STYLE, backgroundColor: "hsl(40 33% 93% / 0.65)" }}
                aria-hidden="true"
              />
              <div
                className="flex flex-col items-center justify-center gap-4 text-center aspect-square"
                style={{ backgroundColor: "hsl(350 60% 15%)" }}
              >
                <span
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 30,
                    lineHeight: 1.25,
                    color: "hsl(40 33% 93%)",
                    maxWidth: "80%",
                  }}
                >
                  the rest of the sketchbook lives on instagram →
                </span>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
                  @tinte.it ↗
                </span>
              </div>
            </motion.a>
          </div>
        </motion.section>
      </div>

      {/*
       * ── Lightbox — sits above the stickers (z-10) and the header (z-50) ──
       * Deliberately not wrapped in AnimatePresence: an exit animation that
       * fails to complete strands a full-screen, click-blocking layer over
       * the page, so closing unmounts the node outright instead.
       */}
      {openPiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={openPiece.alt}
            data-testid="lightbox"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ backgroundColor: "hsl(350 60% 8% / 0.94)", backdropFilter: "blur(6px)" }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute top-5 right-5 md:top-8 md:right-8 font-mono text-xs tracking-[0.2em] uppercase text-foreground/70 hover:text-primary transition-colors"
            >
              CLOSE ✕
            </button>

            {/* Arrows stop propagation so they don't trigger the backdrop close */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Previous piece"
              className="absolute left-3 md:left-8 text-3xl text-foreground/50 hover:text-primary transition-colors px-3 py-2"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Next piece"
              className="absolute right-3 md:right-8 text-3xl text-foreground/50 hover:text-primary transition-colors px-3 py-2"
            >
              →
            </button>

            {/* No `key` here — navigating shouldn't remount and re-animate */}
            <motion.figure
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-4 max-w-full"
            >
              {openPiece.kind === "video" ? (
                <video
                  src={openPiece.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={openPiece.alt}
                  className="max-h-[78vh] max-w-full object-contain block"
                />
              ) : (
                <img
                  src={openPiece.src}
                  alt={openPiece.alt}
                  className="max-h-[78vh] max-w-full object-contain block"
                />
              )}
              {openPiece.caption && (
                <figcaption
                  className="text-center"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 26,
                    color: "hsl(40 33% 93% / 0.85)",
                  }}
                >
                  {openPiece.caption}
                </figcaption>
              )}
            </motion.figure>
          </motion.div>
      )}
    </>
  );
}
