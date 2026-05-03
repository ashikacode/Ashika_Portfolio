import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { RiverRenewCard } from "@/components/RiverRenewCard";

export default function RiverRenewMataniko() {
  return (
    <>
      <Helmet>
        <title>RiverRenew Mataniko | Ashika Ramesh</title>
        <meta name="description" content="A nature-based riverbank restoration system designed to stabilize riverbanks and purify water for Honiara's most vulnerable settlements." />
      </Helmet>

      <article className="flex flex-col gap-24 pb-24">
        {/* Hero Section */}
        <header className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 items-start">
            <span className="text-xs font-mono tracking-widest text-muted-foreground bg-muted/30 px-3 py-1 rounded-sm border border-border/50">
              03 · SUSTAINABLE SYSTEMS · NATURE-BASED SOLUTIONS
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
              RIVERRENEW MATANIKO
            </h1>
          </div>

          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden border border-border/20">
            <RiverRenewCard />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 flex flex-col gap-24">
            
            <section className="flex flex-col gap-6">
              <div className="border-b border-border/60 pb-2">
                <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">THE PROBLEM</h2>
              </div>
              <div className="flex flex-col gap-6 text-foreground/80 leading-relaxed font-serif text-lg">
                <p>
                  The Mataniko River Catchment in Honiara faces critical ecological and public health crises. Rapid urbanization and the expansion of informal settlements have led to the discharge of untreated sewage and industrial waste directly into the waterway. Consequently, the river shows dangerously high levels of E. coli and faecal coliforms, particularly in high-density downstream areas like Koa Hill and Lord Howe.
                </p>
                <p>
                  Additionally, climate-induced heavy rainfall and unstable soil structures cause significant riverbank erosion and slumping, which threatens the physical safety of riverside dwellings.
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-12">
              <div className="border-b border-border/60 pb-2">
                <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">THE OBJECTIVE</h2>
              </div>
              
              <h3 className="text-2xl font-bold text-primary font-serif italic max-w-2xl">
                The primary goal is to restore the Mataniko riverbanks using innovative, low-cost, and nature-based solutions (NbS).
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="flex flex-col gap-4 border-l border-primary/30 pl-4">
                  <h4 className="font-bold tracking-widest text-sm text-primary">STABILIZE SLOPES</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Implement structural support to combat soil erosion and bank collapse.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 border-l border-primary/30 pl-4">
                  <h4 className="font-bold tracking-widest text-sm text-primary">IMPROVE WATER QUALITY</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Use natural filtration to remove sediments, chemical toxins, and pathogens from runoff.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 border-l border-primary/30 pl-4">
                  <h4 className="font-bold tracking-widest text-sm text-primary">EMPOWER COMMUNITIES</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Foster long-term stewardship through a participatory design approach with local residents.
                  </p>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-8">
              <div className="border-b border-border/60 pb-2">
                <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">THE SOLUTIONS</h2>
              </div>
              
              <div className="flex flex-col gap-12 text-foreground/80 leading-relaxed">
                <p className="text-lg">
                  The intervention utilizes a modular system of soft engineering that employs locally sourced, biodegradable materials.
                </p>
                
                <div className="flex flex-col gap-10">
                  <div className="bg-card/30 p-8 border border-border/50 rounded-sm">
                    <h4 className="text-lg font-bold mb-4 font-mono tracking-wide text-foreground">Layered Filter Pots</h4>
                    <p className="text-muted-foreground">Woven coir baskets containing sandstone for debris, volcanic soil for microbial remediation, and charcoal for chemical adsorption.</p>
                  </div>
                  
                  <div className="bg-card/30 p-8 border border-border/50 rounded-sm">
                    <h4 className="text-lg font-bold mb-4 font-mono tracking-wide text-foreground">Coir-Woven Rock Bags</h4>
                    <p className="text-muted-foreground">Flexible gabion-style units filled with angular stones to reinforce the Rip-Rap Toe below the water line and dissipate wave energy.</p>
                  </div>
                  
                  <div className="bg-card/30 p-8 border border-border/50 rounded-sm">
                    <h4 className="text-lg font-bold mb-4 font-mono tracking-wide text-foreground">Phytoremediation (Bio-Barriers)</h4>
                    <p className="text-muted-foreground">Strategic planting of Vetiver Grass, which features a massive root system reaching depths of 5 meters to bind soil, and Dianella, a hardy shrub that traps surface sediment.</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 sticky top-32">
            <div className="p-8 border border-border/50 bg-card/30 flex flex-col gap-8 text-sm">
              <h3 className="font-bold tracking-widest uppercase text-muted-foreground border-b border-border/50 pb-2">PROJECT DETAILS</h3>
              
              <dl className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <dt className="font-mono text-muted-foreground text-xs">LOCATION</dt>
                  <dd className="leading-snug">Mataniko River Catchment, Honiara, Solomon Islands</dd>
                </div>
                
                <div className="flex flex-col gap-2">
                  <dt className="font-mono text-muted-foreground text-xs">FIELD</dt>
                  <dd className="leading-snug flex flex-col gap-1">
                    <span>Nature-based solutions</span>
                    <span>Bank Stabilization</span>
                    <span>Community-Led</span>
                    <span>Climate Adaptation</span>
                  </dd>
                </div>
                
                <div className="flex flex-col gap-2">
                  <dt className="font-mono text-muted-foreground text-xs">YEAR</dt>
                  <dd className="leading-snug font-mono">2023</dd>
                </div>
              </dl>
            </div>
          </aside>

        </div>
      </article>
    </>
  );
}