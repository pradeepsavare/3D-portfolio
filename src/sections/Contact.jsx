import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const headingWords = ["Let", "us", "work", "together"];
  const subWords = [
    "Share",
    "your",
    "project",
    "idea",
    "and",
    "I",
    "will",
    "get",
    "back",
    "quickly",
  ];
  const recipientEmail = "pradeepsaware1@gmail.com";
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const openMailFallback = () => {
    const subject = encodeURIComponent(
      `Portfolio Contact: ${form.name || "New Message"}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (status) setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setStatus("Opening your mail app...");
    openMailFallback();
    setLoading(false);
    setForm({ name: "", email: "", message: "" });
  };

  useGSAP(() => {
    gsap.from(".contact-heading-word", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.7)",
      stagger: 0.18,
      scrollTrigger: {
        trigger: ".contact-heading",
        start: "top 90%",
        once: true,
      },
    });

    gsap.from(".contact-sub-word", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.7)",
      stagger: 0.18,
      delay: 0.2,
      scrollTrigger: {
        trigger: ".contact-sub",
        start: "top 90%",
        once: true,
      },
    });
  }, []);

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title={
            <span className="contact-heading inline-flex flex-wrap justify-center gap-x-3 gap-y-2">
              {headingWords.map((word, index) => (
                <span key={`${word}-${index}`} className="overflow-hidden pb-1">
                  <span className="contact-heading-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          }
          sub={
            <span className="contact-sub inline-flex flex-wrap justify-center gap-x-2 gap-y-1">
              {subWords.map((word, index) => (
                <span key={`${word}-${index}`} className="overflow-hidden pb-1">
                  <span className="contact-sub-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          }
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>

                {status && <p className="text-sm text-white-50" role="status">{status}</p>}
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
