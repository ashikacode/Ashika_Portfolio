import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Ashika Ramesh</title>
        <meta name="description" content="Get in touch with Ashika Ramesh." />
      </Helmet>

      <motion.div 
        className="flex flex-col gap-12 min-h-[60vh] justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header className="flex flex-col gap-8 text-center items-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">GET IN TOUCH</h1>
          <p className="text-xl text-muted-foreground max-w-xl">
            Open for collaborations, interesting conversations, and new opportunities.
          </p>
          
          <a 
            href="mailto:hello@ashikaramesh.com" 
            className="mt-8 text-2xl md:text-4xl font-serif italic text-primary hover:text-foreground transition-colors duration-300"
          >
            hello@ashikaramesh.com
          </a>
        </header>
      </motion.div>
    </>
  );
}