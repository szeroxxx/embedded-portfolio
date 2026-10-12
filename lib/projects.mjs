const asset = (name) => `/portfolio/${name}`;
export const projectsData = [
  { slug:"nrf52840-navigation", title:"nRF52840 navigation board", kicker:"Wireless navigation hardware", year:"2026", role:"Embedded Hardware & PCB Design Engineer", overview:"A compact navigation platform combining GNSS and inertial sensing with battery power, USB-C charging and low-power monitoring around an nRF52840 module.", scope:"Schematic architecture, component selection, multilayer PCB implementation and manufacturing documentation.", highlights:["GNSS + 10-DoF sensor fusion hardware","USB-C and single-cell LiPo power path","QSPI flash, microphone and NFC provisions","Low-quiescent battery-voltage monitoring"], tools:["Altium Designer","nRF52840","I²C","UART","USB-C"], skills:["Low-power design","RF-aware layout","Power architecture","Multilayer routing"], images:[asset("01-nrf52840-navigation-thumbnail-concept.png"),asset("02-system-architecture-concept.png"),asset("03-low-power-monitoring-concept.png")] },
  { slug:"esp32-s3-smart-gst-calculator", title:"ESP32-S3 Smart GST Calculator", kicker:"Connected GST calculator hardware", year:"2026", role:"Embedded Hardware & PCB Design Engineer", overview:"Battery-operated smart GST calculator hardware for merchants, built around ESP32-S3, a four-inch display, a 35-key matrix keypad, local storage and wireless thermal-printer connectivity.", scope:"System architecture, schematic capture, PCB design and production-file handoff for a battery-operated product.", highlights:["ESP32-S3 with Wi-Fi connectivity","35-key matrix and 4-inch TFT interface","USB-C charging and efficient 3.3 V rail","Manufacturing-ready BOM and assembly data"], tools:["Altium Designer","ESP32-S3","USB-C","SPI","Wi-Fi"], skills:["Battery systems","Interface design","Dense placement","DFM"], images:[asset("04-esp32-s3-smart-gst-calculator-concept.png"),asset("05-terminal-system-architecture-concept.png"),asset("06-terminal-power-architecture-concept.png")] },
  { slug:"lora-nurse-call", title:"LoRa nurse-call system", kicker:"Two-node wireless system", year:"2026", role:"Embedded Hardware Engineer", overview:"A patient-to-nurse alert system pairing a compact remote trigger with an ESP32-based receiver station for dependable indoor communication.", scope:"Hardware architecture, radio-aware PCB layout, power design and interface integration across both nodes.", highlights:["Remote trigger and master receiver","LoRa link for challenging indoor spaces","RFID and visual status integration","Battery-conscious remote-node design"], tools:["Altium Designer","LoRa","ESP32","RFID","UART"], skills:["RF layout","Antenna placement","Low-power design","System partitioning"], images:[asset("07-lora-nurse-call-thumbnail-concept.png"),asset("08-lora-two-node-system-concept.png"),asset("09-lora-500m-indoor-link-concept.png")] },
  { slug:"stm32-station-control", title:"STM32 station-control PCB", kicker:"Robotics control platform", year:"2025", role:"Embedded Hardware Engineer", overview:"A configurable station-control board for robotic equipment, bringing motors, sensors, Ethernet and wireless communication onto one serviceable platform.", scope:"Circuit design, motor and sensor interfaces, domain separation, placement, routing and fabrication release.", highlights:["STM32 controller and ESP32 connectivity","Stepper and DC motor interfaces","Ethernet, sensors and limit switches","Noise-conscious power-domain separation"], tools:["Altium Designer","STM32","ESP32","Ethernet","CAN"], skills:["Motor control","Mixed-signal layout","EMI mitigation","Power distribution"], images:[asset("10-stm32-station-control-thumbnail-concept.png"),asset("11-stm32-station-architecture-concept.png"),asset("12-stm32-noise-domain-separation-concept.png")] },
  { slug:"pharmacy-bottle-sorter", title:"Pharmacy bottle sorter", kicker:"Mixed-signal automation hardware", year:"2024", role:"Mixed-Signal PCB & Hardware Engineer", overview:"Control hardware for an automated pharmaceutical handling system that fetched, sorted, weighed and tracked pill bottles.", scope:"Servo-drive circuits, position and presence sensing, load-cell measurement, operator-interface integration and mixed-signal PCB implementation.", highlights:["Servo-driven handling mechanism","Load-cell signal chain for mass measurement","Real-time position and presence sensing","Analog isolation from switching noise"], tools:["Altium Designer","Load cell","Servo control","Mixed signal"], skills:["PCB design","Analog front ends","Return-path control","Hardware integration"], images:[asset("13-pharmacy-bottle-sorter-thumbnail-concept.png"),asset("14-pharmacy-sorting-system-concept.png"),asset("15-pharmacy-precision-weighing-concept.png")] },
  { slug:"dual-rail-trigger", title:"Dual-rail trigger unit", kicker:"Precision analog hardware", year:"2023", role:"Analog Hardware Designer", overview:"A precision trigger board generating −7 V and +6.3 V rails from a single 12 V input for dependable level switching and signal conditioning.", scope:"Power conversion, op-amp and comparator stages, signal-integrity decisions, PCB design and release documentation.", highlights:["Dual rails from a 12 V source","High-speed op-amp signal path","Comparator-based level switching","Noise-aware analog layout"], tools:["Altium Designer","Op amps","Comparators","DC-DC"], skills:["Analog design","Signal conditioning","Power conversion","PCB layout"], images:[asset("16-dual-rail-trigger-thumbnail-concept.png"),asset("17-dual-rail-architecture-concept.png")] },
  { slug:"tmr-actuator-driver", title:"TMR actuator driver PCB: 3-ECU voting and 24 output channels", kicker:"Safety-critical layout implementation", year:"2026", role:"PCB Layout Engineer — 4-Layer Safety-Critical Hardware", overview:"Four-layer PCB layout for a Triple Modular Redundant actuator driver board. The client supplied the schematic and architecture; the layout implements three isolated ECU domains and hardware 2-of-3 voting for 16 solenoid and 8 ignitor channels.", scope:"Component placement, signal and power routing, isolation-barrier implementation, ground and power planes, DRC/ERC verification, and Gerber release. No claim is made for architecture design, certification, fabrication or operational validation.", highlights:["400+ component placement","Three galvanically isolated ECU domains","16 solenoid + 8 ignitor channels","Four-layer power and signal routing"], tools:["Altium Designer","Gerber","DRC/ERC","4-layer PCB"], skills:["Constraint management","Isolation layout","Power planes","DFM/DFA"], images:[asset("51-tmr-actuator-thumbnail-concept.png"),asset("52-tmr-architecture-concept.png"),asset("53-tmr-four-layer-layout-concept.png")] },
];


const projectSeo = {
  "nrf52840-navigation": [
    "nRF52840 Navigation PCB Design | Dhara Rajpura",
    "nRF52840 navigation PCB case study: GNSS, inertial sensors, USB-C LiPo charging and low-power hardware. Explore Dhara Rajpura’s design scope."
  ],
  "esp32-s3-smart-gst-calculator": [
    "ESP32-S3 Smart GST Calculator | Dhara Rajpura",
    "ESP32-S3 Smart GST Calculator hardware: 4-inch TFT, 35-key keypad, Wi-Fi printer connectivity and USB-C charging. PCB design by Dhara Rajpura."
  ],
  "lora-nurse-call": [
    "LoRa Nurse-Call Hardware & PCB Design | Dhara Rajpura",
    "Two-node LoRa nurse-call hardware with an ESP32 receiver, RFID and battery-conscious remote. Explore Dhara Rajpura’s hardware and PCB design scope."
  ],
  "stm32-station-control": [
    "STM32 Robotics Control PCB Design | Dhara Rajpura",
    "STM32 station-control PCB with motor and sensor interfaces, ESP32, Ethernet and separated power domains. Hardware case study by Dhara Rajpura."
  ],
  "pharmacy-bottle-sorter": [
    "Bottle Sorter Robotics PCB Design | Dhara Rajpura",
    "Bottle sorter control hardware: servo interfaces, load-cell measurement, position sensing and mixed-signal PCB design. Case study by Dhara Rajpura."
  ],
  "dual-rail-trigger": [
    "Dual-Rail Analog Trigger PCB Design | Dhara Rajpura",
    "Analog trigger PCB with −7 V and +6.3 V rails, op-amp stages and comparator switching. Explore Dhara Rajpura’s analog hardware design scope."
  ],
  "tmr-actuator-driver": [
    "TMR Actuator Driver PCB Layout | Dhara Rajpura",
    "Four-layer TMR actuator driver PCB layout: 400+ components, three isolated ECUs and 24 outputs. Client-supplied architecture; layout by Dhara Rajpura."
  ]
};
for (const project of projectsData) { [project.seoTitle,project.seoDescription] = projectSeo[project.slug]; }
