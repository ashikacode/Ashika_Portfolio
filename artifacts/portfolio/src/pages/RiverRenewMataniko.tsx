import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const cs = {
  label: { color: "#003049", opacity: 0.55, borderColor: "#003049" },
  accent: { color: "#003049" },
  box: { backgroundColor: "#003049", color: "#fcf5e9" },
  boxMuted: { color: "#fcf5e9", opacity: 0.75 },
  border: { borderColor: "#003049" },
};

export default function RiverRenewMataniko() {
  return (
    <>
      <Helmet>
        <title>RiverRenew Mataniko | Ashika Ramesh</title>
        <meta name="description" content="A nature-based riverbank restoration system designed to stabilize riverbanks and purify water for Honiara's most vulnerable settlements." />
      </Helmet>

      <motion.article
        className="flex flex-col gap-24 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ── Hero ── */}
        <header className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 items-start">
            <span
              className="text-xs font-mono tracking-widest px-3 py-1 rounded-sm border"
              style={{ color: "#003049", borderColor: "#003049", opacity: 0.65 }}
            >
              03 · SUSTAINABLE SYSTEMS · NATURE-BASED SOLUTIONS
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: "#003049" }}>
              RIVERRENEW MATANIKO
            </h1>
          </div>

          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden" style={{ border: "1px solid #003049", opacity: 0.9 }}>
            <img
              src="/riverrenew-hero.png"
              alt="RiverRenew Mataniko — before and after riverbank restoration"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* ── Main Content ── */}
          <div className="lg:col-span-8 flex flex-col gap-20">

            {/* The Problem */}
            <section className="flex flex-col gap-6">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049", opacity: 1 }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#003049", opacity: 0.55 }}>
                  THE PROBLEM
                </h2>
              </div>
              <div className="flex flex-col gap-5 leading-relaxed text-lg" style={{ color: "#0a0a0a" }}>
                <p>
                  The Mataniko River Catchment in Honiara faces critical ecological and public health crises. Rapid urbanization and the expansion of informal settlements have led to the discharge of untreated sewage and industrial waste directly into the waterway. Consequently, the river shows dangerously high levels of E. coli and faecal coliforms, particularly in high-density downstream areas like Koa Hill and Lord Howe.
                </p>
                <p>
                  Additionally, climate-induced heavy rainfall and unstable soil structures cause significant riverbank erosion and slumping, which threatens the physical safety of riverside dwellings.
                </p>
              </div>
            </section>

            {/* The Objective */}
            <section className="flex flex-col gap-10">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049", opacity: 1 }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#003049", opacity: 0.55 }}>
                  THE OBJECTIVE
                </h2>
              </div>

              <p className="text-2xl font-bold leading-snug max-w-2xl" style={{ color: "#003049" }}>
                The primary goal is to restore the Mataniko riverbanks using innovative, low-cost, and nature-based solutions (NbS).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "STABILIZE SLOPES", body: "Implement structural support to combat soil erosion and bank collapse." },
                  { title: "IMPROVE WATER QUALITY", body: "Use natural filtration to remove sediments, chemical toxins, and pathogens from runoff." },
                  { title: "EMPOWER COMMUNITIES", body: "Foster long-term stewardship through a participatory design approach with local residents." },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col gap-3 pl-4" style={{ borderLeft: "2px solid #003049" }}>
                    <h4 className="font-bold tracking-widest text-xs" style={{ color: "#003049" }}>{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#0a0a0a", opacity: 0.7 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* The Solutions */}
            <section className="flex flex-col gap-10">
              <div className="pb-3" style={{ borderBottom: "1px solid #003049", opacity: 1 }}>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#003049", opacity: 0.55 }}>
                  THE SOLUTIONS
                </h2>
              </div>

              <p className="text-lg leading-relaxed" style={{ color: "#0a0a0a" }}>
                The intervention utilizes a modular system of soft engineering that employs locally sourced, biodegradable materials.
              </p>

              {/* Prototype image — standalone, integrated */}
              <div className="flex justify-center py-6">
                <img
                  src="/riverrenew-prototype-nobg.png"
                  alt="Layered filter pot — cross-section showing coconut husk, sandstone, volcanic soil, and charcoal core"
                  className="max-h-80 w-auto object-contain"
                />
              </div>

              {/* Solution cards */}
              <div className="flex flex-col gap-6">
                {[
                  {
                    title: "Layered Filter Pots",
                    body: "Woven coir baskets containing sandstone for debris, volcanic soil for microbial remediation, and charcoal for chemical adsorption.",
                  },
                  {
                    title: "Coir-Woven Rock Bags",
                    body: "Flexible gabion-style units filled with angular stones to reinforce the Rip-Rap Toe below the water line and dissipate wave energy.",
                  },
                  {
                    title: "Phytoremediation (Bio-Barriers)",
                    body: "Strategic planting of Vetiver Grass, which features a massive root system reaching depths of 5 meters to bind soil, and Dianella, a hardy shrub that traps surface sediment.",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-7 rounded-sm" style={cs.box}>
                    <h4 className="text-base font-bold mb-3 font-mono tracking-wide" style={{ color: "#fcf5e9" }}>
                      {item.title}
                    </h4>
                    <p className="leading-relaxed text-sm" style={{ color: "#fcf5e9", opacity: 0.78 }}>
                      {item.body}
                    </p>
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
                  { label: "LOCATION", value: "Mataniko River Catchment, Honiara, Solomon Islands" },
                  { label: "FIELD", value: "Nature-based solutions · Bank Stabilization · Community-Led · Climate Adaptation" },
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
