import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import StickerCollage from "@/components/StickerCollage";
import artworkClip from "@assets/Untitled_Artwork_1782203447595.MP4";

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
  caption: string;
  rotate: number;
}

/**
 * The illustration wall. To add a piece, drop the exported image into
 * attached_assets (or public/), import it above like `artworkClip`, and add
 * an entry here — rotation is degrees, keep it within about ±5.
 */
const PIECES: Piece[] = [
  {
    id: "procreate-loop",
    kind: "video",
    src: artworkClip,
    caption: "a lil procreate loop",
    rotate: -2.5,
  },
];

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

function PolaroidFrame({
  rotate,
  caption,
  children,
}: {
  rotate: number;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 32, rotate: rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative w-[280px] md:w-[320px] shrink-0"
      style={{
        backgroundColor: "#fcf5e9",
        padding: "14px 14px 10px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
      }}
    >
      <span style={TAPE_STYLE} aria-hidden="true" />
      <div className="overflow-hidden bg-[#efe6d6]">{children}</div>
      <figcaption
        className="pt-3 pb-1 text-center text-[#1c1c1c]"
        style={{ fontFamily: "'Caveat', cursive", fontSize: 22, lineHeight: 1.2 }}
      >
        {caption}
      </figcaption>
    </motion.figure>
  );
}

export default function Fun() {
  return (
    <>
      <Helmet>
        <title>Fun Stuff | Ashika Ramesh</title>
        <meta
          name="description"
          content="The creative break — draggable stickers of home, illustrations and doodles by Ashika Ramesh (@tinte.it)."
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
            FUN STUFF — A CREATIVE BREAK
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

        {/* ── Sticker desk ── */}
        <motion.section
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-24"
        >
          <div className="border-b border-border/30 pb-4 mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
              LITTLE PIECES OF HOME
            </p>
            <p className="text-xs font-mono tracking-[0.15em] text-primary/80">
              ( drag them around · tap one for its story )
            </p>
          </div>

          <div
            className="relative border border-border/25 h-[68vh] min-h-[440px] max-h-[720px]"
            data-testid="sticker-desk"
          >
            {/* Faint centre note behind the stickers */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span
                className="text-center px-6"
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                  color: "hsl(40 33% 93% / 0.22)",
                  transform: "rotate(-2deg)",
                }}
              >
                started in Chennai, stuck with me ~
              </span>
            </div>
            <StickerCollage />
          </div>
        </motion.section>

        {/* ── Illustrations ── */}
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
              ILLUSTRATIONS
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

          {/* Polaroid wall */}
          <div className="flex flex-wrap items-start justify-center md:justify-start gap-10 md:gap-14 py-6">
            {PIECES.map((piece) => (
              <PolaroidFrame key={piece.id} rotate={piece.rotate} caption={piece.caption}>
                {piece.kind === "video" ? (
                  <video
                    src={piece.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto block"
                    aria-label={piece.caption}
                  />
                ) : (
                  <img src={piece.src} alt={piece.caption} className="w-full h-auto block" />
                )}
              </PolaroidFrame>
            ))}

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
              className="relative w-[280px] md:w-[320px] shrink-0 block"
              style={{
                backgroundColor: "hsl(178 60% 50%)",
                padding: "14px 14px 10px",
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
              <p
                className="pt-3 pb-1 text-center"
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: 22,
                  color: "hsl(350 60% 15%)",
                }}
              >
                come say hi
              </p>
            </motion.a>
          </div>
        </motion.section>
      </div>
    </>
  );
}
