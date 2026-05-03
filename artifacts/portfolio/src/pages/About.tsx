import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Ashika Ramesh</title>
        <meta name="description" content="Ashika Ramesh is a Learning, Service and UX Research designer based in Melbourne/NAARM. RMIT Master of Design Innovation and Technology." />
      </Helmet>

      <motion.div
        className="flex flex-col gap-20 pb-24"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Header */}
        <motion.header variants={fadeUp} className="flex flex-col gap-6">
          <div className="border-b border-border/60 pb-4">
            <span className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">ABOUT</span>
          </div>
        </motion.header>

        {/* Portrait + Intro */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-4">
            <div className="w-full aspect-[3/4] bg-card rounded-sm overflow-hidden border border-border/20 relative">
              <img
                src="/ashika-photo.png"
                alt="Ashika Ramesh"
                className="w-full h-full object-cover object-top"
                width={600}
                height={800}
              />
            </div>
          </div>
          <div className="md:col-span-8 flex flex-col gap-6 text-lg leading-relaxed text-foreground/85">
            <p>
              I design how systems get experienced — working at the intersection of learning design, service design, and UX research to turn complex organizational challenges into environments that are functional and genuinely felt.
            </p>
            <p>
              Based in Melbourne/NAARM, I bring a multidisciplinary background spanning design research, service improvement, and systems thinking. My work is grounded in evidence, shaped by empathy, and built with rigor.
            </p>
          </div>
        </motion.div>

        {/* Education */}
        <motion.section variants={fadeUp} className="flex flex-col gap-8">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">Education</h2>
          </div>
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">2022 – 2024</span>
                <span className="font-mono text-xs text-primary tracking-wider">RMIT University, Melbourne</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-2">
                <h3 className="font-bold tracking-wide">Master's of Design Innovation and Technology</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Focus: Service Design, Systems Thinking, Design Research</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">2017 – 2021</span>
                <span className="font-mono text-xs text-primary tracking-wider">NIFT, Chennai</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-2">
                <h3 className="font-bold tracking-wide">Bachelor of Design</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">National Institute of Fashion Technology | Focus: Design Thinking, Pattern Making, Garment Construction</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Professional Experience */}
        <motion.section variants={fadeUp} className="flex flex-col gap-8">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">Professional Experience</h2>
          </div>
          <div className="flex flex-col gap-12">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">April 2025 – Present</span>
                <span className="font-mono text-xs text-primary tracking-wider">RMIT University</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-4">
                <h3 className="font-bold tracking-wide">Assistant, HDR Admissions and Scholarships</h3>
                <ul className="flex flex-col gap-3 text-foreground/80 text-sm leading-relaxed">
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Mapped and optimized end-to-end admissions workflows serving 1,000+ applicants annually, identifying critical pain points through stakeholder interviews and process analysis</li>
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Designed service improvements by synthesizing user feedback patterns and implementing system changes that reduced processing time by 20%</li>
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Collaborated with cross-functional teams to maintain service quality standards while managing sensitive data across diverse user segments</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">Feb 2024 – March 2025</span>
                <span className="font-mono text-xs text-primary tracking-wider">RMIT University</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-4">
                <h3 className="font-bold tracking-wide">Student Service Officer</h3>
                <ul className="flex flex-col gap-3 text-foreground/80 text-sm leading-relaxed">
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Served as primary touchpoint for 500+ student inquiries monthly, identifying recurring friction points in university systems through pattern analysis</li>
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Conducted informal user research through daily interactions, gathering insights that informed 3 policy recommendations for improved student experience</li>
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Designed and documented improved guidance workflows for complex fee and loan processes, reducing average resolution time from 72 to 48 hours</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">Aug – Dec 2022</span>
                <span className="font-mono text-xs text-primary tracking-wider">DDSN Interactive, Melbourne</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-4">
                <h3 className="font-bold tracking-wide">Design Intern</h3>
                <ul className="flex flex-col gap-3 text-foreground/80 text-sm leading-relaxed">
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Collaborated with marketing team to design visual content for multi-channel campaigns (email, social media, web, print)</li>
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Iterated on design concepts based on campaign performance metrics and stakeholder feedback</li>
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Maintained design consistency across touchpoints while working within brand guidelines and technical constraints</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">May 2021 – Jan 2022</span>
                <span className="font-mono text-xs text-primary tracking-wider">Cover It Up, Chennai</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-4">
                <h3 className="font-bold tracking-wide">Graphic Designer</h3>
                <ul className="flex flex-col gap-3 text-foreground/80 text-sm leading-relaxed">
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Designed A/B testing frameworks for social media campaigns serving 80K+ followers, using performance metrics to iterate design approaches and improve engagement by 35%</li>
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Conducted competitive analysis and market research to inform design strategy for licensed product lines (NASA, Disney, Marvel)</li>
                  <li className="flex gap-3"><span className="text-primary mt-1 shrink-0">—</span>Collaborated with cross-functional teams to maintain brand consistency across digital and print touchpoints</li>
                </ul>
              </div>
            </div>

          </div>
        </motion.section>

        {/* Core Competencies */}
        <motion.section variants={fadeUp} className="flex flex-col gap-8">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">Core Competencies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-border/25 bg-card/20 flex flex-col gap-5">
              <h3 className="font-mono text-xs tracking-[0.2em] text-primary uppercase">What I Love to Do</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Qualitative & Quantitative Research",
                  "Presentation & Storytelling",
                  "Journey Mapping",
                  "Process Mapping",
                  "A/B Testing",
                  "Stakeholder Interviews",
                  "Service Blueprinting",
                  "Design Thinking Methodologies",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-mono tracking-wider border border-border/30 bg-muted/15 text-foreground/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 border border-border/25 bg-card/20 flex flex-col gap-5">
              <h3 className="font-mono text-xs tracking-[0.2em] text-primary uppercase">What I Love to Use</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Figma",
                  "Adobe Photoshop",
                  "Adobe Illustrator",
                  "Adobe InDesign",
                  "Adobe Premiere Pro",
                  "Miro",
                  "Microsoft 365",
                  "Python",
                  "Database Management Systems",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 text-xs font-mono tracking-wider border border-border/30 bg-muted/15 text-foreground/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Internships & Other Experience */}
        <motion.section variants={fadeUp} className="flex flex-col gap-8">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">Internships & Other Experience</h2>
          </div>
          <div className="flex flex-col gap-8">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">Oct 2019 – Jan 2021</span>
                <span className="font-mono text-xs text-primary tracking-wider">TEDx Chennai</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-2">
                <h3 className="font-bold tracking-wide">Event Experience Designer</h3>
                <p className="text-foreground/75 text-sm leading-relaxed">Designed end-to-end event experiences, collaborating with stakeholders to create engaging spatial layouts and attendee journeys.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">Sep – Oct 2020</span>
                <span className="font-mono text-xs text-primary tracking-wider">HelpNow, Mumbai</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-2">
                <h3 className="font-bold tracking-wide">Design Intern</h3>
                <p className="text-foreground/75 text-sm leading-relaxed">Developed logotypes and icons for digital and print applications.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">Nov – Dec 2020</span>
                <span className="font-mono text-xs text-primary tracking-wider">ZYF TEX PVT LTD</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-2">
                <h3 className="font-bold tracking-wide">Footwear Design Intern</h3>
                <p className="text-foreground/75 text-sm leading-relaxed">Collaborated on product design development and market research for footwear product lines.</p>
              </div>
            </div>

          </div>
        </motion.section>

        {/* Research */}
        <motion.section variants={fadeUp} className="flex flex-col gap-8">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">Research</h2>
          </div>

          <div className="flex flex-col gap-6">
            {/* Paper */}
            <a
              href="https://dl.acm.org/doi/10.1145/3772318.3790973"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 border border-border/30 bg-card/20 flex flex-col gap-4 hover:border-primary/40 transition-colors duration-300"
              data-testid="link-chi-paper"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-primary tracking-wider uppercase">CHI 2026 — ACM Conference on Human Factors in Computing Systems</span>
                <span className="font-mono text-xs text-muted-foreground tracking-wider shrink-0">2026</span>
              </div>
              <h3 className="font-bold leading-snug tracking-wide group-hover:text-primary transition-colors duration-300">
                "My Tummy Has a Little Dragon": From Everyday Experiences of Gut Sounds to Interoceptive Interaction Design
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed font-mono">
                Nandini Pasumarthy · Mia Huong Nguyen · <span className="text-foreground/80">Ashika Ramesh Krishnan</span> · Maria F. Montoya · Rakesh Patibanda · Jessica Danaher · Rohit Ashok Khot · Elise van den Hoven · Florian 'Floyd' Mueller
              </p>
              <span className="text-muted-foreground/50 font-mono text-xs tracking-wider">DOI: 10.1145/3772318.3790973 ↗</span>
            </a>

            {/* ORCID */}
            <a
              href="https://orcid.org/0009-0000-4001-0893"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-6 py-4 border border-border/20 bg-card/10 hover:border-primary/30 transition-colors duration-300 w-fit"
              data-testid="link-orcid"
            >
              <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">ORCID Profile</span>
              <span className="font-mono text-xs text-primary tracking-wider group-hover:underline">0009-0000-4001-0893 ↗</span>
            </a>
          </div>
        </motion.section>

        {/* Certificates */}
        <motion.section variants={fadeUp} className="flex flex-col gap-8">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">Certificates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "UI/UX Design Specialization", issuer: "CalArts" },
              { title: "Introduction to Typography", issuer: "CalArts" },
              { title: "Introduction to Psychology", issuer: "Yale University" },
              { title: "Psychological First Aid", issuer: "Johns Hopkins University" },
            ].map((cert) => (
              <div
                key={cert.title}
                className="p-6 border border-border/25 bg-card/20 flex flex-col gap-2"
              >
                <span className="font-mono text-xs text-primary tracking-wider uppercase">{cert.issuer}</span>
                <span className="font-bold tracking-wide text-sm">{cert.title}</span>
              </div>
            ))}
          </div>
        </motion.section>

      </motion.div>
    </>
  );
}
