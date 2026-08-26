/* Coastal Modernist route map: each chapter has a clear escape route back to the shared field guide shell. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteShell from "./components/SiteShell";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import Beaches from "./pages/Beaches";
import Culture from "./pages/Culture";
import Food from "./pages/Food";
import Experiences from "./pages/Experiences";
import Itineraries from "./pages/Itineraries";
import TravelGuide from "./pages/TravelGuide";
import PlanYourVisit from "./pages/PlanYourVisit";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/places/:slug" component={PlaceDetail} />
      <Route path="/places" component={Places} />
      <Route path="/beaches" component={Beaches} />
      <Route path="/culture" component={Culture} />
      <Route path="/food" component={Food} />
      <Route path="/experiences" component={Experiences} />
      <Route path="/itineraries" component={Itineraries} />
      <Route path="/travel-guide" component={TravelGuide} />
      <Route path="/plan-your-visit" component={PlanYourVisit} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <SiteShell><Router /></SiteShell>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
