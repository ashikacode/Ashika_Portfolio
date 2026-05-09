import { Link } from "wouter";
import logoPath from "@assets/logo_transparent.png";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border/40 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 flex justify-between items-center">
        <Link href="/" className="z-50 block transition-opacity hover:opacity-75">
          <img
            src={logoPath}
            alt="Ashika Ramesh Logo"
            className="w-32 md:w-[180px] h-auto object-contain"
            data-testid="header-logo"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center" data-testid="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-mono tracking-[0.12em] text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-mono tracking-[0.12em] px-5 py-2 rounded-full border border-foreground/40 text-foreground hover:border-primary hover:text-primary transition-colors duration-200"
          >
            Let's Talk
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          data-testid="button-menu-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-10 transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } md:hidden`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-mono tracking-[0.12em] text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-xl font-mono tracking-[0.12em] px-8 py-3 rounded-full border border-foreground/40 text-foreground hover:border-primary hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
