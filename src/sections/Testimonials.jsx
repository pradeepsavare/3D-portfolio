import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const headingWords = ["What", "People", "Say", "About", "Me?"];
  const subWords = ["Customer", "feedback", "highlights"];

  useGSAP(() => {
    gsap.from(".testimonials-heading-word", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.7)",
      stagger: 0.18,
      scrollTrigger: {
        trigger: ".testimonials-heading",
        start: "top 90%",
        once: true,
      },
    });

    gsap.from(".testimonials-sub-word", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.7)",
      stagger: 0.18,
      delay: 0.2,
      scrollTrigger: {
        trigger: ".testimonials-sub",
        start: "top 90%",
        once: true,
      },
    });

    gsap.fromTo(
      ".testimonial-item",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    gsap.to(".testimonial-spotlight", {
      yPercent: -18,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="flex-center section-padding relative overflow-hidden">
      <div className="testimonial-spotlight" aria-hidden="true" />
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title={
            <span className="testimonials-heading inline-flex flex-wrap justify-center gap-x-3 gap-y-2">
              {headingWords.map((word, index) => (
                <span key={`${word}-${index}`} className="overflow-hidden pb-1">
                  <span className="testimonials-heading-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          }
          sub={
            <span className="testimonials-sub inline-flex flex-wrap justify-center gap-x-2 gap-y-1">
              {subWords.map((word, index) => (
                <span key={`${word}-${index}`} className="overflow-hidden pb-1">
                  <span className="testimonials-sub-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          }
        />

        <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item opacity-0">
              <GlowCard card={testimonial} index={index}>
              <div className="flex items-center gap-3">
                <div>
                  <img src={testimonial.imgPath} alt="" />
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-white-50">{testimonial.mentions}</p>
                </div>
              </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
