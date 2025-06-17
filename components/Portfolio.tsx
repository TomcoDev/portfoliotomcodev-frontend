import React, { useState, useEffect } from 'react';
import { Github2 as Github, Linkedin, Mail, ExternalLink, Code, Database, Server, Presentation, Target, Brain, ChevronDown, Menu, X } from 'lucide-react';

const Portfolio: React.FC = () => {
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
          // Adjust threshold for better active section detection, e.g., when section is in top 1/3 of viewport
          return rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-md border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'projects', 'skills', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 font-medium ${
                    activeSection === item 
                      ? 'text-blue-400' 
                      : darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                {darkMode ? '🌙' : '☀️'}
              </button>
              
              <button
                className="md:hidden p-2 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="px-4 py-3 space-y-2">
              {['home', 'projects', 'skills', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-3 py-2 capitalize rounded-lg transition-colors font-medium ${
                    activeSection === item 
                      ? 'text-blue-400 bg-blue-500/10' 
                      : darkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-400' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-500'
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
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                SaaS Developer
              </span>
              <span className={`block mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                & Systems Analyst
              </span>
            </h1>
            <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Leading the development of modern, scalable SaaS solutions with cutting-edge technologies. 
              Combining analytical thinking, product vision, and technical expertise to craft high-impact applications.
            </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3.5 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-3.5 rounded-lg font-semibold text-lg border-2 transition-all duration-300 transform hover:scale-105 shadow-lg ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white hover:shadow-gray-400/50' 
                  : 'border-gray-400 text-gray-700 hover:border-gray-600 hover:text-gray-900 hover:shadow-gray-600/50'
              }`}
            >
              Get In Touch
            </button>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://github.com/TomcoDev" target="_blank" rel="noopener noreferrer" aria-label="Github Profile" className={`p-3 rounded-full transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'} shadow-md hover:shadow-lg transform hover:scale-110`}>
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/n%C3%A9stor-mart%C3%ADnez-tomco1512/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className={`p-3 rounded-full transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'} shadow-md hover:shadow-lg transform hover:scale-110`}>
              <Linkedin size={24} />
            </a>
            <a href="mailto:reyesnestor673@gmail.com" aria-label="Email Me" className={`p-3 rounded-full transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'} shadow-md hover:shadow-lg transform hover:scale-110`}>
              <Mail size={24} />
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button onClick={() => scrollToSection('projects')} aria-label="Scroll to projects" className="animate-bounce p-2">
            <ChevronDown size={32} className={`${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`} />
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Leading projects that combine technical innovation with real-world impact.
            </p>
          </div>

          <div className="grid gap-10">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  project.type === 'featured' 
                    ? `bg-gradient-to-br ${darkMode ? 'from-gray-800 via-gray-800/50 to-blue-900/30' : 'from-white via-gray-50 to-blue-100/50'} border-2 ${darkMode ? 'border-blue-500/30 hover:border-blue-500/60' : 'border-blue-300/50 hover:border-blue-400/70'}` 
                    : `${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`
                } shadow-xl`}
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="lg:flex-1 mb-6 lg:mb-0">
                      <div className="flex items-center gap-4 mb-4">
                        {project.type === 'featured' ? <Code className="text-blue-400" size={28} /> : <Presentation className="text-purple-400" size={28} />}
                        <h3 className="text-2xl lg:text-3xl font-bold">{project.title}</h3>
                      </div>
                      <span className={`inline-block px-3 py-1 mb-4 rounded-full text-sm font-semibold ${
                          project.status === 'In Development' 
                            ? `${darkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}`
                            : `${darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'}`
                        }`}>
                          {project.status}
                      </span>
                      
                      <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {project.description}
                      </p>

                      {project.highlights && (
                        <div className="mb-6">
                          <h4 className={`font-semibold mb-3 text-md ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Key Features:</h4>
                          <ul className="space-y-2">
                            {project.highlights.map((highlight, index) => (
                              <li key={index} className={`flex items-start text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <span className={`mr-2 mt-1 flex-shrink-0 h-2 w-2 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.type === 'featured' && (
                      <div className="lg:ml-8 mt-6 lg:mt-2 flex-shrink-0">
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-7 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105">
                          View Details
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-800/70' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Expertise</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              A versatile skill set for building modern, scalable, and efficient solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Frontend', icon: <Code className="text-blue-400" size={28} />, techs: technologies.frontend },
              { title: 'Backend', icon: <Server className="text-green-400" size={28} />, techs: technologies.backend },
              { title: 'DevOps', icon: <Github className="text-purple-400" size={28} />, techs: technologies.devops },
              { title: 'Database', icon: <Database className="text-orange-400" size={28} />, techs: technologies.database }
            ].map((skillCategory) => (
              <div key={skillCategory.title} className={`p-8 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-xl hover:shadow-2xl transition-shadow duration-300`}>
                <div className="flex items-center gap-4 mb-6">
                  {skillCategory.icon}
                  <h3 className="text-2xl font-bold">{skillCategory.title}</h3>
                </div>
                <ul className="space-y-3">
                  {skillCategory.techs.map((tech, index) => (
                    <li key={index} className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       <span className={`mr-3 h-1.5 w-1.5 rounded-full ${
                        skillCategory.title === 'Frontend' ? 'bg-blue-400' :
                        skillCategory.title === 'Backend' ? 'bg-green-400' :
                        skillCategory.title === 'DevOps' ? 'bg-purple-400' : 'bg-orange-400'
                       }`}></span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Goals Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Career Vision</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Aspiring to build the future through innovative technology solutions and leadership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Target className="text-blue-400 group-hover:text-blue-300 transition-colors" size={36} />, title: "SaaS Leadership", description: "Lead the creation of robust, modern, and scalable SaaS platforms that deliver exceptional value." },
              { icon: <ExternalLink className="text-green-400 group-hover:text-green-300 transition-colors" size={36} />, title: "Production Ready", description: "Launch production-ready applications that solve real business problems and delight users." },
              { icon: <Code className="text-purple-400 group-hover:text-purple-300 transition-colors" size={36} />, title: "Creative Projects", description: "Build an original video game as a personal creative-technical project, pushing my boundaries." },
              { icon: <Brain className="text-orange-400 group-hover:text-orange-300 transition-colors" size={36} />, title: "Technical Leadership", description: "Become a trusted technical reference and mentor within high-performance teams." }
            ].map((goal, index) => (
              <div
                key={index}
                className={`group p-8 rounded-xl text-center transition-all duration-300 transform hover:-translate-y-2 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                } shadow-xl hover:shadow-2xl`}
              >
                <div className="flex justify-center mb-6">
                  {goal.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{goal.title}</h3>
                <p className={`text-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-gray-800/70' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Fusing analytical thinking, product vision, and technical skill to create impactful solutions.
            </p>
          </div>

          <div className={`rounded-2xl p-8 md:p-12 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}>
            <article className={`prose prose-lg max-w-none ${darkMode ? 'prose-invert' : ''} text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p>
                As an advanced student in Systems Analysis, I'm passionate about bridging the gap between complex technical challenges and elegant, user-focused solutions. Currently, I'm leading the development of my first real SaaS system, where I apply modern technologies like React, NestJS, and PostgreSQL to create scalable, impactful applications.
              </p>
              
              <p>
                My experience extends beyond coding to high-level academic presentations on cutting-edge topics including Reinforcement Learning in logistics, Artificial Intelligence, and data analysis. I excel at breaking down complex concepts into clear, structured, and impactful communications that drive understanding and action.
              </p>

              <p>
                My mindset centers on combining analytical thinking with product vision and technical expertise to craft smart, intuitive, and high-impact solutions. Whether I'm architecting database structures, designing user interfaces, or presenting research findings, I approach every challenge with the goal of creating meaningful, lasting value.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Something Amazing</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Ready to collaborate on innovative projects or discuss opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
              <div className="space-y-6">
                <a href="mailto:reyesnestor673@gmail.com" className={`flex items-center gap-4 text-lg group ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>
                  <Mail size={24} className={`group-hover:scale-110 transition-transform ${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600' }`} />
                  reyesnestor673@gmail.com
                </a>
                <a href="https://github.com/TomcoDev" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 text-lg group ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>
                  <Github size={24} className={`group-hover:scale-110 transition-transform ${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600' }`} />
                  GitHub Profile
                </a>
                <a href="https://www.linkedin.com/in/n%C3%A9stor-mart%C3%ADnez-tomco1512/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 text-lg group ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>
                  <Linkedin size={24} className={`group-hover:scale-110 transition-transform ${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600' }`} />
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className={`w-full p-4 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors`}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className={`w-full p-4 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors`}
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  required
                  className={`w-full p-4 rounded-lg border resize-none ${
                    darkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors`}
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3.5 px-6 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-10 border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © ${new Date().getFullYear()} Portfolio. Built with React, TypeScript & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
