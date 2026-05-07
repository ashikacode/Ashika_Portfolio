import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "wouter";

const MARQUEE_TEXT =
  "LEARNING DESIGN · SERVICE DESIGN · UX RESEARCH · CO-DESIGN · SYSTEMS THINKING · MELBOURNE/NAARM · ";

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border/30 py-4 select-none">
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
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
};

export default function Home() {
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

      <div className="flex flex-col">

        {/* ── Full-viewport hero ── */}
        <section className="min-h-screen flex flex-col justify-between -mt-32 pt-32 pb-10 relative overflow-hidden">

          {/* Massive headline */}
          <div className="flex-1 flex flex-col justify-center overflow-hidden">
            <div className="overflow-hidden">
              {["I design how", "systems get", "experienced."].map((line, i) => (
                <div key={line} className="overflow-hidden leading-none">
                  <motion.h1
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={lineVariants}
                    className="font-bold tracking-tight"
                    style={{
                      fontSize: "clamp(2.6rem, 9.8vw, 9rem)",
                      lineHeight: 0.95,
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

          {/* Bottom row: role + scroll */}
          <motion.div
            className="flex items-end justify-between pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase">
                Learning · Service · UX Research
              </p>
              <p className="text-xs font-mono tracking-[0.15em] text-muted-foreground/60 uppercase">
                Melbourne / NAARM
              </p>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/work"
                className="text-xs font-mono tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors border-b border-foreground/20 hover:border-primary pb-0.5 uppercase"
              >
                View Work →
              </Link>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="text-muted-foreground/50"
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
        <section className="flex flex-col gap-16 py-24">
          <motion.div
            className="border-b border-border/60 pb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-xs font-bold tracking-[0.22em] uppercase text-muted-foreground">
              WHAT DRIVES THE WORK
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
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
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <h3 className="text-xl font-bold tracking-wider">
                  {item.num} {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Selected Work teaser ── */}
        <section className="py-12 mb-12">
          <motion.div
            className="flex items-center justify-between border-t border-border/40 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-xs font-mono tracking-[0.22em] uppercase text-muted-foreground">
              SELECTED WORK
            </h2>
            <Link
              href="/work"
              className="text-xs font-mono tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              All Projects →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <Link
                  href={p.href}
                  className="group flex flex-col gap-3 border border-border/30 p-8 hover:border-primary/40 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-muted-foreground">
                    <span>{p.num}</span>
                    <span className="text-primary/50">·</span>
                    <span>{p.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {p.title}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground/50 tracking-widest group-hover:text-primary/60 transition-colors">
                    VIEW PROJECT →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
