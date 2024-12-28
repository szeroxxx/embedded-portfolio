import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, skills, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative p-6 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/15 
                 border border-gray-700 shadow-2xl hover:shadow-indigo-500/20 
                 transform hover:-translate-y-2 transition-all duration-300
                 h-[600px] flex flex-col" // Fixed height and flex column
    >
      {/* Image Container with fixed height */}
      <div className="relative overflow-hidden rounded-xl mb-6 h-48 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
                        opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
      </div>

      {/* Content wrapper with flex-grow to take remaining space */}
      <div className="flex flex-col flex-grow">
        {/* Title with fixed height */}
        <motion.h3 
          whileHover={{ scale: 1.01 }}
          className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                     bg-clip-text text-transparent tracking-wide h-[60px] line-clamp-2"
        >
          {title}
        </motion.h3>

        {/* Description with line clamping */}
        <p className="leading-relaxed font-light tracking-wide text-sm  mb-4 line-clamp-4 flex-grow text-indigo-200">
          {description}
        </p>

        {/* Skills section fixed to bottom */}
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

      {/* Decorative bottom border */}
      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent 
                      via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500" />
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "CRM: Common Station PCB",
      description:
        "Designed to control multiple robotic stations, integrating motors, sensors, and communication modules for automation. Features stepper motors, DC motors, NPN sensors, STM32 controllers, ESP32 WiFi, Ethernet, and RGB LEDs.",
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
        "Automated robotic system for sorting, measuring, and monitoring pill bottles. Designed for pharmaceutical applications requiring accurate tracking and sorting based on physical characteristics.",
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
        "Specialized PCB generating dual voltage levels (-7V and +6.3V) from 12V input. Ensures precise signal triggering with high-speed operational amplifiers and comparators.",
      skills: [
        "Signal switching precision",
        "Reliable system monitoring",
        "Human-machine interface",
      ],
      image: "/trigger.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-black to-black/90 pointer-events-none" />

      <div className="relative container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                         bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
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

      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
                      from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default Projects;
