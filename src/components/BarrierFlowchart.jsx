import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Circle, // Use Circle for nodes
  Center, // To help center content
} from '@chakra-ui/react';

// Data for the barriers
const barriersData = [
    { id: 1, title: "Limited Access", icon: "🌐", description: "A significant portion of the population in low-income countries lacks internet access and reliable electricity, foundational requirements for digital engagement.", dataPoint: "Only 27% internet use (low-income) vs 93% (high-income)", source: "ITU Facts and Figures 2024", interventions: ["Infrastructure Development"] },
    { id: 2, title: "Edu Infrastructure", icon: "🎓", description: "The scarcity of digital education resources hampers the development of a skilled workforce capable of engaging with AI technologies.", dataPoint: "SSA Avg. Electrification: 47% (2023)", source: "Africa Power Transition Factbook 2024", interventions: ["Educational Programs", "Infrastructure Enhancement"] },
    { id: 3, title: "AI Pro Shortage", icon: "🧑‍🔬", description: "Lack of trained AI professionals restricts capacity. Brain drain to developed nations exacerbates the shortage.", dataPoint: "Severe shortage & brain drain", source: "Nugraha, 2025", interventions: ["Educational Programs", "Talent Retention Strategies"] },
    { id: 4, title: "Gender Disparity", icon: "♀️", description: "Women are underrepresented and their roles are more susceptible to automation.", dataPoint: "Only 30% AI pros women; +10% automation risk (Africa outsourcing)", source: "UN Women – Africa, 2024", interventions: ["Inclusive Policies", "Educational Programs"] },
    { id: 5, title: "Low Investment", icon: "💰", description: "R&D investment is concentrated in high-income countries (US/China dominate), leaving the Global South underfunded and reliant on external tech.", dataPoint: "Dominated by US/China R&D spending", source: "R&D World Online, 2024", interventions: ["Investment in R&D"] },
    { id: 6, title: "AI Infrastructure", icon: "💻", description: "Lack of high-performance computing and advanced AI chips creates \"compute deserts,\" impeding local AI development.", dataPoint: "Lack of advanced chips/HPC = 'compute deserts'", source: "Tony Blair Institute, 2024", interventions: ["Infrastructure Enhancement", "Investment in R&D"] },
    { id: 7, title: "Foreign Dependence", icon: "🔗", description: "Limited local development leads to heavy reliance on Global North tech. Foreign companies control key infrastructure like subsea cables.", dataPoint: "~30 subsea cables owned by Global North tech", source: "Brookings Institution, 2024", interventions: ["Investment in R&D", "Inclusive Policies"] },
    { id: 8, title: "Weak Regulation", icon: "📜", description: "Absence of comprehensive AI governance frameworks makes auditing and regulating AI systems difficult.", dataPoint: "Many lack robust AI regulations", source: "Hertie School, 2024", interventions: ["Inclusive Policies"] },
    { id: 9, title: "Ltd. Representation", icon: "🏛️", description: "Underrepresentation in international policy discussions limits influence.", dataPoint: "<1/3 developing countries have AI strategies; 118 lack representation", source: "UNCTAD, 2025", interventions: ["Inclusive Policies"] },
];

const BarrierFlowchart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBarrier, setSelectedBarrier] = useState(null);

  const handleBarrierClick = (barrier) => {
    setSelectedBarrier(barrier);
    onOpen();
  };

  // Calculate positions for circular layout
  const radius = 200; // Adjust radius as needed
  const numNodes = barriersData.length;
  const angleStep = (2 * Math.PI) / numNodes;

  return (
    <Box mt={8} p={6} borderWidth="1px" borderRadius="lg" borderColor="gray.200" bg="gray.50">
      <Heading as="h4" size="md" mb={8} textAlign="center">
        Systemic Barriers to AI Development in the Global South
      </Heading>

      {/* Container for the circular layout */}
      <Center>
          <Box position="relative" width={`${radius * 2 + 100}px`} height={`${radius * 2 + 100}px`} mb={8}>
                {/* Optional: Dashed border circle */}
                <Circle size={`${radius * 2}px`} border="2px dashed" borderColor="gray.300" position="absolute" top="50px" left="50px" />

                <Center position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                   <Text color="gray.500" fontStyle="italic">Reinforcing Cycle</Text>
                </Center>

              {barriersData.map((barrier, index) => {
                // Calculate position on the circle
                const angle = index * angleStep - Math.PI / 2; // Start from top
                const x = radius * Math.cos(angle) + radius + 50; // Center horizontally + offset
                const y = radius * Math.sin(angle) + radius + 50; // Center vertically + offset

                return (
                  <Circle
                    key={barrier.id}
                    size="90px" // Node size
                    bg="blue.100"
                    color="blue.800"
                    position="absolute"
                    left={`${x}px`}
                    top={`${y}px`}
                    transform="translate(-50%, -50%)" // Center the node on its coordinates
                    cursor="pointer"
                    onClick={() => handleBarrierClick(barrier)}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    fontSize="xs"
                    p={1}
                    boxShadow="sm"
                    border="1px solid"
                    borderColor="blue.200"
                    _hover={{ bg: 'blue.200', transform: 'translate(-50%, -50%) scale(1.05)' }}
                  >
                    <Text fontSize="xl">{barrier.icon}</Text>
                    <Text fontWeight="medium">{barrier.title}</Text>
                  </Circle>
                );
              })}
          </Box>
        </Center>

      {/* Details Panel (Modal) */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent mx={4}> {/* Add horizontal margin for smaller screens */}
          <ModalHeader borderBottomWidth="1px">{selectedBarrier?.title.substring(selectedBarrier?.title.indexOf(' ') + 1)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}> {/* Add vertical padding */}
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

       <Box mt={6} textAlign="left" fontSize="sm" color="gray.600">
            <Heading as="h5" size="sm" mb={2}>Key Intervention Areas:</Heading>
             <Text>Infrastructure Development & Enhancement, Educational Programs, Talent Retention Strategies, Inclusive Policies, Investment in R&D</Text>
        </Box>

    </Box>
  );
};

export default BarrierFlowchart; 