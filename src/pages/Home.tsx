import Hero from '../sections/Hero';
import IdentityMap from '../sections/IdentityMap';
import ProjectUniverse from '../sections/ProjectUniverse';
import CreativeUniverse from '../sections/CreativeUniverse';

// The home page introduces the universe — it does not try to contain all
// of it. Journey, Skills, Certificates, Now and Anant Vyuha each have their
// own dedicated route, reachable from Nav and from links within these
// sections.
export default function Home() {
  return (
    <>
      <Hero />
      <IdentityMap />
      <ProjectUniverse />
      <CreativeUniverse />
    </>
  );
}
