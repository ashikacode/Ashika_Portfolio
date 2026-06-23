import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import StickerCollage from "@/components/StickerCollage";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
  }),
};

const experience = [
  {
    period: "April 2025 – Present",
    org: "RMIT University",
    role: "Assistant, HDR Admissions and Scholarships",
    bullets: [
      "Mapped and optimized end-to-end admissions workflows serving 1,000+ applicants annually, identifying critical pain points through stakeholder interviews and process analysis",
      "Designed service improvements by synthesizing user feedback patterns and implementing system changes that reduced processing time by 20%",
      "Collaborated with cross-functional teams to maintain service quality standards while managing sensitive data across diverse user segments",
    ],
  },
  {
    period: "Feb 2024 – March 2025",
    org: "RMIT University",
    role: "Student Service Officer",
    bullets: [
      "Served as primary touchpoint for 500+ student inquiries monthly, identifying recurring friction points through pattern analysis",
      "Conducted informal user research through daily interactions, gathering insights that informed 3 policy recommendations for improved student experience",
      "Designed and documented improved guidance workflows, reducing average resolution time from 72 to 48 hours",
    ],
  },
  {
    period: "Aug – Dec 2022",
    org: "DDSN Interactive, Melbourne",
    role: "Design Intern",
    bullets: [
      "Collaborated with marketing team to design visual content for multi-channel campaigns (email, social media, web, print)",
      "Iterated on design concepts based on campaign performance metrics and stakeholder feedback",
      "Maintained design consistency across touchpoints while working within brand guidelines",
    ],
  },
  {
    period: "May 2021 – Jan 2022",
    org: "Cover It Up, Chennai",
    role: "Graphic Designer",
    bullets: [
      "Designed A/B testing frameworks for social media campaigns serving 80K+ followers, improving engagement by 35%",
      "Conducted competitive analysis and market research to inform design strategy for licensed product lines (NASA, Disney, Marvel)",
      "Collaborated with cross-functional teams to maintain brand consistency across digital and print touchpoints",
    ],
  },
];

const education = [
  {
    period: "2022 – 2024",
    org: "RMIT University, Melbourne",
    degree: "Master's of Design Innovation and Technology",
    focus: "Service Design, Systems Thinking, Design Research",
  },
  {
    period: "2017 – 2021",
    org: "NIFT, Chennai",
    degree: "Bachelor of Design",
    focus: "Design Thinking, Pattern Making, Garment Construction",
  },
];

const capabilities = [
  "Qualitative & Quantitative Research",
  "Presentation & Storytelling",
  "Journey Mapping",
  "Process Mapping",
  "A/B Testing",
  "Stakeholder Interviews",
  "Service Blueprinting",
  "Design Thinking Methodologies",
];

const tools = [
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Adobe Premiere Pro",
  "Miro",
  "Microsoft 365",
  "Python",
];

const certs = [
  { title: "UI/UX Design Specialization", issuer: "CalArts" },
  { title: "Introduction to Typography", issuer: "CalArts" },
  { title: "Introduction to Psychology", issuer: "Yale University" },
  { title: "Psychological First Aid", issuer: "Johns Hopkins University" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-border/30 pb-4 mb-12">
      <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Helmet>
        <title>About | Ashika Ramesh</title>
        <meta name="description" content="Ashika Ramesh is a Learning, Service and UX Research designer based in Melbourne/NAARM. RMIT Master of Design Innovation and Technology." />
      </Helmet>

      <div ref={aboutRef} className="flex flex-col gap-0 pb-24 overflow-x-clip">

        {/* ── Page label ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="border-b border-border/30 pb-4 mb-0"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">
            ABOUT
          </span>
        </motion.div>

        {/* ── Hero: photo + bio (with floating stickers) ── */}
        <motion.section
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative grid grid-cols-1 md:grid-cols-12 gap-0 mt-0 items-center"
        >
          <StickerCollage constraintsRef={aboutRef} />
          {/* Photo — centered in left column */}
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-border/20 flex items-center justify-center py-14">
            <div className="w-full overflow-hidden" style={{ maxHeight: "420px" }}>
              <img
                src="/ashika-photo.png"
                alt="Ashika Ramesh"
                className="w-full h-full object-cover object-top grayscale-[15%]"
                width={600}
                height={750}
              />
            </div>
          </div>

          {/* Bio — right column, vertically centered */}
          <div className="md:col-span-8 flex flex-col justify-center p-0 md:pl-14 py-14">
            <div className="flex flex-col gap-5 text-base leading-loose text-foreground/70 max-w-xl">
              <p>
                I work across education, digital products, and services — translating complex systems into user-centred workflows that create measurable outcomes for both people and organisations. My practice spans research synthesis, service optimisation, and visual communication, grounded in evidence and shaped by cross-functional collaboration.
              </p>
              <p>
                With a multidisciplinary background in design research and systems thinking, I'm dedicated to driving positive sociocultural change and improving learning outcomes especially for communities traditionally underserved by default experiences.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Experience ── */}
        <motion.section
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-24"
        >
          <SectionLabel>PROFESSIONAL EXPERIENCE</SectionLabel>
          <div className="flex flex-col">
            {experience.map((item, i) => (
              <motion.div
                key={item.role}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 border-b border-border/20"
              >
                <div className="md:col-span-4 flex flex-col gap-1.5">
                  <span className="font-mono text-xs text-muted-foreground/60 tracking-widest leading-relaxed">
                    {item.period}
                  </span>
                  <span className="font-mono text-xs text-primary tracking-wider">
                    {item.org}
                  </span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-5">
                  <h3 className="font-bold tracking-wide text-lg leading-snug">
                    {item.role}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm text-foreground/65 leading-relaxed">
                        <span className="text-primary/60 mt-1 shrink-0">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Education ── */}
        <motion.section
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-24"
        >
          <SectionLabel>EDUCATION</SectionLabel>
          <div className="flex flex-col">
            {education.map((item, i) => (
              <div
                key={item.degree}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 border-b border-border/20"
              >
                <div className="md:col-span-4 flex flex-col gap-1.5">
                  <span className="font-mono text-xs text-muted-foreground/60 tracking-widest">{item.period}</span>
                  <span className="font-mono text-xs text-primary tracking-wider">{item.org}</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-2">
                  <h3 className="font-bold tracking-wide">{item.degree}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Capabilities + Tools ── */}
        <motion.section
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-24"
        >
          <SectionLabel>CAPABILITIES</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border/20 border border-border/20">
            <div className="p-10 flex flex-col gap-6">
              <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                What I Love to Do
              </p>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 text-xs font-mono tracking-wider border border-border/25 text-foreground/65"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-10 flex flex-col gap-6">
              <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                What I Love to Use
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-xs font-mono tracking-wider border border-border/25 text-foreground/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Research ── */}
        <motion.section
          custom={5}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-24"
        >
          <SectionLabel>RESEARCH</SectionLabel>
          <div className="flex flex-col gap-4">
            <a
              href="https://dl.acm.org/doi/10.1145/3772318.3790973"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-10 border border-border/25 flex flex-col gap-4 hover:border-primary/40 transition-colors duration-300"
              data-testid="link-chi-paper"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-primary tracking-wider uppercase">
                  CHI 2026 — ACM Conference on Human Factors in Computing Systems
                </span>
                <span className="font-mono text-xs text-muted-foreground tracking-wider shrink-0">2026</span>
              </div>
              <h3 className="font-bold leading-snug tracking-wide group-hover:text-primary transition-colors duration-300">
                "My Tummy Has a Little Dragon": From Everyday Experiences of Gut Sounds to Interoceptive Interaction Design
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed font-mono">
                Nandini Pasumarthy · Mia Huong Nguyen · <span className="text-foreground/80">Ashika Ramesh Krishnan</span> · Maria F. Montoya · Rakesh Patibanda · Jessica Danaher · Rohit Ashok Khot · Elise van den Hoven · Florian 'Floyd' Mueller
              </p>
              <span className="text-muted-foreground/40 font-mono text-xs tracking-wider">
                DOI: 10.1145/3772318.3790973 ↗
              </span>
            </a>
            <a
              href="https://orcid.org/0009-0000-4001-0893"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 p-6 border border-border/20 hover:border-primary/30 transition-colors duration-300 w-fit"
              data-testid="link-orcid"
            >
              <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">ORCID Profile</span>
              <span className="font-mono text-xs text-primary tracking-wider group-hover:underline">
                0009-0000-4001-0893 ↗
              </span>
            </a>
          </div>
        </motion.section>

        {/* ── Certificates ── */}
        <motion.section
          custom={6}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-24"
        >
          <SectionLabel>CERTIFICATES</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 border border-border/20">
            {certs.map((cert, i) => (
              <div
                key={cert.title}
                className={`p-8 flex flex-col gap-2 border-border/20 ${
                  i % 2 === 0 ? "md:border-r" : ""
                } ${i >= 2 ? "border-t" : ""}`}
              >
                <span className="font-mono text-xs text-primary tracking-wider uppercase">{cert.issuer}</span>
                <span className="font-bold tracking-wide text-sm">{cert.title}</span>
              </div>
            ))}
          </div>
        </motion.section>

      </div>
    </>
  );
}
