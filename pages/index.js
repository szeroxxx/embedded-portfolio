import { useEffect, useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { projectsData, ProjectModal } from "../components/ProjectDetails";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dhararajpura.vercel.app";

const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Reviews", "Contact"];

const aboutServices = [
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
];

const experience = [
  {
    title: "Freelance Embedded Systems Consultant",
    company: "Self-Employed",
    duration: "November 2025 - Present",
    current: true,
    points: [
      "Providing embedded hardware design and consulting services to clients worldwide.",
      "Developed LOCA Navigation PCB with 10-DoF IMU sensors, GNSS L86 module, and nRF52840 for precision navigation systems.",
      "Designed GST Smart Calculator with ESP32-S3, 4-inch TFT display, thermal printer support, and inventory management for merchants.",
      "Specializing in custom PCB design, motor control systems, IoT solutions, and battery-operated portable devices.",
      "Delivering end-to-end solutions from concept to production-ready designs with complete manufacturing documentation.",
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
];

const skillGroups = [
  {
    category: "PCB Design - Core",
    skills: [
      "Schematic Design",
      "Component Placement & Multi Layers Routing",
      "Power & Ground Plane Design",
      "Signal Integrity",
      "Document Generation",
      "Library Management",
      "Datasheet Interpretation",
    ],
  },
  {
    category: "PCB Design - Advanced",
    skills: [
      "Footprint Creation",
      "IPC Standards Compliance",
      "DFM & DFA Analysis",
      "High-Speed PCB Design",
      "BGA Package Routing & Fanout",
      "Constraint Management",
      "Impedance Control",
    ],
  },
  {
    category: "Communication Protocols",
    skills: [
      "Wi-Fi (ESP32)",
      "HDMI/LVDS/DDR3",
      "PCIe Express",
      "USB/BLE",
      "Ethernet",
      "I2C/SPI/UART",
      "CAN Protocol",
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
    category: "Power Management",
    skills: [
      "Voltage Regulation",
      "DC-DC Converters",
      "Power Supply Design",
      "Low-Power Systems",
      "Battery Management",
    ],
  },
  {
    category: "Sensors",
    skills: ["Temperature Sensors", "Proximity Sensors", "Encoders", "Limit Switches"],
  },
  {
    category: "Design Tools",
    skills: ["PADs Professional", "OrCAD-Allegro", "Altium Designer", "Pads Layout"],
  },
];

function Eyebrow({ children, dark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs tracking-widest uppercase mb-5 ${
        dark
          ? "border-white/15 text-gray-300 bg-white/5"
          : "border-black/10 text-gray-500 bg-black/[0.03]"
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, lead, accent, dark, center = true, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${center ? "text-center" : ""}`}
    >
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`font-display text-4xl md:text-5xl font-bold ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {lead} <span className={dark ? "text-gray-500" : "text-gray-400"}>{accent}</span>
      </h2>
      {subtitle && (
        <p className={`mt-5 max-w-2xl ${center ? "mx-auto" : ""} ${dark ? "text-gray-400" : "text-gray-600"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [openSkill, setOpenSkill] = useState(0);
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviewCount
      : 0;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        // Silently ignore — reviews are non-critical for page render
      }
    };

    fetchReviews();
    // Re-fetch when the visitor returns to the tab so new reviews appear
    // without polling the API on a wasteful interval.
    const onFocus = () => {
      if (document.visibilityState === "visible") fetchReviews();
    };
    document.addEventListener("visibilitychange", onFocus);

    const sections = ["hero", "about", "experience", "projects", "skills", "reviews", "contact"];
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const current = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        if (current) setActiveSection(current);
        setShowScrollTop(window.scrollY > 500);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", onFocus);
    };
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
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const pageTitle = "Dhara Rajpura — Freelance Embedded Systems & PCB Design Engineer";
  const pageDescription =
    "Freelance embedded hardware engineer with 3+ years of experience in PCB design, motor control, and communication protocols. Available for custom embedded systems projects worldwide.";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dhara Rajpura",
    jobTitle: "Freelance Embedded Systems Engineer",
    description: pageDescription,
    url: SITE_URL,
    image: `${SITE_URL}/hero-section.png`,
    email: "mailto:dharaxrajpura@gmail.com",
    knowsAbout: [
      "PCB Design",
      "Embedded Systems",
      "Motor Control",
      "Communication Protocols",
      "Power Management",
    ],
  };

  return (
    <div className="bg-[#0a0a0a] text-gray-100 font-sans">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta
          name="keywords"
          content="embedded systems, PCB design, freelance hardware engineer, motor control, ESP32, STM32, Altium, embedded engineer"
        />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/hero-section.png`} />
        <meta property="og:site_name" content="Dhara Rajpura" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/hero-section.png`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-display text-xl font-bold"
            >
              <span className="text-white">Dhara</span>
              <span className="text-gray-500"> Rajpura</span>
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.slice(0, -1).map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05, y: -2 }}
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
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="px-5 py-2 bg-brand text-black text-sm font-semibold rounded-full hover:bg-brand-dark transition-colors"
              >
                Contact
              </motion.button>
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
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
                {NAV_ITEMS.map((item) => (
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

      {/* Hero Section — full-bleed cover photo */}
      <section
        id="hero"
        className="flex items-center relative overflow-hidden pt-28 pb-16 min-h-[75vh] sm:min-h-[80vh] lg:min-h-screen"
      >
        {/* Cover image: hero-section.png is a 1448x1086 (4:3) portrait photo with
            the subject positioned right-of-center and a plain wall filling the
            left third. The image box height is capped per breakpoint (rather than
            stretched to the section's full, content-driven height) — a landscape
            photo forced to cover a narrow, very tall mobile section would need an
            extreme zoom that pushes her face under the heading text; capping the
            height keeps the crop natural, and the section's own near-black
            background (matched by the gradient below) fills any remaining space
            below the image seamlessly. object-position keeps her face in frame
            across every crop, and keeps the sidebar stats over the dark blazer,
            not her face. */}
        <img
          src="/hero-section.png"
          alt="Portrait of Dhara Rajpura, freelance embedded systems engineer"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-x-0 top-0 w-full object-cover h-[65vh] sm:h-[70vh] lg:h-full"
          style={{ objectPosition: "62% 22%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(8,8,8,0.94) 0%, rgba(8,8,8,0.82) 32%, rgba(8,8,8,0.45) 56%, rgba(8,8,8,0.15) 75%, rgba(8,8,8,0.35) 100%), linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.25) 30%, rgba(8,8,8,0.1) 55%, transparent 75%)",
          }}
        />
        {/* Phones stack the heading full-width over the photo, so the directional
            gradient above isn't enough on its own — add a uniform wash so text
            stays legible no matter which part of the (now more zoomed-in) photo
            sits behind it. Removed from sm/up where the 2-column layout keeps
            text confined to the already-dark left side. */}
        <div className="absolute inset-0 bg-black/55 sm:hidden" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-end min-h-[50vh] sm:min-h-[55vh] lg:min-h-[65vh]">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-300 text-sm mb-4 tracking-widest uppercase"
              >
                Freelance Embedded Systems Expert
              </motion.p>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
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
                  className="text-gray-300 inline-block"
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
                className="text-gray-300 text-lg mb-8 max-w-lg"
              >
                Freelance embedded hardware engineer specializing in PCB design, motor control, and seamless communication integration. Available for your next project.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(207,243,99,0.35)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3 bg-brand text-black rounded-full font-semibold hover:bg-brand-dark transition-colors"
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-3 border border-white/40 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  View Portfolio
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap items-center gap-4"
              >
                <div className="bg-black/50 backdrop-blur-sm border border-white/15 rounded-full px-5 py-2.5 flex items-center gap-2 w-fit">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-brand"
                  />
                  <span className="text-sm text-gray-100">Available for freelance work</span>
                </div>
                <div className="flex gap-3">
                  {[
                    { Icon: MdEmail, href: "mailto:dharaxrajpura@gmail.com", label: "Email" },
                    {
                      Icon: IoLogoWhatsapp,
                      href: "https://wa.me/919725417323?text=Hi%20Dhara%2C%20I%27d%20like%20to%20discuss%20a%20project.",
                      label: "WhatsApp",
                      external: true,
                    },
                  ].map(({ Icon, href, label, external }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-brand hover:text-black hover:border-brand transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: stat sidebar — sits low, over the blazer rather than the face */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex flex-col gap-5 items-start border-l border-white/20 pl-8"
            >
              <div>
                <p className="text-xs text-gray-300 uppercase tracking-widest mb-1">Role</p>
                <p className="font-display text-2xl font-bold text-white leading-snug">
                  Embedded Hardware Engineer
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-300 uppercase tracking-widest mb-1">Experience</p>
                <p className="font-display text-2xl font-bold text-white">3+ Years</p>
              </div>

              <div>
                <p className="text-xs text-gray-300 uppercase tracking-widest mb-2">Client Feedback</p>
                {reviewCount > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-brand text-lg">★</span>
                    <span className="font-display text-xl font-bold text-white">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-300">
                      ({reviewCount} review{reviewCount === 1 ? "" : "s"})
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-300">Freelance embedded hardware engineer</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section (dark band) */}
      <section id="about" className="py-32 bg-[#141414] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            dark
            eyebrow="About Me"
            lead="Hey, I'm"
            accent="Dhara Rajpura"
            subtitle="I am a freelance embedded hardware engineer with 3+ years of experience in the design, development, and testing of embedded systems. I specialize in PCB design, motor control, and communication protocols, delivering custom solutions for clients worldwide."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {aboutServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-brand/40 transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-brand rounded-full mb-6 flex items-center justify-center"
                >
                  <span className="w-2.5 h-2.5 bg-black rounded-full" />
                </motion.div>
                <h3 className="font-display text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.desc}</p>
                <span className="inline-block text-xs uppercase tracking-widest text-gray-500 border border-white/10 rounded-full px-3 py-1">
                  {service.tag}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-6 mt-12 pt-10 border-t border-white/10"
          >
            <a
              href="mailto:dharaxrajpura@gmail.com"
              className="flex items-center gap-3 group"
            >
              <span className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors">
                <MdEmail className="w-5 h-5 text-white group-hover:text-black" />
              </span>
              <span>
                <span className="block text-xs text-gray-500 uppercase tracking-widest">Email Me</span>
                <span className="text-sm text-gray-200">dharaxrajpura@gmail.com</span>
              </span>
            </a>
            <a
              href="https://wa.me/919725417323?text=Hi%20Dhara%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors">
                <IoLogoWhatsapp className="w-5 h-5 text-white group-hover:text-black" />
              </span>
              <span>
                <span className="block text-xs text-gray-500 uppercase tracking-widest">WhatsApp</span>
                <span className="text-sm text-gray-200">+91 97254 17323</span>
              </span>
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
              className="ml-auto px-6 py-3 bg-brand text-black rounded-full font-semibold hover:bg-brand-dark transition-colors"
            >
              See My Work
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading eyebrow="My Journey" lead="Work" accent="Experience" dark />

          <div className="flex flex-col">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-t border-white/10 last:border-b py-8 group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-brand/50 transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white mb-1">{exp.title}</h3>
                        <p className="text-gray-400">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {exp.current && (
                          <span className="px-3 py-1 bg-brand/10 text-brand text-xs font-medium rounded-full border border-brand/20">
                            Available for Hire
                          </span>
                        )}
                        <span className="text-sm text-gray-500 whitespace-nowrap">{exp.duration}</span>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-brand mt-1.5 w-1 h-1 rounded-full bg-brand flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="My Portfolio"
            lead="Featured"
            accent="Projects"
            subtitle="Showcasing my embedded systems design work and technical expertise"
          />

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
                  className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={`${project.title} — ${project.category} project`}
                    loading="lazy"
                    decoding="async"
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
                      className="text-black text-sm font-medium bg-brand px-3 py-1 rounded-full inline-flex items-center gap-2"
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
                      className="font-display text-lg font-bold mb-1 line-clamp-2"
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        className="w-2 h-2 bg-brand-dark rounded-full flex-shrink-0"
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

      {/* Skills Section (accordion) */}
      <section id="skills" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading eyebrow="Expertise" lead="Technical" accent="Skills" dark />

          <div className="flex flex-col">
            {skillGroups.map((group, index) => {
              const isOpen = openSkill === index;
              return (
                <div key={group.category} className="border-t border-white/10 last:border-b">
                  <button
                    onClick={() => setOpenSkill(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span
                      className={`font-display text-xl md:text-2xl font-bold transition-colors ${
                        isOpen ? "text-brand" : "text-white group-hover:text-gray-300"
                      }`}
                    >
                      {group.category}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        isOpen ? "border-brand text-brand" : "border-white/20 text-gray-400"
                      }`}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 pb-6">
                          {group.skills.map((item) => (
                            <span
                              key={item}
                              className="text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-2"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Client Testimonials"
            lead="What Clients"
            accent="Say"
            subtitle="Real feedback from clients who have worked with me on embedded systems projects"
          />

          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  className="relative bg-gray-50 p-8 pt-10 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <span className="absolute -top-4 left-8 w-9 h-9 rounded-full bg-brand text-black flex items-center justify-center text-lg font-serif">
                    "
                  </span>
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < review.rating ? "text-brand-dark" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{review.review_text}"</p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-bold text-black">{review.client_name}</p>
                    <p className="text-gray-500 text-sm">{review.project_name}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.a
              href="/review"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Leave a Review
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact + Footer (combined dark band) */}
      <section id="contact" className="pt-32 pb-12 bg-[#141414] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Eyebrow dark>Get In Touch</Eyebrow>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 text-white">
              Let's work <span className="text-gray-500">together</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Available for freelance projects and consulting. Ready to elevate your embedded systems project? Get in touch and let's create something amazing.
            </p>
            <div className="flex justify-center gap-6 mb-12">
              <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:dharaxrajpura@gmail.com"
                className="w-14 h-14 bg-brand rounded-full flex items-center justify-center hover:bg-brand-dark transition-colors"
              >
                <MdEmail className="w-6 h-6 text-black" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://wa.me/919725417323?text=Hi%20Dhara%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-brand rounded-full flex items-center justify-center hover:bg-brand-dark transition-colors"
              >
                <IoLogoWhatsapp className="w-6 h-6 text-black" />
              </motion.a>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(207,243,99,0.2)" }}
                whileTap={{ scale: 0.95 }}
                href="mailto:dharaxrajpura@gmail.com"
                className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Email Me
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(207,243,99,0.2)" }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919725417323?text=Hi%20Dhara%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                WhatsApp: +91 97254 17323
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="max-w-7xl mx-auto px-6 mt-24 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-display text-2xl font-bold mb-2 text-white">Dhara Rajpura</p>
              <p className="text-gray-400 text-sm">Freelance Embedded Systems Expert</p>
              <p className="text-brand text-xs mt-1">● Open to new opportunities</p>
            </div>
            <div className="flex gap-8 flex-wrap justify-center">
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
                onClick={() => scrollToSection("reviews")}
                className="text-gray-400 hover:text-white active:text-white transition-colors text-sm touch-manipulation"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-400 hover:text-white active:text-white transition-colors text-sm touch-manipulation"
              >
                Contact
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Dhara Rajpura. All rights reserved.</p>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollToSection("hero")}
            aria-label="Scroll back to top"
            className="fixed bottom-8 right-8 w-12 h-12 bg-brand text-black rounded-full shadow-lg hover:bg-brand-dark transition-colors flex items-center justify-center z-40"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
