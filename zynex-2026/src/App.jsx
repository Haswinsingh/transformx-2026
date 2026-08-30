import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingFallback from "./components/LoadingFallback";
import Crosshair from "./components/Crosshair";

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const Logistics = lazy(() => import('./pages/Logistics'));
const Archives = lazy(() => import('./pages/Archives'));

function App() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-cyan-500/30">
      <Crosshair color="#00D9FF" />
      <ErrorBoundary>
        <Router future={{ 
          v7_startTransition: true, 
          v7_relativeSplatPath: true 
        }}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logistics" element={<Logistics />} />
              <Route path="/archives" element={<Archives />} />
            </Routes>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </div>
  )
}

export default App
