import { Helmet } from "react-helmet-async";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "wouter";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "dicare",
    number: "01",
    categories: "LEARNING DESIGNER · HEALTH EDUCATION · GAME DESIGN",
    title: "DICARE",
    link: "/work/dicare",
    placeholder: false,
    image: "/dicare-hero.png",
  },
  {
    id: "memory-in-a-scent",
    number: "02",
    categories: "SPECULATIVE DESIGN · HEALTH · ARDUINO",
    title: "MEMORY IN A SCENT",
    link: "/work/memory-in-a-scent",
    placeholder: false,
    image: "/prototype-final.png",
  },
  {
    id: "riverrenew-mataniko",
    number: "03",
    categories: "SUSTAINABLE SYSTEMS · NATURE-BASED SOLUTIONS",
    title: "RIVER RENEW MATANIKO",
    link: "/work/riverrenew-mataniko",
    placeholder: false,
    image: "/riverrenew-hero.png",
  },
  {
    id: "third-space",
    number: "04",
    categories: "SERVICE DESIGN · CO-DESIGN",
    title: "THIRD SPACE",
    link: "/work",
    placeholder: true,
    image: null,
  },
];

export default function Work() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  // One ref slot per project row (outer wrapper used as ScrollTrigger trigger)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Framer-motion cursor-following image preview ──────────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 22, stiffness: 140 });
  const y = useSpring(rawY, { damping: 22, stiffness: 140 });

  const handleMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  const activeImage = hoveredId ? (projects.find((p) => p.id === hoveredId)?.image ?? null) : null;

  // ── GSAP ScrollTrigger setup ──────────────────────────────────────────────
  useEffect(() => {
    // gsap.context() collects every tween/trigger created inside; ctx.revert()
    // in the cleanup kills them all and removes applied CSS — zero memory leaks.
    const ctx = gsap.context(() => {

      // 1. Page header — clip-wipe from left on mount (no scroll needed)
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.1,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      rowRefs.current.forEach((row, i) => {
        if (!row) return;

        const inner = row.querySelector<HTMLElement>(".project-inner");
        const title = row.querySelector<HTMLElement>(".project-title");
        const num   = row.querySelector<HTMLElement>(".project-num");
        const arrow = row.querySelector<HTMLElement>(".project-arrow");

        // ── Clip-path reveal synced to scroll percentage ──────────────────
        // The row content wipes in from left as it scrolls into the viewport.
        if (inner) {
          gsap.fromTo(
            inner,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                end: "top 28%",
                scrub: 0.7,
              },
            }
          );
        }

        // ── 3D rotateX tilt on title, synced to scroll ───────────────────
        // The title "lifts" out of the page as it enters the viewport.
        // perspective is set on the parent row via CSS (see index.css).
        if (title) {
          gsap.fromTo(
            title,
            { rotateX: -22, transformOrigin: "50% 0%" },
            {
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                end: "top 35%",
                scrub: 0.9,
              },
            }
          );
        }

        // ── Number counter slides in — one-shot entrance ─────────────────
        if (num) {
          gsap.from(num, {
            x: -18,
            autoAlpha: 0,
            duration: 0.55,
            delay: i * 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        // ── Arrow bounces in with elastic ease ───────────────────────────
        if (arrow) {
          gsap.from(arrow, {
            scale: 0,
            autoAlpha: 0,
            duration: 0.6,
            delay: i * 0.04 + 0.12,
            ease: "elastic.out(1, 0.4)",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      // ── Scroll-velocity skewY ─────────────────────────────────────────────
      // As the user scrolls fast, all visible project rows skew slightly,
      // giving a sense of kinetic inertia. A proxy tween eases back to 0.
      const clamp = gsap.utils.clamp(-4, 4);
      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(".project-inner", "skewY", "deg");

      ScrollTrigger.create({
        onUpdate(self) {
          const target = clamp(self.getVelocity() / 180);
          proxy.skew = target;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.9,
            ease: "power3.out",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        },
      });

    }, containerRef); // scope to containerRef so selectors are sandboxed

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Selected Work | Ashika Ramesh</title>
        <meta name="description" content="Selected projects by Ashika Ramesh across learning design, service design, and UX research." />
        <meta property="og:title" content="Selected Work | Ashika Ramesh" />
        <meta property="og:description" content="Selected projects by Ashika Ramesh across learning design, service design, and UX research." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashikaramesh.com/work" />
      </Helmet>

      {/* Floating image preview — framer-motion spring cursor tracking */}
      <motion.div
        className="fixed pointer-events-none z-40 overflow-hidden"
        style={{ x, y, translateX: "-50%", translateY: "-115%", width: 300, height: 220 }}
        animate={{ opacity: activeImage ? 1 : 0, scale: activeImage ? 1 : 0.88 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {projects.map(
          (p) =>
            p.image && (
              <motion.img
                key={p.id}
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ opacity: hoveredId === p.id ? 1 : 0 }}
                transition={{ duration: 0.15 }}
              />
            ),
        )}
      </motion.div>

      <div
        ref={containerRef}
        className="flex flex-col pt-8"
        onMouseMove={handleMouseMove}
      >
        {/* Page header */}
        <div
          ref={headerRef}
          className="border-b border-border/30 pb-6 mb-0"
          style={{ clipPath: "inset(0 0% 0 0)" }}
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
            SELECTED WORK
          </p>
        </div>

        {/* Project rows */}
        <div className="flex flex-col">
          {projects.map((project, index) => {
            const isClickable = !project.placeholder;

            const rowContent = (
              /*
               * .project-inner receives clip-path, skewY, and houses selectors
               * for title, num, and arrow. It needs overflow:visible so
               * clip-path still crops the element without causing layout shifts.
               */
              <div
                className={`project-inner group flex items-center justify-between gap-6 py-10 md:py-14 w-full border-b border-border/20 ${
                  isClickable ? "cursor-none" : "opacity-40"
                }`}
                style={{ clipPath: "inset(0 0% 0 0)" }} // end-state pre-applied
                onMouseEnter={() => isClickable && setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Left: number + title + categories */}
                <div className="flex items-baseline gap-6 md:gap-10 min-w-0 flex-1">
                  <span
                    className="project-num font-mono text-xs text-muted-foreground/40 tracking-widest shrink-0 w-6"
                    style={{ visibility: "visible" }}
                  >
                    {project.number}
                  </span>
                  <div className="flex flex-col gap-2 min-w-0" style={{ perspective: "800px" }}>
                    <h2
                      className="project-title font-bold tracking-tight"
                      style={{
                        fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                        lineHeight: 1.0,
                        color:
                          hoveredId === project.id
                            ? "hsl(178 60% 50%)"
                            : "hsl(40 33% 93%)",
                        transition: "color 0.3s ease",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {project.title}
                    </h2>
                    <p className="text-xs font-mono tracking-widest text-muted-foreground/50 uppercase hidden md:block">
                      {project.categories}
                    </p>
                    {project.placeholder && (
                      <span className="text-xs font-mono tracking-widest text-muted-foreground/30 uppercase">
                        COMING SOON
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: arrow */}
                {isClickable && (
                  <motion.span
                    className="project-arrow text-foreground/25 text-2xl shrink-0 transition-colors duration-300"
                    style={{
                      color: hoveredId === project.id ? "hsl(178 60% 50%)" : undefined,
                    }}
                    animate={{ x: hoveredId === project.id ? 8 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    →
                  </motion.span>
                )}
              </div>
            );

            return (
              /*
               * Outer wrapper is the ScrollTrigger trigger element. GSAP reads
               * its position in the viewport to decide when to fire animations.
               */
              <div
                key={project.id}
                ref={(el: HTMLDivElement | null) => {
                  rowRefs.current[index] = el;
                }}
                className="project-row"
              >
                {isClickable ? (
                  <Link href={project.link} className="block">
                    {rowContent}
                  </Link>
                ) : (
                  <div>{rowContent}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
