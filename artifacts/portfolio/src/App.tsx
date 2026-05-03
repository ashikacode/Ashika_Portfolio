import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import MemoryInAScent from "@/pages/MemoryInAScent";
import RiverRenewMataniko from "@/pages/RiverRenewMataniko";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 pt-32 pb-16">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/work" component={Work} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/work/memory-in-a-scent" component={MemoryInAScent} />
          <Route path="/work/riverrenew-mataniko" component={RiverRenewMataniko} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
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