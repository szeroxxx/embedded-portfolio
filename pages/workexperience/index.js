"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const ExperienceCard = ({ title, company, duration, description, index }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onClick={() => setIsSelected(!isSelected)}
      className={`relative p-8 rounded-xl transition-all duration-500 ease-out cursor-pointer
                   transform hover:-translate-y-2 group
                   ${
                     isSelected
                       ? "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 scale-[1.02]"
                       : "hover:shadow-[0_0_20px_rgba(0,100,255,0.3)]"
                   }
                   before:absolute before:inset-0 before:rounded-xl before:backdrop-blur-sm before:-z-10
                   ${
                     isSelected
                       ? "before:bg-gradient-to-r before:from-indigo-900/40 before:to-purple-900/40"
                       : "before:bg-gradient-to-r before:from-black/40 before:to-black/20"
                   }`}
    >
      {isSelected && (
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-xl rounded-xl" />
      )}

      <div className="relative overflow-hidden">
        <motion.h3
          layout="position"
          className={`text-2xl font-bold mb-3 tracking-wide transition-all duration-300
                       ${
                         isSelected
                           ? "bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300"
                           : "bg-gradient-to-r from-blue-300 to-purple-300"
                       } 
                       bg-clip-text text-transparent`}
        >
          {title}
        </motion.h3>
        <h4
          className={`text-lg font-semibold mb-2 transition-all duration-300
                         ${
                           isSelected
                             ? "text-indigo-200 drop-shadow-[0_0_8px_rgba(129,140,248,0.3)]"
                             : "text-blue-200/90"
                         }`}
        >
          {company}
        </h4>
        <div
          className={`inline-block px-4 py-1.5 mb-4 rounded-full text-sm transition-all duration-300
                          ${
                            isSelected
                              ? "bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border-indigo-400/50 text-indigo-200"
                              : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/20 text-blue-100/90"
                          }
                          border shadow-lg shadow-indigo-500/10`}
        >
          {duration}
        </div>
        <ul className="space-y-4">
          {description.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className={`flex items-start space-x-3 group transition-all duration-300
                         ${
                           isSelected ? "translate-x-2" : "hover:translate-x-1"
                         }`}
            >
              {/* Animated bullet point */}
              <div className="relative flex-shrink-0 mt-2">
                <span
                  className={`block h-2 w-2 rounded-full transition-all duration-300
                                ${
                                  isSelected
                                    ? "bg-indigo-400 animate-pulse"
                                    : "bg-gray-600 group-hover:bg-gray-500"
                                }`}
                />
                {isSelected && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-indigo-400/40" />
                )}
              </div>

              {/* Description text with enhanced styling */}
              <span
                className={`text-base transition-all duration-300
                              ${
                                isSelected
                                  ? "text-indigo-100 font-medium leading-relaxed"
                                  : "text-gray-400 group-hover:text-gray-300"
                              }
                              tracking-wide`}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500
                        ${
                          isSelected
                            ? "bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-100"
                            : "bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100"
                        }`}
      />
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Embedded Hardware Engineer",
      company: "DosePacker, Ahmedabad",
      duration: "Jan 2024 - Present",
      description: [
        "Designed PCBs for robotic systems integrating STM32, motors, and sensors for precision control.",
        "Developed motor control circuits focusing on thermal management and noise filtering.",
        "Integrated WiFi and Ethernet modules with ESP32 for seamless communication.",
      ],
    },
    {
      title: "Embedded Hardware Engineer",
      company: "Teq Diligent, Ahmedabad",
      duration: "Jan 2023 - Jan 2024",
      description: [
        "Designed multi-layer PCBs ensuring manufacturability and performance validation.",
        "Performed CAM checks and generated production-ready Gerber files.",
        "Tested PCB designs to ensure functionality and compliance with industry standards.",
      ],
    },
  ];
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen relative py-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/work.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.2",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="text-4xl font-bold mb-12 text-center
            bg-gradient-to-r from-blue-500 to-purple-600 
            text-transparent bg-clip-text
            hover:scale-105 transition-transform
            drop-shadow-lg
            tracking-wide
            px-4 py-2
            cursor-default"
        >
          Work Experience
        </motion.h2>
        {/* <motion.button
          onClick={handleBack}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-2 rounded-lg
          bg-gradient-to-r from-blue-500 to-purple-600
          text-white font-semibold
          hover:shadow-lg hover:scale-105
          transition-all duration-300
          flex items-center gap-2
          ml-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </motion.button> */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
