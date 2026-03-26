import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";
import useInViewOnce from "../hooks/useInViewOnce";

gsap.registerPlugin(ScrollTrigger);

const TechCard3D = ({ techStackIcon }) => {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const hoveringRef = useRef(false);
  const { targetRef, isInView } = useInViewOnce({ threshold: 0.15, rootMargin: "140px 0px" });

  const setCardTransform = ({ x, y, glowX, glowY }, hovering) => {
    const cardNode = cardRef.current;
    if (!cardNode) return;

    cardNode.style.setProperty("--glow-x", `${glowX}%`);
    cardNode.style.setProperty("--glow-y", `${glowY}%`);

    cardNode.style.transform = hovering
      ? `perspective(800px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateZ(18px) scale(1.05)`
      : "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)";

    cardNode.style.transition = hovering
      ? "transform 0.09s ease-out, box-shadow 0.3s ease, border-color 0.3s ease"
      : "transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease, border-color 0.55s ease";

    cardNode.style.boxShadow = hovering
      ? "0 28px 56px rgba(0,0,0,0.55), 0 0 40px rgba(102,232,255,0.15)"
      : "";

    cardNode.style.borderColor = hovering ? "rgba(102,232,255,0.28)" : "";
  };

  const flushPointer = () => {
    frameRef.current = null;
    setCardTransform(pointerRef.current, hoveringRef.current);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    pointerRef.current = {
      x,
      y,
      glowX: ((e.clientX - rect.left) / rect.width) * 100,
      glowY: ((e.clientY - rect.top) / rect.height) * 100,
    };

    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(flushPointer);
    }
  };

  return (
    <div
      ref={cardRef}
      className="card-border tech-card tech-card-tilt overflow-hidden group xl:rounded-full rounded-lg"
      style={{ willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        hoveringRef.current = true;
        setCardTransform(pointerRef.current, true);
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        pointerRef.current = { x: 0, y: 0, glowX: 50, glowY: 50 };
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
        setCardTransform(pointerRef.current, false);
      }}
    >
      <div className="tech-card-animated-bg" />
      {/* Cursor-following inner glow */}
      <div
        className="absolute inset-0 pointer-events-none z-20 tech-card-glow"
        style={{ borderRadius: "inherit" }}
      />
      <div className="tech-card-content">
        <div ref={targetRef} className="tech-icon-wrapper">
          {isInView ? <TechIconCardExperience model={techStackIcon} /> : null}
        </div>
        <div className="padding-x w-full">
          <p>{techStackIcon.name}</p>
        </div>
      </div>
    </div>
  );
};

const TechStack = () => {
  const headingWords = ["Core", "Technical", "Skills"];
  const subWords = [
    "Java,",
    "Spring",
    "Boot,",
    "React,",
    "APIs,",
    "and",
    "Data",
    "Tools",
  ];

  // Animate the tech cards in the skills section
  useGSAP(() => {
    gsap.from(".skills-heading-word", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.7)",
      stagger: 0.18,
      scrollTrigger: {
        trigger: ".skills-heading",
        start: "top 90%",
        once: true,
      },
    });

    gsap.from(".skills-sub-word", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.7)",
      stagger: 0.18,
      delay: 0.2,
      scrollTrigger: {
        trigger: ".skills-sub",
        start: "top 90%",
        once: true,
      },
    });

    // This animation is triggered when the user scrolls to the #skills wrapper
    // The animation starts when the top of the wrapper is at the center of the screen
    // The animation is staggered, meaning each card will animate in sequence
    // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
    gsap.fromTo(
      ".tech-card",
      {
        // Initial values
        y: 50, // Move the cards down by 50px
        opacity: 0, // Set the opacity to 0
      },
      {
        // Final values
        y: 0, // Move the cards back to the top
        opacity: 1, // Set the opacity to 1
        duration: 1, // Duration of the animation
        ease: "power2.inOut", // Ease of the animation
        stagger: 0.2, // Stagger the animation by 0.2 seconds
        scrollTrigger: {
          trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
          start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
        },
      }
    );
  });

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title={
            <span className="skills-heading inline-flex flex-wrap justify-center gap-x-3 gap-y-2">
              {headingWords.map((word, index) => (
                <span key={`${word}-${index}`} className="overflow-hidden pb-1">
                  <span className="skills-heading-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          }
          sub={
            <span className="skills-sub inline-flex flex-wrap justify-center gap-x-2 gap-y-1">
              {subWords.map((word, index) => (
                <span key={`${word}-${index}`} className="overflow-hidden pb-1">
                  <span className="skills-sub-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          }
        />
        <div className="tech-grid">
          {/* Loop through the techStackIcons array and create a component for each item. 
              The key is set to the name of the tech stack icon, and the classnames are set to 
              card-border, tech-card, overflow-hidden, and group. The xl:rounded-full and rounded-lg 
              classes are only applied on larger screens. */}
          {techStackIcons.map((techStackIcon) => (
            <TechCard3D key={techStackIcon.name} techStackIcon={techStackIcon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
