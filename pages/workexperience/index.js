"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/router';

const ExperienceCard = ({ title, company, duration, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative p-8 rounded-xl transition-all duration-300 
                   transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,100,255,0.3)]
                   before:absolute before:inset-0 before:bg-gradient-to-r 
                   before:from-black/40 before:to-black/20 before:rounded-xl
                   before:backdrop-blur-sm before:-z-10
                   after:absolute after:inset-0 after:bg-gradient-to-r 
                   after:from-blue-500/5 after:to-purple-500/5 after:rounded-xl after:-z-20"
    >
      <div className="relative overflow-hidden backdrop-blur-[2px]">
        <motion.div whileHover={{ scale: 1.02 }} className="relative z-10">
          <h3
            className="text-2xl font-bold mb-2 
                           bg-gradient-to-r from-blue-300 to-purple-300 
                           bg-clip-text text-transparent"
          >
            {title}
          </h3>
          <h4 className="text-lg font-semibold mb-2 text-blue-200/90">
            {company}
          </h4>
          <div
            className="inline-block px-3 py-1 mb-3 
                           bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                           border border-blue-400/20 rounded-full 
                           text-sm text-blue-100/90"
          >
            {duration}
          </div>
          <ul className="space-y-3 mt-4">
            {description.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="flex items-start space-x-2 group"
              >
                <span
                  className="text-blue-300/80 mt-1 group-hover:text-blue-200 
                                 transition-colors duration-200"
                >
                  •
                </span>
                <span
                  className="text-gray-200/80 group-hover:text-white/90 
                                 transition-colors duration-200"
                >
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
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
  router.push('/');
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
