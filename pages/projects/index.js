import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const ProjectCard = ({ title, description, skills, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative p-6 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/15 
                 border border-gray-700 shadow-2xl hover:shadow-indigo-500/20 
                 transform hover:-translate-y-2 transition-all duration-300
                 h-[650px] flex flex-col" // Increased height from 600px to 650px
    >
      <div className="relative overflow-hidden rounded-xl mb-6 h-48 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
                    opacity-60 group-hover:opacity-40 transition-opacity duration-300"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <motion.h3
          whileHover={{ scale: 1.01 }}
          className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                   bg-clip-text text-transparent tracking-wide h-[64px] line-clamp-2" // Increased height and margin-bottom
        >
          {title}
        </motion.h3>
        <p className="leading-relaxed font-light tracking-wide text-sm mb-6 line-clamp-5 flex-grow text-indigo-200"> 
          {/* Increased line-clamp from 4 to 5 and margin-bottom */}
          {description}
        </p>
        <div className="mt-auto">
          <h4 className="text-md font-semibold text-indigo-300 mb-3 tracking-wider">
            SKILLS
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-indigo-900/50 to-purple-900/50 
                         border border-indigo-700/30 text-indigo-300 hover:text-indigo-200 
                         transition-colors duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent 
                  via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500"
      />
    </motion.div>
  );
};


const Projects = () => {
  const projects = [
    {
      title: "CRM: Common Station PCB",
      description:
        "The project is designed to control various stations of one robot to control various Motors, Sensors and communication modules to create an efficient, automated system. The system integrates Stepper Motors, DC motors, limit switches for NPN sensors, STM32 controller, an ESP32 wifi module, an Ethernet circuit and RGB Leds.This project aimed to control a versatile customisable platform for controlling different types of motors and sensors in an automation environment.",
      skills: [
        "Embedded system design",
        "Motor and sensors integration",
        "Energy-Efficient Design",
      ],
      image: "/crm.jpg",
    },
    {
      title: "Bottle Sorter Robot",
      description:
        "The Bottle Sorter Robot is an automated system for sorting, measuring, and monitoring pill bottles. It fetches and delivers bottles for analysis, sorts them by size, and performs weight measurement and pill tracking. Ideal for pharmaceutical and automated dispensing applications, it ensures precise bottle management.",
      skills: [
        "Servo motor control",
        "Real-time system response",
        "User interface development",
      ],
      image: "/bottlesorter.jpg",
    },
    {
      title: "Triggering Unit PCB",
      description:
        "The triggering unit PCB is a specialised circuit board designed to generate dual voltage levels( -7V and +6.3V) from a single 12V input. The primary function of this project is to trigger signals between these two voltage levels, using high speed Operational amplifier and analog Comparators circuits. The unit is aimed at applications where precise voltage levels and accurate signal triggering are crucial, such as I. Communication systems, measurement equipment, or signal conditioning applications.",
      skills: [
        "Signal switching precision",
        "Reliable system monitoring",
        "Human-machine interface",
      ],
      image: "/trigger.jpg",
    },
  ];
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-black to-black/90 pointer-events-none" />

      <div className="relative container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          <div className="flex items-center justify-center gap-4 mb-4 px-4 relative">
            <h2
              className="text-5xl md:text-5xl sm:text-3xl xs:text-2xl font-bold 
                 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                 bg-clip-text text-transparent
                 animate-gradient-x hover:animate-pulse
                 transition-all duration-300
                 hover:scale-105"
            >
              Featured Projects
            </h2>
            {/* 
            <motion.button
              onClick={() => router.push("/")}
              className="absolute right-0 top-1/2 -translate-y-1/2
               px-6 py-2.5 rounded-lg
               bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
               text-white font-medium
               transition-all duration-500 ease-in-out
               hover:shadow-[0_0_20px_rgba(129,140,248,0.5)]
               hover:scale-105
               active:scale-95
               flex items-center gap-2
               sm:static sm:translate-y-0 sm:mt-4
               text-sm md:text-base
               border border-transparent
               hover:border-indigo-300
               backdrop-blur-sm
               group"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative">
                <span className="group-hover:animate-slide-text">Back</span>
              </span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </motion.svg>
            </motion.button> */}
          </div>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
                      from-indigo-900/20 via-transparent to-transparent pointer-events-none"
      />
    </div>
  );
};

export default Projects;
