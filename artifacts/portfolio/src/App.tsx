import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import LocationWidget from "@/components/LocationWidget";

// Pages
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import MemoryInAScent from "@/pages/MemoryInAScent";
import RiverRenewMataniko from "@/pages/RiverRenewMataniko";
import DiaCare from "@/pages/DiaCare";

const queryClient = new QueryClient();

const pageVariants: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
};

function Router() {
  const [location] = useLocation();
  const isCaseStudy = /^\/work\/.+/.test(location);
  const isHome = location === "/";

  return (
    <div
      className="flex flex-col min-h-[100dvh] selection:bg-primary selection:text-primary-foreground transition-colors duration-300 cursor-none"
      style={isCaseStudy ? { backgroundColor: "#fcf5e9", color: "#0a0a0a" } : {}}
    >
      <Cursor />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location}
          className={`flex-1 w-full ${isHome ? "h-[100dvh] overflow-hidden" : "pt-32 pb-16 max-w-6xl mx-auto px-6 md:px-12 lg:px-20"}`}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/work" component={Work} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/work/dicare" component={DiaCare} />
            <Route path="/work/memory-in-a-scent" component={MemoryInAScent} />
            <Route path="/work/riverrenew-mataniko" component={RiverRenewMataniko} />
            <Route component={NotFound} />
          </Switch>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <LocationWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
