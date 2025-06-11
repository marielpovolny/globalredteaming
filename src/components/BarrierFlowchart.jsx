import React, { useState } from 'react';
import {
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Center,
  Button,
} from '@chakra-ui/react';

// Data for the barriers. I've shortened some titles for better display in the diagram.
const barriersData = [
    { id: 1, title: "Limited Access", shortTitle: "Access", icon: "🌐", description: "A significant portion of the population in low-income countries lacks internet access and reliable electricity, foundational requirements for digital engagement.", dataPoint: "Only 27% internet use (low-income) vs 93% (high-income)", source: "ITU Facts and Figures 2024", interventions: ["Infrastructure Development"] },
    { id: 2, title: "Educational Infrastructure", shortTitle: "Education", icon: "🎓", description: "The scarcity of digital education resources hampers the development of a skilled workforce capable of engaging with AI technologies.", dataPoint: "SSA Avg. Electrification: 47% (2023)", source: "Africa Power Transition Factbook 2024", interventions: ["Educational Programs", "Infrastructure Enhancement"] },
    { id: 3, title: "AI Pro Shortage", shortTitle: "Talent", icon: "🧑‍🔬", description: "Lack of trained AI professionals restricts capacity. Brain drain to developed nations exacerbates the shortage.", dataPoint: "Severe shortage & brain drain", source: "Nugraha, 2025", interventions: ["Educational Programs", "Talent Retention Strategies"] },
    { id: 4, title: "Gender Disparity", shortTitle: "Gender Gap", icon: "♀️", description: "Women are underrepresented and their roles are more susceptible to automation.", dataPoint: "Only 30% AI pros women; +10% automation risk (Africa outsourcing)", source: "UN Women – Africa, 2024", interventions: ["Inclusive Policies", "Educational Programs"] },
    { id: 5, title: "Low Investment", shortTitle: "Investment", icon: "💰", description: "R&D investment is concentrated in high-income countries (US/China dominate), leaving the Global South underfunded and reliant on external tech.", dataPoint: "Dominated by US/China R&D spending", source: "R&D World Online, 2024", interventions: ["Investment in R&D"] },
    { id: 6, title: "AI Infrastructure", shortTitle: "Infrastructure", icon: "💻", description: "Lack of high-performance computing and advanced AI chips creates \"compute deserts,\" impeding local AI development.", dataPoint: "Lack of advanced chips/HPC = 'compute deserts'", source: "Tony Blair Institute, 2024", interventions: ["Infrastructure Enhancement", "Investment in R&D"] },
    { id: 7, title: "Foreign Dependence", shortTitle: "Dependence", icon: "🔗", description: "Limited local development leads to heavy reliance on Global North tech. Foreign companies control key infrastructure like subsea cables.", dataPoint: "~30 subsea cables owned by Global North tech", source: "Brookings Institution, 2024", interventions: ["Investment in R&D", "Inclusive Policies"] },
    { id: 8, title: "Weak Regulation", shortTitle: "Regulation", icon: "📜", description: "Absence of comprehensive AI governance frameworks makes auditing and regulating AI systems difficult.", dataPoint: "Many lack robust AI regulations", source: "Hertie School, 2024", interventions: ["Inclusive Policies"] },
    { id: 9, title: "Limited Representation", shortTitle: "Representation", icon: "🏛️", description: "Underrepresentation in international policy discussions limits influence.", dataPoint: "<1/3 developing countries have AI strategies; 118 lack representation", source: "UNCTAD, 2025", interventions: ["Inclusive Policies"] },
];

// Helper function to calculate SVG path for a circular segment (pie slice)
const getSegmentPath = (cx, cy, radius, startAngle, endAngle) => {
    const start = {
        x: cx + radius * Math.cos(startAngle),
        y: cy + radius * Math.sin(startAngle)
    };
    const end = {
        x: cx + radius * Math.cos(endAngle),
        y: cy + radius * Math.sin(endAngle)
    };
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    return `M ${cx},${cy} L ${start.x},${start.y} A ${radius},${radius} 0 ${largeArcFlag} 1 ${end.x},${end.y} Z`;
};

// Modern, consistent SVG icons for each barrier
const icons = {
    Access: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 4.9c-2.4 1.4-5.2 2.3-8.2 2.6C10.2 7.8 7.6 8 5 8c-2.4 0-4.7-.2-6.9-.6" /><path d="M3.5 19.1c2.4-1.4 5.2-2.3 8.2-2.6 3.1-.3 5.7-.5 8.4-.5 2.4 0 4.7.2 6.9.6" /><path d="M12 22v-6" /><path d="M12 8V2" /><circle cx="12" cy="12" r="10" />
        </svg>
    ),
    Education: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10v6" /><path d="m22-2-7 4-7-4-7 4" /><path d="M2 10v3c0 .6.4 1 1 1h18c.6 0 1-.4 1-1v-3" /><path d="M22 6v4" /><path d="M2 6v4" /><path d="M6 18h12" /><path d="M6 22h12" />
        </svg>
    ),
    Talent: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 11h-6" /><path d="m19 8-3 3 3 3" />
        </svg>
    ),
    'Gender Gap': (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="9" r="4" /><path d="M9 13v8" /><path d="M15.53 14.28a7.5 7.5 0 0 0-8.06 8.06" /><path d="m13 22 5-5" /><path d="M18 17h-5v5" />
        </svg>
    ),
    Investment: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13.2a5.08 5.08 0 0 0-4.9-5.2H2" /><path d="M14 13.2a5.08 5.08 0 0 1 4.9-5.2H22" /><path d="m12 19-2-2-2-2" /><path d="M12 19V5" /><path d="M10 3h4" /><path d="M12 19a7 7 0 0 0 7-7c0-3.9-3.1-7-7-7a7 7 0 0 0-7 7" />
        </svg>
    ),
    Infrastructure: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" /><path d="M3 9h18" /><path d="M3 15h18" />
        </svg>
    ),
    Dependence: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
        </svg>
    ),
    Regulation: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22V2" /><path d="M5 10l-3 3 3 3" /><path d="M19 10l3 3-3 3" /><path d="M19.07 4.93a10 10 0 0 0-14.14 0" /><path d="M4.93 19.07a10 10 0 0 0 14.14 0" />
        </svg>
    ),
    Representation: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M12 9a7 7 0 0 0-7 7v5h14v-5a7 7 0 0 0-7-7Z" /><path d="M6 21v-2a4 4 0 0 0-4-4v0" /><path d="M18 21v-2a4 4 0 0 1 4-4v0" />
        </svg>
    ),
};


const BarrierFlowchart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBarrier, setSelectedBarrier] = useState(null);

  const handleBarrierClick = (barrier) => {
    setSelectedBarrier(barrier);
    onOpen();
  };

  // SVG and layout constants
  const numNodes = barriersData.length;
  const angleStep = (2 * Math.PI) / numNodes;
  const colors = ["#E76F51", "#F4A261", "#E9C46A", "#2A9D8F", "#264653", "#A9D6E5", "#8E7DBE", "#6D6875", "#B5838D"];
  const viewBoxSize = 500;
  const center = viewBoxSize / 2;
  const outerRadius = 230;
  const innerRadius = 100;
  const iconRadius = (outerRadius + innerRadius) / 2;
  const textRadius = iconRadius + 2; // Slightly further out for text path
  
  return (
    <Box mt={8} p={4} borderWidth="1px" borderRadius="lg" borderColor="gray.200" bg="white">
      <Heading as="h4" size="md" mb={6} textAlign="center">
        Systemic Barriers to AI Development in the Global South
      </Heading>
      
      {/* 
        This is the main container for the SVG diagram. 
        - The `viewBox` attribute makes the SVG scalable and responsive.
        - `width="100%"` and `height="auto"` ensure it fits its container.
      */}
      <Box as="figure" role="img" aria-labelledby="diagram-title" m="auto" maxWidth="600px">
        <style>
          {`
            .barrier-segment {
              cursor: pointer;
              transition: transform 0.2s ease-out, filter 0.2s ease-out;
              transform-origin: ${center}px ${center}px;
            }
            .barrier-segment:hover {
              transform: scale(1.03);
              filter: brightness(1.1);
            }
            .barrier-icon {
              transition: transform 0.2s ease-out;
            }
            .barrier-segment:hover .barrier-icon {
              transform: scale(1.1);
            }
            .central-text {
                font-family: sans-serif;
                font-weight: bold;
                fill: #333;
                font-size: 1.1rem;
            }
            .segment-text {
                font-family: sans-serif;
                font-size: 1rem;
                font-weight: 500;
                fill: white;
            }
          `}
        </style>
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          width="100%"
          height="auto"
        >
          <title id="diagram-title">A circular diagram showing 9 systemic barriers in a reinforcing cycle.</title>
          
          {/* Central Hub */}
          <circle cx={center} cy={center} r={innerRadius - 5} fill="#f0f0f0" />
          <text x={center} y={center} textAnchor="middle" dominantBaseline="middle" className="central-text">
            Reinforcing Cycle
          </text>

          {/* 
            Loop through the barrier data to generate each segment of the circle.
            Each segment is a group (`<g>`) containing:
            1. The colored path (`<path>`) for the segment background.
            2. The icon, positioned in the middle of the segment's arc.
            3. The text, which is aligned to a curved path for better readability.
          */}
          {barriersData.map((barrier, index) => {
            const startAngle = index * angleStep - Math.PI / 2 - (angleStep / 10);
            const endAngle = (index + 1) * angleStep - Math.PI / 2 - (angleStep / 10);
            const midAngle = (startAngle + endAngle) / 2;

            // Path for the colored segment wedge
            const segmentPath = getSegmentPath(center, center, outerRadius, startAngle, endAngle);
            
            // Path for the curved text. Invisible, but the text flows along it.
            const textPathId = `text-path-${barrier.id}`;
            const textArc = getSegmentPath(center, center, textRadius, startAngle, endAngle);
            
            // Position for the icon in the middle of the arc
            const iconX = center + iconRadius * Math.cos(midAngle);
            const iconY = center + iconRadius * Math.sin(midAngle);
            const IconComponent = icons[barrier.shortTitle];

            return (
              <g
                key={barrier.id}
                className="barrier-segment"
                onClick={() => handleBarrierClick(barrier)}
              >
                <path d={segmentPath} fill={colors[index % colors.length]} stroke="white" strokeWidth="2"/>
                <defs>
                  <path id={textPathId} d={textArc} />
                </defs>
                <text className="segment-text">
                  <textPath href={`#${textPathId}`} startOffset="50%" textAnchor="middle">
                    {barrier.shortTitle}
                  </textPath>
                </text>
                
                {/* 
                  The icon is placed inside a transformed group to center it correctly.
                  The icon itself is a React component for clarity.
                */}
                <g transform={`translate(${iconX - 16}, ${iconY - 16})`}>
                    <IconComponent
                        className="barrier-icon"
                        width="32"
                        height="32"
                        stroke="white"
                    />
                </g>
              </g>
            );
          })}
        </svg>
      </Box>

      {/* Details Panel (Modal) - Unchanged from original */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader borderBottomWidth="1px">{selectedBarrier?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <Text mb={4}>
                <Text as="span" fontWeight="bold" color="gray.600">The Challenge: </Text>
                {selectedBarrier?.description}
            </Text>
            <Text mb={4}>
                <Text as="span" fontWeight="bold" color="gray.600">Key Stat: </Text>
                <Text as="i" color="orange.600">{selectedBarrier?.dataPoint}</Text>
            </Text>
            <Text mb={4}>
                <Text as="span" fontWeight="bold" color="gray.600">Source: </Text>
                {selectedBarrier?.source}
            </Text>
            <Text>
                <Text as="span" fontWeight="bold" color="green.600">Potential Interventions: </Text>
                {selectedBarrier?.interventions.join(', ')}
             </Text>
          </ModalBody>
          <ModalFooter borderTopWidth="1px">
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BarrierFlowchart; 