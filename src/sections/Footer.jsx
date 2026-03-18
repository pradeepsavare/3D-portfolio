import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-panel card-border rounded-2xl">
        <div className="footer-container">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Pradeep Savare</h3>
            <p className="text-white-50">
              Full Stack Developer focused on Java, Spring Boot, React.js, and data-driven interfaces.
            </p>
            <a href="mailto:pradeepsaware1@gmail.com" className="footer-link">
              pradeepsaware1@gmail.com
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="footer-links-grid">
              <a href="#work" className="footer-link">Projects</a>
              <a href="#experience" className="footer-link">Experience</a>
              <a href="#skills" className="footer-link">Skills</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <p className="text-white-50">Pune, India | +91 8618255944</p>
            <div className="socials justify-start md:justify-start">
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
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Pradeep Savare. All rights reserved.</p>
          <a href="#hero" className="footer-link">Back to top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
