import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
const ProjectCard = ({ title, description, skills, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative p-6 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/15 
                 border border-gray-700 shadow-2xl hover:shadow-indigo-500/20 
                 transform hover:-translate-y-2 transition-all duration-300
                 h-auto flex flex-col" // Changed from fixed height to h-auto
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
        <p className="leading-relaxed font-light tracking-wide text-sm mb-6 text-indigo-200">
        {/* Removed line-clamp-5 to show full description */}
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
      image: "/1.jpg",
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
      image: "/2nd.jpg",
    },
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
    <Layout>
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
    </Layout>
  );
};

export default Projects;
