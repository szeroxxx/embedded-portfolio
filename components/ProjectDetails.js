import { motion } from "framer-motion";

export const projectsData = [
  {
    title: "CRM: Common Station PCB",
    description:
      "The project is designed to control various stations of one robot to control various Motors, Sensors and communication modules to create an efficient, automated system. The system integrates Stepper Motors, DC motors, limit switches for NPN sensors, STM32 controller, an ESP32 wifi module, an Ethernet circuit and RGB Leds. This project aimed to control a versatile customisable platform for controlling different types of motors and sensors in an automation environment.",
    skills: [
      "Embedded system design",
      "Motor and sensors integration",
      "Energy-Efficient Design",
      "STM32 Controller",
      "ESP32 WiFi",
      "Ethernet Integration",
    ],
    image: "/crm.jpg",
    category: "PCB Design",
    year: "2024",
  },
  {
    title: "Bottle Sorter Robot",
    description:
      "The Bottle Sorter Robot is an automated system for sorting, measuring, and monitoring pill bottles. It fetches and delivers bottles for analysis, sorts them by size, and performs weight measurement and pill tracking. Ideal for pharmaceutical and automated dispensing applications, it ensures precise bottle management.",
    skills: [
      "Servo motor control",
      "Real-time system response",
      "User interface development",
      "Automated Sorting",
      "Weight Measurement",
      "Pharmaceutical Applications",
    ],
    image: "/bottlesorter.jpg",
    category: "Robotics",
    year: "2024",
  },
  {
    title: "Triggering Unit PCB",
    description:
      "The triggering unit PCB is a specialised circuit board designed to generate dual voltage levels (-7V and +6.3V) from a single 12V input. The primary function of this project is to trigger signals between these two voltage levels, using high speed Operational amplifier and analog Comparators circuits. The unit is aimed at applications where precise voltage levels and accurate signal triggering are crucial, such as Communication systems, measurement equipment, or signal conditioning applications.",
    skills: [
      "Signal switching precision",
      "Reliable system monitoring",
      "Human-machine interface",
      "Voltage Level Conversion",
      "Op-Amp Circuits",
      "Analog Comparators",
    ],
    image: "/trigger.jpg",
    category: "Signal Processing",
    year: "2023",
  },
];

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white text-black rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover rounded-t-3xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1 bg-gray-100 rounded-full text-sm">{project.category}</span>
            <span className="text-gray-400 text-sm">{project.year}</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
          <div>
            <h3 className="text-lg font-bold mb-3">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
