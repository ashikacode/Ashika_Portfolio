import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import logoPath from "@assets/logo_transparent.png";
import { Link } from "wouter";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

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

      <div className="flex flex-col gap-32 mb-16">
        <motion.section 
          className="flex flex-col items-center text-center mt-12 md:mt-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.img 
            src={logoPath} 
            alt="Ashika Ramesh" 
            className="w-[280px] md:w-[420px] max-w-full h-auto mb-16"
            variants={itemVariants}
          />
          
          <motion.div className="max-w-3xl mx-auto flex flex-col gap-8" variants={itemVariants}>
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase">
              LEARNING · SERVICE · UX RESEARCH
            </div>
            
            <h1 className="text-2xl md:text-4xl font-normal italic text-primary font-serif">
              I design how systems gets experienced.
            </h1>
            
            <p className="text-base md:text-lg leading-relaxed text-foreground/90 max-w-2xl mx-auto">
              Through rigorous research, empathetic inquiry, and creative systems thinking, I turn layered organizational challenges into services and learning environments that are not only functional but genuinely felt.
            </p>
          </motion.div>
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col gap-12"
        >
          <motion.div variants={itemVariants} className="border-b border-border/60 pb-4">
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">
              WHAT DRIVES THE WORK
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h3 className="text-xl font-bold tracking-wider">01 CREATIVITY</h3>
              <p className="text-muted-foreground leading-relaxed">
                Finding the unexpected form that makes complexity legible and memorable.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h3 className="text-xl font-bold tracking-wider">02 EMPATHY</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every decision is evidence-informed. Research synthesis, measurable outcomes, and operational precision underpin the work.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h3 className="text-xl font-bold tracking-wider">03 RIGOR</h3>
              <p className="text-muted-foreground leading-relaxed">
                Systems are only as good as the humanity embedded in them. I design with people, not just for them.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}