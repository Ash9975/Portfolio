import heroimage from '../assets/ProfilePic.jpeg'
export const heroData = {
  name: "ASHISH PIMPALSHENDE",
  title: "Full Stack Developer",
  tagline: "I build clean, user-focused web applications while continuously improving my full-stack skills.",
  image: heroimage
};

export const aboutData = {
  description: "I’m Ashish Pimpalshende, a final-year Computer Science student with a strong interest in building real-world, user-focused web applications. I enjoy working across the full stack, from designing clean and intuitive interfaces to developing reliable backend logic.Over time, I’ve focused on learning by doing — building projects with React, Node.js, and modern web tools to strengthen both my technical foundation and problem-solving skills. I care a lot about how a product feels to use, which is why I pay close attention to UI, performance, and overall user experience. I’m continuously improving my skills through hands-on projects and exploring better ways to write clean, maintainable code. My goal is to grow as a developer who not only builds functional applications but also creates experiences that people enjoy using.",
  stats: [
    { label: "Years of Learning", value: "2+" },
    { label: "Projects Completed", value: "5+" },
    { label: "Core Technologies", value: "6+" },
    { label: "LeetCode Problems", value: "50+" }
  ]
};

export const projectsData = [
  {
    id: 1,
    title: "Personal Portfolio",
    description:
      "A modern, responsive portfolio website to showcase my projects, skills, and contact details.",
    technologies: ["React", "CSS", "JavaScript", "Vite"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80",
    color: "#E23636",
    link: "https://your-portfolio-link.com",
    status: "Completed",
  },
  {
    id: 2,
    title: "UrbanRide",
    description:
      "A ride-booking web application that allows users to book rides, manage trips, and view ride details.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    image:
      "https://images.unsplash.com/photo-1518441902113-f4bb1dc47e03?w=600&q=80",
    color: "#3498DB",
    link: "https://github.com/yourusername/urbanride",
    status: "Completed",
  },
  {
    id: 3,
    title: "Personal Task Manager",
    description:
      "A task management application to create, update, and track daily tasks with authentication.",
    technologies: ["Html", "Css", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    color: "#9B59B6",
    link: "https://github.com/yourusername/task-manager",
    status: "Completed",
  },

  // 🚧 In Progress Projects (Discussed / Planned)

  {
    id: 4,
    title: "Ayurvedic Medicine Recommendation System",
    description:
      "An intelligent system to recommend Ayurvedic medicines and possible diseases based on user symptoms using rule-based and ML approaches.",
    technologies: ["Python", "Flask", "Machine Learning"],
    image:
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=600&q=80",
    color: "#2ECC71",
    link: "#",
    status: "In Progress",
  },
  {
    id: 5,
    title: "Video Streaming Platform",
    description:
      "A Netflix-style video streaming platform with user authentication, content management, and streaming optimization.",
    technologies: ["React", "Node.js", "AWS"],
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80",
    color: "#C0392B",
    link: "#",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Real-Time Chat Application",
    description:
      "A real-time chat application supporting private and group chats using WebSocket-based communication.",
    technologies: ["React", "Socket.io", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&q=80",
    color: "#16A085",
    link: "#",
    status: "In Progress",
  },
];


    export const skillsData = [
      { name: "React", icon: "Code2" },
      { name: "HTML & CSS", icon: "Code" },
      { name: "Node.js", icon: "Server" },
      { name: "Express.js", icon: "ServerCog" },
      { name: "MongoDB", icon: "Database" },
      { name: "Python", icon: "Terminal" },
      { name: "REST APIs", icon: "Network" },
      { name: "Git & GitHub", icon: "GitBranch" },
    ];


    export const contactData = {
      email: "ash.pimpalshende@gmail.com",
      github: "https://github.com/Ash9975",
      linkedin: "https://www.linkedin.com/in/ashish-pimpalshende",
      instagram: "https://www.instagram.com/aashish___21_"
    };