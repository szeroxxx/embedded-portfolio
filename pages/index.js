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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
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
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm transition-colors ${
                    activeSection === item.toLowerCase()
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
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
                    className="block w-full text-left py-3 text-gray-400 hover:text-white transition-colors"
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
              <p className="text-gray-400 text-sm mb-4 tracking-widest uppercase">
                Embedded Systems Expert
              </p>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Ready to boost</span>
                <br />
                <span className="text-gray-400">your embedded</span>
                <br />
                <span className="text-white">systems?</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 max-w-lg">
                Designing innovative embedded systems with precision PCB design, motor control, and seamless communication integration.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Get In Touch
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-3 border border-gray-600 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  View Portfolio
                </button>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black" />
                  <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-black" />
                  <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-black" />
                </div>
                <p className="text-sm text-gray-400">Trusted by 10+ clients</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl" />
                <img
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
              Discover services to elevate brands.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tailored services to enhance your brand
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
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
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-black rounded-lg mb-6 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <span className="text-sm text-gray-400">{service.tag}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-12 rounded-3xl"
          >
            <div className="max-w-3xl">
              <h3 className="text-3xl font-bold mb-6">Hey, I'm Dhara Rajpura</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                I am an embedded hardware engineer with around 2+ years of experience in the
                design, development, and testing of embedded systems. Specializing in PCB design,
                motor control, and communication protocols.
              </p>
            </div>
          </motion.div>
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
                title: "Embedded System Engineer",
                company: "DosePacker, Ahmedabad",
                duration: "Jan 2024 - Present",
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
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                <p className="text-gray-400 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-6">{exp.duration}</p>
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
            <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase">Our Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our work speaks for itself
            </h2>
            <p className="text-gray-600">Discover our portfolio of impactful branding projects</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                      {project.category}
                    </p>
                  </div>
                  <span className="text-gray-400 text-sm">{project.year}</span>
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
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
              >
                <h3 className="text-lg font-bold text-white mb-4">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.skills.map((item, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-600 rounded-full" />
                      {item}
                    </li>
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
              Ready to elevate your embedded systems project? Get in touch and let's create
              something amazing.
            </p>
            <div className="flex justify-center gap-6 mb-12">
              <a
                href="https://www.linkedin.com/in/dhara-rajpura-4b24b122b/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <IoLogoLinkedin className="w-6 h-6 text-white" />
              </a>
              <a
                href="mailto:dhararajpura2001@gmail.com"
                className="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <MdEmail className="w-6 h-6 text-white" />
              </a>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="mailto:dhararajpura2001@gmail.com"
                className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/dhara-rajpura-4b24b122b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                LinkedIn
              </a>
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
              <p className="text-gray-400 text-sm">Embedded Systems Expert</p>
            </div>
            <div className="flex gap-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-400 hover:text-white transition-colors text-sm"
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
