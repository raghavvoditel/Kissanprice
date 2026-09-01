import "@/App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FarmerProvider } from "./context/FarmerContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";

// Route-level code splitting: keep the landing page (the most common entry
// point) in the main bundle, lazy-load the rest so first paint doesn't pay
// for recharts, every page's JS, etc. up front — meaningfully smaller initial
// download on slow connections.
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MandiComparison = lazy(() => import("./pages/MandiComparison"));
const PriceTrend = lazy(() => import("./pages/PriceTrend"));
const ColdStorage = lazy(() => import("./pages/ColdStorage"));
const ExportDirectory = lazy(() => import("./pages/ExportDirectory"));
const About = lazy(() => import("./pages/About"));

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <LanguageProvider>
      <FarmerProvider>
        <BrowserRouter>
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-stone-500">Loading…</div>}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mandi" element={<MandiComparison />} />
                <Route path="/trends" element={<PriceTrend />} />
                <Route path="/storage" element={<ColdStorage />} />
                <Route path="/export" element={<ExportDirectory />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </BrowserRouter>
      </FarmerProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
