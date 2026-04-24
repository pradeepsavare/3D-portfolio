import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-panel card-border rounded-2xl">
        <div className="footer-container">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-white">Pradeep Savare</h3>
            <p className="text-white-50 text-sm sm:text-base">
              Full Stack Developer focused on Java, Spring Boot, React.js, and data-driven interfaces.
            </p>
            <a href="mailto:pradeepsaware1@gmail.com" className="footer-link text-sm sm:text-base break-all">
              pradeepsaware1@gmail.com
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-white">Quick Links</h4>
            <div className="footer-links-grid">
              <a href="#work" className="footer-link text-sm sm:text-base">Projects</a>
              <a href="#experience" className="footer-link text-sm sm:text-base">Experience</a>
              <a href="#skills" className="footer-link text-sm sm:text-base">Skills</a>
              <a href="#contact" className="footer-link text-sm sm:text-base">Contact</a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-white">Connect</h4>
            <p className="text-white-50 text-sm sm:text-base">Pune, India | +91 8618255944</p>
            <div className="socials justify-start flex-wrap gap-3">
              {socialImgs.map((socialImg, index) => (
                <a
                  key={index}
                  className="icon"
                  href={socialImg.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={socialImg.imgPath} alt={socialImg.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Resume */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-white">Resume</h4>
            <p className="text-white-50 text-sm sm:text-base">Download my latest resume to learn more about my experience and skills.</p>
            <a
              href="/Pradeep_Savare_Resume.pdf"
              download="Pradeep_Savare_Resume.pdf"
              className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-fit px-5 py-2.5 rounded-lg bg-[#1a1a2e] border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="text-xs sm:text-sm">© {new Date().getFullYear()} Pradeep Savare. All rights reserved.</p>
          <a href="#hero" className="footer-link text-xs sm:text-sm">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
