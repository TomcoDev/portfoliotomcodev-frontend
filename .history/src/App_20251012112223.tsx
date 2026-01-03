import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Download, ExternalLink, Code, Database, Server, Presentation, Target, Brain, ChevronDown, Menu, X } from 'lucide-react';

function forceAutofillRepaint() {
  document.querySelectorAll('input, textarea').forEach(el => {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      if (el.value) {
        const value = el.value;
        el.value = '';
        el.value = value;
      }
    }
  });
}

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const technologies = {
    frontend: ['React', 'HTML5', 'CSS3', 'JavaScript'],
    backend: ['Node.js', 'PostgreSQL', 'REST APIs (Learning)'],
    tools: ['GitHub', 'Git', 'Netlify', 'VS Code'],
    analysis: ['Excel', 'Tableau', 'SQL', 'Data Analytics']
  };

  const projects = [
    {
      id: 1,
      title: "Business Management System - Learning Project",
      description: "Developing a web application for small business management as a personal learning project. Building practical experience with modern web technologies and full-stack development fundamentals.",
      technologies: ["React", "Node.js", "PostgreSQL", "CSS3"],
      status: "In Development",
      type: "featured",
      highlights: ["Basic CRUD operations", "User interface design", "Database integration", "Learning-focused approach"]
    },
    {
      id: 2,
      title: "Professional Service Portfolio Website",
      description: "Created a responsive website for aesthetic services with appointment booking functionality and social media integration. Focus on clean design and user experience.",
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      status: "Completed",
      type: "web",
      link: "https://twilight-portfoli0.netlify.app/"
    },
    {
      id: 3,
      title: "Interactive Wellness Application",
      description: "Developed a web application focused on personal wellness with AI integration for personalized recommendations and user-friendly interface design.",
      technologies: ["React", "JavaScript", "API Integration"],
      status: "Completed", 
      type: "web",
      link: "https://bodyshin3.netlify.app/"
    }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'projects', 'skills', 'about', 'contact'];
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = {
      name: form.elements.namedItem('name').value,
      email: form.elements.namedItem('email').value,
      message: form.elements.namedItem('message').value,
    };

    try {
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
    } catch (error) {
      alert('Error al enviar el mensaje');
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      setTimeout(forceAutofillRepaint, 0);
      return newMode;
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Néstor Martínez
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'experience', 'projects', 'skills', 'about', 'contact'].map((item) => (
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
                onClick={handleToggleDarkMode}
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
              {['home', 'experience', 'projects', 'skills', 'about', 'contact'].map((item) => (
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
                  Systems Analyst
                </span>
                <br />
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                  & Developer in Training
                </span>
              </h1>
              <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Professional with 5+ years of experience in technology and customer service, currently developing web development skills and pursuing Systems Analysis degree. 
                Combining practical business experience with technical learning.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                View My Projects
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
              <a
                href="/nestor_martinez_cv_en.pdf"
                download
                className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-lg`}
                aria-label="Download CV"
              >
                <Download size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Professional Experience</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              5+ years of experience in technology, customer service, and business operations
            </p>
          </div>

          <div className="space-y-8">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Paralegal</h3>
                  <p className="text-blue-400">Cooperativa de Educadores de la Capital Ltda.</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aug 2025 - Present</p>
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
              Specialized in legal operations and process optimization. Proficient in managing judicial case tracking, implementing automated workflows to eliminate errors,
              and developing quality control systems to ensure document compliance. Experienced in streamlining inter-departmental processes, particularly in asset recovery between the Legal and Treasury departments.  
              </p>
              <div className="flex flex-wrap gap-2">
                {['Judicial Case Management', 'Process Automation', 'Quality Control', 'Asset Recovery'].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
                
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Technical Sales Advisor</h3>
                  <p className="text-blue-400">Tecnomóvil</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dec 2023 - Jun 2025</p>
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                Specialized in technical consulting for electronic products, inventory management systems, and customer support. 
                Gained valuable experience with business software and technical problem-solving.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Technical Support', 'Inventory Systems', 'Customer Service', 'Product Training'].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Logistics Assistant</h3>
                  <p className="text-blue-400">Alianza Comercial S.A.</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>May 2023 - Dec 2023</p>
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                Managed inventory control, order preparation, and warehouse organization using enterprise management systems.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Inventory Management', 'Order Processing', 'Team Coordination', 'Quality Control'].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Logistics Assistant</h3>
                  <p className="text-blue-400">Alianza Comercial S.A.</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>May 2023 - Dec 2023</p>
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                Managed inventory control, order preparation, and warehouse organization using enterprise management systems.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Inventory Management', 'Order Processing', 'Team Coordination', 'Quality Control'].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Administrative Secretary</h3>
                  <p className="text-blue-400">JF Tecnográfica</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aug 2022 - May 2023</p>
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                Handled customer service, graphic design tasks, and production coordination. Gained experience with design software and business operations.
              </p>
              <div className="flex flex-wrap gap-2">
                {['CorelDRAW', 'Customer Service', 'Production Management', 'Email Management'].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Learning Projects</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Personal projects demonstrating technical skills development
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
                      <Code className="text-blue-400" size={24} />
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

                  {project.link && (
                    <div className="lg:ml-8 mt-6 lg:mt-0">
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
                      >
                        View Project
                        <ExternalLink size={16} />
                      </a>
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
            <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Technologies and tools I'm learning and working with
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
                <h3 className="text-xl font-bold">Tools</h3>
              </div>
              <ul className="space-y-2">
                {technologies.tools.map((tech, index) => (
                  <li key={index} className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-orange-400" size={24} />
                <h3 className="text-xl font-bold">Data Analysis</h3>
              </div>
              <ul className="space-y-2">
                {technologies.analysis.map((tech, index) => (
                  <li key={index} className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Combining business experience with technical education
            </p>
          </div>

          <div className={`rounded-2xl p-8 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
            <div className="prose prose-lg max-w-none">
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm a Systems Analysis student with over 5 years of professional experience in technology sales, customer service, and business operations. Currently pursuing my degree while developing practical web development skills through personal projects.
              </p>
              
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                My background includes hands-on experience with business systems, technical support, and customer-facing roles. I'm now certified in Data Analytics through Cisco NetAcad and actively learning modern web development technologies including React, Node.js, and PostgreSQL.
              </p>

              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm seeking opportunities to apply my business experience and growing technical skills in a professional development environment. My goal is to combine my understanding of business operations with technical expertise to create practical solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Open to opportunities in development, support, or data analysis roles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
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

            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
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
              © 2025 Néstor Martínez. Built with React and passion for learning.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;