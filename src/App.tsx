import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Server, Presentation, Target, Brain, ChevronDown, Menu, X } from 'lucide-react';
import React from "react";

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const technologies = {
    frontend: ['React', 'Vite', 'Zustand', 'TanStack Query'],
    backend: ['NestJS', 'PostgreSQL', 'REST APIs'],
    devops: ['GitHub', 'Git CLI', 'Vercel', 'Environment Setup'],
    database: ['ER Modeling', 'Triggers', 'Normalized Structures']
  };

  const projects = [
    {
      id: 1,
      title: "SaaS Business Management Platform",
      description: "Leading the development of a modern, scalable SaaS system designed to solve real business management challenges. Built with a full-stack approach using cutting-edge technologies.",
      technologies: ["React", "NestJS", "PostgreSQL", "Zustand", "TanStack Query"],
      status: "In Development",
      type: "featured",
      highlights: ["Real-time data synchronization", "Scalable architecture", "Modern UI/UX", "RESTful APIs"]
    },
    {
      id: 2,
      title: "Reinforcement Learning in Logistics",
      description: "Academic research and presentation on applying RL algorithms to optimize logistics operations and supply chain management.",
      technologies: ["Python", "Machine Learning", "Data Analysis"],
      status: "Completed",
      type: "academic"
    },
    {
      id: 3,
      title: "AI & Automation Systems",
      description: "Series of academic presentations covering artificial intelligence applications, automation strategies, and data-driven decision making.",
      technologies: ["AI/ML", "Data Analysis", "Automation"],
      status: "Ongoing",
      type: "academic"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    const res = await fetch('https://portfolio-backend-eahq.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert('Mensaje enviado correctamente');
      form.reset();
    } else {
      alert('Error al enviar el mensaje');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Portfolio TomcoDev
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'projects', 'skills', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === item 
                      ? 'text-blue-400' 
                      : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {darkMode ? '🌙' : '☀️'}
              </button>
              
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="px-4 py-2 space-y-2">
              {['home', 'projects', 'skills', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-3 py-2 capitalize rounded-lg transition-colors ${
                    activeSection === item 
                      ? 'text-blue-400 bg-blue-400/10' 
                      : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  SaaS Developer
                </span>
                <br />
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                  & Systems Analyst
                </span>
              </h1>
              <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Leading the development of modern, scalable SaaS solutions with cutting-edge technologies. 
                Combining analytical thinking, product vision, and technical expertise to craft high-impact applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-200 ${
                  darkMode 
                    ? 'border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900'
                }`}
              >
                Get In Touch
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/TomcoDev"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-lg`}
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/n%C3%A9stor-mart%C3%ADnez-tomco1512/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-lg`}
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:reyesnestor673@gmail.com"
                className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-lg`}
                aria-label="Mail"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Leading projects that combine technical innovation with real-world impact
            </p>
          </div>

          <div className="grid gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] ${
                  project.type === 'featured' 
                    ? `bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 ${darkMode ? 'border-blue-500/20' : 'border-blue-300/50'}` 
                    : darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                } shadow-lg hover:shadow-xl`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="lg:flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      {project.type === 'featured' ? <Code className="text-blue-400" size={24} /> : <Presentation className="text-purple-400" size={24} />}
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'In Development' 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {project.description}
                    </p>

                    {project.highlights && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-blue-400">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {project.highlights.map((highlight, index) => (
                            <li key={index} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              • {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.type === 'featured' && (
                    <div className="lg:ml-8 mt-6 lg:mt-0">
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                        View Details
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technical Expertise</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Modern technologies and methodologies for building scalable solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold">Frontend</h3>
              </div>
              <ul className="space-y-2">
                {technologies.frontend.map((tech, index) => (
                  <li key={index} className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-3 mb-4">
                <Server className="text-green-400" size={24} />
                <h3 className="text-xl font-bold">Backend</h3>
              </div>
              <ul className="space-y-2">
                {technologies.backend.map((tech, index) => (
                  <li key={index} className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-3 mb-4">
                <Github className="text-purple-400" size={24} />
                <h3 className="text-xl font-bold">DevOps</h3>
              </div>
              <ul className="space-y-2">
                {technologies.devops.map((tech, index) => (
                  <li key={index} className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-orange-400" size={24} />
                <h3 className="text-xl font-bold">Database</h3>
              </div>
              <ul className="space-y-2">
                {technologies.database.map((tech, index) => (
                  <li key={index} className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career Goals Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Career Vision</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Building the future through innovative technology solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Target className="text-blue-400" size={32} />,
                title: "SaaS Leadership",
                description: "Lead the creation of robust, modern, and scalable SaaS platforms"
              },
              {
                icon: <ExternalLink className="text-green-400" size={32} />,
                title: "Production Ready",
                description: "Launch production-ready applications that solve real business problems"
              },
              {
                icon: <Code className="text-purple-400" size={32} />,
                title: "Creative Projects",
                description: "Build an original video game as a personal creative-technical project"
              },
              {
                icon: <Brain className="text-orange-400" size={32} />,
                title: "Technical Leadership",
                description: "Become a trusted technical reference within high-performance teams"
              }
            ].map((goal, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl text-center transition-all duration-300 hover:transform hover:scale-105 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                } shadow-lg hover:shadow-xl`}
              >
                <div className="flex justify-center mb-4">
                  {goal.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{goal.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              The intersection of analytical thinking, product vision, and technical skill
            </p>
          </div>

          <div className={`rounded-2xl p-8 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
            <div className="prose prose-lg max-w-none">
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                As an advanced student in Systems Analysis, I'm passionate about bridging the gap between complex technical challenges and elegant, user-focused solutions. Currently, I'm leading the development of my first real SaaS system, where I apply modern technologies like React, NestJS, and PostgreSQL to create scalable, impactful applications.
              </p>
              
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                My experience extends beyond coding to high-level academic presentations on cutting-edge topics including Reinforcement Learning in logistics, Artificial Intelligence, and data analysis. I excel at breaking down complex concepts into clear, structured, and impactful communications that drive understanding and action.
              </p>

              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                My mindset centers on combining analytical thinking with product vision and technical expertise to craft smart, intuitive, and high-impact solutions. Whether I'm architecting database structures, designing user interfaces, or presenting research findings, I approach every challenge with the goal of creating meaningful, lasting value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Build Something Amazing</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Ready to collaborate on innovative projects or discuss opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <a href="mailto:reyesnestor673@gmail.com" className="flex items-center gap-3 text-lg hover:text-blue-400 transition-colors">
                  <Mail size={20} />
                  reyesnestor673@gmail.com
                </a>
                <a
                  href="https://github.com/TomcoDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg hover:text-blue-400 transition-colors"
                >
                  <Github size={20} />
                  GitHub Profile
                </a>
                <a
                  href="https://www.linkedin.com/in/n%C3%A9stor-mart%C3%ADnez-tomco1512/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={20} />
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className={`w-full p-3 rounded-lg border ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-black placeholder-gray-500'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className={`w-full p-3 rounded-lg border ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-black placeholder-gray-500'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Your Message"
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-black placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 TomcoDev. Built with React and passion for clean code.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;