import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const CounterCard = ({ item, onRef }) => {
  const cardRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        onRef(el);
      }}
      className="counter-card relative rounded-xl p-10 flex flex-col justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #18181f 0%, #222130 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        willChange: "box-shadow, border-color",
        transition: hovering
          ? "box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease"
          : "box-shadow 0.45s ease, border-color 0.45s ease, background 0.45s ease",
        boxShadow: hovering
          ? "0 20px 44px rgba(0,0,0,0.42), 0 0 32px rgba(102,232,255,0.12), inset 0 0 0 1px rgba(102,232,255,0.18)"
          : "0 14px 36px rgba(0,0,0,0.28)",
        borderColor: hovering
          ? "rgba(102,232,255,0.30)"
          : "rgba(255,255,255,0.07)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setGlowPos({ x: 50, y: 50 });
      }}
    >
      {/* Radial cyan glow following cursor */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(102,232,255,0.22) 0%, rgba(102,232,255,0.08) 26%, transparent 66%)`,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Top reflective edge highlight */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          opacity: hovering ? 0.8 : 0,
          background: `linear-gradient(90deg, transparent 0%, rgba(102,232,255,1) ${glowPos.x}%, transparent 100%)`,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Bottom glow bar */}
      <div
        className="absolute bottom-0 left-0 h-[3px] w-full pointer-events-none overflow-hidden"
        style={{
          opacity: hovering ? 1 : 0.55,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="h-full w-full"
          style={{
            transform: `translateX(${(glowPos.x - 50) * 0.3}%)`,
            background: "linear-gradient(90deg, transparent 0%, rgba(102,232,255,0.35) 18%, rgba(102,232,255,1) 50%, rgba(102,232,255,0.35) 82%, transparent 100%)",
            transition: hovering ? "transform 0.08s linear" : "transform 0.3s ease",
          }}
        />
      </div>
      <div className="relative z-10 mb-2 flex items-end gap-1">
        <div className="counter-number text-white-50 text-5xl font-bold leading-none">0</div>
        <div className="text-white-50/80 text-3xl font-bold leading-none">{item.suffix}</div>
      </div>
      <div className="text-white-50 text-lg relative z-10">{item.label}</div>
    </div>
  );
};

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      ".counter-card",
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#counter",
          start: "top 80%",
        },
      }
    );

    countersRef.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];
      const counterValue = { value: 0 };

      if (!numberElement || !item) return;

      gsap.to(counterValue, {
        value: item.value,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#counter",
          start: "top center",
        },
        onUpdate: () => {
          numberElement.textContent = Math.round(counterValue.value);
        },
      });
    }, counterRef);
  }, []);

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <CounterCard
            key={index}
            item={item}
            onRef={(el) => el && (countersRef.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
