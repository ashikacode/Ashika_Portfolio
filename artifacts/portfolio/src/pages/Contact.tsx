import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ashika-ramesh9/" },
  { label: "Behance", href: "https://www.behance.net/ashikarame" },
  { label: "Instagram", href: "https://www.instagram.com/tinte.it/" },
];

const lineVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
};

export default function Contact() {
  const [emailHovered, setEmailHovered] = useState(false);

  return (
    <>
      <Helmet>
        <title>Contact | Ashima Ramesh</title>
        <meta name="description" content="Get in touch with Ashika Ramesh — open for collaborations, research partnerships, and new opportunities." />
      </Helmet>

      <div className="flex flex-col min-h-[80vh] gap-0">

        {/* Top label */}
        <motion.div
          className="border-b border-border/30 pb-4 mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
            CONTACT
          </span>
        </motion.div>

        {/* Big headline */}
        <div className="flex flex-col mt-16 mb-0">
          {["LET'S MAKE", "SOMETHING", "TOGETHER."].map((line, i) => (
            <div key={line} className="overflow-hidden leading-none">
              <motion.h1
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="font-bold uppercase"
                style={{
                  fontSize: "clamp(2.8rem, 9vw, 11rem)",
                  lineHeight: 0.9,
                  letterSpacing: "0.01em",
                  color:
                    i === 2
                      ? "hsl(178 60% 50%)"
                      : "hsl(40 33% 93%)",
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Divider + tagline */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-16 pt-8 border-t border-border/25"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-sm md:text-base text-foreground/50 font-mono leading-relaxed max-w-sm">
            Open for collaborations, research<br />
            partnerships and new opportunities.
          </p>

          {/* Social links */}
          <div className="flex gap-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/50 hover:text-primary transition-colors duration-300"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </motion.div>

        {/* Email — big interactive link */}
        <motion.div
          className="mt-16 mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          <a
            href="mailto:ashika.rameshk@gmail.com"
            className="group inline-flex items-center gap-6 border-b pb-4 w-full"
            style={{
              borderColor: emailHovered
                ? "hsl(178 60% 50% / 0.6)"
                : "hsl(40 33% 93% / 0.15)",
              transition: "border-color 0.4s ease",
            }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            <span
              className="font-bold tracking-tight transition-colors duration-400"
              style={{
                fontSize: "clamp(1.2rem, 3.2vw, 3.2rem)",
                color: emailHovered
                  ? "hsl(178 60% 50%)"
                  : "hsl(40 33% 93%)",
                transition: "color 0.4s ease",
              }}
            >
              ashika.rameshk@gmail.com
            </span>
            <motion.span
              className="text-2xl shrink-0"
              style={{
                color: emailHovered ? "hsl(178 60% 50%)" : "hsl(40 33% 93% / 0.3)",
                transition: "color 0.4s ease",
              }}
              animate={{ x: emailHovered ? 10 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              →
            </motion.span>
          </a>
        </motion.div>

      </div>
    </>
  );
}
