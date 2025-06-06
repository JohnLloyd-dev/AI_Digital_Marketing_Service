import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import CaseStudies from "@/pages/CaseStudies";
<<<<<<< HEAD
import CaseStudyDetail from "@/pages/CaseStudyDetail";
=======
>>>>>>> cedbdcf0d4ed2d86ab91e4363435dc208190567a
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Pricing from "@/pages/Pricing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/case-studies" component={CaseStudies} />
<<<<<<< HEAD
      <Route path="/case-studies/:id" component={CaseStudyDetail} />
=======
>>>>>>> cedbdcf0d4ed2d86ab91e4363435dc208190567a
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/pricing" component={Pricing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <LiveChat />
    </TooltipProvider>
  );
}

export default App;
