import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Ashima Ramesh</title>
        <meta name="description" content="About Ashima Ramesh, a Learning, Service and UX Research designer." />
      </Helmet>

      <motion.div 
        className="flex flex-col gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header className="flex flex-col gap-8">
          <div className="border-b border-border/60 pb-4">
            <span className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">
              ABOUT
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">ASHIMA RAMESH</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
          <div className="md:col-span-4">
            <div className="w-full aspect-[3/4] bg-card rounded-sm overflow-hidden border border-border/30 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-muted/10 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-mono text-sm tracking-widest text-center px-4">
                PORTRAIT PLACEHOLDER
              </div>
            </div>
          </div>
          
          <div className="md:col-span-8 flex flex-col gap-8 max-w-2xl text-lg leading-relaxed text-foreground/90">
            <p>
              I am a Learning, Service and UX Research designer based in Melbourne/NAARM. 
            </p>
            <p>
              More content to be added here.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}