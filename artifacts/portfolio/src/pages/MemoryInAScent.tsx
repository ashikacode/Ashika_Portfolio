import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useState } from "react";
import { Wind, ScanEye, Smartphone, Package, BrainCircuit, Layers } from "lucide-react";

const cs = {
  label: { color: "#003049", opacity: 0.55 },
  box: { backgroundColor: "#003049", color: "#fcf5e9" },
};

const futureItems = [
  {
    icon: Wind,
    title: "Electronic nose",
    body: "Captures + recreates a wide scent range with greater precision",
    detail: "Next-gen biosensor arrays can distinguish thousands of molecular compounds, enabling accurate recreation of complex environmental scents far beyond the current three-atomiser palette.",
  },
  {
    icon: ScanEye,
    title: "Visual AI recognition",
    body: "Object + scene detection suggests contextual scents beyond colour",
    detail: "Computer vision models trained on scene semantics — a forest, a bakery, the ocean — would surface scent suggestions that go beyond dominant colour, anchoring memory in context.",
  },
  {
    icon: Smartphone,
    title: "Mobile integration",
    body: "Control selections, customise settings, receive recommendations",
    detail: "A companion app lets carers or users pre-load memory profiles, adjust atomiser intensity, and receive nudges when suggested scents align with logged emotional states.",
  },
  {
    icon: Package,
    title: "Compact form factor",
    body: "Sleek, portable device — tactile + sensory in one object",
    detail: "Moving from a desktop prototype to a palm-sized object expands reach into residential care, home visits, and moments of spontaneous recall anywhere.",
  },
  {
    icon: BrainCircuit,
    title: "Machine learning",
    body: "Learns user preferences over time; personalises scent associations",
    detail: "Feedback loops — did a scent trigger a positive memory response? — train a personal model that improves match accuracy with each interaction.",
  },
  {
    icon: Layers,
    title: "Expanded scent library",
    body: "Beyond 3 atomisers — blended, layered olfactory outputs",
    detail: "A modular cartridge system with 12+ scent channels opens up blended outputs, seasonal collections, and user-contributed profiles shared across the platform.",
  },
];

function FutureModelSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-8">
      {/* Divider heading */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px" style={{ background: "#003049", opacity: 0.2 }} />
        <h2
          className="text-xs font-mono font-bold tracking-[0.3em] uppercase shrink-0"
          style={{ color: "#003049", opacity: 0.55 }}
        >
          FUTURE MODEL
        </h2>
        <div className="flex-1 h-px" style={{ background: "#003049", opacity: 0.2 }} />
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {futureItems.map((item, i) => {
          const Icon = item.icon;
          const isSelected = selected === i;
          return (
            <motion.button
              key={item.title}
              onClick={() => setSelected(isSelected ? null : i)}
              className="text-left flex flex-col gap-4 p-6 rounded-sm w-full"
              style={{
                backgroundColor: "#003049",
                border: `1px solid ${isSelected ? "rgba(45,212,191,0.7)" : "rgba(252,245,233,0.06)"}`,
                cursor: "default",
              }}
              whileHover={{ y: -3, borderColor: "rgba(45,212,191,0.35)" }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: isSelected
                  ? "0 0 0 1px rgba(45,212,191,0.5), 0 8px 24px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Icon */}
              <div
                className="w-8 h-8 flex items-center justify-center rounded-sm"
                style={{
                  background: isSelected ? "rgba(45,212,191,0.18)" : "rgba(45,212,191,0.08)",
                  transition: "background 0.2s",
                }}
              >
                <Icon
                  size={16}
                  style={{ color: isSelected ? "#2dd4bf" : "rgba(45,212,191,0.7)" }}
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <div className="flex flex-col gap-2">
                <h3
                  className="font-bold text-sm leading-snug"
                  style={{ color: "#fcf5e9" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs leading-relaxed font-mono"
                  style={{ color: "rgba(252,245,233,0.55)" }}
                >
                  {item.body}
                </p>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {isSelected && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs leading-relaxed overflow-hidden"
                    style={{
                      color: "rgba(252,245,233,0.45)",
                      borderTop: "1px solid rgba(252,245,233,0.1)",
                      paddingTop: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {item.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <p
        className="text-xs font-mono tracking-wider"
        style={{ color: "#003049", opacity: 0.4 }}
      >
        TAP A CARD TO EXPAND
      </p>
    </section>
  );
}

export default function MemoryInAScent() {
  const [, navigate] = useLocation();
  return (
    <>
      <Helmet>
        <title>Memory in a Scent | Ashika Ramesh</title>
        <meta name="description" content="A portable device that uses scent to unlock memory, designed for the people who need it most." />
      </Helmet>

      <motion.article
        className="flex flex-col gap-24 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-xs font-mono tracking-widest mt-12">
          <button
            onClick={() => navigate("/work")}
            className="cursor-pointer bg-transparent border-none p-0 font-mono text-xs tracking-widest"
            style={{ color: "#003049", opacity: 0.7 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
          >
            ← WORK
          </button>
          <span style={{ color: "#003049", opacity: 0.3 }}>/</span>
          <span style={{ color: "#003049", opacity: 0.45 }}>MEMORY IN A SCENT</span>
        </nav>

        {/* ── Hero ── */}
        <header className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 items-start">
            <span
              className="text-xs font-mono tracking-widest px-3 py-1 rounded-sm border"
              style={{ color: "#003049", borderColor: "#003049", opacity: 0.65 }}
            >
              02 · SPECULATIVE DESIGN · HEALTH · ARDUINO
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: "#003049" }}>
              MEMORY IN A SCENT
            </h1>
          </div>

          <div
            className="w-full aspect-[16/9] md:aspect-[21/9] rounded-sm flex items-center justify-center"
            style={{ backgroundColor: "#003049" }}
          >
            <span className="font-mono text-sm tracking-widest" style={{ color: "#fcf5e9", opacity: 0.25 }}>
              IMAGE COMING SOON
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* ── Main Content ── */}
          <div className="lg:col-span-8 flex flex-col gap-20">

            {/* The Problem */}
            <section className="flex flex-col gap-6">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049" }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={cs.label}>
                  THE PROBLEM
                </h2>
              </div>
              <p className="text-lg leading-relaxed" style={{ color: "#0a0a0a" }}>
                Current human-computer interaction is digitally amnesic. While we can store thousands of high-definition 'flat files' in the cloud, our digital memories lack the chemical texture that makes a moment feel present in the body.
              </p>
            </section>

            {/* Opportunity */}
            <section className="flex flex-col gap-6">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049" }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={cs.label}>
                  OPPORTUNITY
                </h2>
              </div>
              <div className="flex flex-col gap-5 leading-relaxed" style={{ color: "#0a0a0a" }}>
                <p>
                  The objective was to improve quality of life by leveraging the Proustian Effect: the unique ability of scent to trigger vivid, autobiographical memories.
                </p>
                <p>
                  By identifying a non-pharmacological intervention opportunity for individuals suffering from early stage dementia or isolation.
                </p>
                <p className="p-6 rounded-sm italic" style={cs.box}>
                  <strong className="not-italic font-sans mr-2" style={{ opacity: 0.6 }}>Strategic Goal:</strong>
                  Reposition technology as a tool to unlock cherished memories through a portable, accessible olfactory display that translates visual data (photographs) into aromatic triggers.
                </p>
              </div>
            </section>

            {/* Solution Exploration */}
            <section className="flex flex-col gap-8">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049" }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={cs.label}>
                  SOLUTION EXPLORATION
                </h2>
              </div>
              <div className="flex flex-col gap-8 leading-relaxed" style={{ color: "#0a0a0a" }}>
                <p>The design journey involved moving from abstract concept to a functional and aesthetically balanced prototype.</p>

                <div className="flex flex-col gap-6">
                  {[
                    { label: "THE PROTOTYPE PIVOT", body: "Initial sketches explored cuboid, TV-like forms, but we pivoted to a combination of a wooden base and an acrylic lid to balance vintage nostalgia with modern precision." },
                    { label: "HURDLES", body: "Unlike RGB color mixing in vision, smell is not additive. Combining Odor A and Odor B doesn't result in a blend, but often an entirely new 'Odor C', making automated scent recreation a significant technical challenge." },
                    { label: "THE 'ICKINESS' FACTOR", body: "We had to account for individual genetic differences in scent perception. What is calming to one person can be 'icky' or 'overpowering' to another." },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-2">
                      <strong className="font-mono text-xs tracking-wide" style={{ color: "#003049" }}>{item.label}</strong>
                      <p style={{ color: "#0a0a0a", opacity: 0.8 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* The Portable Olfactory Display */}
            <section className="flex flex-col gap-8">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049" }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={cs.label}>
                  THE PORTABLE OLFACTORY DISPLAY
                </h2>
              </div>

              {/* Final prototype photo — hero image */}
              <figure className="flex flex-col gap-3">
                <img
                  src="/prototype-final.png"
                  alt="Memory in a Scent — final physical prototype: acrylic chamber on wooden base with printed memory photographs"
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "70vh" }}
                />
                <figcaption className="text-xs font-mono tracking-wider text-center" style={{ color: "#003049", opacity: 0.65 }}>
                  Final prototype — acrylic scent chamber, laser-cut wooden base, ultrasonic atomiser, and memory photographs
                </figcaption>
              </figure>

              <div className="flex flex-col gap-5 leading-relaxed" style={{ color: "#0a0a0a" }}>
                <p>The final prototype is a hybrid device that uses color analysis to specific scent profiles.</p>
                <p>
                  <strong style={{ color: "#003049" }}>Technical Execution:</strong> An Arduino Uno interfaces with an Adafruit TCS34725 RGB sensor to detect dominant photo colors. This data triggers ultrasonic piezoelectric atomizers to release a fine mist (10ml) of the essential oils.
                </p>
              </div>

              <img
                src="/memory-scent-process.png"
                alt="Memory in a Scent — system schematic and process flow diagram"
                className="w-full h-auto object-contain"
              />
            </section>

            {/* Future Model */}
            <FutureModelSection />

            {/* Prototype Development */}
            <section className="flex flex-col gap-8">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049" }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={cs.label}>
                  PROTOTYPE DEVELOPMENT
                </h2>
              </div>
              <p className="leading-relaxed" style={{ color: "#0a0a0a" }}>
                Iterating through material and structural decisions — from initial laser-cut wooden enclosures to the acrylic scent chamber — each build stage refined the device's form, fit, and function.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: "/prototype-build-1.png", caption: "Clear acrylic lid test-fitted over the laser-cut wooden base" },
                  { src: "/prototype-build-2.png", caption: "Photo slot mechanism — sliding the memory card into the base" },
                  { src: "/prototype-build-3.png", caption: "Structural prototype showing the two-chamber wooden form" },
                  { src: "/prototype-build-4.png", caption: "Assembly test with acrylic chamber, dimension annotations visible" },
                ].map(({ src, caption }) => (
                  <figure key={src} className="flex flex-col gap-2">
                    <img
                      src={src}
                      alt={caption}
                      className="w-full h-auto object-cover aspect-square"
                      style={{ filter: "brightness(0.97)" }}
                    />
                    <figcaption className="text-xs font-mono tracking-wider" style={{ color: "#003049", opacity: 0.6 }}>
                      {caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-4 sticky top-32">
            <div className="p-8 rounded-sm flex flex-col gap-8 text-sm" style={cs.box}>
              <h3 className="font-bold tracking-widest uppercase pb-3" style={{ color: "#fcf5e9", opacity: 0.55, borderBottom: "1px solid rgba(252,245,233,0.2)" }}>
                PROJECT DETAILS
              </h3>
              <dl className="flex flex-col gap-6">
                {[
                  { label: "TECHNOLOGY", value: "Arduino Uno, RGB Sensor, Ultrasonic Atomisers, I2C" },
                  { label: "KEY OBJECTIVE", value: "Speculative design + prototyping — exploring technology not as it is, but as it could be." },
                  { label: "PRIMARY USERS", value: "Early Stage Dementia & Alzheimer's patients, memory care environments" },
                  { label: "YEAR", value: "2023" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-2">
                    <dt className="font-mono text-xs" style={{ color: "#fcf5e9", opacity: 0.5 }}>{item.label}</dt>
                    <dd className="leading-snug" style={{ color: "#fcf5e9" }}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

        </div>
      </motion.article>
    </>
  );
}
