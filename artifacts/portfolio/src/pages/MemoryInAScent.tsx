import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function MemoryInAScent() {
  return (
    <>
      <Helmet>
        <title>Memory in a Scent | Ashika Ramesh</title>
        <meta name="description" content="A portable device that uses scent to unlock memory, designed for the people who need it most." />
      </Helmet>

      <article className="flex flex-col gap-24 pb-24">
        {/* Hero Section */}
        <header className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 items-start">
            <span className="text-xs font-mono tracking-widest text-muted-foreground bg-muted/30 px-3 py-1 rounded-sm border border-border/50">
              02 · SPECULATIVE DESIGN · HEALTH · ARDUINO
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
              MEMORY IN A SCENT
            </h1>
          </div>

          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-card rounded-sm border border-border/30 relative">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-mono text-sm tracking-widest">
              HERO IMAGE PLACEHOLDER
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 flex flex-col gap-24">
            
            <section className="flex flex-col gap-6">
              <div className="border-b border-border/60 pb-2">
                <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">THE PROBLEM</h2>
              </div>
              <p className="text-lg leading-relaxed text-foreground/90 font-serif">
                Current human-computer interaction is digitally amnesic. While we can store thousands of high-definition 'flat files' in the cloud, our digital memories lack the chemical texture that makes a moment feel present in the body.
              </p>
            </section>

            <section className="flex flex-col gap-6">
              <div className="border-b border-border/60 pb-2">
                <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">OPPORTUNITY</h2>
              </div>
              <div className="flex flex-col gap-6 text-foreground/80 leading-relaxed">
                <p>
                  The objective was to improve quality of life by leveraging the Proustian Effect: the unique ability of scent to trigger vivid, autobiographical memories.
                </p>
                <p>
                  By identifying a non-pharmacological intervention opportunity for individuals suffering from early stage dementia or isolation.
                </p>
                <p className="p-6 bg-muted/20 border-l-2 border-primary italic">
                  <strong className="not-italic text-primary font-sans mr-2">Strategic Goal:</strong>
                  Reposition technology as a tool to unlock cherished memories through a portable, accessible olfactory display that translates visual data (photographs) into aromatic triggers.
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="border-b border-border/60 pb-2">
                <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">SOLUTION EXPLORATION</h2>
              </div>
              <div className="flex flex-col gap-8 text-foreground/80 leading-relaxed">
                <p>
                  The design journey involved moving from abstract concept to a functional and aesthetically balanced prototype.
                </p>
                
                <div className="grid gap-6">
                  <div className="flex flex-col gap-2">
                    <strong className="text-foreground font-mono text-sm tracking-wide">THE PROTOTYPE PIVOT</strong>
                    <p>Initial sketches explored cuboid, TV-like forms, but we pivoted to a combination of a wooden base and an acrylic lid to balance vintage nostalgia with modern precision.</p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <strong className="text-foreground font-mono text-sm tracking-wide">HURDLES</strong>
                    <p>Unlike RGB color mixing in vision, smell is not additive. Combining Odor A and Odor B doesn't result in a blend, but often an entirely new 'Odor C', making automated scent recreation a significant technical challenge.</p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <strong className="text-foreground font-mono text-sm tracking-wide">THE 'ICKINESS' FACTOR</strong>
                    <p>We had to account for individual genetic differences in scent perception. What is calming to one person can be 'icky' or 'overpowering' to another.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="border-b border-border/60 pb-2">
                <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">THE PORTABLE OLFACTORY DISPLAY</h2>
              </div>
              <div className="flex flex-col gap-6 text-foreground/80 leading-relaxed">
                <p>
                  The final prototype is a hybrid device that uses color analysis to specific scent profiles.
                </p>
                <p>
                  <strong className="text-foreground">Technical Execution:</strong> An Arduino Uno interfaces with an Adafruit TCS34725 RGB sensor to detect dominant photo colors. This data triggers ultrasonic piezoelectric atomizers to release a fine mist (10ml) of the essential oils.
                </p>
              </div>

              {/* Process Flow Diagram */}
              <div className="mt-12 p-8 bg-card border border-border/50 rounded-sm">
                <h3 className="text-xs font-mono tracking-widest text-muted-foreground mb-8 text-center">PROCESS FLOW</h3>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-center">
                  <div className="p-4 bg-muted/30 border border-border rounded-sm w-full md:w-auto">INSERT PHOTO</div>
                  <div className="text-primary">→</div>
                  <div className="p-4 bg-muted/30 border border-border rounded-sm w-full md:w-auto">RGB SENSOR READS</div>
                  <div className="text-primary">→</div>
                  <div className="p-4 bg-muted/30 border border-border rounded-sm w-full md:w-auto">COLOUR ANALYSIS</div>
                  <div className="text-primary">→</div>
                  
                  <div className="flex flex-col gap-4 w-full md:w-auto">
                    <div className="p-4 bg-primary/10 border border-primary/30 text-primary rounded-sm">SCENT DATABASE MATCH</div>
                    <div className="text-muted-foreground border border-dashed border-border/50 p-2 rounded-sm text-[10px]">No match: No scent released</div>
                  </div>
                  
                  <div className="text-primary">→</div>
                  <div className="p-4 bg-primary text-primary-foreground font-bold rounded-sm w-full md:w-auto">ATOMIZER FIRES</div>
                </div>
                
                <div className="mt-12 flex flex-col items-center gap-4">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">SCENT OUTPUTS</span>
                  <div className="flex gap-4">
                    <span className="px-4 py-1.5 rounded-full border border-orange-500/30 text-orange-400 bg-orange-500/10 text-xs tracking-wider">Orange</span>
                    <span className="px-4 py-1.5 rounded-full border border-purple-500/30 text-purple-400 bg-purple-500/10 text-xs tracking-wider">Lavender</span>
                    <span className="px-4 py-1.5 rounded-full border border-amber-700/30 text-amber-600 bg-amber-700/10 text-xs tracking-wider">Tobacco</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-8">
              <div className="border-b border-border/60 pb-2">
                <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-muted-foreground">FUTURE MODEL</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-sm">
                <div className="p-6 border border-border/50 bg-card/50 text-center flex items-center justify-center">Electronic Nose</div>
                <div className="p-6 border border-border/50 bg-card/50 text-center flex items-center justify-center">Visual AI Recognition</div>
                <div className="p-6 border border-border/50 bg-card/50 text-center flex items-center justify-center">Mobile Pairing</div>
                <div className="p-6 border border-border/50 bg-card/50 text-center flex items-center justify-center">Machine Learning</div>
                <div className="p-6 border border-border/50 bg-card/50 text-center flex items-center justify-center">Expanded Library</div>
                <div className="p-6 border border-border/50 bg-card/50 text-center flex items-center justify-center">Compact Form</div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 sticky top-32">
            <div className="p-8 border border-border/50 bg-card/30 flex flex-col gap-8 text-sm">
              <h3 className="font-bold tracking-widest uppercase text-muted-foreground border-b border-border/50 pb-2">PROJECT DETAILS</h3>
              
              <dl className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <dt className="font-mono text-muted-foreground text-xs">TECHNOLOGY</dt>
                  <dd className="leading-snug">Arduino Uno, RGB Sensor, Ultrasonic Atomisers, I2C</dd>
                </div>
                
                <div className="flex flex-col gap-2">
                  <dt className="font-mono text-muted-foreground text-xs">KEY OBJECTIVE</dt>
                  <dd className="leading-snug">Speculative design + prototyping — exploring technology not as it is, but as it could be.</dd>
                </div>
                
                <div className="flex flex-col gap-2">
                  <dt className="font-mono text-muted-foreground text-xs">PRIMARY USERS</dt>
                  <dd className="leading-snug">Early Stage Dementia & Alzheimer's patients, memory care environments</dd>
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