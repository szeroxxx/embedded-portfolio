import { useEffect } from "react";
import { motion } from "framer-motion";

export const projectsData = [
  {
    title: "LOCA - Navigation PCB with DOF Sensors and GNSS",
    description:
      "This project centers on the design and development of a compact, low-power navigation-oriented printed circuit board built around the Seed Studio XIAO nRF52840 module, which itself integrates Nordic Semiconductor's nRF52840 system-on-chip as its primary processing unit. The core navigational capability is achieved through the fusion of two complementary sensing subsystems: a GNSS L86 module for satellite-based absolute positioning, interfaced via UART, and a 10-DoF IMU sensor providing inertial measurements through the I2C bus, with power supplied at 3.3V throughout. Onboard inertial sensing is further reinforced by the LSM6DS3TR-C six-axis IMU, which communicates over the nRF52840's internal I2C lines and generates interrupt signals routed to dedicated GPIO pins, enabling event-driven firmware execution rather than continuous polling. The schematic, designed in Altium Tool (dated Feb, 2025), encompasses a well-structured power architecture: a USB-C interface handles both data and charging input, while the battery management IC governs single-cell LiPo charging with configurable current via an ISET resistor and onboard temperature sensing. A 3.3V LDO regulator provides a clean system rail, decoupled at multiple nodes for noise immunity. Peripheral features include an RGB LED indicator, a MEMS microphone (MSM261D3526H1CPM) on the PDM interface, QSPI flash memory for data logging, dual crystal oscillators (32 MHz and 32.768 kHz) for RF and RTC accuracy, and NFC antenna pads for proximity-based communication. Battery voltage monitoring is implemented through a dedicated ADC pin (P0.31/AIN7), with a read-enable MOSFET circuit to minimize quiescent current during idle states, which reflects a deliberate design philosophy oriented towards power efficiency in field-deployable navigation applications.",
    skills: [
      "Power Management",
      "Low Power Design",
      "Motion Sensor",
      "Antenna Design",
      "RF Design",
      "Multi-layer Board",
      "BGA Package Routing",
      "Navigation Design",
    ],
    image: "/cf4422ec-5d68-44f4-b303-aa48d58eb5a5.png",
    category: "Freelance Project",
    year: "2026",
  },
  {
    title: "GST Smart Calculator",
    description:
      "This project focuses on the development of a fully functional, portable merchant-grade Smart GST Calculator designed for small and medium-sized businesses that require GST calculation, inventory management, accounting support, and receipt printing in a compact standalone device. The system is built around the ESP32-S3-WROOM-1-N8R2 module, which serves as the primary controller and provides integrated Wi-Fi connectivity for cloud backup, future software updates, and wireless communication. A key feature of the device is its thermal receipt printing capability, allowing merchants to generate transaction receipts directly from the calculator through a wireless thermal printer without requiring a computer or smartphone. The user interface is provided through a 4-inch TFT color display, while a 5 × 7 matrix keypad with approximately 35 mechanical switches enables reliable and responsive user input for numerical entry, navigation, GST operations, inventory management, accounting functions, and printing commands. The system includes Flash memory for storing inventory records, transaction history, accounting data, and user settings. Power is supplied by a 4,500–5,500 mAh LiPo battery, managed by the battery charging IC through a USB Type-C interface, while a high-efficiency buck converter generates a stable 3.3 V supply rail for all electronic components. The hardware is designed to support inventory tracking for up to 500 SKUs, payment tracking, daily accounting activities, GST add/remove calculations at the press of a button, sales record management, and wireless data backup, creating a self-contained business management solution for retail and commercial users. The project deliverables include complete schematic design, DFM-compliant multi-layer PCB layout, Gerber files, BOM, pick-and-place data, and manufacturing documentation, resulting in a portable device that combines GST compliance, inventory control, accounting assistance, Wi-Fi connectivity, and thermal receipt printing in a single integrated platform.",
    skills: [
      "High Speed Data Routing",
      "Multi-layer Board",
      "Power Management",
      "Battery Operated Design",
      "Key-Pad Matrix Design",
      "ESP32 Integration",
    ],
    image: "/4c76595a-4bc9-4ab6-8899-76814749a779.png",
    category: "Freelance Project",
    year: "2026",
  },
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
    image: "/09279b67-bc12-4552-bfb3-334833121621.png",
    category: "Wireless Communication",
    year: "2026",
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
    image: "/24411e71-718f-430b-a7d8-eb860dcd369b.png",
    category: "PCB Design",
    year: "2025",
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
    image: "/f6467503-a94c-45d4-bd49-7707cb6b811a.png",
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
    image: "/029463a4-28f3-4f70-9b11-d5197b217ca0.png",
    category: "Signal Processing",
    year: "2023",
  },
];

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    // Lock background scroll while the modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white text-black rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Close Button - Always Visible */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label="Close project details"
          className="fixed top-4 right-4 md:absolute w-12 h-12 md:w-10 md:h-10 bg-black md:bg-white text-white md:text-black rounded-full flex items-center justify-center hover:bg-gray-800 md:hover:bg-gray-100 transition-colors shadow-lg z-50 font-bold text-xl"
        >
          ✕
        </motion.button>
        
        <div className="relative aspect-video w-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            src={project.image}
            alt={`${project.title} — ${project.category} project`}
            decoding="async"
            className="w-full h-full object-cover rounded-t-3xl"
          />
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
