import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const links = [
  {
    label: "EMAIL",
    display: "ashika.rameshk@gmail.com",
    href: "mailto:ashika.rameshk@gmail.com",
    testId: "link-email",
  },
  {
    label: "LINKEDIN",
    display: "ashika-ramesh9",
    href: "https://www.linkedin.com/in/ashika-ramesh9/",
    testId: "link-linkedin",
  },
  {
    label: "BEHANCE",
    display: "ashikarame",
    href: "https://www.behance.net/ashikarame",
    testId: "link-behance",
  },
];

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Ashika Ramesh</title>
        <meta name="description" content="Get in touch with Ashika Ramesh — email, LinkedIn, and Behance." />
      </Helmet>

      <motion.div
        className="flex flex-col gap-16 min-h-[60vh] justify-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header className="flex flex-col gap-6">
          <div className="border-b border-border/60 pb-4">
            <span className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">CONTACT</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">GET IN TOUCH</h1>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Open for collaborations, interesting conversations, and new opportunities.
          </p>
        </header>

        <div className="flex flex-col divide-y divide-border/30">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center justify-between py-6 hover:text-primary transition-colors duration-300"
              data-testid={link.testId}
            >
              <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                {link.label}
              </span>
              <span className="font-bold tracking-wide text-lg group-hover:text-primary transition-colors duration-300">
                {link.display} ↗
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
