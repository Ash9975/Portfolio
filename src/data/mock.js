import heroimage from "../assets/ProfilePic.jpeg";

export const heroData = {
  name: "ASHISH PIMPALSHENDE",
  title: "FULL STACK DEVELOPER",
  tagline:
    "I build scalable full-stack web applications using the MERN stack, creating responsive user experiences backed by secure, high-performance APIs.",
  image: heroimage,
};

export const aboutData = {
  description:
    "I'm Ashish Pimpalshende, a B.Tech graduate in Artificial Intelligence & Data Science with a passion for building modern, user-centric web applications. I enjoy developing complete products from responsive frontend interfaces to secure and scalable backend systems. Over the past two years, I've built several full-stack applications using React, Node.js, Express, MongoDB, and ASP.NET Core while continuously improving my understanding of software architecture, authentication, performance optimization, and clean code practices. I'm always eager to learn new technologies, solve real-world problems, and contribute to impactful products as a Full Stack Developer.",

  stats: [
    { label: "Years of Learning", value: "2+" },
    { label: "Projects Built", value: "7+" },
    { label: "Technologies", value: "15+" },
    { label: "LeetCode Problems", value: "75+" },
  ],
};

export const projectsData = [
  {
    id: 1,
    title: "FlowZen - AI Order Management System",
    description:
      "An AI-powered order management platform that extracts order details from uploaded images using Gemini AI, automatically generates editable checklists, tracks packing progress in real time, and simplifies workflow for vegetable vendors and caterers.",

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini AI",
      "Cloudinary",
      "JWT",
      "Redis",
      "Zod",
      "Tailwind CSS",
    ],

    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop",

    color: "#00B894",

    link: "https://flow-zen-omega.vercel.app/",

    status: "Completed",
  },

  {
    id: 2,
    title: "Employee Management System",

    description:
      "Enterprise-level employee management platform featuring JWT authentication, role-based authorization, CRUD operations, dashboard analytics, pagination, search functionality, and a scalable ASP.NET Core backend.",

    technologies: [
      ".NET",
      "ASP.NET Core",
      "Entity Framework Core",
      "SQL Server",
      "React",
      "JWT",
    ],

    image:
      "https://images.unsplash.com/photo-1707904633074-20fb8f8f865a?q=80&w=1616&auto=format&fit=crop",

    color: "#E23636",

    link: "https://employee-management-system-two-xi.vercel.app/",

    status: "Completed",
  },

  {
    id: 3,
    title: "UrbanRide - Vehicle Rental Platform",

    description:
      "A full-stack vehicle rental platform with secure authentication, vehicle listings, booking management, image uploads, user profiles, and an admin dashboard powered by RESTful APIs.",

    technologies: [
      "React",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "Cloudinary",
      "JWT",
    ],

    image:
      "https://images.unsplash.com/photo-1498887960847-2a5e46312788?q=80&w=1469&auto=format&fit=crop",

    color: "#3498DB",

    link: "https://urban-ride-zeta.vercel.app/",

    status: "Completed",
  },

  {
    id: 4,
    title: "ReelBite - Food Discovery Platform",

    description:
      "Instagram-inspired food discovery platform where users browse short-form food videos, discover restaurants, explore menus, and interact with personalized recommendations.",

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "JWT",
      "REST API",
    ],

    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",

    color: "#F39C12",

    link: "",

    status: "In Progress",
  },

  {
    id: 5,
    title: "Productive Panel",

    description:
      "A productivity application for organizing daily tasks, tracking progress, managing workflows, and improving productivity through a clean and responsive interface.",

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
    ],

    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1470&auto=format&fit=crop",

    color: "#9B59B6",

    link: "https://productivitypanel.vercel.app/",

    status: "Completed",
  },

  {
    id: 6,
    title: "Ayurvedic Herbs Recommendation System",

    description:
      "Machine learning application that predicts health conditions from symptoms and recommends suitable Ayurvedic herbs using Flask and Scikit-Learn.",

    technologies: [
      "Python",
      "Flask",
      "Machine Learning",
      "Pandas",
      "Scikit-Learn",
    ],

    image:
      "https://images.unsplash.com/photo-1521146250551-a5578dcc2e64?q=80&w=1470&auto=format&fit=crop",

    color: "#27AE60",

    link: "https://ayurvedic-herbs-recommendation-and.onrender.com",

    status: "Completed",
  },

  {
    id: 7,
    title: "Personal Portfolio",

    description:
      "A modern developer portfolio built with React, Tailwind CSS, Framer Motion, and Vite featuring responsive layouts, smooth animations, and optimized performance.",

    technologies: [
      "React",
      "Tailwind CSS v4",
      "Framer Motion",
      "Vite",
      "JavaScript",
    ],

    image:
      "https://images.unsplash.com/photo-1668903678359-e810dd966016?q=80&w=880&auto=format&fit=crop",

    color: "#E67E22",

    link: "https://portfolio-ashishs-projects-428732e9.vercel.app/",

    status: "Completed",
  },
];

export const skillsData = [
  { name: "React.js", icon: "Code2" },
  { name: "JavaScript (ES6+)", icon: "Code" },
  { name: "TypeScript", icon: "FileCode2" },
  { name: "Tailwind CSS", icon: "Palette" },
  { name: "Node.js", icon: "Server" },
  { name: "Express.js", icon: "ServerCog" },
  { name: "ASP.NET Core", icon: "Boxes" },
  { name: "MongoDB", icon: "Database" },
  { name: "SQL Server", icon: "DatabaseZap" },
  { name: "Redis", icon: "DatabaseBackup" },
  { name: "JWT Authentication", icon: "ShieldCheck" },
  { name: "REST APIs", icon: "Network" },
  { name: "Redux Toolkit", icon: "Workflow" },
  { name: "Cloudinary", icon: "Cloud" },
  { name: "Git & GitHub", icon: "GitBranch" },
  { name: "Docker", icon: "Container" },
  { name: "Python", icon: "Terminal" },
];

export const contactData = {
  email: "ash.pimpalshende@gmail.com",
  github: "https://github.com/Ash9975",
  linkedin: "https://www.linkedin.com/in/ashish-pimpalshende/",
  instagram: "https://www.instagram.com/aashish___21_",
};