import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { IoLogoLinkedin } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { projectsData, ProjectModal } from "../components/ProjectDetails";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
      
      // Show scroll to top button after scrolling down
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Account for fixed navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <div className="bg-[#0a0a0a] text-gray-100">
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold"
            >
              <span className="text-white">Dhara</span>
              <span className="text-gray-500"> Rajpura</span>
            </motion.div>
            <div className="hidden md:flex gap-8">
              {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm transition-colors relative ${
                    activeSection === item.toLowerCase()
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-white p-2 -mr-2 touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle menu"
            >
              <motion.svg
                animate={mobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <>
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </>
                )}
              </motion.svg>
            </motion.button>
          </div>
          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4"
              >
                {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      scrollToSection(item.toLowerCase());
                    }}
                    className="block w-full text-left py-3 text-gray-400 hover:text-white active:text-white transition-colors touch-manipulation"
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black/50"
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-400 text-sm mb-4 tracking-widest uppercase"
              >
                Freelance Embedded Systems Expert
              </motion.p>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white inline-block"
                >
                  Ready to boost
                </motion.span>
                <br />
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-gray-400 inline-block"
                >
                  your embedded
                </motion.span>
                <br />
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-white inline-block"
                >
                  systems?
                </motion.span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-gray-400 text-lg mb-8 max-w-lg"
              >
                Freelance embedded hardware engineer specializing in PCB design, motor control, and seamless communication integration. Available for your next project.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-3 border border-gray-600 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  View Portfolio
                </motion.button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-12 flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                    className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black" 
                  />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                    className="w-8 h-8 rounded-full bg-gray-600 border-2 border-black" 
                  />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                    className="w-8 h-8 rounded-full bg-gray-500 border-2 border-black" 
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Trusted by 10+ clients</p>
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                    className="text-xs text-green-400 flex items-center gap-1"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ●
                    </motion.span>
                    Available for freelance work
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <motion.div 
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl" 
                />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src="/d1.jpg"
                  alt="Dhara Rajpura"
                  className="relative w-full h-full object-cover rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase">About Me</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Hey, I'm Dhara Rajpura
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              I am a freelance embedded hardware engineer with 3+ years of experience in the
              design, development, and testing of embedded systems. I specialize in PCB design,
              motor control, and communication protocols, delivering custom solutions for clients worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "PCB Design",
                desc: "Expert schematic design, multi-layer routing, and signal integrity optimization for complex embedded systems.",
                tag: "Hardware",
              },
              {
                title: "Motor Control",
                desc: "Precision control systems for stepper and DC motors with advanced PWM and encoder integration.",
                tag: "Control Systems",
              },
              {
                title: "Communication",
                desc: "Seamless integration of WiFi, Ethernet, I2C, SPI, UART, and CAN protocols for robust connectivity.",
                tag: "Protocols",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-black rounded-lg mb-6 flex items-center justify-center"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="w-6 h-6 bg-white rounded" 
                  />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gray-400"
                >
                  {service.tag}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase">My Journey</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Work Experience</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Freelance Embedded Systems Consultant",
                company: "Self-Employed",
                duration: "November 2025 - Present",
                points: [
                  "Providing embedded hardware design and consulting services to clients worldwide.",
                  "Specializing in custom PCB design, motor control systems, and IoT solutions.",
                  "Delivering end-to-end solutions from concept to production-ready designs.",
                ],
              },
              {
                title: "Embedded System Engineer",
                company: "DosePacker, Ahmedabad",
                duration: "Jan 2024 - November 2025",
                points: [
                  "Designed PCBs for robotic systems integrating STM32, motors, and sensors for precision control.",
                  "Developed motor control circuits focusing on thermal management and noise filtering.",
                  "Integrated WiFi and Ethernet modules with ESP32 for seamless communication.",
                ],
              },
              {
                title: "Embedded Hardware Engineer",
                company: "Teq Diligent, Ahmedabad",
                duration: "Jan 2023 - Jan 2024",
                points: [
                  "Designed multi-layer PCBs ensuring manufacturability and performance validation.",
                  "Performed CAM checks and generated production-ready Gerber files.",
                  "Tested PCB designs to ensure functionality and compliance with industry standards.",
                ],
              },
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors ${
                  index === 0 ? "md:col-span-2 border-gray-700" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-gray-400 mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                  </div>
                  {index === 0 && (
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                      Available for Hire
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase">My Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured Projects
            </h2>
            <p className="text-gray-600">Showcasing my embedded systems design work and technical expertise</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-4"
                  >
                    <motion.span 
                      whileHover={{ x: 5 }}
                      className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full inline-flex items-center gap-2"
                    >
                      View Details 
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.span>
                  </motion.div>
                </motion.div>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <motion.h3 
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg font-bold mb-1 line-clamp-2"
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <motion.span 
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" 
                      />
                      <span className="truncate">{project.category}</span>
                    </p>
                  </div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 text-sm flex-shrink-0"
                  >
                    {project.year}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase">Expertise</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Technical Skills</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: "PCB Design",
                skills: [
                  "Schematic Design",
                  "Component Placement & Routing",
                  "Power & Ground Plane Design",
                  "Signal Integrity",
                ],
              },
              {
                category: "Motor Control",
                skills: [
                  "Stepper Motor Control",
                  "DC Motor Speed Control",
                  "PWM Implementation",
                  "Encoder Integration",
                ],
              },
              {
                category: "Communication",
                skills: ["Wi-Fi (ESP32)", "Ethernet", "I2C/SPI/UART", "CAN Protocol"],
              },
              {
                category: "Sensors",
                skills: [
                  "Temperature Sensors",
                  "Proximity Sensors",
                  "Encoders",
                  "Limit Switches",
                ],
              },
              {
                category: "Power Management",
                skills: [
                  "Voltage Regulation",
                  "DC-DC Converters",
                  "Power Supply Design",
                  "Low-Power Systems",
                ],
              },
              {
                category: "Tools",
                skills: ["Pads Professional", "Orcad", "Allegro", "Pads Layout"],
              },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
              >
                <motion.h3 
                  whileHover={{ x: 5 }}
                  className="text-lg font-bold text-white mb-4"
                >
                  {skill.category}
                </motion.h3>
                <ul className="space-y-2">
                  {skill.skills.map((item, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="text-gray-400 text-sm flex items-center gap-2"
                    >
                      <motion.span 
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="w-1 h-1 bg-gray-600 rounded-full" 
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white text-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's work together</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Available for freelance projects and consulting. Ready to elevate your embedded systems project? Get in touch and let's create something amazing.
            </p>
            <div className="flex justify-center gap-6 mb-12">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/dhara-rajpura-4b24b122b/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <IoLogoLinkedin className="w-6 h-6 text-white" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:dhararajpura2001@gmail.com"
                className="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <MdEmail className="w-6 h-6 text-white" />
              </motion.a>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                href="mailto:dhararajpura2001@gmail.com"
                className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Email Me
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, borderColor: "rgba(0,0,0,0.5)" }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/dhara-rajpura-4b24b122b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold mb-2">Dhara Rajpura</p>
              <p className="text-gray-400 text-sm">Freelance Embedded Systems Expert</p>
              <p className="text-green-400 text-xs mt-1">● Open to new opportunities</p>
            </div>
            <div className="flex gap-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-400 hover:text-white active:text-white transition-colors text-sm touch-manipulation"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-400 hover:text-white active:text-white transition-colors text-sm touch-manipulation"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-gray-400 hover:text-white active:text-white transition-colors text-sm touch-manipulation"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-400 hover:text-white active:text-white transition-colors text-sm touch-manipulation"
              >
                Contact
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2024 Dhara Rajpura. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollToSection("hero")}
            className="fixed bottom-8 right-8 w-12 h-12 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition-colors flex items-center justify-center z-40"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
