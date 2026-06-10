import { Helmet } from "react-helmet-async";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "wouter";
import { useState, useRef } from "react";

const MARQUEE_TEXT =
  "STAKEHOLDER MANAGEMENT · RESEARCH SYNTHESIS · PRESENTATION & FACILITATION · CROSS-FUNCTIONAL COLLABORATION · PROBLEM FRAMING · INTERPERSONAL COMMUNICATION · CRITICAL THINKING · INTERPRETATION & INSIGHT · ";

function Marquee() {
  return (
    <div className="overflow-hidden border-t border-border/20 py-4 select-none">
      <div
        className="flex whitespace-nowrap font-mono text-xs tracking-[0.22em] text-muted-foreground"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        <span>{MARQUEE_TEXT}{MARQUEE_TEXT}</span>
        <span>{MARQUEE_TEXT}{MARQUEE_TEXT}</span>
      </div>
    </div>
  );
}

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.14 },
  }),
};

const PAD = "px-6 md:px-12 lg:px-20";

const selectedWork = [
  {
    href: "/work/memory-in-a-scent",
    num: "02",
    tag: "SPECULATIVE DESIGN · ARDUINO",
    title: "MEMORY IN A SCENT",
    image: "/prototype-final.png",
  },
  {
    href: "/work/riverrenew-mataniko",
    num: "03",
    tag: "SUSTAINABLE SYSTEMS · NbS",
    title: "RIVERRENEW MATANIKO",
    image: "/riverrenew-hero.png",
  },
];

const driveItems = [
  {
    num: "01",
    title: "CREATIVITY",
    body: "Finding the unexpected form that makes complexity legible and memorable.",
  },
  {
    num: "02",
    title: "EMPATHY",
    body: "Systems are only as good as the humanity embedded in them. I design with people, not just for them.",
  },
  {
    num: "03",
    title: "RIGOR",
    body: "Every decision is evidence-informed. Research synthesis, measurable outcomes, and operational precision underpin the work.",
  },
];

export default function Home() {
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 22, stiffness: 140 });
  const y = useSpring(rawY, { damping: 22, stiffness: 140 });

  const handleMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    setActiveSection(idx);
  };

  const scrollTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: "smooth" });
  };

  const activeImage = hoveredWork
    ? (selectedWork.find((p) => p.href === hoveredWork)?.image ?? null)
    : null;

  return (
    <>
      <Helmet>
        <title>Ashika Ramesh | Learning & Service Designer</title>
        <meta name="description" content="Portfolio of Ashika Ramesh, a Learning, Service and UX Research designer based in Melbourne/NAARM." />
        <meta property="og:title" content="Ashika Ramesh | Learning & Service Designer" />
        <meta property="og:description" content="Portfolio of Ashika Ramesh, a Learning, Service and UX Research designer based in Melbourne/NAARM." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashikaramesh.com/" />
      </Helmet>

      {/* Floating image preview */}
      <motion.div
        className="fixed pointer-events-none z-40 overflow-hidden"
        style={{ x, y, translateX: "-50%", translateY: "-115%", width: 300, height: 220 }}
        animate={{ opacity: activeImage ? 1 : 0, scale: activeImage ? 1 : 0.88 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {selectedWork.map((p) => (
          <motion.img
            key={p.href}
            src={p.image}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: hoveredWork === p.href ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          />
        ))}
      </motion.div>

      {/* Section indicator — left side */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 hidden md:flex">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to section ${i + 1}`}
            className="cursor-none flex items-center justify-center"
          >
            <motion.div
              animate={{
                height: activeSection === i ? 24 : 4,
                background: activeSection === i ? "hsl(178 60% 50%)" : "rgba(252,245,233,0.2)",
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: 2, borderRadius: 2 }}
            />
          </button>
        ))}
      </div>

      {/* Snap scroll container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-[100dvh] overflow-y-scroll"
        style={{
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >

        {/* ─── Section 1: Hero ─── */}
        <section
          className={`h-[100dvh] flex flex-col ${PAD} pt-32`}
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <motion.p
            className="font-mono text-xs tracking-[0.25em] text-muted-foreground/70 uppercase mb-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Designer · Researcher · Melbourne / NAARM
          </motion.p>

          {/* Headline */}
          <div className="flex flex-col mt-auto">
            <div className="overflow-hidden leading-none">
              <motion.h1
                custom={0}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="font-bold uppercase"
                style={{
                  fontSize: "clamp(2.2rem, 6.8vw, 7.5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "0.02em",
                  color: "hsl(40 33% 93%)",
                }}
              >
                I design how systems
              </motion.h1>
            </div>
            <div className="overflow-hidden leading-none">
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="font-bold uppercase"
                style={{
                  fontSize: "clamp(2.2rem, 6.8vw, 7.5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "0.02em",
                  color: "hsl(40 33% 93%)",
                }}
              >
                get{" "}
                <span style={{ color: "hsl(178 60% 50%)" }}>experienced.</span>
              </motion.h1>
            </div>
          </div>

          {/* Description */}
          <motion.p
            className="text-sm md:text-base leading-loose text-foreground/55 max-w-xl mt-8 mb-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            Solving meaningful problems at the intersection of service design,
            learning design, and UX research. I bring rigour and empathy
            together to turn complex organisational challenges into experiences
            that are functional, human, and genuinely felt.
          </motion.p>

          {/* Marquee at bottom */}
          <div className={`-mx-6 md:-mx-12 lg:-mx-20 mt-auto`}>
            <Marquee />
          </div>

          {/* Scroll nudge */}
          <motion.div
            className="flex items-center gap-3 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="text-muted-foreground/30 text-xs font-mono tracking-[0.2em]"
            >
              SCROLL ↓
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Section 2: What Drives the Work ─── */}
        <section
          className={`h-[100dvh] flex flex-col justify-center ${PAD}`}
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.p
              className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground border-b border-border/30 pb-4 mb-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              WHAT DRIVES THE WORK
            </motion.p>

            <div className="grid md:grid-cols-3 gap-px bg-border/20">
              {driveItems.map((item, i) => (
                <motion.div
                  key={item.num}
                  className="group flex flex-col gap-5 py-10 md:py-12 px-0 md:px-8 bg-background first:pl-0 last:pr-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                >
                  <span className="font-mono text-xs text-muted-foreground/40 tracking-widest group-hover:text-primary transition-colors duration-300">
                    {item.num}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Selected Work ─── */}
        <section
          className={`h-[100dvh] flex flex-col justify-center ${PAD}`}
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
          onMouseMove={handleMouseMove}
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              className="flex items-center justify-between border-b border-border/30 pb-6 mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
                SELECTED WORK
              </p>
              <Link
                href="/work"
                className="text-xs font-mono tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors uppercase"
              >
                All Projects →
              </Link>
            </motion.div>

            <div className="flex flex-col">
              {selectedWork.map((p, i) => (
                <motion.div
                  key={p.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                >
                  <Link
                    href={p.href}
                    className="group flex items-center justify-between py-10 md:py-12 gap-6 border-b border-border/20 cursor-none"
                    onMouseEnter={() => setHoveredWork(p.href)}
                    onMouseLeave={() => setHoveredWork(null)}
                  >
                    <div className="flex items-baseline gap-6 md:gap-10 min-w-0">
                      <span className="font-mono text-xs text-muted-foreground/40 tracking-widest shrink-0 w-6">
                        {p.num}
                      </span>
                      <h3
                        className="text-2xl md:text-4xl font-bold tracking-tight transition-colors duration-300 truncate"
                        style={{
                          color: hoveredWork === p.href ? "hsl(178 60% 50%)" : "hsl(40 33% 93%)",
                        }}
                      >
                        {p.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="hidden md:block text-xs font-mono tracking-widest text-muted-foreground/50 uppercase">
                        {p.tag}
                      </span>
                      <motion.span
                        className="text-foreground/30 text-xl transition-colors duration-300"
                        style={{
                          color: hoveredWork === p.href ? "hsl(178 60% 50%)" : undefined,
                        }}
                        animate={{ x: hoveredWork === p.href ? 8 : 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        →
                      </motion.span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer credit inside last section */}
            <motion.p
              className="text-xs font-mono text-muted-foreground/25 tracking-[0.15em] uppercase pt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Melbourne / NAARM · {new Date().getFullYear()}
            </motion.p>
          </div>
        </section>

      </div>
    </>
  );
}
