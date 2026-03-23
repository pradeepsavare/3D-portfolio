import { useRef, useState } from "react";
import { logoIconsList } from "../constants";

const LogoIcon = ({ icon }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      className="flex-none flex-center marquee-item"
      style={{
        willChange: "transform",
        transform: hovering
          ? `perspective(350px) rotateX(${-tilt.y * 18}deg) rotateY(${tilt.x * 18}deg) translateZ(22px) scale(1.18)`
          : "perspective(350px) rotateX(0) rotateY(0) translateZ(0) scale(1)",
        transition: hovering
          ? "transform 0.1s ease-out, filter 0.2s ease"
          : "transform 0.45s cubic-bezier(0.23,1,0.32,1), filter 0.35s ease",
        cursor: "pointer",
        zIndex: hovering ? 10 : "auto",
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setTilt({ x: 0, y: 0 });
      }}
    >
      <img
        src={icon.imgPath}
        alt={icon.name}
        style={{
          filter: hovering
            ? "drop-shadow(0 10px 24px rgba(102,232,255,0.55)) brightness(1.2)"
            : "none",
          transition: "filter 0.3s ease",
        }}
      />
    </div>
  );
};

const LogoShowcase = () => (
  <div className="md:my-20 my-10 relative">
    <div className="gradient-edge" />
    <div className="gradient-edge" />

    <div className="marquee h-52">
      <div className="marquee-box md:gap-12 gap-5">
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}

        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export default LogoShowcase;
