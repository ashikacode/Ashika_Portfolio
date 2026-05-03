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
        <title>Selected Work | Ashika Ramesh</title>
        <meta name="description" content="Selected projects by Ashika Ramesh across learning design, service design, and UX research." />
        <meta property="og:title" content="Selected Work | Ashika Ramesh" />
        <meta property="og:description" content="Selected projects by Ashika Ramesh across learning design, service design, and UX research." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashikaramesh.com/work" />
      </Helmet>

      <div className="flex flex-col gap-12">
        <header className="flex flex-col gap-8">
          <div className="border-b border-border/60 pb-4">
            <span className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">
              SELECTED WORK
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">PROJECTS</h1>
        </header>

        <div className="flex flex-col gap-16 md:gap-32 pb-16">
          {projects.map((project, index) => {
            const isClickable = !project.placeholder;
            
            const cardContent = (
              <motion.article 
                className={`group flex flex-col gap-6 w-full ${isClickable ? "cursor-pointer" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                {/* Project image / card */}
                <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden border border-border/30 relative bg-card">
                  {project.id === "riverrenew-mataniko" ? (
                    <img
                      src="/riverrenew-hero.png"
                      alt="RiverRenew Mataniko — riverbank restoration before and after"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-muted/10 opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-mono text-sm tracking-widest">
                        {project.placeholder ? "COMING SOON" : "IMAGE PLACEHOLDER"}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-4 px-2">
                  <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-muted-foreground">
                    <span>{project.number}</span>
                    <span className="text-primary/70">·</span>
                    <span>{project.categories}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h2>
                  
                  <p className="text-foreground/80 md:text-lg leading-relaxed max-w-4xl">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            );

            return isClickable ? (
              <Link key={project.id} href={project.link} className="block">
                {cardContent}
              </Link>
            ) : (
              <div key={project.id}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}