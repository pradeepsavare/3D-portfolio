import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    accent: "#6EE7FF",
    accentDim: "#6EE7FF18",
    bg: "linear-gradient(135deg, #07131e 0%, #0d1f2f 60%, #0a2535 100%)",
    imageBg: "#0b2233",
    src: "/images/project4.png",
    alt: "Vidyutt.io App Interface",
    tag: "React · REST API · Tailwind CSS",
    title: "Vidyutt.io",
    subtitle: "Real-time Industrial Utility Dashboards",
    description:
      "Built real-time utility dashboards for industrial sensors using React.js, Tailwind CSS, and REST APIs. Features reusable component architecture and live dynamic data rendering.",
    icon: (color) => (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <rect x="2" y="14" width="5" height="12" rx="1.5" fill={color} opacity="0.9"/>
        <rect x="10" y="8" width="5" height="18" rx="1.5" fill={color} opacity="0.7"/>
        <rect x="18" y="2" width="5" height="24" rx="1.5" fill={color} opacity="0.5"/>
        <polyline points="4.5,14 11.5,8 19.5,2" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    accent: "#FFB347",
    accentDim: "#FFB34718",
    bg: "linear-gradient(135deg, #140f00 0%, #1e1600 60%, #271c00 100%)",
    imageBg: "#2a1e00",
    src: "/images/project5.png",
    alt: "Java Full Stack Training Projects",
    tag: "Spring Boot · React · MySQL",
    title: "Kodnest Full Stack",
    subtitle: "Employee Management System",
    description:
      "Built a full-stack Employee Management System using Spring Boot and React with complete CRUD operations, RESTful APIs, JWT authentication, and a responsive dashboard UI.",
    icon: (color) => (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <rect x="3" y="3" width="22" height="22" rx="4" stroke={color} strokeWidth="1.8" opacity="0.6"/>
        <circle cx="10" cy="11" r="3" fill={color} opacity="0.8"/>
        <path d="M5 23c0-3 2.5-5 5-5s5 2 5 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.7"/>
        <path d="M18 11h4M18 15h3" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    accent: "#FF6B8A",
    accentDim: "#FF6B8A18",
    bg: "linear-gradient(135deg, #140008 0%, #1e000f 60%, #270013 100%)",
    imageBg: "#2a0010",
    src: "/images/chatbuddy.png",
    alt: "ChatBuddy MultiModel AI Chat",
    tag: "AI · React · Dark / Light Mode",
    title: "ChatBuddy",
    subtitle: "MultiModel AI Chat Application",
    description:
      "A ChatGPT-like chatbot where users bring their own API key and choose from multiple AI models. Polished UI with seamless dark/light mode toggle and full conversation history.",
    icon: (color) => (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <path d="M4 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H8l-4 4V6z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" opacity="0.8"/>
        <circle cx="10" cy="12" r="1.2" fill={color}/>
        <circle cx="14" cy="12" r="1.2" fill={color} opacity="0.7"/>
        <circle cx="18" cy="12" r="1.2" fill={color} opacity="0.5"/>
      </svg>
    ),
  },
  {
    accent: "#A78BFA",
    accentDim: "#A78BFA18",
    bg: "linear-gradient(135deg, #08061a 0%, #0e0a26 60%, #130d30 100%)",
    imageBg: "#0d0a22",
    src: "/images/project6.png",
    alt: "smart-iam Admin UI",
    tag: "Admin UI · Logbook · Utilities",
    title: "smart-iam",
    subtitle: "Admin UI & Utility Logbook",
    description:
      "A comprehensive logbook dashboard for different utilities with configurable time windows, real-time status indicators, role-based access control, and a clean modern admin interface.",
    icon: (color) => (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <rect x="3" y="3" width="10" height="10" rx="2.5" fill={color} opacity="0.7"/>
        <rect x="15" y="3" width="10" height="10" rx="2.5" fill={color} opacity="0.45"/>
        <rect x="3" y="15" width="10" height="10" rx="2.5" fill={color} opacity="0.45"/>
        <rect x="15" y="15" width="10" height="10" rx="2.5" fill={color} opacity="0.25"/>
      </svg>
    ),
  },
];

// ── Holographic hover wrapper ────────────────────────────────────────────────
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
      <div
        className="absolute inset-0 rounded-none pointer-events-none z-10"
        style={{
          opacity: hovering ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: `linear-gradient(${mouse.angle + 90}deg,
            rgba(255,0,128,0.13) 0%, rgba(255,160,0,0.10) 16%,
            rgba(255,230,0,0.08) 32%, rgba(0,255,128,0.10) 48%,
            rgba(0,190,255,0.15) 64%, rgba(130,0,255,0.12) 80%,
            rgba(255,0,128,0.13) 100%)`,
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="absolute inset-0 rounded-none pointer-events-none z-10"
        style={{
          opacity: hovering ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.05) 35%, transparent 65%)`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
};

// ── Main Showcase ────────────────────────────────────────────────────────────
const AppShowcase = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [imageHovered, setImageHovered] = useState(false);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const DURATION = 5000;

  useGSAP(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, scrollTrigger: { trigger: cardRef.current, start: "top bottom-=100" } }
    );
  }, []);

  const goTo = useCallback(
    (next, dir) => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setProgress(0);
      setTimeout(() => {
        setCurrent(next);
        setAnimating(false);
      }, 420);
    },
    [animating]
  );

  const prev = () => {
    goTo((current - 1 + projects.length) % projects.length, -1);
    resetTimer();
  };

  const next = useCallback(() => {
    goTo((current + 1) % projects.length, 1);
  }, [current, goTo]);

  const startAutoPlay = useCallback(() => {
    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, 30);
    intervalRef.current = setTimeout(() => {
      clearInterval(progressRef.current);
      setCurrent((c) => (c + 1) % projects.length);
      setProgress(0);
    }, DURATION);
  }, []);

  const resetTimer = () => {
    clearTimeout(intervalRef.current);
    clearInterval(progressRef.current);
    setProgress(0);
    startAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      clearTimeout(intervalRef.current);
      clearInterval(progressRef.current);
    };
  }, [current, startAutoPlay]);

  const p = projects[current];

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full max-w-7xl mx-auto">

        {/* ════════════════════════════════════════
            MOBILE LAYOUT  (hidden on lg+)
        ════════════════════════════════════════ */}
        <div className="lg:hidden" ref={cardRef}>
          {/* Floating accent glow behind card */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-10 w-72 h-32 rounded-full blur-3xl pointer-events-none"
            style={{ background: `${p.accent}20`, transition: "background 0.7s ease" }}
          />

          {/* ── Full bleed image card ── */}
          <div
            className="relative w-full rounded-3xl overflow-hidden"
            style={{
              background: p.imageBg,
              transition: "background 0.6s ease",
              boxShadow: `0 0 0 1px rgba(255,255,255,0.07), 0 24px 48px rgba(0,0,0,0.6), 0 0 60px ${p.accent}18`,
              aspectRatio: "4/3",
            }}
          >
            <img
              src={p.src}
              alt={p.alt}
              className="w-full h-full object-cover"
              style={{
                transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(.4,0,.2,1)",
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `translateX(${direction * 32}px) scale(0.96)`
                  : "translateX(0) scale(1)",
              }}
            />

            {/* Full gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

            {/* Top bar: icon + tag */}
            <div
              className="absolute top-4 left-4 right-4 flex items-center justify-between"
              style={{ opacity: animating ? 0 : 1, transition: "opacity 0.4s ease" }}
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-2xl"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: `1px solid ${p.accent}50`,
                  backdropFilter: "blur(10px)",
                  boxShadow: `0 0 14px ${p.accent}30`,
                }}
              >
                {p.icon(p.accent)}
              </div>
            </div>

            {/* Bottom overlay: title + subtitle + description */}
            <div
              className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-12"
              style={{ opacity: animating ? 0 : 1, transition: "opacity 0.42s ease" }}
            >
              <h2 className="text-2xl font-extrabold text-white leading-tight tracking-tight">
                {p.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 mb-3">
                <div className="w-5 h-[2px] rounded-full" style={{ background: p.accent }} />
                <p className="text-xs font-semibold" style={{ color: `${p.accent}cc` }}>
                  {p.subtitle}
                </p>
              </div>
              <p className="text-white/55 text-xs leading-relaxed line-clamp-2">
                {p.description}
              </p>
            </div>
          </div>

          {/* ── Controls row ── */}
          <div className="mt-5 px-1 flex items-center justify-between">
            {/* Segmented progress + dots */}
            <div className="flex-1 space-y-3 mr-5">
              <div className="flex gap-1.5">
                {projects.map((proj, i) => (
                  <div
                    key={i}
                    className="flex-1 h-[2px] rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: i === current ? `${progress}%` : i < current ? "100%" : "0%",
                        background: proj.accent,
                        transition: i === current ? "width 0.03s linear" : "none",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 items-center">
                {projects.map((proj, i) => (
                  <button
                    key={i}
                    onClick={() => { goTo(i, i > current ? 1 : -1); resetTimer(); }}
                    aria-label={proj.title}
                    style={{
                      width: i === current ? "22px" : "6px",
                      height: "6px",
                      borderRadius: "9999px",
                      background: i === current ? proj.accent : "rgba(255,255,255,0.2)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.35s ease",
                      boxShadow: i === current ? `0 0 8px ${proj.accent}80` : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={prev}
                aria-label="Previous"
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8.5 11L4.5 7L8.5 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => { next(); resetTimer(); }}
                aria-label="Next"
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  border: `1px solid ${p.accent}55`,
                  background: `${p.accent}20`,
                  boxShadow: `0 0 16px ${p.accent}35`,
                  transition: "all 0.3s ease",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5.5 3L9.5 7L5.5 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            DESKTOP LAYOUT  (hidden below lg)
        ════════════════════════════════════════ */}
        <div
          className="hidden lg:block relative rounded-3xl overflow-hidden"
          style={{
            background: p.bg,
            transition: "background 0.7s ease, box-shadow 0.7s ease",
            boxShadow: `0 0 100px ${p.accent}14, 0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.06)`,
          }}
        >
          {/* Top-right glow orb */}
          <div
            className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full blur-[100px] pointer-events-none"
            style={{ background: `${p.accent}14`, transition: "background 0.7s ease" }}
          />
          {/* Bottom-left subtle orb */}
          <div
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: `${p.accent}08`, transition: "background 0.7s ease" }}
          />

          <div className="flex flex-row min-h-[540px]">
            {/* ── Image Panel ── */}
            <div
              className="relative flex-shrink-0"
              style={{
                width: imageHovered ? "65%" : "55%",
                transition: "width 0.55s cubic-bezier(.4,0,.2,1)",
              }}
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
              <HoloImageWrapper
                className="relative w-full h-full min-h-[360px] overflow-hidden"
                style={{ background: p.imageBg, transition: "background 0.5s ease" }}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-full object-cover"
                  style={{
                    transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(.4,0,.2,1)",
                    opacity: animating ? 0 : 1,
                    transform: animating
                      ? `translateX(${direction * 36}px) scale(0.97)`
                      : "translateX(0) scale(1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 pointer-events-none" />
              </HoloImageWrapper>
            </div>

            {/* ── Text Panel ── */}
            <div className="flex-1 flex flex-col justify-between px-12 py-10" style={{ transition: "all 0.55s cubic-bezier(.4,0,.2,1)" }}>
              <div
                style={{
                  transition: "opacity 0.42s ease, transform 0.42s cubic-bezier(.4,0,.2,1)",
                  opacity: animating ? 0 : 1,
                  transform: animating ? `translateX(${direction * 22}px)` : "translateX(0)",
                }}
              >
                {/* Icon badge */}
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                  style={{
                    background: `${p.accent}14`,
                    border: `1px solid ${p.accent}30`,
                    boxShadow: `0 0 20px ${p.accent}20`,
                    transition: "all 0.6s ease",
                  }}
                >
                  {p.icon(p.accent)}
                </div>

                {/* Tag pill */}
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border"
                    style={{
                      color: p.accent,
                      borderColor: `${p.accent}40`,
                      background: `${p.accent}10`,
                      transition: "all 0.6s ease",
                    }}
                  >
                    {p.tag}
                  </span>
                </div>

                <h2 className="text-[2.5rem] font-extrabold text-white leading-tight tracking-tight mb-2">
                  {p.title}
                </h2>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-6 h-[2px] rounded-full flex-shrink-0" style={{ background: p.accent, transition: "background 0.6s ease" }} />
                  <p className="text-sm font-semibold tracking-wide" style={{ color: `${p.accent}cc` }}>
                    {p.subtitle}
                  </p>
                </div>

                <p className="text-white/55 text-[0.95rem] leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* ── Controls ── */}
              <div className="mt-10 space-y-5">
                <div className="flex gap-1.5">
                  {projects.map((proj, i) => (
                    <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: i === current ? `${progress}%` : i < current ? "100%" : "0%",
                          background: proj.accent,
                          transition: i === current ? "width 0.03s linear, background 0.6s ease" : "background 0.6s ease",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    {projects.map((proj, i) => (
                      <button
                        key={i}
                        onClick={() => { goTo(i, i > current ? 1 : -1); resetTimer(); }}
                        aria-label={proj.title}
                        style={{
                          width: i === current ? "26px" : "7px",
                          height: "7px",
                          borderRadius: "9999px",
                          background: i === current ? proj.accent : "rgba(255,255,255,0.18)",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          transition: "all 0.35s ease",
                          boxShadow: i === current ? `0 0 8px ${proj.accent}80` : "none",
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      aria-label="Previous project"
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.accent}60`; e.currentTarget.style.background = `${p.accent}12`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M9.5 11.5L5.5 7.5L9.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => { next(); resetTimer(); }}
                      aria-label="Next project"
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ border: `1px solid ${p.accent}50`, background: `${p.accent}18`, boxShadow: `0 0 14px ${p.accent}28` }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${p.accent}30`; e.currentTarget.style.boxShadow = `0 0 22px ${p.accent}50`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = `${p.accent}18`; e.currentTarget.style.boxShadow = `0 0 14px ${p.accent}28`; }}
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M5.5 3.5L9.5 7.5L5.5 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop thumbnail strip */}
        <div className="hidden lg:flex gap-3 mt-4 overflow-x-auto pb-1">
          {projects.map((proj, i) => (
            <button
              key={i}
              onClick={() => { goTo(i, i > current ? 1 : -1); resetTimer(); }}
              aria-label={proj.title}
              className="flex-shrink-0 relative rounded-xl overflow-hidden flex flex-col items-start text-left"
              style={{
                width: "120px",
                background: i === current ? proj.bg : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${i === current ? proj.accent : "rgba(255,255,255,0.07)"}`,
                boxShadow: i === current ? `0 0 20px ${proj.accent}38` : "none",
                transform: i === current ? "translateY(-3px)" : "translateY(0)",
                transition: "all 0.35s ease",
              }}
            >
              <div className="w-full h-[58px] relative overflow-hidden" style={{ background: proj.imageBg }}>
                <img src={proj.src} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: i === current ? "transparent" : "rgba(0,0,0,0.5)" }} />
              </div>
              <div className="px-2.5 py-2">
                <p className="text-[10px] font-semibold leading-tight truncate w-full"
                  style={{ color: i === current ? proj.accent : "rgba(255,255,255,0.4)" }}>
                  {proj.title}
                </p>
              </div>
              {i === current && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: proj.accent }} />
              )}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AppShowcase;
