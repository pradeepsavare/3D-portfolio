import { useEffect, useRef, useState } from "react";
import { abilities } from "../constants";

const useMousePosition = (ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0, angle: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      // Calculate angle for directional glow
      const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      
      setPosition({ x, y, angle });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setPosition({ x: 0, y: 0, angle: 0 });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return { position, isHovering };
};

const FeatureCard = ({ imgPath, title, desc, index }) => {
  const cardRef = useRef(null);
  const { position, isHovering } = useMousePosition(cardRef);

  return (
    <div
      ref={cardRef}
      className="feature-card opacity-0 translate-y-8 transition-all duration-700 ease-out"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="relative h-full p-8 rounded-2xl bg-white/[0.02] overflow-hidden transition-all duration-300 ease-out"
        style={{
          transform: isHovering
            ? `perspective(1000px) rotateX(${position.y * -8}deg) rotateY(${position.x * 8}deg) scale3d(1.02, 1.02, 1.02)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        }}
      >
        {/* Base border */}
        <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none" />

        {/* Directional border glow - follows mouse */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `linear-gradient(${180 - position.angle}deg, 
              transparent 0%, 
              rgba(255,255,255,0.3) 15%, 
              rgba(255,255,255,0.5) 50%, 
              rgba(255,255,255,0.3) 85%, 
              transparent 100%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        {/* Corner glow based on mouse quadrant */}
        <div
          className="absolute w-32 h-32 rounded-full blur-2xl pointer-events-none transition-all duration-500"
          style={{
            opacity: isHovering ? 0.4 : 0,
            background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
            left: `${50 + position.x * 30}%`,
            top: `${50 + position.y * 30}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Inner glow following mouse */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: isHovering ? 0.1 : 0,
            background: `radial-gradient(400px circle at ${50 + position.x * 50}% ${50 + position.y * 50}%, rgba(255,255,255,0.6), transparent 50%)`,
          }}
        />

        {/* Content with parallax */}
        <div
          className="relative z-10 flex flex-col gap-5 transition-transform duration-300 ease-out"
          style={{
            transform: isHovering
              ? `translateX(${position.x * 8}px) translateY(${position.y * 8}px)`
              : "translateX(0) translateY(0)",
          }}
        >
          {/* Icon with glow */}
          <div className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 transition-all duration-300">
            <div
              className="absolute inset-0 rounded-xl transition-opacity duration-300"
              style={{
                opacity: isHovering ? 0.3 : 0,
                background: `radial-gradient(circle at ${50 - position.x * 50}% ${50 - position.y * 50}%, rgba(255,255,255,0.4), transparent 70%)`,
              }}
            />
            <img
              src={imgPath}
              alt={title}
              className="relative z-10 w-7 h-7 object-contain transition-all duration-300"
              style={{
                opacity: isHovering ? 1 : 0.8,
                transform: isHovering ? `translateX(${position.x * -4}px) translateY(${position.y * -4}px) scale(1.1)` : "scale(1)",
              }}
            />
          </div>

          {/* Text */}
          <h3 className="text-white text-xl font-medium">{title}</h3>
          <p className="text-white/50 text-base leading-relaxed">{desc}</p>
        </div>

        {/* Shine sweep */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(105deg, 
              transparent 40%, 
              rgba(255,255,255,0.03) 45%, 
              rgba(255,255,255,0.1) 50%, 
              rgba(255,255,255,0.03) 55%, 
              transparent 60%)`,
            transform: isHovering ? `translateX(${position.x * 20}%)` : "translateX(-100%)",
            transition: "transform 0.6s ease-out, opacity 0.3s",
            opacity: isHovering ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

const FeatureCards = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full px-6 lg:px-12 py-24">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {abilities.map((ability, index) => (
          <FeatureCard key={ability.title} {...ability} index={index} />
        ))}
      </div>

      <style jsx global>{`
        .feature-card.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default FeatureCards;