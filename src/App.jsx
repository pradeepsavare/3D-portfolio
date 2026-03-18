import { useEffect } from "react";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import FullScreenStars from "./components/FullScreenStars";

const App = () => {
  useEffect(() => {
    const root = document.documentElement;

    const setMouseVars = (x, y) => {
      const xPercent = (x / window.innerWidth) * 100;
      const yPercent = (y / window.innerHeight) * 100;
      const xTilt = ((xPercent - 50) / 50) * 2.4;
      const yTilt = ((50 - yPercent) / 50) * 2.4;

      root.style.setProperty("--mouse-x", `${x}px`);
      root.style.setProperty("--mouse-y", `${y}px`);
      root.style.setProperty("--mouse-xp", `${xPercent}%`);
      root.style.setProperty("--mouse-yp", `${yPercent}%`);
      root.style.setProperty("--tilt-x", `${yTilt.toFixed(2)}deg`);
      root.style.setProperty("--tilt-y", `${xTilt.toFixed(2)}deg`);
    };

    const handleMouseMove = (event) => {
      setMouseVars(event.clientX, event.clientY);
    };

    const handleMouseLeave = () => {
      setMouseVars(window.innerWidth / 2, window.innerHeight / 2);
    };

    setMouseVars(window.innerWidth / 2, window.innerHeight / 2);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <FullScreenStars />
      <div className="mouse-aura" aria-hidden="true" />
      <div className="app-content">
        <Navbar />
        <Hero />
        <ShowcaseSection />
        <LogoShowcase />
        <FeatureCards />
        <Experience />
        <TechStack />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default App;
