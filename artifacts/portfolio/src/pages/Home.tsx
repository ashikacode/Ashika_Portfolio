import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "wouter";

const MARQUEE_TEXT =
  "LEARNING DESIGN · SERVICE DESIGN · UX RESEARCH · CO-DESIGN · SYSTEMS THINKING · MELBOURNE/NAARM · ";

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border/20 py-4 select-none">
      <div
        className="flex whitespace-nowrap font-mono text-xs tracking-[0.22em] text-muted-foreground"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        <span className="pr-0">{MARQUEE_TEXT}{MARQUEE_TEXT}</span>
        <span className="pr-0">{MARQUEE_TEXT}{MARQUEE_TEXT}</span>
      </div>
    </div>
  );
}

const lineVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.14 },
  }),
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Ashima Ramesh | Learning & Service Designer</title>
        <meta name="description" content="Portfolio of Ashima Ramesh, a Learning, Service and UX Research designer based in Melbourne/NAARM." />
        <meta property="og:title" content="Ashima Ramesh | Learning & Service Designer" />
        <meta property="og:description" content="Portfolio of Ashima Ramesh, a Learning, Service and UX Research designer based in Melbourne/NAARM." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashimaramesh.com/" />
      </Helmet>

      <div className="flex flex-col">

        {/* ── Full-viewport hero ── */}
        <section className="min-h-screen flex flex-col justify-between -mt-32 pt-32 pb-12 relative overflow-hidden">

          {/* Top label */}
          <motion.p
            className="font-mono text-xs tracking-[0.25em] text-muted-foreground/70 uppercase pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Designer · Researcher · Melbourne / NAARM
          </motion.p>

          {/* Massive headline */}
          <div className="flex-1 flex flex-col justify-center py-8">
            <div>
              {["I design how", "systems get", "experienced."].map((line, i) => (
                <div key={line} className="overflow-hidden leading-none">
                  <motion.h1
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={lineVariants}
                    className="font-bold"
                    style={{
                      fontSize: "clamp(2.6rem, 9.2vw, 9.5rem)",
                      lineHeight: 0.92,
                      letterSpacing: "-0.02em",
                      color: i === 2 ? "hsl(178 60% 50%)" : "hsl(40 33% 93%)",
                      fontStyle: i === 2 ? "italic" : "normal",
                    }}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: description + CTA */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
          >
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl">
              Solving meaningful problems at the intersection of service design, learning design, and UX research. I bring rigour and empathy together to turn complex organisational challenges into experiences that are functional, human, and genuinely felt.
            </p>

            <div className="flex items-center gap-8 shrink-0">
              <Link
                href="/work"
                className="text-sm font-mono tracking-[0.15em] px-6 py-2.5 rounded-full border border-foreground/30 text-foreground/80 hover:border-primary hover:text-primary transition-colors duration-200 uppercase"
              >
                View Work
              </Link>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="text-muted-foreground/40 text-lg"
              >
                ↓
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── Marquee ticker ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Marquee />
        </motion.div>

        {/* ── What Drives the Work ── */}
        <section className="flex flex-col gap-20 py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground border-b border-border/30 pb-4">
              WHAT DRIVES THE WORK
            </p>
          </motion.div>

          <div className="flex flex-col divide-y divide-border/20">
            {[
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
            ].map((item, i) => (
              <motion.div
                key={item.num}
                className="flex gap-12 md:gap-24 py-10 md:py-14 items-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <span className="font-mono text-xs text-muted-foreground/50 tracking-widest pt-1 shrink-0 w-8">
                  {item.num}
                </span>
                <div className="flex flex-col md:flex-row md:items-start md:gap-16 flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight shrink-0 mb-3 md:mb-0 md:w-56">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base max-w-xl">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Selected Work ── */}
        <section className="pb-24">
          <motion.div
            className="flex items-center justify-between pb-0 mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
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

          <div className="flex flex-col divide-y divide-border/20 mt-8">
            {[
              {
                href: "/work/memory-in-a-scent",
                num: "02",
                tag: "SPECULATIVE DESIGN · ARDUINO",
                title: "MEMORY IN A SCENT",
              },
              {
                href: "/work/riverrenew-mataniko",
                num: "03",
                tag: "SUSTAINABLE SYSTEMS · NbS",
                title: "RIVERRENEW MATANIKO",
              },
            ].map((p, i) => (
              <motion.div
                key={p.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <Link
                  href={p.href}
                  className="group flex items-center justify-between py-8 md:py-10 gap-6"
                >
                  <div className="flex items-baseline gap-6 md:gap-10 min-w-0">
                    <span className="font-mono text-xs text-muted-foreground/50 tracking-widest shrink-0">
                      {p.num}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300 truncate">
                      {p.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <span className="hidden md:block text-xs font-mono tracking-widest text-muted-foreground/50 uppercase">
                      {p.tag}
                    </span>
                    <span className="text-foreground/30 group-hover:text-primary transition-colors duration-300 text-xl">
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
