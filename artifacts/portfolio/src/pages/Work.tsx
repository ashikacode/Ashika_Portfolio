import { Helmet } from "react-helmet-async";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";

const projects = [
  {
    id: "dicare",
    number: "01",
    categories: "LEARNING DESIGNER · HEALTH EDUCATION · SERVICE DESIGN",
    title: "DICARE",
    link: "/work",
    placeholder: true,
    image: null,
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

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 22, stiffness: 140 });
  const y = useSpring(rawY, { damping: 22, stiffness: 140 });

  const handleMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  const activeImage = hoveredId ? (projects.find((p) => p.id === hoveredId)?.image ?? null) : null;

  return (
    <>
      <Helmet>
        <title>Selected Work | Ashika Ramesh</title>
        <meta name="description" content="Selected projects by Ashika Ramesh across learning design, service design, and UX research." />
        <meta property="og:title" content="Selected Work | Ashika Ramesh" />
        <meta property="og:description" content="Selected projects by Ashika Ramesh across learning design, service design, and UX research." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashimaramesh.com/work" />
      </Helmet>

      {/* Floating image preview — fixed so it escapes layout */}
      <motion.div
        className="fixed pointer-events-none z-40 overflow-hidden"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-115%",
          width: 300,
          height: 220,
        }}
        animate={{
          opacity: activeImage ? 1 : 0,
          scale: activeImage ? 1 : 0.88,
        }}
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

      <div className="flex flex-col pt-8" onMouseMove={handleMouseMove}>
        {/* Page header */}
        <motion.div
          className="border-b border-border/30 pb-6 mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
            SELECTED WORK
          </p>
        </motion.div>

        {/* Project rows */}
        <div className="flex flex-col">
          {projects.map((project, index) => {
            const isClickable = !project.placeholder;

            const rowContent = (
              <motion.div
                className={`group flex items-center justify-between gap-6 py-10 md:py-14 w-full border-b border-border/20 ${
                  isClickable ? "cursor-none" : "opacity-40"
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{
                  opacity: isClickable ? 1 : 0.4,
                  y: 0,
                }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: index * 0.09 }}
                onMouseEnter={() => isClickable && setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Left: number + title + categories */}
                <div className="flex items-baseline gap-6 md:gap-10 min-w-0 flex-1">
                  <span className="font-mono text-xs text-muted-foreground/40 tracking-widest shrink-0 w-6">
                    {project.number}
                  </span>
                  <div className="flex flex-col gap-2 min-w-0">
                    <h2
                      className="font-bold tracking-tight transition-colors duration-300"
                      style={{
                        fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                        lineHeight: 1.0,
                        color:
                          hoveredId === project.id
                            ? "hsl(178 60% 50%)"
                            : "hsl(40 33% 93%)",
                        transition: "color 0.3s ease",
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
                    className="text-foreground/25 text-2xl shrink-0 transition-colors duration-300"
                    style={{
                      color:
                        hoveredId === project.id
                          ? "hsl(178 60% 50%)"
                          : undefined,
                    }}
                    animate={{ x: hoveredId === project.id ? 8 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    →
                  </motion.span>
                )}
              </motion.div>
            );

            return isClickable ? (
              <Link key={project.id} href={project.link} className="block">
                {rowContent}
              </Link>
            ) : (
              <div key={project.id}>{rowContent}</div>
            );
          })}
        </div>
      </div>
    </>
  );
}
