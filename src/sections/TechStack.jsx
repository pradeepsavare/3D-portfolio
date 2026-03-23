import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";

const TechCard3D = ({ techStackIcon }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x, y });
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
      style={{
        willChange: "transform",
        transform: hovering
          ? `perspective(800px) rotateX(${-tilt.y * 9}deg) rotateY(${tilt.x * 9}deg) translateZ(18px) scale(1.05)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
        transition: hovering
          ? "transform 0.09s ease-out, box-shadow 0.3s ease, border-color 0.3s ease"
          : "transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease, border-color 0.55s ease",
        boxShadow: hovering
          ? "0 28px 56px rgba(0,0,0,0.55), 0 0 40px rgba(102,232,255,0.15)"
          : undefined,
        borderColor: hovering ? "rgba(102,232,255,0.28)" : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setTilt({ x: 0, y: 0 });
        setGlowPos({ x: 50, y: 50 });
      }}
    >
      <div className="tech-card-animated-bg" />
      {/* Cursor-following inner glow */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(102,232,255,0.14) 0%, transparent 60%)`,
          transition: "opacity 0.3s ease",
          borderRadius: "inherit",
        }}
      />
      <div className="tech-card-content">
        <div className="tech-icon-wrapper">
          <TechIconCardExperience model={techStackIcon} />
        </div>
        <div className="padding-x w-full">
          <p>{techStackIcon.name}</p>
        </div>
      </div>
    </div>
  );
};

const TechStack = () => {
  // Animate the tech cards in the skills section
  useGSAP(() => {
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
          title="Core Technical Skills"
          sub="Java, Spring Boot, React, APIs, and Data Tools"
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
