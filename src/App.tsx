import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import StabilityDashboard from './components/sections/StabilityDashboard';
import DashboardPage from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard page */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Home page */}
        <Route
          path="/"
          element={
            <div className="min-h-screen">
              <Navbar />
              <main>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Experience />
                <Contact />
                
                {/* Stability Monitoring Dashboard */}
                <section id="stability" className="py-20 bg-gray-50">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">Network Stability Monitor</h2>
                      <p className="text-xl text-gray-600 mb-8">Real-time monitoring of Raspberry Pi network connectivity</p>
                      <StabilityDashboard />
                      <div className="mt-8 text-center">
                        <a href="/dashboard" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                          View Full Dashboard →
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
