import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const cs = {
  label: { color: "#003049", opacity: 0.55 },
  box: { backgroundColor: "#003049", color: "#fcf5e9" },
};

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
              <div className="flex flex-col gap-5 leading-relaxed" style={{ color: "#0a0a0a" }}>
                <p>The final prototype is a hybrid device that uses color analysis to specific scent profiles.</p>
                <p>
                  <strong style={{ color: "#003049" }}>Technical Execution:</strong> An Arduino Uno interfaces with an Adafruit TCS34725 RGB sensor to detect dominant photo colors. This data triggers ultrasonic piezoelectric atomizers to release a fine mist (10ml) of the essential oils.
                </p>
              </div>

              {/* Process diagram image */}
              <img
                src="/memory-scent-process.png"
                alt="Memory in a Scent — system schematic and process flow diagram"
                className="w-full h-auto object-contain mt-6"
              />
            </section>

            {/* Future Model */}
            <section className="flex flex-col gap-8">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049" }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={cs.label}>
                  FUTURE MODEL
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-sm">
                {["Electronic Nose", "Visual AI Recognition", "Mobile Pairing", "Machine Learning", "Expanded Library", "Compact Form"].map((item) => (
                  <div key={item} className="p-6 rounded-sm flex items-center justify-center text-center" style={cs.box}>
                    <span style={{ color: "#fcf5e9" }}>{item}</span>
                  </div>
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
