import { publishedArticles } from './blog-published.mjs';
import { SITE_URL, PERSON_ID, WEBSITE_ID } from './site.mjs';

export const articles = [
  {
    slug: 'what-to-send-pcb-designer-for-quote',
    title: 'What to Send a PCB Designer Before Requesting a Quote',
    seoTitle: 'PCB Design Quote: What to Send Your Designer | Dhara Rajpura',
    description: 'Get a clearer PCB design quote with a practical project brief: scope, existing files, board dimensions, interfaces, power requirements and release deliverables.',
    category: 'Project planning',
    date: '2026-10-12',
    image: '/media/blog/pcb-design-quote-brief.webp',
    imageAlt: 'Concept illustration of project brief sheets and a caliper connected to a PCB with orange circuit lines on a blue background',
    deck: 'The most useful thing you can send a PCB designer is clarity about the board you need—and the decisions still open.',
    intro: [
      '“I need a small PCB with a microcontroller. How much will it cost?” It is a reasonable first question. But it describes a category of product, rather than the engineering work needed to build it.',
      'Two boards with the same controller can need very different effort. One may be a layout from an approved schematic. The other may need power architecture, component selection, custom footprints and a circuit design before the first track is routed.',
      'A useful PCB design brief explains the product, the starting point and the expected handoff. You do not need every answer before making contact. You do need to separate confirmed requirements from decisions that need engineering support.'
    ],
    takeaway: 'Send the product goal, current files, mechanical limits, interface list, power requirements and desired deliverables. Mark unknowns as “to be confirmed” so the quotation can address them explicitly.',
    sections: [
      { id: 'define-the-job', title: '1. Define the job before describing the board', paragraphs: [
        'Start with one sentence about what the product does and another about the help you need. “A battery-operated controller for a handheld instrument; schematic and PCB design from an approved block diagram” is much easier to scope than “an IoT board.”',
        'Identify the starting stage: concept, block diagram, circuit notes, completed schematic, existing PCB or a board revision. Then say whether you need schematic capture, layout, a design review or a complete hardware implementation.',
        'This distinction is visible in my portfolio. The Smart GST Calculator case study covers architecture, schematic capture and PCB design. The TMR actuator driver case study covers PCB layout from a client-supplied schematic and architecture. Both involve PCB work, but their responsibilities are different.'
      ], links: [{ label: 'Smart GST Calculator: architecture through PCB handoff', href: '/projects/esp32-s3-smart-gst-calculator' }, { label: 'TMR actuator driver: layout from supplied engineering files', href: '/projects/tmr-actuator-driver' }] },
      { id: 'share-the-starting-files', title: '2. Share the files that show your starting point', paragraphs: [
        'A block diagram is useful because it shows how the major functions connect. A schematic PDF helps someone understand a circuit quickly. Native EDA files show the actual symbols, footprints, net connections and project settings that can be inspected or edited.',
        'For an existing design, include the project files, libraries, BOM and relevant datasheets. For a new product, include the documents you already have rather than spending days making them look polished. Annotated sketches can be a good starting point when their dimensions and requirements are clear.',
        'Name the design tool and version, identify the latest revision and explain what has already been approved. A folder containing five files called “final” creates uncertainty about which one the quotation should cover. If the files are confidential, agree on how they can be shared before sending them.'
      ] },
      { id: 'mechanical-constraints', title: '3. Put mechanical constraints on a drawing', paragraphs: [
        '“Small enough to fit the enclosure” leaves important questions unanswered. Supply the board outline, mounting-hole positions, connector locations and available component height. Specify units and distinguish fixed dimensions from suggestions.',
        'A dimensioned PDF is useful for discussion; a STEP model or agreed mechanical drawing can help check the enclosure interface. Include restrictions on parts placed underneath the board, cable access, antenna space and the distance needed around screw heads.',
        'If the enclosure is still being developed, say so. A quotation should explain whether mechanical changes are part of the engagement and when the outline and connector positions must be frozen.'
      ] },
      { id: 'interfaces-and-power', title: '4. List interfaces and power requirements precisely', paragraphs: [
        'Write down the controller or module, displays, sensors, motors, radios and external connections. Use exact part numbers where they are selected. “UART” alone does not tell a designer whether a connection is logic-level UART or needs an RS-232 or RS-485 transceiver.',
        'For power, state the input range, required rails and expected loads. Separate typical current from peak demand where known. Include battery chemistry, charging requirements, operating modes and any target runtime. If these have not been calculated, identify power-budget development as work to be included.',
        'Also identify environmental and product requirements that affect the design: temperature range, electrical isolation, noisy motor loads or intended compliance testing. These guide the engineering scope; listing them does not mean compliance is already established.'
      ], table: { caption: 'Replace a broad description with a confirmed requirement or an explicit open question.', headers: ['Broad description', 'More useful information'], rows: [
        ['A small wireless board', 'Outline drawing, selected radio/module, antenna arrangement and enclosure restrictions'],
        ['It connects to another board', 'Connector pinout, voltage levels, physical-layer interface and cable information'],
        ['It runs on a battery', 'Chemistry, charging source, load profile and runtime target—or a request to develop them'],
        ['I need the PCB files', 'Native project, fabrication outputs and assembly deliverables that you expect']
      ] } },
      { id: 'manufacturing-and-deliverables', title: '5. Agree on the handoff, not just the layout', paragraphs: [
        'Tell the designer whether the board is for a first prototype or a production revision. Share the fabrication and assembly provider’s requirements if a provider is selected. Layer count, stack-up, controlled impedance and assembly constraints need to be considered together rather than guessed from a drawing.',
        'Define the release package. Depending on the engagement, this can include native design files, schematic PDF, Gerber and drill files, a BOM with manufacturer part numbers, placement data, and fabrication or assembly drawings.',
        'Decide who handles firmware, procurement, assembly, prototype testing and certification. These are separate responsibilities that can affect the timeline even when the PCB design itself is complete. Include your target date, review availability and the number of planned revision rounds.'
      ], links: [{ label: 'Explore the custom PCB design scope and deliverables', href: '/services/custom-pcb-design' }] },
      { id: 'copy-the-brief', title: 'A project brief you can reuse', paragraphs: [
        'Copy the template below and fill in what you know. “To be confirmed” is a useful answer when paired with who will make the decision. It is more honest—and more actionable—than an unstated assumption.'
      ], template: 'Product and purpose:\nUsers and operating environment:\nCurrent stage and latest revision:\nRequested work: schematic / layout / review / other\nDesign tool and version:\nFiles available:\nPCB outline, mounting and height limits:\nSelected controller, modules and key parts:\nInterfaces, connector pinouts and voltage levels:\nPower input, rails, loads and battery requirements:\nFabricator / assembler and known design rules:\nRequired release deliverables:\nPrototype testing and other responsibilities:\nTarget deadline and review availability:\nConfirmed requirements:\nOpen decisions and their owners:' },
      { id: 'compare-quotes', title: 'Compare quotations by scope as well as price', paragraphs: [
        'A lower quotation may cover fewer deliverables, fewer revisions or a different starting point. Compare what each designer will receive, what they will produce and how changes will be handled.',
        'Look for milestones that make the work reviewable: requirements agreement, schematic review, placement or layout review, and final file release. Ask what information is needed before the schedule begins and what happens if a selected part or enclosure changes.',
        'The best next step is to send a concise brief and your current files. That gives us a concrete starting point for deciding whether you need a new design, layout support or an independent review—and for discussing an appropriate quotation.'
      ] }
    ],
    serviceSlug: 'custom-pcb-design',
    ctaTitle: 'Have a board in mind?',
    ctaCopy: 'Send your brief and current files. We can define the engineering scope, open decisions and deliverables before work begins.',
    references: [],
    relatedProjectSlug: 'esp32-s3-smart-gst-calculator'
  },
  {
    slug: 'pcb-design-review-before-manufacturing-checklist',
    title: 'PCB Design Review Before Manufacturing: A Practical Checklist',
    seoTitle: 'PCB Design Review Checklist Before Manufacturing | Dhara Rajpura',
    description: 'Review your PCB before fabrication: schematic checks, footprints, power and return paths, mechanical fit, DFM and a consistent manufacturing release package.',
    category: 'Design review',
    date: '2026-10-12',
    image: '/media/blog/pcb-review-before-manufacturing.webp',
    imageAlt: 'Concept illustration of a magnifying lens inspecting a green PCB beside a pale-yellow checklist on a blue background',
    deck: 'A clean DRC report is a useful checkpoint. A release decision needs a wider view of the circuit, the assembly and the files you are about to send.',
    intro: [
      'The routing is finished. The board looks tidy in 3D. You are one export away from sending it to the manufacturer. This is a good moment to pause and ask a different question: what evidence says this particular revision is ready to build?',
      'A PCB design review connects the circuit requirements to the physical board and the manufacturing package. It looks for issues a design-rule check may not capture, such as a wrong connector orientation, an unsuitable footprint or an undocumented assembly option.',
      'Use this checklist for a structured review before fabrication. Adapt it to the circuit, component datasheets, manufacturer capabilities and project requirements. A file review improves release readiness; prototype bring-up and any required compliance testing still need their own plan.'
    ],
    takeaway: 'Review one frozen revision against explicit requirements. Check the schematic, footprints, layout, mechanical fit and exported files, then record what is resolved, what blocks release and who owns the remaining decisions.',
    sections: [
      { id: 'freeze-the-revision', title: '1. Freeze the revision you are reviewing', paragraphs: [
        'Start with a matched set of schematic, PCB, libraries and BOM. Include the intended board stack-up, mechanical drawing and manufacturer rules. Record the revision and review scope before editing starts.',
        'A review of a PCB screenshot is limited because it cannot reliably establish connectivity, hidden layers or the configured constraints. Native Altium or KiCad files allow a more complete inspection. If only PDFs or manufacturing files are available, state those limits in the report.',
        'Keep a short issue log: location, concern, likely impact, proposed action and owner. For example, an unconfirmed mating connector is a release question, not a note to quietly resolve after ordering boards.'
      ] },
      { id: 'schematic-and-footprints', title: '2. Check the schematic—and the part that will actually be assembled', paragraphs: [
        'Follow the main functions from supply input to the loads and from each external connection to the controller. Check voltage compatibility, pin assignments, reset and boot requirements, protection and programming access against the selected parts’ datasheets.',
        'Pay particular attention to connectors, polarized parts and custom libraries. Verify the manufacturer part number, package drawing, pin numbering and footprint orientation. Similar-looking packages or top-view and bottom-view drawings can lead to mistakes that a neat 3D render will not reveal.',
        'Run electrical rule checking and investigate its warnings. A deliberately unused pin and an accidentally unconnected pin should not be treated as the same decision. Document intentional exceptions rather than suppressing a category of warning simply to obtain a clean report.'
      ], checklist: [
        'Selected part numbers, schematic symbols and footprints agree.',
        'Connector pinouts are checked against the mating device and cable.',
        'Polarity and pin 1 are clear in the design and assembly information.',
        'Programming, reset, boot and essential test access are available.',
        'Assembly variants and do-not-populate parts are documented.'
      ], source: { label: 'KiCad reference: electrical rule checking', href: 'https://docs.kicad.org/9.0/en/eeschema/eeschema.html#erc' } },
      { id: 'power-and-return-paths', title: '3. Review power paths and signal return paths together', paragraphs: [
        'For each rail, review the source, load demand, protection, copper path and expected operating conditions. Consider startup and peak loads as well as nominal operation. Check capacitor voltage ratings, regulator thermal requirements and the component manufacturer’s layout recommendations.',
        'In a buck converter, inspect the placement of the input capacitor and the high-current switching loop. Keep sensitive feedback routing away from the switching node and follow the regulator-specific guidance. Texas Instruments’ step-down converter layout guide explains why these placement and routing decisions matter.',
        'For signals, inspect the nearby reference copper and the route their return currents can take. Plane gaps, layer changes and connector transitions deserve attention. Separating analog and switching areas requires a considered return-path strategy; dividing ground copper without analysing current flow can introduce new problems.',
        'Mixed-signal systems such as a load-cell measurement board or a motor-control board need this wider review. The schematic connection alone does not describe how switching currents and a sensitive signal path share the physical layout.'
      ], source: { label: 'Texas Instruments: five steps to a great step-down converter layout', href: 'https://www.ti.com/lit/an/slyt614/slyt614.pdf' } },
      { id: 'mechanical-and-radio', title: '4. Check what the enclosure, cables and antennas change', paragraphs: [
        'Compare the PCB outline and holes with the agreed mechanical drawing. Inspect component heights, screw-head clearance, connector insertion space and access to buttons, batteries and test points. A component that fits on the board can still be inaccessible inside the enclosure.',
        'For wireless designs, check the selected module or antenna’s placement and keep-out requirements. Review nearby copper and metal, the enclosure arrangement and any RF connector or feed details. Follow the actual hardware vendor’s guidance instead of applying a universal antenna clearance.',
        'Where controlled impedance is needed, use the intended fabrication stack-up and agreed constraints. Track width cannot be chosen reliably from a screenshot or layer count alone. Confirm any impedance requirements with the board manufacturer before release.'
      ] },
      { id: 'rules-and-manufacturing', title: '5. Run DRC with rules that match the intended build', paragraphs: [
        'Set fabrication constraints from the selected manufacturer’s capabilities and the project’s requirements. Check clearance, track and drill dimensions, board-edge spacing and relevant net-specific rules.',
        'In KiCad, refill copper zones and run DRC with schematic-to-PCB parity checking where applicable. Review rule violations, unconnected items and exclusions. Save the report with the release record.',
        'DRC checks the constraints and connectivity represented in the design. It cannot establish that every engineering requirement has been correctly entered. Follow it with an assembly review: part access, placement orientation, markings, solder-mask and paste details, and any special process requirements.'
      ], source: { label: 'KiCad reference: design rule checking and fabrication outputs', href: 'https://docs.kicad.org/9.0/en/pcbnew/pcbnew.html#design-rule-checking' } },
      { id: 'inspect-exported-files', title: '6. Review the exported package, not only the editor', paragraphs: [
        'Generate the manufacturing outputs from the approved revision, then open them in an appropriate CAM or Gerber viewer. Check the board outline, copper layers, solder mask, silkscreen and drill alignment. Include plated and non-plated hole information in the format your manufacturer requires.',
        'For assembly, cross-check the BOM and placement data against the board. References, manufacturer part numbers, fitted quantities and assembly variants must agree. Confirm the assembler’s expected origin, units and rotation conventions; a file that exports successfully is not automatically interpreted correctly.',
        'Place the files in one clearly named release folder with the revision, date and any fabrication or assembly notes. Remove obsolete outputs from the package. If a review causes a change, regenerate all affected files and recheck the package before sending it.'
      ] },
      { id: 'release-decision', title: 'A practical release checklist', paragraphs: [
        'Make the review actionable. Use the table below as a release record, adding evidence and an owner to each line. An unresolved power, pinout, mechanical or manufacturing question should have an explicit release decision.'
      ], table: { caption: 'Record the result as resolved, release blocked, or accepted with a documented reason.', headers: ['Checkpoint', 'Evidence to retain'], rows: [
        ['Revision and requirements', 'Matched project files, requirements list and agreed review scope'],
        ['Circuit and libraries', 'Reviewed datasheets, pinouts, footprints and ERC findings'],
        ['Power and layout', 'Review notes for load paths, thermal concerns, returns and critical signals'],
        ['Mechanical and manufacturing', 'Outline/assembly checks and manufacturer-specific constraints'],
        ['Rule checking', 'DRC results and explained exceptions'],
        ['Release package', 'Viewed exports, consistent BOM/placement data and revision identifier'],
        ['Approval and next steps', 'Issue owners, release approval and prototype bring-up plan']
      ] }, checklist: [
        'Every blocking issue is resolved or the release is held.',
        'Accepted exceptions have a reason and an accountable approver.',
        'All deliverables refer to the same approved revision.',
        'The team knows who will order, assemble and test the prototype.'
      ] },
      { id: 'independent-review', title: 'When an independent review helps', paragraphs: [
        'Another engineer can be useful before a first fabrication run, after a major revision or when a design is being handed to a new manufacturer. Agree whether the review covers the schematic, layout, manufacturing outputs or all three.',
        'Ask for a prioritized report rather than a general verdict. A useful finding points to the relevant component or region, explains the concern and identifies the action needed. Review and redesign should be agreed as separate responsibilities so it is clear who will make and verify changes.',
        'For my PCB design review service, send your current files, product requirements and the questions you want examined. We can define the review boundary and deliver a focused set of engineering actions before the board goes to fabrication.'
      ], links: [{ label: 'PCB design review and DFM audit: scope and deliverables', href: '/services/pcb-design-review' }] }
    ],
    serviceSlug: 'pcb-design-review',
    ctaTitle: 'Ready for another set of eyes?',
    ctaCopy: 'Share your schematic, PCB files, manufacturing constraints and concerns. We can agree on a focused review and a prioritized report.',
    references: [
      { label: 'KiCad Schematic Editor — electrical rule checking', href: 'https://docs.kicad.org/9.0/en/eeschema/eeschema.html#erc' },
      { label: 'KiCad PCB Editor — design rules and manufacturing outputs', href: 'https://docs.kicad.org/9.0/en/pcbnew/pcbnew.html#design-rule-checking' },
      { label: 'Texas Instruments — Five steps to a great PCB layout for a step-down converter', href: 'https://www.ti.com/lit/an/slyt614/slyt614.pdf' }
    ],
    relatedProjectSlug: 'stm32-station-control'
  }
].concat(publishedArticles);

export function articleWordCount(article) {
  const text = [article.title, article.deck, ...article.intro, article.takeaway, ...article.sections.flatMap(section => [section.title, ...(section.paragraphs || []), ...(section.checklist || []), section.template || '', ...(section.table?.rows.flat() || [])])].join(' ');
  return text.trim().split(/\s+/).length;
}
export const readingMinutes = article => Math.max(1, Math.ceil(articleWordCount(article) / 220));
export const displayDate = date => new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
export function articleSchema(article) {
  const url = `${SITE_URL}/blog/${article.slug}`;
  return { '@type': 'BlogPosting', '@id': `${url}#article`, url, headline: article.title, description: article.description,
    image: [{ '@type': 'ImageObject', url: SITE_URL + article.image, width: 1774, height: 887 }],
    author: { '@id': PERSON_ID }, publisher: { '@id': PERSON_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` }, isPartOf: { '@id': `${SITE_URL}/blog#blog` },
    datePublished: article.date, dateModified: article.date,
    inLanguage: 'en', articleSection: article.category, wordCount: articleWordCount(article), timeRequired: `PT${readingMinutes(article)}M` };
}
export const blogSchema = { '@type': 'Blog', '@id': `${SITE_URL}/blog#blog`, url: `${SITE_URL}/blog`, name: 'PCB & Embedded Hardware Notes',
  author: { '@id': PERSON_ID }, isPartOf: { '@id': WEBSITE_ID }, blogPost: articles.map(article => ({ '@id': `${SITE_URL}/blog/${article.slug}#article` })) };
