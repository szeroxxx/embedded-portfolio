const offerings=[
  {n:"01",title:"PCB Design Review & DFM Audit",image:"/services/18-catalog-dfm-audit-thumbnail.png",summary:"An independent review of schematic, layout and fabrication readiness before files reach the factory.",work:["Schematic and layout review","Power, grounding and return-path analysis","DFM / DFA checks","Prioritized findings with clear actions"],deliverables:["Annotated review report","Risk-ranked issue list","Manufacturing-readiness notes"],boundary:"Review and recommendations only; redesign, firmware and certification management are separate scopes."},
  {n:"02",title:"Production-Ready Custom PCB Design",image:"/services/21-catalog-custom-pcb-thumbnail.png",summary:"A complete board implementation structured around product, mechanical and manufacturing constraints.",work:["Requirements and system partitioning","Schematic capture and design checks","Placement and multilayer routing","Release-package preparation"],deliverables:["Native design files","Gerbers / ODB++, drill and drawings","BOM and pick-and-place data"],boundary:"Firmware, enclosure design, procurement, assembly and certification management are not included unless separately agreed."},
  {n:"03",title:"Schematic Capture & EDA Library Creation",image:"/services/31-catalog-schematic-libraries-thumbnail.png",summary:"Clean, editable engineering data from PDFs, legacy designs, datasheets or early circuit notes.",work:["PDF and legacy schematic rebuilds","Hierarchical schematic organization","Custom symbols and footprints","ERC and library verification"],deliverables:["Native EDA project","Annotated schematic PDF","Verified library, BOM and netlist"],boundary:"PCB layout and functional validation are outside this service unless added to the project scope."},
  {n:"04",title:"Battery-Powered Wireless / IoT PCB",image:"/services/41-catalog-wireless-low-power-thumbnail.png",summary:"Low-power connected hardware for ESP32, nRF52, LoRa, USB-C and LiPo-based products.",work:["Radio and power architecture","Charging and current-budget planning","RF-aware placement and routing","Antenna keep-outs and grounding strategy"],deliverables:["Schematic and PCB files","Manufacturing package","Power notes and DFM checklist"],boundary:"Laboratory RF tuning, firmware, compliance testing and guaranteed range or battery life are not included."},
];

const details = [
  {
    slug: 'pcb-design-review', seoTitle: 'PCB Design Review & DFM Audit | Dhara Rajpura',
    description: 'Hire Dhara Rajpura for schematic and PCB layout reviews, DFM/DFA checks, and a prioritized report before manufacturing. Altium and KiCad projects.',
    intro: 'Have a schematic or PCB layout ready for another set of eyes? I review the engineering files and the intended manufacturing constraints, then organize the findings into practical next steps. This service is suitable for a design checkpoint before fabrication or for understanding an existing board before a revision.',
    audience: 'Startup founders, hardware teams and engineers with an existing schematic or board layout who need a focused independent review.',
    projectSlugs: ['tmr-actuator-driver', 'stm32-station-control', 'dual-rail-trigger'],
    faqs: [
      { question: 'What do I need to send for a PCB design review?', answer: 'Share the native design files, schematic PDF, board stack-up, BOM, mechanical constraints and the manufacturer’s design rules, where available. Include the product requirements and any concerns so the review can focus on the relevant risks.' },
      { question: 'What is the difference between a schematic review and a DFM audit?', answer: 'A schematic review considers the circuit and interfaces. A layout review considers placement, routing, power distribution and return paths. A DFM audit checks the design against the intended manufacturer’s fabrication and assembly constraints. The agreed scope determines which checks are included.' },
      { question: 'Will you fix the issues found during the review?', answer: 'The review deliverable is an annotated report, a prioritized issue list and manufacturing-readiness notes. Editing the schematic or layout can be agreed as a separate engagement after the findings are understood.' },
      { question: 'Does a design review guarantee certification or a working product?', answer: 'No. File review does not replace prototype testing, laboratory measurements or certification. Those activities need their own scope and appropriate test facilities.' },
    ],
  },
  {
    slug: 'custom-pcb-design', seoTitle: 'Custom PCB Design Services | Altium & KiCad | Dhara Rajpura',
    description: 'Freelance custom PCB design with Dhara Rajpura: schematics, 2–8 layer layout, Altium or KiCad files, BOM, Gerbers and manufacturing documentation.',
    intro: 'I help product teams move from requirements or an existing schematic to a documented PCB implementation. The engagement covers the agreed architecture, schematic, placement and routing work, with a release package organized for the manufacturer. I work with Altium Designer and KiCad on 2–8 layer boards.',
    audience: 'Product teams developing a new board, revising an existing product or outsourcing PCB layout from a client-supplied schematic.',
    projectSlugs: ['stm32-station-control', 'pharmacy-bottle-sorter', 'tmr-actuator-driver', 'esp32-s3-smart-gst-calculator'],
    faqs: [
      { question: 'Can you design a PCB from an existing schematic?', answer: 'Yes. Layout-only work can start from a client-supplied schematic and architecture. The brief should include dimensions, connector locations, stack-up requirements, electrical constraints and manufacturing rules. My TMR actuator driver case study is an example of a layout-only scope.' },
      { question: 'Do you work with Altium Designer and KiCad?', answer: 'Yes. The tool and handoff format are agreed at the start. Share your existing project and library requirements so that the final files fit your team’s workflow.' },
      { question: 'What files are included in the manufacturing handoff?', answer: 'The agreed package can include editable design files, schematic PDFs, Gerbers or ODB++, drill files, BOM, pick-and-place data and assembly drawings. The exact formats depend on the selected EDA tool and manufacturer.' },
      { question: 'How much does a custom PCB design cost?', answer: 'I quote after reviewing the scope. Layer count, component count, interfaces, power requirements, mechanical constraints and the completeness of existing files affect the work. Send your current design state and desired deliverables for a project-specific estimate.' },
      { question: 'Are firmware, manufacturing and enclosure design included?', answer: 'These are separate scopes unless explicitly agreed. The PCB design engagement focuses on hardware engineering and the documented release package.' },
    ],
  },
  {
    slug: 'schematic-capture', seoTitle: 'Schematic Capture & EDA Libraries | Dhara Rajpura',
    description: 'Schematic capture, PDF-to-editable schematic rebuilding, and custom symbols and footprints for Altium Designer and KiCad projects with Dhara Rajpura.',
    intro: 'When circuit information is scattered across PDFs, legacy files or component notes, I organize it into an editable EDA project. The work can include schematic rebuilding, hierarchical organization and symbols and footprints checked against the supplied component documentation. The result is a clearer starting point for review and PCB layout.',
    audience: 'Teams with legacy schematics, PDF drawings, incomplete libraries or a new circuit that needs structured documentation.',
    projectSlugs: ['dual-rail-trigger', 'nrf52840-navigation', 'esp32-s3-smart-gst-calculator'],
    faqs: [
      { question: 'Can you convert a PDF schematic into an editable Altium or KiCad project?', answer: 'Yes. Send the schematic PDF, component list and any source files. Ambiguous labels, missing connections or unclear part numbers need to be resolved before the rebuilt schematic is finalized.' },
      { question: 'What do you need to create a custom footprint?', answer: 'Provide the exact manufacturer part number, datasheet and recommended land pattern, along with any assembly-house requirements. A similar-looking component is not a substitute for the correct package documentation.' },
      { question: 'Does schematic capture include PCB layout?', answer: 'PCB layout is a separate service unless added to the agreed scope. Schematic capture and library creation provide editable design data, schematic documentation and the agreed BOM or netlist.' },
      { question: 'Does an ERC pass prove that the circuit will work?', answer: 'No. Electrical rule checking helps identify defined connectivity and pin-rule issues. It does not replace circuit analysis, design review or functional testing.' },
    ],
  },
  {
    slug: 'wireless-iot-pcb-design', seoTitle: 'Wireless & IoT PCB Design | ESP32, nRF52 & LoRa | Dhara',
    description: 'Battery-powered wireless and IoT PCB design with Dhara Rajpura: ESP32, nRF52, LoRa, BLE, Wi-Fi, USB-C charging and RF-aware hardware layout.',
    intro: 'I design connected hardware around the product’s radio, power and interface requirements. The scope can include ESP32 or nRF52 systems, LoRa connectivity, USB-C charging, LiPo power paths and RF-aware PCB implementation. Power budgeting and the mechanical envelope are defined early, alongside the selected module’s layout requirements.',
    audience: 'Teams developing portable connected devices, battery-powered sensor products, wireless control hardware or custom ESP32 and nRF52 boards.',
    projectSlugs: ['nrf52840-navigation', 'esp32-s3-smart-gst-calculator', 'lora-nurse-call'],
    faqs: [
      { question: 'Can you design a custom ESP32-S3 or nRF52840 PCB?', answer: 'Yes, subject to the agreed requirements and scope. The portfolio includes an ESP32-S3 Smart GST Calculator and an nRF52840 navigation board. Share the interfaces, radio requirements, dimensions and power source for your product.' },
      { question: 'Can the design include USB-C charging and a LiPo battery?', answer: 'Yes. Charging, power-path decisions and the supply rails can be included in the hardware scope. Battery selection and current budgeting depend on your loads, operating modes and mechanical constraints.' },
      { question: 'Can you guarantee wireless range or battery life?', answer: 'No. Real range and battery life depend on the enclosure, environment, antenna, operating modes and firmware. Hardware architecture and layout support those goals, but measured performance requires appropriate testing.' },
      { question: 'Are RF tuning and compliance testing included?', answer: 'Laboratory RF tuning, certification testing and compliance management are separate activities. This service focuses on the schematic, PCB implementation and manufacturing documentation described in the agreed brief.' },
    ],
  },
];
export const servicesData = offerings.map((service, index) => ({ ...service, ...details[index] }));
