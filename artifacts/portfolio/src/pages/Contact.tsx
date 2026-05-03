import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ashika-ramesh9/" },
  { label: "Behance", href: "https://www.behance.net/ashikarame" },
];

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Ashika Ramesh</title>
        <meta name="description" content="Get in touch with Ashika Ramesh — open for collaborations, research partnerships, and new opportunities." />
      </Helmet>

      <div className="min-h-[80vh] flex flex-col justify-between py-12 md:py-20">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="border-b border-border/40 pb-4"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
            CONTACT
          </span>
        </motion.div>

        {/* Centre — main content */}
        <motion.div
          className="flex flex-col gap-10 md:gap-14 py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="text-lg md:text-xl text-foreground/60 tracking-wide max-w-sm">
            Open for collaborations, research partnerships, and new opportunities.
          </p>

          <a
            href="mailto:ashika.rameshk@gmail.com"
            className="group inline-block"
          >
            <span className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-snug text-foreground group-hover:text-primary transition-colors duration-500">
              ashika.rameshk
              <br />
              @gmail.com
            </span>
          </a>
        </motion.div>

        {/* Bottom row — location + socials */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 border-t border-border/40 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Based in</span>
            <span className="font-mono text-sm text-foreground/80">Melbourne / NAARM</span>
          </div>

          <div className="flex items-center gap-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm tracking-wide text-foreground/60 hover:text-primary transition-colors duration-300 underline underline-offset-4 decoration-border hover:decoration-primary"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </>
  );
}
