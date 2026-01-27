import { motion } from "framer-motion";

export const projectsData = [
  {
    title: "LoRa Healthcare Emergency Alert System",
    description:
      "Developed a dual-device wireless paging system (Patient-to-Nurse) capable of 500m range, optimized for low-power battery operation. The system consists of a Remote Trigger (Patient Node) and Master Receiver (Nurse Station), leveraging LoRa technology for reliable communication in challenging indoor environments. Designed complete hardware lifecycle including ESP32-based Master Receiver with RFID module integration and Arduino-based Remote Trigger with optimized RF layout. Successfully achieved stable 500m communication link with clear visual feedback through RGB LED status indicators.",
    skills: [
      "LoRa RF Design",
      "ESP32 Integration",
      "RFID Module",
      "Low-Power Design",
      "PCB Layout Optimization",
      "Signal Integrity",
      "Antenna Placement",
      "Battery Management",
    ],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    category: "Wireless Communication",
    year: "2025",
  },
  {
    title: "CRM: Common Station PCB",
    description:
      "Designed and developed a comprehensive control system PCB for robotic automation, managing multiple stations with various motors, sensors, and communication modules. The system integrates Stepper Motors, DC motors, limit switches, NPN sensors, STM32 controller, ESP32 WiFi module, Ethernet circuit, and RGB LEDs. Created a versatile, customizable platform for controlling different types of motors and sensors in automated environments, focusing on energy efficiency and reliable performance.",
    skills: [
      "Embedded System Design",
      "Motor Control Integration",
      "Energy-Efficient Design",
      "STM32 Controller",
      "ESP32 WiFi",
      "Ethernet Integration",
      "Sensor Integration",
    ],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    category: "PCB Design",
    year: "2024",
  },
  {
    title: "Bottle Sorter Robot",
    description:
      "Engineered an automated system for pharmaceutical applications, designed to sort, measure, and monitor pill bottles with precision. The system autonomously fetches and delivers bottles for analysis, sorts them by size, and performs accurate weight measurement and pill tracking. Developed the complete hardware solution including servo motor control circuits, real-time sensing systems, and user interface integration for seamless operation in pharmaceutical and automated dispensing environments.",
    skills: [
      "Servo Motor Control",
      "Real-Time Systems",
      "Weight Sensing",
      "Automated Sorting Logic",
      "User Interface Integration",
      "Pharmaceutical Standards",
    ],
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
    category: "Robotics",
    year: "2024",
  },
  {
    title: "Triggering Unit PCB",
    description:
      "Designed a specialized circuit board that generates dual voltage levels (-7V and +6.3V) from a single 12V input for precision signal triggering applications. Implemented high-speed operational amplifier and analog comparator circuits to achieve accurate signal switching between voltage levels. The design focuses on signal integrity and precise voltage level conversion, ideal for communication systems, measurement equipment, and signal conditioning applications requiring reliable triggering mechanisms.",
    skills: [
      "Voltage Level Conversion",
      "Op-Amp Circuit Design",
      "Analog Comparators",
      "Signal Switching Precision",
      "Power Supply Design",
      "Signal Conditioning",
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
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
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white text-black rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover rounded-t-3xl"
          />
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
          >
            ✕
          </motion.button>
        </div>
        <div className="p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-4"
          >
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-4 py-1 bg-gray-100 rounded-full text-sm"
            >
              {project.category}
            </motion.span>
            <span className="text-gray-400 text-sm">{project.year}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-4"
          >
            {project.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 leading-relaxed mb-6"
          >
            {project.description}
          </motion.p>
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg font-bold mb-3"
            >
              Skills & Technologies
            </motion.h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
