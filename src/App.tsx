import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Footer from './sections/Footer';
import Home from './pages/Home';

// Route-level code splitting: every page beyond Home is lazy-loaded so the
// initial bundle stays small and the home route stays fast.
const About = lazy(() => import('./pages/About'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const CreativePage = lazy(() => import('./pages/CreativePage'));
const CreativeDetail = lazy(() => import('./pages/CreativeDetail'));
const AnantVyuhaPage = lazy(() => import('./pages/AnantVyuha'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'));
const NowPage = lazy(() => import('./pages/NowPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteFallback() {
  return <div className="min-h-[60vh]" aria-hidden />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <div aria-hidden className="noise-overlay" />
      <CustomCursor />
      <Nav />
      <ScrollToTop />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/creative" element={<CreativePage />} />
            <Route path="/creative/:id" element={<CreativeDetail />} />
            <Route path="/anant-vyuha" element={<AnantVyuhaPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/now" element={<NowPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
