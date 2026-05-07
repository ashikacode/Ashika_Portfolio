import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "wouter";

const projects = [
  {
    id: "dicare",
    number: "01",
    categories: "LEARNING DESIGNER · HEALTH EDUCATION · SERVICE DESIGN",
    title: "DICARE",
    description: "An educational game that reframes diabetes self-management for young kids — turning clinical complexity into play.",
    link: "/work",
    placeholder: true
  },
  {
    id: "memory-in-a-scent",
    number: "02",
    categories: "SPECULATIVE DESIGN · HEALTH · ARDUINO",
    title: "MEMORY IN A SCENT",
    description: "A portable device that uses scent to unlock memory, designed for the people who need it most.",
    link: "/work/memory-in-a-scent",
    placeholder: false
  },
  {
    id: "riverrenew-mataniko",
    number: "03",
    categories: "SUSTAINABLE SYSTEMS · NATURE-BASED SOLUTIONS",
    title: "RIVER RENEW MATANIKO",
    description: "A nature-based riverbank restoration system designed to stabilize riverbanks and purify water for Honiara's most vulnerable settlements.",
    link: "/work/riverrenew-mataniko",
    placeholder: false
  },
  {
    id: "third-space",
    number: "04",
    categories: "SERVICE DESIGN · CO-DESIGN",
    title: "THIRD SPACE",
    description: "A card game to co-design a local communities.",
    link: "/work",
    placeholder: true
  }
];

export default function Work() {
  return (
    <>
      <Helmet>
        <title>Selected Work | Ashima Ramesh</title>
        <meta name="description" content="Selected projects by Ashima Ramesh across learning design, service design, and UX research." />
        <meta property="og:title" content="Selected Work | Ashima Ramesh" />
        <meta property="og:description" content="Selected projects by Ashima Ramesh across learning design, service design, and UX research." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashimaramesh.com/work" />
      </Helmet>

      <div className="flex flex-col pt-8">

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

        {/* Project list */}
        <div className="flex flex-col divide-y divide-border/20">
          {projects.map((project, index) => {
            const isClickable = !project.placeholder;

            const rowContent = (
              <motion.div
                className={`group flex items-start justify-between gap-6 py-10 md:py-14 w-full ${isClickable ? "cursor-pointer" : "opacity-50"}`}
                initial={{ opacity: isClickable ? 0 : 0.3, y: 20 }}
                whileInView={{ opacity: isClickable ? 1 : 0.5, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
              >
                <div className="flex items-baseline gap-6 md:gap-10 min-w-0 flex-1">
                  <span className="font-mono text-xs text-muted-foreground/50 tracking-widest shrink-0 pt-1">
                    {project.number}
                  </span>
                  <div className="flex flex-col gap-3 min-w-0">
                    <h2
                      className="font-bold tracking-tight group-hover:text-primary transition-colors duration-300"
                      style={{ fontSize: "clamp(1.6rem, 4.5vw, 3.8rem)", lineHeight: 1.0 }}
                    >
                      {project.title}
                    </h2>
                    <p className="text-sm font-mono tracking-widest text-muted-foreground/60 uppercase hidden md:block">
                      {project.categories}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-sm max-w-xl mt-1 hidden md:block">
                      {project.description}
                    </p>
                    {project.placeholder && (
                      <span className="text-xs font-mono tracking-widest text-muted-foreground/30 uppercase">
                        COMING SOON
                      </span>
                    )}
                  </div>
                </div>
                {isClickable && (
                  <span className="text-foreground/25 group-hover:text-primary transition-colors duration-300 text-2xl shrink-0 pt-1">
                    →
                  </span>
                )}
              </motion.div>
            );

            return isClickable ? (
              <Link key={project.id} href={project.link} className="block">
                {rowContent}
              </Link>
            ) : (
              <div key={project.id}>
                {rowContent}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
