import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoLogoLinkedin } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
const TechnicalSkills = () => {
  const skills = [
    {
      category: "PCB Design",
      expertise: [
        {
          title: "Schematic Design",
          items: [
            "Component Selection",
            "Power Supply Circuit Design",
            "Netlist Creation",
            "BOM File Generation",
          ],
        },
        {
          title: "Layout Design",
          items: [
            "Component Placement & Routing",
            "Differential Pair Routing",
            "Power & Ground Plane Design",
            "Thermal Management",
            "Signal Integrity",
            "High-Speed Signal Impedance Matching",
            "Layer Stackup Definition",
          ],
        },
      ],
      tools: ["Pads Professional", "Pads Layout", "Orcad", "Allegro"],
    },
    {
      category: "Motor Control",
      items: [
        "Stepper Motor Control with Encoders",
        "Break Mechanism Implementation",
        "DC Motor Speed & Direction Control",
        "PWM Signal Implementation",
      ],
    },
    {
      category: "Sensor Integration",
      items: [
        "Temperature Sensors",
        "Proximity Sensors",
        "Encoders",
        "Limit Switches",
      ],
    },
    {
      category: "Voltage Regulation & Power Management",
      items: [
        "Op-Amp Based Voltage Level Conversion",
        "Power Supply Design",
        "Low-Power System Distribution",
        "DC-DC Converter Integration",
      ],
    },
    {
      category: "Communication & Interfaces",
      items: [
        "Wi-Fi Module Integration (ESP32)",
        "Ethernet Communication Circuits",
        "I2C Protocol",
        "SPI Protocol",
        "UART Protocol",
        "CAN Protocol",
      ],
    },
    {
      category: "Real-Time Control Systems",
      items: [
        "Real-Time Clock (RTC) Integration",
        "Watchdog Timer Implementation",
        "Real-Time Embedded Systems Design",
        "Automation System Development",
      ],
    },
    {
      category: "Safety and Protection",
      items: [
        "Emergency Stop Circuit Design",
        "EM Lock Mechanism Implementation",
        "Safety Feature Integration",
      ],
    },
  ];

  return (
    <div className="flex flex-col space-y-8">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="relative group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 * index }}
        >
          <div
            className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
                       rounded-2xl opacity-75 group-hover:opacity-100 blur-sm 
                       transition duration-1000 group-hover:duration-200
                       animate-gradient-xy"
          ></div>

          <div
            className="relative bg-gray-900 rounded-xl p-6 hover:shadow-2xl 
                       transition-all duration-300 ease-in-out
                       backdrop-blur-xl backdrop-filter
                       border border-gray-800/50"
          >
            <motion.h3
              className="text-2xl font-semibold mb-6 text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 * index }}
              whileHover={{ scale: 1.02 }}
            >
              {skill.category}
            </motion.h3>

            <div className="flex flex-col md:flex-row md:gap-6">
              {skill.expertise ? (
                <div className="flex-1 space-y-4">
                  {skill.expertise.map((exp, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx + 0.4 * index }}
                    >
                      <motion.h4
                        className="text-gray-200 font-medium mb-3 text-lg
                               border-b border-gray-700/50 pb-2"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {exp.title}
                      </motion.h4>
                      <ul className="list-none space-y-2">
                        {exp.items.map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center text-gray-400 hover:text-gray-200 
                                   transition-colors duration-200"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i + 0.5 * index }}
                            whileHover={{ x: 10 }}
                          >
                            <span className="mr-2 text-purple-400">▹</span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                  {skill.tools && (
                    <motion.div
                      className="mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 * index }}
                    >
                      <h4 className="text-gray-300 font-medium mb-3">Tools:</h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.tools.map((tool, idx) => (
                          <motion.span
                            key={idx}
                            className="px-4 py-1.5 bg-gray-800/50 rounded-full text-sm text-gray-300
                                   border border-gray-700/50 hover:border-purple-500/50
                                   hover:bg-gray-800 transition-all duration-300"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * idx + 0.7 * index }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                // For other skills
                <div className="flex-1">
                  <ul className="list-none space-y-2">
                    {skill.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center text-gray-400 hover:text-gray-200 
                               transition-colors duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx + 0.4 * index }}
                        whileHover={{ x: 10 }}
                      >
                        <span className="mr-2 text-purple-400">▹</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const AboutSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto p-8">
        <section
          className="flex flex-col md:flex-row items-center justify-between 
                          backdrop-blur-lg bg-gray-900/50 rounded-2xl p-10 
                          border border-gray-700/50 shadow-2xl"
        >
          <div className="max-w-xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="text-4xl md:text-5xl font-bold mb-2 text-transparent 
                           bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
              >
                Hey, I'm{" "}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-white"
                >
                  Dhara Rajpura
                </motion.span>
              </h1>
            </motion.div>
            <motion.p
              className="text-lg leading-relaxed text-gray-300 backdrop-blur-sm 
                       bg-gray-800/30 p-4 rounded-lg border border-gray-700/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(31, 41, 55, 0.4)",
              }}
            >
              <TypewriterEffect
                text="I am an embedded hardware engineer with around 2+ years of experience 
                     in the design, development, and testing of embedded systems."
                delay={50}
              />
            </motion.p>
            <motion.div
              className="flex gap-8 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <SocialLink
                href="https://www.linkedin.com/in/dhara-rajpura-4b24b122b/"
                icon={<IoLogoLinkedin className="w-8 h-8 sm:w-10 sm:h-10" />}
              />
              <SocialLink
                href="mailto:dhararajpura2001@gmail.com "
                icon={<MdEmail className="w-8 h-8 sm:w-10 sm:h-10" />}
              />
            </motion.div>
          </div>
          <motion.div
            className="relative mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 
                          rounded-full blur-xl opacity-30 animate-pulse"
            />
            <motion.div
              className="relative w-64 h-64 rounded-full overflow-hidden border-4 
                       border-gray-700 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/d1.jpg"
                alt="Profile Image"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </motion.div>
          </motion.div>
        </section>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-8 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <GradientText text="Technical Skills" />
          </motion.h2>
          <TechnicalSkills />
        </motion.div>
      </div>
    </div>
  );
};

const SocialLink = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative group"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 
                 rounded-full opacity-0 group-hover:opacity-70 blur-md transition-all duration-300"
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />

    <motion.div
      className="relative p-3 bg-gray-900/50 rounded-full border border-gray-700/50 
                 backdrop-blur-sm transition-all duration-300"
      whileHover={{
        backgroundColor: "rgba(31, 41, 55, 0.8)",
        borderColor: "rgba(147, 197, 253, 0.5)",
      }}
    >
      <motion.div
        className="text-gray-300 hover:text-transparent hover:bg-clip-text 
                   hover:bg-gradient-to-r from-blue-400 to-purple-500"
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {React.cloneElement(icon, {
          className: "w-8 h-8 sm:w-10 sm:h-10",
        })}
      </motion.div>
    </motion.div>
  </motion.a>
);

const TypewriterEffect = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const GradientText = ({ text }) => (
  <span
    className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                 bg-clip-text text-transparent animate-gradient-x"
  >
    {text}
  </span>
);

export default AboutSection;
