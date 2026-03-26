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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    let pointerFrame = null;
    let scrollFrame = null;
    let lastPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

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

    const flushPointer = () => {
      pointerFrame = null;
      setMouseVars(lastPointer.x, lastPointer.y);
    };

    const handleMouseMove = (event) => {
      if (prefersReducedMotion || isCoarsePointer) return;
      lastPointer = { x: event.clientX, y: event.clientY };
      if (!pointerFrame) pointerFrame = requestAnimationFrame(flushPointer);
    };

    const handleMouseLeave = () => {
      if (prefersReducedMotion || isCoarsePointer) return;
      lastPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      if (!pointerFrame) pointerFrame = requestAnimationFrame(flushPointer);
    };

    if (!prefersReducedMotion && !isCoarsePointer) {
      setMouseVars(window.innerWidth / 2, window.innerHeight / 2);
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    const setScrollVars = () => {
      const scrollTop = window.scrollY;
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollMax > 0 ? scrollTop / scrollMax : 0;

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-y", `${scrollTop}px`);
    };

    const scheduleScrollVars = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = null;
        setScrollVars();
      });
    };

    const revealTargets = Array.from(document.querySelectorAll(".reveal-on-scroll"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
    setScrollVars();
    window.addEventListener("scroll", scheduleScrollVars, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", scheduleScrollVars);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <FullScreenStars />
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-grid" />
        <div className="bg-orb bg-orb-cyan" />
        <div className="bg-orb bg-orb-rose" />
        <div className="bg-orb bg-orb-amber" />
      </div>
      <div className="mouse-aura" aria-hidden="true" />
      <div className="app-content">
        <Navbar />
        <div className="reveal-on-scroll reveal-delay-0">
          <Hero />
        </div>
        <div className="reveal-on-scroll reveal-delay-1">
          <ShowcaseSection />
        </div>
        <div className="reveal-on-scroll reveal-delay-2">
          <LogoShowcase />
        </div>
        <div className="reveal-on-scroll reveal-delay-1">
          <FeatureCards />
        </div>
        <div className="reveal-on-scroll reveal-delay-2">
          <Experience />
        </div>
        <div className="reveal-on-scroll reveal-delay-1">
          <TechStack />
        </div>
        <div className="reveal-on-scroll reveal-delay-2">
          <Testimonials />
        </div>
        <div className="reveal-on-scroll reveal-delay-1">
          <Contact />
        </div>
        <div className="reveal-on-scroll reveal-delay-0">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
