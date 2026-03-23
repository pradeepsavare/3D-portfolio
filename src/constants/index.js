const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "Java", imgPath: "/images/code.svg" },
  { text: "Spring Boot", imgPath: "/images/concepts.svg" },
  { text: "React Dashboards", imgPath: "/images/designs.svg" },
  { text: "REST APIs", imgPath: "/images/ideas.svg" },
  { text: "MySQL", imgPath: "/images/code.svg" },
  { text: "Power BI", imgPath: "/images/concepts.svg" },
  { text: "Java", imgPath: "/images/code.svg" },
  { text: "Spring Boot", imgPath: "/images/concepts.svg" },
];

const counterItems = [
  { value: 6, suffix: "+", label: "Months of Hands-On Training" },
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 10, suffix: "+", label: "Core Technologies Used" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Backend Engineering",
    desc: "Building secure backend systems using Java, Spring Boot, Hibernate, JDBC, and MySQL.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Modern UI Development",
    desc: "Crafting responsive React.js interfaces with Tailwind CSS for dashboard and analytics products.",
  },
  {
    imgPath: "/images/time.png",
    title: "Data + API Integration",
    desc: "Connecting real-time utility and business data through REST APIs, dynamic rendering, and query handling.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React.js",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "SpringBoot",
    modelPath: "/models/spring-3.glb",
    scale: 0.1,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Java",
    modelPath: "/models/java-icon.glb",
    scale: 2.5,
    rotation: [0, 0, 0],
  },
  {
    name: "GitHub ",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review: "At iESG, I contributed to industrial utility dashboards with reusable frontend architecture and API-driven data flows for real-time insights.",
    imgPath: "/images/exp4.svg",
    logoPath: "/images/logo1.png",
    title: "Full Stack Developer Trainee - iESG, Pune",
    date: "Dec 2025 - Present",
    responsibilities: [
      "Built responsive React.js and Tailwind CSS dashboards for utility monitoring and analytics.",
      "Implemented REST API integration for sensor streams across boiler systems, feeder temperature, and water meter modules.",
      "Created reusable components and route structures to improve maintainability and user navigation.",
    ],
  },
  {
    review: "Completed intensive full stack training focused on production-style Java backend development, authentication, and end-to-end React integration.",
    imgPath: "/images/exp5.webp",
    logoPath: "/images/logo2.png",
    title: "Java Full Stack Developer Course - Kodnest, Bangalore",
    date: "Jul 2024 - Mar 2025",
    responsibilities: [
      "Developed full stack applications using Spring Boot backend and React.js frontend.",
      "Implemented JWT authentication, CRUD APIs, MVC architecture, and MySQL persistence.",
      "Worked with Maven, Postman, Git/GitHub, and Agile development workflows.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Utility Operations Team",
    mentions: "Vidyutt.io Stakeholder",
    review:
      "Pradeep built responsive React dashboards for our utility monitoring workflows and made complex sensor data easy to track in real time. The interface is clean, fast, and practical for daily operations.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Project Mentor",
    mentions: "iESG, Pune",
    review:
      "Pradeep delivered reusable frontend components and integrated REST APIs with a strong focus on maintainability. His approach to query handling and dynamic rendering improved both performance and developer productivity.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Full Stack Trainer",
    mentions: "Kodnest Program",
    review:
      "During training, Pradeep consistently built solid Java and Spring Boot solutions with proper MVC structure, JWT authentication, and clean database integration. He combines backend fundamentals with practical frontend execution.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Learning Platform Reviewer",
    mentions: "LearnSphere Project",
    review:
      "LearnSphere shows Pradeep's ability to design end-to-end systems for student and trainer workflows. The service-oriented architecture and feature planning demonstrate strong product thinking.",
    imgPath: "/images/client5.png",
  },
  {
    name: "API Integration Reviewer",
    mentions: "Industrial Dashboard Module",
    review:
      "Pradeep handled multiple utility endpoints and converted raw sensor streams into usable visual dashboards. His implementation is reliable and scalable for expanding modules like fire panels and water meters.",
    imgPath: "/images/client4.png",
  },
  {
    name: "Peer Developer",
    mentions: "Java Full Stack Cohort",
    review:
      "Pradeep is strong in both backend and frontend collaboration. He uses GitHub workflows effectively, writes clean code, and quickly adapts to new requirements across Java, React, and MySQL stacks.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    link: "https://www.instagram.com/its.me.decent_?igsh=MXZzazIyeWsyM2k2eA==",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
    link: "https://www.facebook.com/share/1DPXjL4jR2/",
  },
  {
    name: "git",
    imgPath: "/images/git.png",
    link: "https://github.com/pradeepsavare",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    link: "https://www.linkedin.com/in/pradeepsavare86",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
