import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HoloImageWrapper = ({ children, className, style }) => {
  const wrapperRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50, angle: 225 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const angle = Math.atan2(y - 50, x - 50) * (180 / Math.PI);
    setMouse({ x, y, angle });
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
      {/* Iridescent rainbow layer */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
        style={{
          opacity: hovering ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: `linear-gradient(${mouse.angle + 90}deg,
            rgba(255,0,128,0.14) 0%,
            rgba(255,160,0,0.11) 16%,
            rgba(255,230,0,0.09) 32%,
            rgba(0,255,128,0.11) 48%,
            rgba(0,190,255,0.16) 64%,
            rgba(130,0,255,0.13) 80%,
            rgba(255,0,128,0.14) 100%)`,
          mixBlendMode: "overlay",
        }}
      />
      {/* Specular highlight following cursor */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
        style={{
          opacity: hovering ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
};

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <HoloImageWrapper className="image-wrapper">
              <img src="/images/project4.png" alt="Vidyutt.io App Interface" />
            </HoloImageWrapper>
            <div className="text-content">
              <h2>
                Vidyutt.io builds real-time utility dashboards for industrial sensors.
              </h2>
              <p className="text-white-50 md:text-xl">
                Developed with React.js, Tailwind CSS, and REST APIs using reusable components and dynamic data rendering.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <HoloImageWrapper className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/project5.png"
                  alt="Java Full Stack Training Projects"
                />
              </HoloImageWrapper>
              <h2>Java Full Stack Training Projects at Kodnest</h2>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <HoloImageWrapper className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/chatbuddy.png" alt="LearnSphere e-learning platform" />
              </HoloImageWrapper>
              <h2>ChatBuddy | MultiModel AI Chat</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
