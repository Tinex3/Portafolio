import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import { SectionSkeleton } from './components/ui/Skeleton';

// Carga progresiva (loading-states skill): Hero crítico inmediato,
// secciones bajo el pliegue por code-splitting con skeleton de la
// misma forma para no mover el layout (CLS < 0.1) y stagger al revelar.
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Education = lazy(() => import('./components/sections/Education'));
const CloudArchitecture = lazy(() => import('./components/sections/CloudArchitecture'));
const Contact = lazy(() => import('./components/sections/Contact'));

export default function App() {
  return (
    <div className="min-h-screen">
      <a href="#contenido" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Suspense fallback={<SectionSkeleton label="Cargando perfil" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Cargando proyectos" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Cargando habilidades" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Cargando experiencia" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Cargando formación" />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Cargando arquitectura cloud" />}>
          <CloudArchitecture />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Cargando contacto" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
