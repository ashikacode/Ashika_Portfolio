import { Link } from "wouter";
import { motion } from "framer-motion";
import logoPath from "@assets/ashika-logo.webp";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

// Spring presets
const NAV_SPRING = { type: "spring" as const, stiffness: 500, damping: 22 };
const CTA_SPRING = { type: "spring" as const, stiffness: 480, damping: 18 };

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/fun", label: "Fun Stuff" },
  ];

  const cvHref = `${import.meta.env.BASE_URL}Ashika_Ramesh_CV.pdf`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border/40 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 flex justify-between items-center">
        {/* Logo — compresses slightly on tap */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={NAV_SPRING}
          style={{ display: "inline-block" }}
        >
          <Link href="/" className="z-50 block transition-opacity hover:opacity-80">
            <img
              src={logoPath}
              alt="Ashika Ramesh Logo"
              className="w-32 md:w-[180px] h-auto object-contain"
              data-testid="header-logo"
            />
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center" data-testid="nav-desktop">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {/*
               * motion.span wraps the text so the spring applies to the
               * visual element without breaking the anchor's click area.
               */}
              <motion.span
                className="text-sm font-mono tracking-[0.12em] text-foreground/80 hover:text-foreground transition-colors cursor-none"
                style={{ display: "inline-block" }}
                whileHover={{ y: -3, color: "hsl(40 33% 93%)" }}
                whileTap={{ scale: 0.92, y: 0 }}
                transition={NAV_SPRING}
              >
                {link.label}
              </motion.span>
            </Link>
          ))}

          {/* CV — plain anchor so the browser downloads the file */}
          <motion.a
            href={cvHref}
            download="Ashika_Ramesh_CV.pdf"
            className="text-sm font-mono tracking-[0.12em] text-foreground/80 hover:text-foreground transition-colors cursor-none"
            style={{ display: "inline-block" }}
            whileHover={{ y: -3, color: "hsl(40 33% 93%)" }}
            whileTap={{ scale: 0.92, y: 0 }}
            transition={NAV_SPRING}
            data-testid="link-cv-download"
          >
            CV <span className="text-primary">↓</span>
          </motion.a>

          {/* CTA "Let's Talk" — elastic compress on click, lift on hover */}
          <motion.div
            style={{ display: "inline-block" }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.91 }}
            transition={CTA_SPRING}
          >
            <Link
              href="/contact"
              className="text-xs font-mono tracking-[0.1em] px-4 py-1.5 rounded-full border border-foreground/40 text-foreground hover:border-primary hover:text-primary transition-colors duration-200 block"
            >
              Let's Talk
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Toggle — spring bounce */}
        <motion.button
          className="md:hidden z-50 p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          data-testid="button-menu-toggle"
          whileTap={{ scale: 0.88 }}
          transition={NAV_SPRING}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out md:hidden ${
            isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              style={{ display: "inline-block" }}
              initial={false}
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.93 }}
              transition={{ ...NAV_SPRING, delay: isOpen ? i * 0.04 : 0 }}
            >
              <Link
                href={link.href}
                className="text-2xl font-mono tracking-[0.12em] text-foreground hover:text-primary transition-colors block"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          <motion.a
            href={cvHref}
            download="Ashika_Ramesh_CV.pdf"
            className="text-2xl font-mono tracking-[0.12em] text-foreground hover:text-primary transition-colors block"
            style={{ display: "inline-block" }}
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.93 }}
            transition={NAV_SPRING}
            onClick={() => setIsOpen(false)}
          >
            CV <span className="text-primary">↓</span>
          </motion.a>

          <motion.div
            style={{ display: "inline-block" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            transition={CTA_SPRING}
          >
            <Link
              href="/contact"
              className="text-xl font-mono tracking-[0.12em] px-8 py-3 rounded-full border border-foreground/40 text-foreground hover:border-primary hover:text-primary transition-colors block"
              onClick={() => setIsOpen(false)}
            >
              Let's Talk
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
