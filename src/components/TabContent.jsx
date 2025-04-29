import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Text,
  Link,
  VStack,
  useColorModeValue,
  HStack,
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
  UnorderedList,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BarrierFlowchart from './BarrierFlowchart';

// Complete data constants with coordinates
const countryCoordinates = {
  USA: [37.0902, -95.7129],
  CHN: [35.8617, 104.1954],
  GBR: [55.3781, -3.4360],
  DEU: [51.1657, 10.4515],
  FRA: [46.2276, 2.2137],
  JPN: [36.2048, 138.2529],
  IND: [20.5937, 78.9629],
  CAN: [56.1304, -106.3468],
  KOR: [35.9078, 127.7669],
  AUS: [-25.2744, 133.7751],
  IDN: [-0.7893, 113.9213],
  PAK: [30.3753, 69.3451],
  BRA: [-14.2350, -51.9253],
  NGA: [9.0820, 8.6753],
  BGD: [23.6850, 90.3563],
  RUS: [61.5240, 105.3188],
  MEX: [23.6345, -102.5528]
};

// AI Patent Applications Data
const aiPatentApplicationsData = [
  { countryName: "Argentina", iso_a3: "ARG", applications: 8 },
  { countryName: "Australia", iso_a3: "AUS", applications: 1782 },
  { countryName: "Austria", iso_a3: "AUT", applications: 44 },
  { countryName: "Azerbaijan", iso_a3: "AZE", applications: 1 },
  { countryName: "Belgium", iso_a3: "BEL", applications: 14 },
  { countryName: "Brazil", iso_a3: "BRA", applications: 606 },
  { countryName: "Brunei", iso_a3: "BRN", applications: 1 },
  { countryName: "Bulgaria", iso_a3: "BGR", applications: 11 },
  { countryName: "Canada", iso_a3: "CAN", applications: 2490 },
  { countryName: "Chile", iso_a3: "CHL", applications: 8 },
  { countryName: "China", iso_a3: "CHN", applications: 100712 },
  { countryName: "Colombia", iso_a3: "COL", applications: 6 },
  { countryName: "Costa Rica", iso_a3: "CRI", applications: 1 },
  { countryName: "Croatia", iso_a3: "HRV", applications: 5 },
  { countryName: "Czechia", iso_a3: "CZE", applications: 3 },
  { countryName: "Denmark", iso_a3: "DNK", applications: 109 },
  { countryName: "Finland", iso_a3: "FIN", applications: 124 },
  { countryName: "France", iso_a3: "FRA", applications: 636 },
  { countryName: "Germany", iso_a3: "DEU", applications: 2326 },
  { countryName: "Greece", iso_a3: "GRC", applications: 33 },
  { countryName: "Hong Kong", iso_a3: "HKG", applications: 20 },
  { countryName: "Hungary", iso_a3: "HUN", applications: 32 },
  { countryName: "India", iso_a3: "IND", applications: 866 },
  { countryName: "Indonesia", iso_a3: "IDN", applications: 2 },
  { countryName: "Iran", iso_a3: "IRN", applications: 1 },
  { countryName: "Ireland", iso_a3: "IRL", applications: 4 },
  { countryName: "Israel", iso_a3: "ISR", applications: 89 },
  { countryName: "Italy", iso_a3: "ITA", applications: 170 },
  { countryName: "Japan", iso_a3: "JPN", applications: 12771 },
  { countryName: "Jordan", iso_a3: "JOR", applications: 1 },
  { countryName: "Kenya", iso_a3: "KEN", applications: 1 },
  { countryName: "Latvia", iso_a3: "LVA", applications: 1 },
  { countryName: "Lithuania", iso_a3: "LTU", applications: 24 },
  { countryName: "Luxembourg", iso_a3: "LUX", applications: 24 },
  { countryName: "Malaysia", iso_a3: "MYS", applications: 70 },
  { countryName: "Mexico", iso_a3: "MEX", applications: 400 },
  { countryName: "Morocco", iso_a3: "MAR", applications: 27 },
  { countryName: "Netherlands", iso_a3: "NLD", applications: 54 },
  { countryName: "New Zealand", iso_a3: "NZL", applications: 60 },
  { countryName: "Norway", iso_a3: "NOR", applications: 18 },
  { countryName: "Oman", iso_a3: "OMN", applications: 1 },
  { countryName: "Panama", iso_a3: "PAN", applications: 2 },
  { countryName: "Peru", iso_a3: "PER", applications: 12 },
  { countryName: "Philippines", iso_a3: "PHL", applications: 17 },
  { countryName: "Poland", iso_a3: "POL", applications: 98 },
  { countryName: "Portugal", iso_a3: "PRT", applications: 37 },
  { countryName: "Romania", iso_a3: "ROU", applications: 24 },
  { countryName: "Russia", iso_a3: "RUS", applications: 879 },
  { countryName: "Saudi Arabia", iso_a3: "SAU", applications: 2 },
  { countryName: "Serbia", iso_a3: "SRB", applications: 15 },
  { countryName: "Singapore", iso_a3: "SGP", applications: 585 },
  { countryName: "Slovakia", iso_a3: "SVK", applications: 4 },
  { countryName: "Slovenia", iso_a3: "SVN", applications: 11 },
  { countryName: "South Africa", iso_a3: "ZAF", applications: 15 },
  { countryName: "South Korea", iso_a3: "KOR", applications: 15143 },
  { countryName: "Spain", iso_a3: "ESP", applications: 352 },
  { countryName: "Sri Lanka", iso_a3: "LKA", applications: 1 },
  { countryName: "Sweden", iso_a3: "SWE", applications: 79 },
  { countryName: "Switzerland", iso_a3: "CHE", applications: 19 },
  { countryName: "Taiwan", iso_a3: "TWN", applications: 1221 },
  { countryName: "Thailand", iso_a3: "THA", applications: 1 },
  { countryName: "Turkey", iso_a3: "TUR", applications: 68 },
  { countryName: "Ukraine", iso_a3: "UKR", applications: 46 },
  { countryName: "United Kingdom", iso_a3: "GBR", applications: 1455 },
  { countryName: "United States", iso_a3: "USA", applications: 50881 },
  { countryName: "Uruguay", iso_a3: "URY", applications: 1 }
];

// Population data
const populationData = [
  { countryName: "China", iso_a3: "CHN", population: 1441 },
  { countryName: "India", iso_a3: "IND", population: 1380 },
  { countryName: "United States", iso_a3: "USA", population: 331 },
  { countryName: "Indonesia", iso_a3: "IDN", population: 273 },
  { countryName: "Pakistan", iso_a3: "PAK", population: 225 },
  { countryName: "Brazil", iso_a3: "BRA", population: 213 },
  { countryName: "Nigeria", iso_a3: "NGA", population: 211 },
  { countryName: "Bangladesh", iso_a3: "BGD", population: 166 },
  { countryName: "Russia", iso_a3: "RUS", population: 146 },
  { countryName: "Mexico", iso_a3: "MEX", population: 128 },
  { countryName: "Japan", iso_a3: "JPN", population: 126 },
  { countryName: "Philippines", iso_a3: "PHL", population: 109 },
  { countryName: "Egypt", iso_a3: "EGY", population: 104 },
  { countryName: "Vietnam", iso_a3: "VNM", population: 98 },
  { countryName: "Democratic Republic of the Congo", iso_a3: "COD", population: 89 },
  { countryName: "Turkey", iso_a3: "TUR", population: 84 },
  { countryName: "Iran", iso_a3: "IRN", population: 83 },
  { countryName: "Germany", iso_a3: "DEU", population: 83 },
  { countryName: "Thailand", iso_a3: "THA", population: 70 },
  { countryName: "United Kingdom", iso_a3: "GBR", population: 67 },
  { countryName: "France", iso_a3: "FRA", population: 67 },
  { countryName: "Tanzania", iso_a3: "TZA", population: 61 },
  { countryName: "Italy", iso_a3: "ITA", population: 60 },
  { countryName: "South Africa", iso_a3: "ZAF", population: 60 }
];

// Readiness data
const readinessData = [
  { country: "Afghanistan", score: 16.92, iso_a3: "AFG" },
  { country: "Albania", score: 45.47, iso_a3: "ALB" },
  { country: "Algeria", score: 39.06, iso_a3: "DZA" },
  { country: "Andorra", score: 54.44, iso_a3: "AND" },
  { country: "Angola", score: 26.91, iso_a3: "AGO" },
  { country: "Antigua and Barbuda", score: 41.61, iso_a3: "ATG" },
  { country: "Argentina", score: 56.40, iso_a3: "ARG" },
  { country: "Armenia", score: 44.51, iso_a3: "ARM" },
  { country: "Australia", score: 76.45, iso_a3: "AUS" },
  { country: "Austria", score: 72.84, iso_a3: "AUT" },
  { country: "Azerbaijan", score: 39.92, iso_a3: "AZE" },
  { country: "Bahamas", score: 42.03, iso_a3: "BHS" },
  { country: "Bahrain", score: 54.33, iso_a3: "BHR" },
  { country: "Bangladesh", score: 47.12, iso_a3: "BGD" },
  { country: "Barbados", score: 41.11, iso_a3: "BRB" },
  { country: "Belarus", score: 39.24, iso_a3: "BLR" },
  { country: "Belgium", score: 72.69, iso_a3: "BEL" },
  { country: "Belize", score: 37.59, iso_a3: "BLZ" },
  { country: "Benin", score: 42.97, iso_a3: "BEN" },
  { country: "Bhutan", score: 38.78, iso_a3: "BTN" },
  { country: "Bolivia (Plurinational State of)", score: 33.08, iso_a3: "BOL" },
  { country: "Bosnia and Herzegovina", score: 37.02, iso_a3: "BIH" },
  { country: "Botswana", score: 38.16, iso_a3: "BWA" },
  { country: "Brazil", score: 65.89, iso_a3: "BRA" },
  { country: "Brunei Darussalam", score: 55.45, iso_a3: "BRN" },
  { country: "Bulgaria", score: 60.64, iso_a3: "BGR" },
  { country: "Burkina Faso", score: 29.28, iso_a3: "BFA" },
  { country: "Burundi", score: 21.13, iso_a3: "BDI" },
  { country: "Cabo Verde", score: 40.67, iso_a3: "CPV" },
  { country: "Cambodia", score: 36.63, iso_a3: "KHM" },
  { country: "Cameroon", score: 33.46, iso_a3: "CMR" },
  { country: "Canada", score: 78.18, iso_a3: "CAN" },
  { country: "Central African Republic", score: 20.26, iso_a3: "CAF" },
  { country: "Chad", score: 22.66, iso_a3: "TCD" },
  { country: "Chile", score: 63.19, iso_a3: "CHL" },
  { country: "China", score: 72.01, iso_a3: "CHN" },
  { country: "Colombia", score: 59.33, iso_a3: "COL" },
  { country: "Comoros", score: 26.65, iso_a3: "COM" },
  { country: "Congo", score: 25.12, iso_a3: "COG" },
  { country: "Costa Rica", score: 56.85, iso_a3: "CRI" },
  { country: "Côte d'Ivoire", score: 34.69, iso_a3: "CIV" },
  { country: "Croatia", score: 51.62, iso_a3: "HRV" },
  { country: "Cuba", score: 42.43, iso_a3: "CUB" },
  { country: "Cyprus", score: 61.50, iso_a3: "CYP" },
  { country: "Czechia", score: 70.23, iso_a3: "CZE" },
  { country: "Democratic Republic of the Congo", score: 22.10, iso_a3: "COD" },
  { country: "Denmark", score: 74.71, iso_a3: "DNK" },
  { country: "Djibouti", score: 35.19, iso_a3: "DJI" },
  { country: "Dominican Republic", score: 52.69, iso_a3: "DOM" },
  { country: "Ecuador", score: 41.46, iso_a3: "ECU" },
  { country: "Egypt", score: 55.63, iso_a3: "EGY" },
  { country: "El Salvador", score: 34.09, iso_a3: "SLV" },
  { country: "Equatorial Guinea", score: 27.09, iso_a3: "GNQ" },
  { country: "Eritrea", score: 22.20, iso_a3: "ERI" },
  { country: "Estonia", score: 72.62, iso_a3: "EST" },
  { country: "Eswatini", score: 36.23, iso_a3: "SWZ" },
  { country: "Ethiopia", score: 38.34, iso_a3: "ETH" },
  { country: "Fiji", score: 44.22, iso_a3: "FJI" },
  { country: "Finland", score: 76.48, iso_a3: "FIN" },
  { country: "France", score: 79.36, iso_a3: "FRA" },
  { country: "Gabon", score: 34.15, iso_a3: "GAB" },
  { country: "Gambia (Republic of The)", score: 26.95, iso_a3: "GMB" },
  { country: "Georgia", score: 46.92, iso_a3: "GEO" },
  { country: "Germany", score: 76.90, iso_a3: "DEU" },
  { country: "Ghana", score: 43.30, iso_a3: "GHA" },
  { country: "Greece", score: 57.70, iso_a3: "GRC" },
  { country: "Grenada", score: 37.96, iso_a3: "GRD" },
  { country: "Guatemala", score: 36.41, iso_a3: "GTM" },
  { country: "Guinea", score: 30.21, iso_a3: "GIN" },
  { country: "Guinea Bissau", score: 25.71, iso_a3: "GNB" },
  { country: "Guyana", score: 37.23, iso_a3: "GUY" },
  { country: "Haiti", score: 20.06, iso_a3: "HTI" },
  { country: "Honduras", score: 29.83, iso_a3: "HND" },
  { country: "Hungary", score: 63.63, iso_a3: "HUN" },
  { country: "Iceland", score: 69.82, iso_a3: "ISL" },
  { country: "India", score: 62.81, iso_a3: "IND" },
  { country: "Indonesia", score: 65.85, iso_a3: "IDN" },
  { country: "Iran (Islamic Republic of)", score: 43.88, iso_a3: "IRN" },
  { country: "Iraq", score: 40.91, iso_a3: "IRQ" },
  { country: "Ireland", score: 73.18, iso_a3: "IRL" },
  { country: "Israel", score: 74.52, iso_a3: "ISR" },
  { country: "Italy", score: 71.22, iso_a3: "ITA" },
  { country: "Jamaica", score: 37.79, iso_a3: "JAM" },
  { country: "Japan", score: 75.75, iso_a3: "JPN" },
  { country: "Jordan", score: 61.57, iso_a3: "JOR" },
  { country: "Kazakhstan", score: 51.41, iso_a3: "KAZ" },
  { country: "Kenya", score: 43.56, iso_a3: "KEN" },
  { country: "Kiribati", score: 34.45, iso_a3: "KIR" },
  { country: "Kuwait", score: 51.26, iso_a3: "KWT" },
  { country: "Kyrgyzstan", score: 36.55, iso_a3: "KGZ" },
  { country: "Lao People's Democratic Republic", score: 36.08, iso_a3: "LAO" },
  { country: "Latvia", score: 61.87, iso_a3: "LVA" },
  { country: "Lebanon", score: 46.67, iso_a3: "LBN" },
  { country: "Lesotho", score: 28.21, iso_a3: "LSO" },
  { country: "Liberia", score: 23.12, iso_a3: "LBR" },
  { country: "Libya", score: 33.25, iso_a3: "LBY" },
  { country: "Liechtenstein", score: 55.91, iso_a3: "LIE" },
  { country: "Lithuania", score: 67.80, iso_a3: "LTU" },
  { country: "Luxembourg", score: 70.63, iso_a3: "LUX" },
  { country: "Madagascar", score: 28.80, iso_a3: "MDG" },
  { country: "Malawi", score: 29.32, iso_a3: "MWI" },
  { country: "Malaysia", score: 71.40, iso_a3: "MYS" },
  { country: "Maldives", score: 31.43, iso_a3: "MDV" },
  { country: "Mali", score: 32.27, iso_a3: "MLI" },
  { country: "Malta", score: 63.64, iso_a3: "MLT" },
  { country: "Marshall Islands", score: 37.62, iso_a3: "MHL" },
  { country: "Mauritania", score: 41.40, iso_a3: "MRT" },
  { country: "Mauritius", score: 53.94, iso_a3: "MUS" },
  { country: "Mexico", score: 53.29, iso_a3: "MEX" },
  { country: "Mongolia", score: 42.36, iso_a3: "MNG" },
  { country: "Montenegro", score: 47.43, iso_a3: "MNE" },
  { country: "Morocco", score: 41.78, iso_a3: "MAR" },
  { country: "Mozambique", score: 24.22, iso_a3: "MOZ" },
  { country: "Myanmar", score: 34.26, iso_a3: "MMR" },
  { country: "Namibia", score: 33.28, iso_a3: "NAM" },
  { country: "Nepal", score: 33.14, iso_a3: "NPL" },
  { country: "Netherlands", score: 77.23, iso_a3: "NLD" },
  { country: "New Zealand", score: 63.98, iso_a3: "NZL" },
  { country: "Nicaragua", score: 28.53, iso_a3: "NIC" },
  { country: "Niger", score: 25.74, iso_a3: "NER" },
  { country: "Nigeria", score: 43.33, iso_a3: "NGA" },
  { country: "North Macedonia", score: 45.12, iso_a3: "MKD" },
  { country: "Norway", score: 76.12, iso_a3: "NOR" },
  { country: "Oman", score: 62.91, iso_a3: "OMN" },
  { country: "Pakistan", score: 40.47, iso_a3: "PAK" },
  { country: "Panama", score: 44.39, iso_a3: "PAN" },
  { country: "Papua New Guinea", score: 36.85, iso_a3: "PNG" },
  { country: "Paraguay", score: 39.54, iso_a3: "PRY" },
  { country: "Peru", score: 57.11, iso_a3: "PER" },
  { country: "Philippines", score: 58.51, iso_a3: "PHL" },
  { country: "Poland", score: 67.51, iso_a3: "POL" },
  { country: "Portugal", score: 70.93, iso_a3: "PRT" },
  { country: "Qatar", score: 68.22, iso_a3: "QAT" },
  { country: "Republic of Korea", score: 79.98, iso_a3: "KOR" },
  { country: "Republic of Moldova", score: 56.03, iso_a3: "MDA" },
  { country: "Romania", score: 58.08, iso_a3: "ROU" },
  { country: "Russian Federation", score: 64.72, iso_a3: "RUS" },
  { country: "Rwanda", score: 51.25, iso_a3: "RWA" },
  { country: "Saint Kitts and Nevis", score: 41.62, iso_a3: "KNA" },
  { country: "Saint Lucia", score: 39.11, iso_a3: "LCA" },
  { country: "Saint Vincent and the Grenadines", score: 36.65, iso_a3: "VCT" },
  { country: "Samoa", score: 37.16, iso_a3: "WSM" },
  { country: "San Marino", score: 51.59, iso_a3: "SMR" },
  { country: "Sao Tome and Principe", score: 29.63, iso_a3: "STP" },
  { country: "Saudi Arabia", score: 72.36, iso_a3: "SAU" },
  { country: "Senegal", score: 46.11, iso_a3: "SEN" },
  { country: "Serbia", score: 58.49, iso_a3: "SRB" },
  { country: "Seychelles", score: 44.77, iso_a3: "SYC" },
  { country: "Sierra Leone", score: 25.34, iso_a3: "SLE" },
  { country: "Singapore", score: 84.25, iso_a3: "SGP" },
  { country: "Slovakia", score: 63.69, iso_a3: "SVK" },
  { country: "Slovenia", score: 65.85, iso_a3: "SVN" },
  { country: "Solomon Islands", score: 32.71, iso_a3: "SLB" },
  { country: "Somalia", score: 25.32, iso_a3: "SOM" },
  { country: "South Africa", score: 52.91, iso_a3: "ZAF" },
  { country: "South Sudan", score: 18.58, iso_a3: "SSD" },
  { country: "Spain", score: 69.25, iso_a3: "ESP" },
  { country: "Sri Lanka", score: 45.29, iso_a3: "LKA" },
  { country: "State of Palestine", score: 37.53, iso_a3: "PSE" },
  { country: "Sudan", score: 24.63, iso_a3: "SDN" },
  { country: "Suriname", score: 36.87, iso_a3: "SUR" },
  { country: "Sweden", score: 75.40, iso_a3: "SWE" },
  { country: "Switzerland", score: 69.42, iso_a3: "CHE" },
  { country: "Syrian Arab Republic", score: 16.95, iso_a3: "SYR" },
  { country: "Taiwan", score: 74.58, iso_a3: "TWN" },
  { country: "Tajikistan", score: 36.72, iso_a3: "TJK" },
  { country: "Thailand", score: 66.17, iso_a3: "THA" },
  { country: "Timor-Leste", score: 33.68, iso_a3: "TLS" },
  { country: "Togo", score: 31.32, iso_a3: "TGO" },
  { country: "Tonga", score: 38.63, iso_a3: "TON" },
  { country: "Trinidad and Tobago", score: 40.14, iso_a3: "TTO" },
  { country: "Tunisia", score: 43.68, iso_a3: "TUN" },
  { country: "Türkiye", score: 60.63, iso_a3: "TUR" },
  { country: "Turkmenistan", score: 32.64, iso_a3: "TKM" },
  { country: "Uganda", score: 34.63, iso_a3: "UGA" },
  { country: "Ukraine", score: 60.57, iso_a3: "UKR" },
  { country: "United Arab Emirates", score: 75.66, iso_a3: "ARE" },
  { country: "United Kingdom of Great Britain and Northern Ireland", score: 78.88, iso_a3: "GBR" },
  { country: "United Republic of Tanzania", score: 35.08, iso_a3: "TZA" },
  { country: "United States of America", score: 87.03, iso_a3: "USA" },
  { country: "Uruguay", score: 62.21, iso_a3: "URY" },
  { country: "Uzbekistan", score: 53.45, iso_a3: "UZB" },
  { country: "Vanuatu", score: 39.04, iso_a3: "VUT" },
  { country: "Venezuela, Bolivarian Republic of", score: 29.21, iso_a3: "VEN" },
  { country: "Viet Nam", score: 61.42, iso_a3: "VNM" },
  { country: "Yemen", score: 14.62, iso_a3: "YEM" },
  { country: "Zambia", score: 41.87, iso_a3: "ZMB" },
  { country: "Zimbabwe", score: 32.59, iso_a3: "ZWE" }
];

// Helper functions
const getReadinessColor = (score) => {
  if (score === null || score === undefined) return '#CCCCCC'; // No data
  if (score < 45) return '#ff4444'; // Low (Red)
  if (score < 70) return '#ffbb33'; // Medium (Yellow)
  return '#00C851'; // High (Green)
};

// Rename getBillsColor to getPatentColor and adjust ranges/colors
const getPatentColor = (applications) => {
  if (applications === null || applications === undefined) return '#CCCCCC'; // No data
  if (applications <= 100) return '#FFFFCC'; // 1-100 (Lightest Yellow)
  if (applications <= 1000) return '#A1DAB4'; // 101-1000 (Light Green)
  if (applications <= 10000) return '#41B6C4'; // 1001-10000 (Medium Cyan)
  return '#225EA8'; // 10001+ (Dark Blue)
};

// getPopulationRadius function - adjust multiplier for better visibility
const getPopulationRadius = (population) => {
  if (!population) return 0;
  // Adjust multiplier for better visibility; sqrt makes large values less dominant
  return Math.sqrt(population) * 0.5; 
};

const TabContent = () => {
  const mapRef = useRef(null);
  const geojsonLayerRef = useRef(null);
  const populationLayerRef = useRef(null); 
  const [selectedMetric, setSelectedMetric] = useState('Readiness');
  const [showPopulation, setShowPopulation] = useState(false);
  const [mapInstance, setMapInstance] = useState(null); 
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBarrier, setSelectedBarrier] = useState(null);

  const barriersData = [
    {
      id: 1,
      title: "1. Limited Access to Internet and Electricity",
      description: "A significant portion of the population in low-income countries lacks internet access and reliable electricity, foundational requirements for digital engagement.",
      dataPoint: "Only 27% of the population in low-income countries uses the internet, compared to 93% in high-income countries.",
      source: "ITU Facts and Figures 2024",
      interventions: ["Infrastructure Development"]
    },
    {
      id: 2,
      title: "2. Inadequate Digital Education Infrastructure",
      description: "The scarcity of digital education resources hampers the development of a skilled workforce capable of engaging with AI technologies.",
      dataPoint: "In 2023, Sub-Saharan Africa had an average electrification rate of 47%, trailing behind other regions, which hampers digital infrastructure development.",
      source: "Africa Power Transition Factbook 2024",
      interventions: ["Educational Programs", "Infrastructure Enhancement"]
    },
    {
      id: 3,
      title: "3. Shortage of AI Professionals",
      description: "The limited number of trained AI professionals in the Global South restricts the region's capacity to develop and implement AI solutions.",
      dataPoint: "The Global South suffers from a severe shortage of AI professionals, with many migrating to developed nations for better opportunities, exacerbating the brain drain.",
      source: "Nugraha, 2025",
      interventions: ["Educational Programs", "Talent Retention Strategies"]
    },
    {
      id: 4,
      title: "4. Gender Disparities in the Tech Sector",
      description: "Women are underrepresented in AI fields, and their roles are more susceptible to automation, leading to increased unemployment risks.",
      dataPoint: "Only 30% of AI professionals are women, and tasks performed by women in Africa's outsourcing sector are 10% more susceptible to automation.",
      source: "UN Women – Africa, 2024",
      interventions: ["Inclusive Policies", "Educational Programs"]
    },
    {
      id: 5,
      title: "5. Limited Domestic Investment in AI R&D",
      description: "The concentration of AI research and development investments in high-income countries leaves the Global South underfunded.",
      dataPoint: "The top six R&D spenders, primarily from the US and China, dominate AI investments, leaving the Global South underfunded and reliant on external technologies.",
      source: "R&D World Online, 2024",
      interventions: ["Investment in R&D"]
    },
    {
      id: 6,
      title: "6. Inadequate AI Infrastructure",
      description: "The lack of advanced AI infrastructure, such as high-performance computing resources, impedes local AI development.",
      dataPoint: "Much of the Global South lacks access to advanced AI chips and infrastructure, creating 'compute deserts' that hinder local AI development.",
      source: "Tony Blair Institute, 2024",
      interventions: ["Infrastructure Enhancement", "Investment in R&D"]
    },
    {
      id: 7,
      title: "7. Dependence on Foreign AI Technologies",
      description: "Due to limited local development, countries in the Global South rely heavily on AI technologies developed in the Global North.",
      dataPoint: "Major tech companies from the Global North own or co-own around 30 subsea internet cables, increasing the Global South's reliance on external digital infrastructure.",
      source: "Brookings Institution, 2024",
      interventions: ["Investment in R&D", "Inclusive Policies"]
    },
    {
      id: 8,
      title: "8. Lack of Robust AI Regulations",
      description: "The absence of comprehensive AI governance frameworks hinders the ability to audit and regulate AI systems effectively.",
      dataPoint: "Many countries in the Global South lack robust AI regulations, making it challenging to audit and govern AI systems effectively.",
      source: "Hertie School, 2024",
      interventions: ["Inclusive Policies"]
    },
    {
      id: 9,
      title: "9. Limited Representation in Global AI Governance",
      description: "Countries from the Global South are underrepresented in international AI policy discussions, limiting their influence on global AI governance.",
      dataPoint: "Only less than one-third of developing countries have AI strategies, and 118 countries lack representation in AI governance.",
      source: "UNCTAD, 2025",
      interventions: ["Inclusive Policies"]
    }
  ];

  const handleBarrierClick = (barrier) => {
    setSelectedBarrier(barrier);
    onOpen();
  };

  // Effect for initializing the map ONCE
  useEffect(() => {
    let map = null;
    // Check ref, map state, AND if Leaflet has already initialized this container
    if (mapRef.current && !mapInstance && !mapRef.current._leaflet_id) {
      console.log("Initializing map...");
      map = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 6
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      setMapInstance(map); // Store the map instance in state
    } else {
       if (mapRef.current?._leaflet_id) {
         console.log("Skipping map initialization: Leaflet already attached to container.");
       } else if (mapInstance) {
         console.log("Skipping map initialization: mapInstance already exists.");
       }
    }

    // Cleanup function for when the component unmounts
    return () => {
      console.log("Running map cleanup...");
      if (mapInstance) {
        console.log("Removing map instance.");
        mapInstance.remove();
        setMapInstance(null);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect for updating layers based on state changes (mapInstance, selectedMetric, showPopulation)
  useEffect(() => {
    if (!mapInstance) {
        console.log("Map instance not ready for layer updates.");
        return; // Don't proceed if map isn't initialized yet
    }
    console.log("Map instance ready, updating layers...");

    // --- Data Lookups (Can be recalculated here or memoized if complex) ---
    const readinessLookup = {};
    const patentLookup = {};
    const populationLookup = {};
    const coordsLookup = {};

    readinessData.forEach(item => {
      if (item.iso_a3) readinessLookup[item.iso_a3] = item.score;
    });
    aiPatentApplicationsData.forEach(item => {
      if (item.iso_a3) patentLookup[item.iso_a3] = item.applications;
    });
    populationData.forEach(item => {
      if (item.iso_a3) populationLookup[item.iso_a3] = item.population;
    });
    Object.entries(countryCoordinates).forEach(([iso_a3, coords]) => {
        coordsLookup[iso_a3] = coords;
    });
    
    // --- Update GeoJSON Layer ---
    const updateGeoJsonLayer = (geojsonData) => {
        // Clear previous GeoJSON layer before adding new one
        if (geojsonLayerRef.current) {
            console.log("Removing previous GeoJSON layer.");
            // Check if mapInstance still exists and layer is on map
            if (mapInstance && mapInstance.hasLayer(geojsonLayerRef.current)) {
                 mapInstance.removeLayer(geojsonLayerRef.current);
            }
            geojsonLayerRef.current = null; // Clear the ref
        }

        console.log("Adding new GeoJSON layer.");
        geojsonLayerRef.current = L.geoJSON(geojsonData, {
            style: (feature) => {
                let countryCode = feature.properties['ISO3166-1-Alpha-3'];
                const countryName = feature.properties.ADMIN || feature.properties.name;
                // Fix for countries with '-99' ISO code in GeoJSON
                let code = countryCode;
                if (code === '-99') {
                  if (countryName === 'France') code = 'FRA';
                  if (countryName === 'Norway') code = 'NOR';
                  // Add more mappings as needed
                }
                let fillColor = '#CCCCCC'; // Default no data color
                if (selectedMetric === 'Readiness' && readinessLookup[code] !== undefined) {
                    fillColor = getReadinessColor(readinessLookup[code]);
                } else if (selectedMetric === 'Bills' && patentLookup[code] !== undefined) {
                    fillColor = getPatentColor(patentLookup[code]);
                }
                return {
                    fillColor,
                    weight: 1,
                    opacity: 1,
                    color: 'white',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: (feature, layer) => {
                let countryCode = feature.properties['ISO3166-1-Alpha-3'];
                let countryName = feature.properties.ADMIN || feature.properties.name;
                // Fix for countries with '-99' ISO code in GeoJSON
                let code = countryCode;
                if (code === '-99') {
                  if (countryName === 'France') code = 'FRA';
                  if (countryName === 'Norway') code = 'NOR';
                  // Add more mappings as needed
                }
                // If countryName is a 3-letter code, try to look up the full name
                if (/^[A-Z]{3}$/.test(countryName)) {
                  // Try readinessData first
                  const found = readinessData.find(item => item.iso_a3 === countryName);
                  if (found) countryName = found.country;
                  // Fallback: try aiPatentApplicationsData
                  else {
                    const found2 = aiPatentApplicationsData.find(item => item.iso_a3 === countryName);
                    if (found2) countryName = found2.countryName;
                  }
                }
                // Debug: Log every country code processed
                console.log('Processing country:', countryName, 'Code:', code);
                if (code === 'FRA' || code === 'NOR') {
                    console.log('DEBUG: Using mapped code for France or Norway:', countryName, code);
                }
                if (code) {
                    const readinessScore = readinessLookup[code];
                    const patentApplications = patentLookup[code];
                    const population = populationLookup[code];
                    let popupContent = `<strong>${countryName}</strong><br>`;
                    let hasMetricData = false;
                    if (selectedMetric === 'Readiness' && readinessScore !== undefined) {
                        popupContent += `AI Readiness Score: ${readinessScore.toFixed(2)}<br>`;
                        hasMetricData = true;
                    } else if (selectedMetric === 'Bills' && patentApplications !== undefined) {
                        popupContent += `Total AI Patent Applications: ${patentApplications.toLocaleString()}<br>`;
                        hasMetricData = true;
                    }
                    if (population !== undefined) {
                        let popString;
                        if (population >= 1000) {
                            popString = `${(population / 1000).toFixed(2)} B`;
                        } else {
                            popString = `${population} M`;
                        }
                        popupContent += `Population: ${popString}<br>`;
                    }
                    if (!hasMetricData && selectedMetric === 'Readiness') {
                        popupContent += 'No AI Readiness data available<br>';
                    } else if (!hasMetricData && selectedMetric === 'Bills') {
                        popupContent += 'No AI Patent Application data available<br>';
                    }
                    // Fallback: Always show the country code for debugging
                    popupContent += `<br><small>ISO Code: ${code}</small>`;
                    if (popupContent.endsWith('<br>')) {
                        popupContent = popupContent.slice(0, -4);
                    }
                    layer.bindPopup(popupContent);
                } else {
                    layer.bindPopup(`<strong>${countryName}</strong><br>Country code missing.`);
                }
            }
        }).addTo(mapInstance);
    };

    // --- Update Population Layer ---
    const updatePopulationLayer = () => {
        // Clear previous population layer
        if (populationLayerRef.current) {
            console.log("Removing previous population layer.");
            // Check if mapInstance still exists and layer is on map
            if (mapInstance && mapInstance.hasLayer(populationLayerRef.current)) {
                 mapInstance.removeLayer(populationLayerRef.current);
            }
            populationLayerRef.current = null; // Clear the ref
        }

        if (showPopulation) {
            console.log("Adding new population layer.");
            const markers = [];
            Object.entries(populationLookup).forEach(([iso_a3, population]) => {
                const coords = coordsLookup[iso_a3];
                if (coords && population) {
                    const radius = getPopulationRadius(population);
                    if (radius > 0) {
                        markers.push(
                            L.circleMarker(coords, {
                                radius: radius,
                                fillColor: "#4A90E2",
                                color: "#2171C7",
                                weight: 1,
                                opacity: 0.6,
                                fillOpacity: 0.4
                            }).bindPopup(`<strong>${iso_a3}</strong><br>Population: ${population >= 1000 ? (population/1000).toFixed(2) + ' B' : population + ' M'}`)
                        );
                    }
                }
            });
            if (markers.length > 0) {
                populationLayerRef.current = L.layerGroup(markers).addTo(mapInstance);
            }
        } else {
             console.log("Population layer not shown.");
        }
    };

    // Fetch GeoJSON and update layers
    console.log("Fetching GeoJSON data...");
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(data => {
        console.log('GeoJSON data loaded, updating layers...');
        updateGeoJsonLayer(data); // Update the main country layer
        updatePopulationLayer(); // Update the population overlay
      })
      .catch(error => console.error('Error loading or processing GeoJSON:', error));

    // Cleanup function for *this* effect: remove only the layers
    return () => {
      console.log("Running layer cleanup...");
      // Check if mapInstance still exists before trying to remove layers
      if (!mapInstance) return;
      
      if (geojsonLayerRef.current) {
         console.log("Removing GeoJSON layer in cleanup.");
         if (mapInstance.hasLayer(geojsonLayerRef.current)) {
             mapInstance.removeLayer(geojsonLayerRef.current);
         }
         geojsonLayerRef.current = null;
      }
      if (populationLayerRef.current) {
          console.log("Removing population layer in cleanup.");
          if (mapInstance.hasLayer(populationLayerRef.current)) {
              mapInstance.removeLayer(populationLayerRef.current);
          }
          populationLayerRef.current = null;
      }
    };
  }, [mapInstance, selectedMetric, showPopulation]); // Re-run when map, metric, or population visibility changes

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Tabs isLazy variant="enclosed" colorScheme="blue">
          <TabList mb="1em" overflowX="auto" flexWrap="nowrap">
            <Tab>Homepage</Tab>
            <Tab>AI Red Teaming and Why Access Matters</Tab>
            <Tab>Barriers to Inclusive Red Teaming</Tab>
            <Tab>Global Coordination</Tab>
            <Tab>Resources</Tab>
            <Tab>References</Tab>
          </TabList>

          <TabPanels>
            {/* Homepage Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading as="h2" size="xl" mb={4}>
                  Bridging the Global AI Divide: Towards Inclusive Safety
                </Heading>
                
                {/* Map Controls */} 
                <Box mb={4}>
                  <HStack spacing={8} mb={4} align="center"> 
                    <RadioGroup value={selectedMetric} onChange={setSelectedMetric}>
                      <Stack direction="row">
                        <Radio value="Readiness">AI Readiness</Radio>
                        <Radio value="Bills">AI Patent Applications</Radio>
                      </Stack>
                    </RadioGroup>
                    <Checkbox
                      isChecked={showPopulation}
                      onChange={(e) => setShowPopulation(e.target.checked)}
                      ml={4} 
                    >
                      Show Population Overlay
                    </Checkbox>
                  </HStack>
                </Box>
                
                {/* Map Container */}
                <Box 
                  ref={mapRef}
                  h="70vh"
                  w="100%"
                  position="relative"
                  borderRadius="lg"
                  overflow="hidden"
                  border="1px solid"
                  borderColor={borderColor}
                  mb={4}
                  mx="auto"
                  sx={{
                    '.leaflet-container': {
                      width: '100%',
                      height: '100%'
                    }
                  }}
                />
                
                {/* Legend */}
                <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                   <Heading as="h3" size="sm" mb={2}>Legend</Heading>
                   {selectedMetric === 'Readiness' ? (
                     <HStack spacing={4} wrap="wrap"> 
                       <Box>
                         <Box w="20px" h="20px" bg="#ff4444" display="inline-block" mr={2} border="1px solid #CCC"/> 
                         Low Readiness (&lt; 45)
                       </Box>
                       <Box>
                         <Box w="20px" h="20px" bg="#ffbb33" display="inline-block" mr={2} border="1px solid #CCC"/> 
                         Medium Readiness (45 - 69.99)
                       </Box>
                       <Box>
                         <Box w="20px" h="20px" bg="#00C851" display="inline-block" mr={2} border="1px solid #CCC"/> 
                         High Readiness (&ge; 70)
                       </Box>
                       <Box>
                         <Box w="20px" h="20px" bg="#cccccc" display="inline-block" mr={2} />
                         No Data
                       </Box>
                     </HStack>
                   ) : ( 
                     <HStack spacing={4} wrap="wrap"> 
                       <Box>
                         <Box w="20px" h="20px" bg="#FFFFCC" display="inline-block" mr={2} border="1px solid #CCC"/> 
                         1-100 Apps
                       </Box>
                       <Box>
                         <Box w="20px" h="20px" bg="#A1DAB4" display="inline-block" mr={2} />
                         101-1,000 Apps
                       </Box>
                       <Box>
                         <Box w="20px" h="20px" bg="#41B6C4" display="inline-block" mr={2} />
                         1,001-10,000 Apps
                       </Box>
                        <Box>
                         <Box w="20px" h="20px" bg="#225EA8" display="inline-block" mr={2} />
                         10,001+ Apps
                       </Box>
                       <Box>
                         <Box w="20px" h="20px" bg="#cccccc" display="inline-block" mr={2} />
                         No Data
                       </Box>
                     </HStack>
                   )}
                   {showPopulation && (
                       <Box mt={2}>
                         <Box
                           w="20px"
                           h="20px"
                           borderRadius="full"
                           bg="#4A90E2" 
                           opacity={0.4}  
                           border="1px solid #2171C7" 
                           display="inline-block"
                           mr={2}
                           verticalAlign="middle" 
                         />
                         Population (Size indicates relative population)
                       </Box>
                   )}
                 </Box>
                
                {/* Dashboard Description */}
                <Box mt={6} p={4} bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="md" border="1px" borderColor={useColorModeValue('gray.200', 'gray.600')}>
                  <Text as="i" fontSize="lg" color="gray.600" mb={1} display="block">
                    Global AI Readiness and Innovation Dashboard
                  </Text>
                  <Text mb={2} color="gray.700">
                    This interactive map visualizes the global landscape of AI governance and innovation by integrating three key datasets:
                  </Text>
                  <UnorderedList mb={2} color="gray.700">
                    <ListItem>
                      <b>AI Readiness Score:</b> Countries are color-coded using a red-yellow-green scale based on their scores from the 2024 Oxford Insights Government AI Readiness Index. This index evaluates governmental preparedness for AI implementation across three pillars—Government, Technology Sector, and Data & Infrastructure—encompassing 40 indicators in total.<br />
                      <Text as="span" fontSize="sm" fontStyle="italic" color="gray.600">
                        <b>Source:</b> <Link href="https://oxfordinsights.com/wp-content/uploads/2024/12/2024-Government-AI-Readiness-Index-2.pdf" isExternal color="blue.500">Oxford Insights AI Readiness Index</Link>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <b>AI Patent Applications:</b> An alternative view allows users to visualize countries based on the number of AI-related patent families first filed in each country's patent office between 2016 and 2019. This metric serves as a proxy for a nation's capacity for AI innovation and its emphasis on intellectual property protection. High volumes of AI patent filings suggest robust research and development activities, as well as a strategic focus on securing technological advancements.<br />
                      <Text as="span" fontSize="sm" fontStyle="italic" color="gray.600">
                        <b>Source:</b> <Link href="https://ourworldindata.org/grapher/artificial-intelligence-patents-submitted" isExternal color="blue.500">Our World in Data – Annual AI Patent Applications</Link>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <b>Population:</b> Semi-transparent circles are overlaid on countries, scaled proportionally to population size using data from the World Bank DataBank. This layer provides contextual information and can be toggled on or off.<br />
                      <Text as="span" fontSize="sm" fontStyle="italic" color="gray.600">
                        <b>Source:</b> <Link href="https://databank.worldbank.org/source/population-estimates-and-projections" isExternal color="blue.500">World Bank – Population Estimates and Projections</Link>
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </Box>

                {/* Text Content - Restore ALL paragraphs */}
                <Text mb={3}>
                  Artificial intelligence is advancing at breakneck speed, yet its development and benefits are dramatically concentrated. While AI innovation flourishes primarily in a few Global North countries, its impacts reverberate globally, touching populations who often have little influence over its design or deployment.
                </Text>
                <Text mb={3}>
                  This disconnect creates a stark reality: projections estimate that by 2030, North America, Europe, and China will capture <Link href="https://www.pwc.com/gx/en/issues/analytics/assets/pwc-ai-analysis-sizing-the-prize-report.pdf" isExternal color="blue.500">84% of AI's economic gains</Link>, while regions like Africa, Oceania, and the rest of Asia combined may see only 8%. Such trajectories threaten to <Link href="https://foreignpolicy.com/2024/12/17/ai-global-south-inequality/" isExternal color="blue.500">deepen global inequality</Link>, as leading AI nations gain outsized advantages. Furthermore, without inclusive governance, dominant cultural and economic perspectives risk imposing 'one-size-fits-all' AI values and policies ill-suited to diverse local contexts.
                </Text>
                <Text mb={3}>
                  The data often used to train AI reflects this imbalance. Large language models, typically trained on internet data, <Link href="https://www.weforum.org/stories/2024/09/ai-linguistic-diversity-gap-missed-opportunity/" isExternal color="blue.500">underrepresent the world's linguistic diversity; none of the top 34 internet languages are African, and most models cover only about 100 of over 7,000 global languages</Link>. This occurs despite Africa being home to nearly 19% of the world's population. Consequently, even advanced AI models exhibit <Link href="https://ar5iv.org/pdf/2402.02680" isExternal color="blue.500">geographic biases</Link> favoring high-income regions and can perpetuate harmful stereotypes, such as rating African residents less attractive than Europeans.
                </Text>
                <Text mb={3}>
                  The stakes are high. This isn't merely about representation in development teams; it's about the real-world consequences when widely used AI systems reflect narrow perspectives. Models trained primarily on Western data can malfunction or misdiagnose when applied elsewhere – for instance, a health AI accurate for European patients <Link href="https://link.springer.com/book/10.1007/978-3-031-08215-3" isExternal color="blue.500">has shown significant errors when used with African patients</Link>, highlighting how data and design choices impact lives.
                </Text>
                <Text mb={3}>
                  This project confronts this governance gap by focusing on a critical lever for more democratic AI oversight: AI red teaming. By deliberately probing AI systems for vulnerabilities, biases, and unexpected failure modes, we can uncover risks missed by internal teams. Our goal is to identify pathways toward inclusive AI security governance – frameworks that embed global perspectives and promote equity, safety, and accountability across all linguistic and geographic divides.
                </Text>
                <Text as="i" mt={4}>
                  For detailed sources and further reading, please see the References and Resources section.
                </Text>
              </VStack>
            </TabPanel> 

            {/* AI Red Teaming Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading as="h3" size="md">AI Red Teaming and Why Access Matters</Heading>
                <Text>
                  AI red teaming refers to the practice of probing AI systems for vulnerabilities, biases, and failure modes by adopting an adversarial mindset. Red teaming has its roots in cybersecurity and the military, but has become an integral part of AI development at major labs, where internal red teams try to identify flaws in large models. (<Link href="https://www.humane-intelligence.org/grt" isExternal color="blue.500">Storchan et al., 2024</Link>) In practice, red teamers may test for jailbreaks, harmful content generation, biased outputs, privacy leaks, or the ability of a model to follow dangerous instructions. The process often involves generating prompts that are specifically engineered to bypass safeguards, eliciting model behavior that violates safety or alignment goals. Red teaming can be manual—done by expert analysts—or automated, using tools to generate adversarial prompts at scale. The results of red teaming exercises inform the design of mitigation strategies such as model fine-tuning, reinforcement learning from human feedback (RLHF), or stronger content filters. In many labs, red teaming is an iterative process embedded across stages of model evaluation and release, and is increasingly supported by interdisciplinary teams with expertise in security, linguistics, law, and social science. (<Link href="https://ai.meta.com/research/publications/mart-improving-llm-safety-with-multi-round-automatic-red-teaming/" isExternal color="blue.500">Meta</Link>, <Link href="https://openai.com/index/advancing-red-teaming-with-people-and-ai/" isExternal color="blue.500">OpenAI</Link>, <Link href="https://www.linkedin.com/pulse/anthropics-comprehensive-approach-red-teaming-ai-models-ajay-naha-qk6xc" isExternal color="blue.500">Anthropic</Link>, 2024) Inclusive red teaming and development bring diverse perspectives to the table, leading to more robust and fair AI systems.
                </Text>
                <Text>
                  There are many concrete examples of how lack of inclusion has caused harm – and how broader input can add value:
                </Text>
                <UnorderedList spacing={3}>
                  <ListItem>
                    <Text fontWeight="bold">Linguistic & Geographic Bias:</Text> AI systems often perform poorly for languages or communities absent in training data. Independent researchers have found that large language models (trained mostly on English and European data) carry "geographic bias" – for instance, systematically underrating content related to African countries on subjective qualities like "intelligence" or "morality." (<Link href="https://doi.org/10.48550/arXiv.2402.02680" isExternal color="blue.500">Manvi et al., 2024</Link>) Generative AI tools also struggle with many low-resource languages, leading to errors and the exclusion of non-English speakers. These biases can amplify inequality (e.g. an AI assistant that works well in English but garbles Swahili is far less useful to African users). Global inclusion in red teaming ensures testers who speak diverse languages and come from varied regions can identify these blind spots early. Indeed, when multilingual teams have stress-tested AI models, they uncovered critical flaws in how the AI handled languages like Bengali and Swahili that the original developers missed (<Link href="https://knightcolumbia.org/blog/a-safe-harbor-for-ai-evaluation-and-red-teaming#:~:text=While%20many%20types%20of%20testing,bias%2C%20copyright%2C%20and%20other%20issues" isExternal color="blue.500">Longpre et. al, 2024)
                    </Link>).
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">Health & Safety Risks (Misdiagnoses):</Text> If AI applications (like medical diagnosis tools) are developed using homogenous data, they can be dangerously unreliable for underrepresented groups. For example, an AI system for skin cancer screening was found to be <Link href="https://www.theguardian.com/society/2021/nov/09/ai-skin-cancer-diagnoses-risk-being-less-accurate-for-dark-skin-study" isExternal color="blue.500">less accurate on patients with darker skin</Link>, because most training images were of light-skinned individuals. The researchers who uncovered this warned that it could lead to missed melanomas in patients of color or unnecessary procedures due to false alarms. (<Link href="https://knightcolumbia.org/blog/a-safe-harbor-for-ai-evaluation-and-red-teaming#:~:text=While%20many%20types%20of%20testing,bias%2C%20copyright%2C%20and%20other%20issues" isExternal color="blue.500">Longpre et al., 2024</Link>) In healthcare AI, diverse red team input is literally life-saving: clinicians and data scientists from different regions can test whether an algorithm trained in, say, Europe works on Latin American or African patient data. Including these perspectives helps catch issues like diagnostic tools misreading certain genetic markers or medical devices that don't account for cultural differences in symptom reporting.
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">Cultural Mismatches & Fairness:</Text> AI systems often reflect the cultural context of their creators, which can cause problems when deployed globally. Generative AI models have been caught reinforcing stereotypes – with one study showing these models portray non-Western cultures "through an outsider's lens," (often oversimplifying or misrepresenting traditions. (<Link href="https://ist.psu.edu/news/non-western-cultures-misrepresented-harmed-by-generative-ai-researchers-say/" isExternal color="blue.500">Venkit et al. 2024</Link>) This is not only offensive but can also lead to poor user experiences (imagine a virtual assistant misunderstanding honorifics or social cues in Japan because it was designed in the U.S.). Inclusive development and red teaming inject local knowledge to prevent such cultural mismatches.
                  </ListItem>
                  <Text>
                    When AI is co-created and tested by people from different linguistic, ethnic, and social backgrounds, it performs better across the board. Inclusive red teaming doesn't just mitigate harm – it also uncovers new use cases and improvements. For instance, African NLP researchers have contributed novel data sets and tools for local languages, making AI more useful to millions and expanding its market (<Link href="https://doi.org/10.48550/arXiv.2402.02680" isExternal color="blue.500">Manvi et al., 2024</Link>). The bottom line: diversity is a strength in AI development. It helps ensure AI systems respect differences in language, culture, and context, rather than imposing a uniform approach that might fail many users.
                  </Text>
                </UnorderedList>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading as="h3" size="md">Barriers to Inclusive Red Teaming</Heading>
                <Text>
                  Red teaming AI systems requires access to compute, talent, and funding—resources largely concentrated in the Global North. Training or even testing large models demands cloud access and high-performance computing, often unaffordable to universities or independent labs in the Global South (<Link href="https://www.weforum.org/stories/2024/09/ai-linguistic-diversity-gap-missed-opportunity/" isExternal color="blue.500">Hamill-Stewart, 2024</Link>).
                </Text>
                <Text>
                  Infrastructure gaps like unstable internet or electricity further constrain participation (Modern Diplomacy). Local AI ecosystems also struggle due to limited funding—Global South nations receive a fraction of AI R&D investment compared to North America, Europe, or China (<Link href="https://www.pwc.com/gx/en/issues/analytics/assets/pwc-ai-analysis-sizing-the-prize-report.pdf" isExternal color="blue.500">PwC, 2017</Link>).
                </Text>
                <Text>
                  The talent pipeline is fractured. Skilled AI professionals often migrate abroad, leaving local institutions with few mentors or collaborative networks (<Link href="https://moderndiplomacy.eu/2025/03/04/why-is-ai-adoption-slower-in-the-global-south-and-how-can-it-leap-forward/#:~:text=Shortage%20of%20AI%20Talent%20AI,schools%20further%20compounds%20this%20challenge" isExternal color="blue.500">Nugraha, 2025</Link>). As <Link href="https://doi.org/10.1007/978-3-031-08215-3" isExternal color="blue.500">Eke et al. (2024)</Link> note, this limits grassroots development of local language models and testing tools, reinforcing reliance on foreign systems. Many countries also lack mature AI strategies or institutional support for safety research, making it harder to justify or fund red teaming efforts.
                </Text>
                <Heading as="h4" size="sm" mt={4}>Legal and Policy Barriers</Heading>
                <Text>
                  Even when technical skill exists, researchers often face legal ambiguity and risk. Most advanced AI models are developed by private firms whose terms of service prohibit independent safety evaluations. Attempts to probe model behavior—even to expose bias or security flaws—can result in revoked access or legal threats (<Link href="https://arxiv.org/abs/2403.04893" isExternal color="blue.500">Longpre et al., 2024</Link>).
                </Text>
                <Text>
                  Unlike in cybersecurity, where bug bounty programs offer safe harbor protections, AI developers rarely provide secure channels for external testing (<Link href="https://www.usenix.org/system/files/usenixsecurity23-akgul.pdf" isExternal color="blue.500">Akgul et al., 2023</Link>). In many jurisdictions, researchers can be prosecuted under anti-hacking or intellectual property laws—for example, under the U.S. Computer Fraud and Abuse Act or DMCA anti-circumvention provisions (FAS).
                </Text>
                <Text>
                  In the Global South, these challenges are compounded by vague cybercrime laws that often conflate security testing with criminal behavior. Kenya's CMCA and South Africa's cybercrime acts have been criticized for failing to protect ethical researchers (<Link href="https://www.ajol.info/index.php/jipit/article/view/233034/220116" isExternal color="blue.500">Sugow, Zalo & Rutenberg, 2021</Link>). Without legal reforms, fear of retaliation discourages red teaming—especially from those without institutional or legal support (<Link href="https://dl.acm.org/doi/10.1145/3531146.3533200" isExternal color="blue.500">Png, 2022</Link>).
                </Text>
                <Heading as="h4" size="sm" mt={4}>Technical & Data Barriers</Heading>
                <Text>
                  Effective red teaming requires access to both proprietary AI models and contextually relevant datasets. Most foundation models are tightly gated, with access limited to elite academic or commercial partners—primarily in the U.S. and Europe (<Link href="https://arxiv.org/abs/2403.04893" isExternal color="blue.500">Longpre et al., 2024</Link>). Even when models are accessible via APIs, fees, rate limits, or license restrictions prevent deep evaluation (<Link href="https://www.weforum.org/stories/2024/09/ai-linguistic-diversity-gap-missed-opportunity/" isExternal color="blue.500">Hamill-Stewart, 2024</Link>).
                </Text>
                <Text>
                  Meanwhile, many Global South communities face data scarcity. Local dialects, cultural context, or health conditions are often absent from major datasets, making it difficult to test AI performance in real-world use cases. As <Link href="https://doi.org/10.1007/978-3-031-08215-3" isExternal color="blue.500">Eke et al. (2024)</Link> show, localized NLP models for Swahili or Yoruba outperform Silicon Valley systems—demonstrating the need for community-driven development and testing.
                </Text>
                <Text>
                  Knowledge barriers further isolate would-be red teamers. Key safety research is often published in English, behind paywalls, or presented at exclusive conferences. Without access to safety benchmarks or evaluation protocols, researchers are locked out of the conversation—even when they're best positioned to identify harms in their regions (<Link href="https://repositorio.fgv.br/items/deea423e-723e-4841-917b-ed2697a1959d" isExternal color="blue.500">Belli & Gaspar, 2024</Link>).
                </Text>
                <Text>
                  Finally, many countries lack regulatory bodies capable of responding to red team findings. If a Kenyan researcher identifies a financial model that discriminates against local users, there may be no national institution empowered to act, undermining the point of the research in the first place (<Link href="https://arxiv.org/abs/2403.04893" isExternal color="blue.500">Longpre et al., 2024</Link>).
                </Text>
                <Text>
                  Despite the clear benefits of inclusion, significant barriers make it hard for researchers and practitioners outside a few tech hubs to participate in AI red teaming and governance. These barriers are structural, legal, and technical, often hitting the Global South hardest.
                </Text>

                {/* Render the flowchart component */}
                <BarrierFlowchart />

              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading as="h3" size="md">Enabling Participation: Making Red Teaming Global</Heading>
                <Text>
                  How do we move from a concentrated AI safety ecosystem to a truly global one? This section explores three practical enablers: open-source tools, legal protections, and capacity building. Together, these approaches aim to lower the threshold for participation, especially for red teamers, researchers, and civil society actors in the Global Majority.
                </Text>
                <Heading as="h4" size="sm" mt={4}>Open Source Tools and Collaborative Platforms</Heading>
                <Text>
                  Democratizing AI starts with making its infrastructure open. Models like <Link href="https://huggingface.co/bigscience/bloom" isExternal color="blue.500">BLOOM</Link>—a 176B parameter multilingual language model developed by over 1,000 researchers—show how collaboration can lower barriers. BLOOM can be downloaded and red-teamed locally, supporting experimentation in 46 languages, including Kiswahili, Telugu, and Vietnamese (<Link href="https://arxiv.org/abs/2211.05100" isExternal color="blue.500">BigScience, 2022</Link>).
                </Text>
                <Text>
                  Other tools like IBM's <Link href="https://github.com/Trusted-AI/AIF360" isExternal color="blue.500">AI Fairness 360</Link> and Mozilla's <Link href="https://commonvoice.mozilla.org/" isExternal color="blue.500">Common Voice</Link> help build diverse datasets and test models for bias, speech accuracy, and inclusion. These open tools allow a student in Ghana or a civic tech group in the Philippines to meaningfully audit AI without relying on closed, expensive APIs.
                </Text>
                <Text>
                  This site's <Link as="button" onClick={() => document.querySelector('[role="tab"]:nth-child(7)').click()} color="blue.500">resources section</Link> curates such tools—models, datasets, and evaluation libraries—as a starter kit for red teamers worldwide.
                </Text>
                <Heading as="h4" size="sm" mt={4}>Legal Safe Harbors and Policy Reforms</Heading>
                <Text>
                  Just as cybersecurity evolved to protect good-faith hackers, AI needs similar legal protections. Without them, researchers testing models for bias or failure risk violating terms of service or even national laws. As the <Link href="https://knightcolumbia.org/blog/a-safe-harbor-for-ai-evaluation-and-red-teaming" isExternal color="blue.500">Knight Institute (2024)</Link> notes, current policies discourage third-party evaluation, especially outside elite institutions.
                </Text>
                <Text>
                  In 2024, more than 350 experts signed an open letter calling for legal "safe harbors" for AI evaluation (<Link href="https://fas.org/publication/safe-harbor-for-ai-researchers/#:~:text=Similar%20issues%20plague%20social%20media%2C" isExternal color="blue.500">FAS 2024</Link>). Some companies, including OpenAI, responded by updating their terms to permit some academic research—but broader legal protections are needed.
                </Text>
                <Text>
                  Drawing from security models like the U.S. DMCA exemption for ethical hacking, such policies could reassure a red teamer in Argentina or India that publishing their findings won't lead to legal retaliation. And just as bug bounty programs reward vulnerability disclosures, AI safety could expand incentives to flag misuse or bias—paying researchers for surfacing real-world risks (<Link href="https://knightcolumbia.org/blog/a-safe-harbor-for-ai-evaluation-and-red-teaming" isExternal color="blue.500">Knight Institute 2024</Link>).
                </Text>
                <Heading as="h4" size="sm" mt={4}>Capacity Building and Knowledge Transfer</Heading>
                <Text>
                  Building a truly inclusive AI safety ecosystem means investing in people, not just infrastructure. Fellowship programs, regional research centers, and multilingual resources help connect underrepresented researchers to global knowledge—and bring localized expertise into global conversations. Initiatives like <Link href="https://blackinai.org/" isExternal color="blue.500">Black in AI</Link> and the <Link href="https://lacunafund.org/" isExternal color="blue.500">Lacuna Fund</Link> show how targeted support can seed enduring capacity in historically excluded regions.
                </Text>
                <Text>
                  We can also take inspiration from cybersecurity. Global incident response networks like <Link href="https://www.first.org/" isExternal color="blue.500">FIRST</Link> and rotating conference ecosystems like <Link href="https://www.blackhat.com/" isExternal color="blue.500">Black Hat</Link> or Chaos Communication Congress (CCC) helped decentralize expertise over time. AI safety could follow suit by institutionalizing hands-on, distributed evaluation efforts.
                </Text>
                <Text>
                  One organization already demonstrating this approach is <Link href="https://www.humane-intelligence.org/" isExternal color="blue.500">Humane Intelligence</Link>, which runs global red teaming exercises focused on real-world harms. Their events are designed to surface overlooked risks by centering marginalized perspectives. For example, in partnership with FEMYSO, they hosted a 2024 red teaming event probing AI systems for anti-Muslim bias in search and generative outputs—bringing together civil society, technical experts, and impacted communities to co-develop tests (<Link href="https://www.humane-intelligence.org/red-teaming-events/femyso-ai-and-islamophobia-2024" isExternal color="blue.500">FEMYSO & AI Red Teaming, 2024</Link>). At <Link href="https://www.humane-intelligence.org/red-teaming-events/defcon-red-teaming-exercise-2023" isExternal color="blue.500">DEF CON 2023</Link>, they helped organize one of the first public red teaming challenges for foundation models, empowering hundreds of participants from diverse regions to stress-test major chatbots using shared prompts and harm scenarios. These examples highlight how distributed, community-led safety evaluations can uncover harms traditional model developers often miss.
                </Text>
                <Text>
                  To scale this model, international legal frameworks must support it. Future trade agreements or multilateral AI pacts could include cross-border protections for public-interest AI research—just as international treaties once codified norms for environmental science or copyright. These safeguards would empower researchers worldwide to challenge, test, and improve the systems that shape their lives.
                </Text>
               
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading as="h3" size="md">Global Coordination</Heading>
                <Text>
                  No country can govern AI risks alone. From algorithmic finance shocks to cross-border misinformation, the effects of foundation models are global. But AI governance remains fragmented. More than 1,000 policy initiatives are scattered across 60+ countries, with varying definitions and enforcement scopes, creating trade barriers, legal uncertainty, and regulatory arbitrage (<Link href="https://www.oecd.org/content/dam/oecd/en/about/programmes/strategic-foresight/GSG%20Background%20Note_GSG(2024)1en.pdf/_jcr_content/renditions/original./GSG%20Background%20Note_GSG(2024)1en.pdf#:~:text=producers%20and%20users%20to%20ensure,governance%20approaches%2C%20as%20well%20as" isExternal color="blue.500">OECD 2024</Link>). A foundation model permitted in one jurisdiction could violate safety or civil rights laws in another. Without coordination, companies may exploit gaps, and harms may go unaddressed.
                </Text>
                <Heading as="h4" size="sm" mt={4}>Aligning Principles and Institutions</Heading>
                <Text>
                  Some multilateral groundwork already exists. The <Link href="https://oecd.ai/en/ai-principles" isExternal color="blue.500">OECD AI Principles</Link> (2019) and <Link href="https://unesdoc.unesco.org/ark:/48223/pf0000381137" isExternal color="blue.500">UNESCO's Recommendation on the Ethics of AI</Link> (2021) set a high-level vision: fairness, transparency, and human rights. However, these principles lack implementation mechanisms. Forums like the Global Partnership on AI (GPAI) and technical standards bodies—<Link href="https://www.iso.org/committee/6794475.html" isExternal color="blue.500">ISO/IEC JTC 1/SC 42</Link>, <Link href="https://ethicsinaction.ieee.org/" isExternal color="blue.500">IEEE</Link>, and <Link href="https://www.nist.gov/itl/ai-risk-management-framework" isExternal color="blue.500">NIST</Link>—have begun to translate these values into risk assessment frameworks, audit protocols, and standards like ISO 42001 for AI governance.
                </Text>
                <Heading as="h4" size="sm" mt={4}>Embedding Red Teaming in Global Governance</Heading>
                <Text>
                  What's missing is an agreed global framework for safety evaluation—particularly red teaming. Models above a certain capability threshold should be tested by independent, multinational panels for context-specific risks: bias, disinformation, misuse, and regional exclusion. This vision echoes proposals for red teaming standards embedded in ISO or UNESCO processes, and reinforced through national AI Safety Institutes (AISIs) that coordinate globally while responding locally.
                </Text>
                <Text>
                  AISIs, as proposed by <Link href="https://arxiv.org/abs/2409.11314" isExternal color="blue.500">Fort (2024)</Link>, combine technical credibility with public accountability and can act as hubs for globally interoperable safety assessments. Their role would mirror that of NIST in the U.S. or the EU's AI Office, but operate across borders. These institutions could formalize pre-deployment testing regimes, share results through international observatories, and convene pluralistic expert panels, including Global South institutions like the <Link href="https://www.africanobservatory.ai/about" isExternal color="blue.500">African Observatory on Responsible AI</Link> and the <Link href="https://menaobservatory.ai" isExternal color="blue.500">MENA AI Observatory</Link>.
                </Text>
                <Heading as="h4" size="sm" mt={4}><b>Infrastructure and Legal Harmonization</b></Heading>
                <Text>
                  Yet standards alone are insufficient without access. As <Link href="https://arxiv.org/abs/2403.04893" isExternal color="blue.500">Longpre et al., 2024</Link> and <Link href="https://www.usenix.org/system/files/usenixsecurity23-akgul.pdf" isExternal color="blue.500">Akgul et al., 2023</Link> argue, legal "safe harbors" must protect public-interest red teamers across jurisdictions, shielding them from lawsuits and ToS violations—just as ethical hackers are protected in cybersecurity disclosure regimes. A multilateral "AI Safety Safe Harbor Charter" could embed these protections into <Link href="https://oecd.ai/en/ai-principles" isExternal color="blue.500">OECD AI principles</Link>, <Link href="https://www.unesco.org/en/articles/recommendation-ethics-artificial-intelligences" isExternal color="blue.500">UNESCO recommendations</Link>, or a future <Link href="https://www.un.org/en/summit-of-the-future/global-digital-compact" isExternal color="blue.500">UN Global Digital Compact</Link>.
                </Text>
                <Text>
                  Equally important is infrastructure. U.S. initiatives like the <Link href="https://nairrpilot.org/" isExternal color="blue.500">National AI Research Resource (NAIRR)</Link> show how compute, datasets, and APIs can be pooled for academic researchers. A federated, globalized version of NAIRR would materially enable safe harbor participation by offering access, not just permission.
                </Text>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading as="h3" size="md">Inclusive & Global AI Red Teaming Resources</Heading>
                <Text>
                  This curated list of tools, datasets, frameworks, policy proposals, and organizations is intended as a starting point for researchers, practitioners, and policymakers working to build more inclusive, secure, and globally relevant AI systems. The resources prioritize open access and community-driven initiatives, with special emphasis on empowering safety research and AI development in the Global Majority.
                </Text>
                <Text>
                  While not exhaustive, the list is designed to provide practical entry points for red teaming, fairness audits, multilingual model evaluation, and participatory governance. It reflects a growing ecosystem of actors who are advancing AI safety and accountability beyond elite institutions—often with limited infrastructure but deep contextual expertise.
                </Text>
                <Heading as="h4" size="sm" mt={4}>Tools (Open-Source Red Teaming & Evaluation)</Heading>
                <Text as="i" color="gray.600" mb={2}>
                  This section highlights free and open-source tools that support adversarial testing, bias audits, robustness checks, and other red teaming tasks. Many are lightweight and modular, making them accessible for independent researchers and Global South institutions with limited compute. These tools form the foundation for identifying vulnerabilities in AI systems—technical entry points for community-led oversight.
                </Text>
                <UnorderedList spacing={2}>
                  <ListItem><Link href="https://github.com/Azure/counterfit" isExternal color="blue.500"><b>Microsoft Counterfit</b></Link> – CLI toolkit for automating attacks on AI models and assessing vulnerabilities. (Microsoft)</ListItem>
                  <ListItem><Link href="https://github.com/Azure/PyRIT" isExternal color="blue.500"><b>Microsoft PyRIT</b></Link> – Toolkit for automated red teaming of generative AI and LLM vulnerabilities. (Microsoft AI Red Team)</ListItem>
                  <ListItem><Link href="https://github.com/Trusted-AI/adversarial-robustness-toolbox" isExternal color="blue.500"><b>IBM Adversarial Robustness Toolbox (ART)</b></Link> – Library of adversarial attack and defense methods for ML robustness. (IBM Research)</ListItem>
                  <ListItem><Link href="https://aif360.mybluemix.net/" isExternal color="blue.500"><b>IBM AI Fairness 360</b></Link> – Toolkit for detecting and mitigating bias in AI models and datasets. (IBM Research) (<Link href="https://github.com/Trusted-AI/AIF360" isExternal color="blue.500">GitHub</Link>)</ListItem>
                  <ListItem><Link href="https://github.com/QData/TextAttack" isExternal color="blue.500"><b>TextAttack</b></Link> – NLP adversarial attack framework for robustness testing and data augmentation. (QData Lab, University of Virginia)</ListItem>
                  <ListItem><Link href="https://github.com/NVIDIA/garak" isExternal color="blue.500"><b>Garak</b></Link> – Automated scanner identifying vulnerabilities in large language models. (Open-source community)</ListItem>
                  <ListItem><Link href="https://github.com/privacytrustlab/ml_privacy_meter" isExternal color="blue.500"><b>Privacy Meter</b></Link> – Toolkit auditing ML models for privacy risks and data leakage. (NUS Trustworthy ML Lab)</ListItem>
                  <ListItem><Link href="https://www.pymetrics.ai/" isExternal color="blue.500"><b>Audit AI</b></Link> – Tool for auditing bias in AI models, checking for fairness and compliance. (Pymetrics/Harver)</ListItem>
                  <ListItem><Link href="https://github.com/yeyintminthuhtut/Awesome-Red-Teaming" isExternal color="blue.500"><b>Awesome Red Teaming</b></Link> – A curated list of red teaming tools, tactics, training materials, and certifications, structured around the MITRE ATT&CK framework. (Community-maintained, MIT License)</ListItem>
                  <ListItem><Link href="https://github.com/redcanaryco/atomic-red-team" isExternal color="blue.500"><b>Atomic Red Team</b></Link> – Library of small, testable scripts mapped to MITRE ATT&CK techniques, used to simulate adversary behavior and test detection logic. (Red Canary, MIT License)</ListItem>
                  <ListItem><Link href="https://github.com/mitre/caldera" isExternal color="blue.500"><b>CALDERA</b></Link> – Automated adversary emulation system with a plugin-based architecture for conducting red team operations and validating blue team defenses. (MITRE, Apache 2.0)</ListItem>
                  <ListItem><Link href="https://github.com/hunters-forge/mordor" isExternal color="blue.500"><b>Mordor</b></Link> – Open telemetry dataset repository for adversary emulation and detection research, aligned with real-world cyber attack behaviors. (UraSecTeam/Hunters Forge, MIT License)</ListItem>
                  <ListItem><Link href="https://github.com/BishopFox/sliver" isExternal color="blue.500"><b>Sliver</b></Link> – Cross-platform command and control (C2) framework offering dynamic payload generation, encrypted communication, and operator collaboration. (Bishop Fox, GPLv3)</ListItem>
                  <ListItem><Link href="https://www.metasploit.com/" isExternal color="blue.500"><b>Metasploit Framework</b></Link> – Well-established framework for developing, testing, and executing exploit code against remote targets. (Rapid7, BSD License) (<Link href="https://github.com/rapid7/metasploit-framework" isExternal color="blue.500">GitHub</Link>)</ListItem>
                  <ListItem><Link href="https://www.fastandeasyhacking.com/armitage/" isExternal color="blue.500"><b>Armitage</b></Link> – GUI front-end for Metasploit that supports team-based red teaming and visualization of network attack paths. (Raphael Mudge, GPLv3)</ListItem>
                  <ListItem><Link href="https://github.com/infosecn1nja/Red-Teaming-Toolkit" isExternal color="blue.500"><b>Red-Teaming-Toolkit</b></Link> – Curated list of over 250 tools and resources categorized for adversary emulation, reconnaissance, privilege escalation, and more. (infosecn1nja, Community License)</ListItem>
                  <ListItem><Link href="https://github.com/A-poc/RedTeam-Tools" isExternal color="blue.500"><b>RedTeam-Tools</b></Link> – Aggregated toolbox of open-source red teaming tools including exploits, payload builders, and evasion utilities. (A-poc, MIT License)</ListItem>
                </UnorderedList>
                <Heading as="h4" size="sm" mt={4}>Datasets (Multilingual & Diverse Open Datasets)</Heading>
                <Text as="i" color="gray.600" mb={2}>
                  Inclusive red teaming and AI evaluation depend on the availability of representative training and testing data. This section collects high-quality datasets focused on underrepresented languages, regions, and speech communities. These datasets support fairness benchmarking, localization, and the training of AI models that better reflect global linguistic and cultural diversity.
                </Text>
                <UnorderedList spacing={2}>
                  <ListItem><Link href="https://commonvoice.mozilla.org/" isExternal color="blue.500"><b>Mozilla Common Voice</b></Link> – Crowdsourced multilingual speech dataset. (Mozilla Foundation, CC0)</ListItem>
                  <ListItem><Link href="https://huggingface.co/datasets/bigscience-data/roots" isExternal color="blue.500"><b>BigScience ROOTS Corpus</b></Link> – Large multilingual text corpus for AI model training and evaluation. (BigScience Project)</ListItem>
                  <ListItem><Link href="https://laion.ai/blog/laion-5b/" isExternal color="blue.500"><b>LAION-5B</b></Link> – Massive dataset of image-text pairs for multimodal AI. (LAION, CC-BY 4.0)</ListItem>
                  <ListItem><Link href="https://www.masakhane.io/datasets" isExternal color="blue.500"><b>Masakhane Datasets</b></Link> – NLP datasets supporting African language modeling and evaluation. (Masakhane, CC-BY 4.0)</ListItem>
                  <ListItem><Link href="https://github.com/AmericasNLP" isExternal color="blue.500"><b>AmericasNLP Parallel Corpus</b></Link> – Dataset for translation and modeling of Indigenous languages from the Americas. (AmericasNLP Workshop)</ListItem>
                  <ListItem><Link href="https://huggingface.co/datasets/amphion/Emilia-Dataset" isExternal color="blue.500"><b>Emilia: An Extensive, Multilingual, and Diverse Speech Dataset for Large-Scale Speech Generation</b></Link> – Introduces Emilia, a large-scale dataset comprising over 101,000 hours of spontaneous speech across six languages, designed to enhance the naturalness of speech generation models. Accompanied by Emilia-Pipe, an open-source preprocessing pipeline that efficiently converts raw, in-the-wild audio into high-quality, annotated training data. The dataset is available on Hugging Face: amphion/Emilia-Dataset. (Haorui He et al., arXiv 2024)</ListItem>
                  <ListItem><Link href="https://arxiv.org/abs/2502.12301" isExternal color="blue.500"><b>SMOL</b></Link> – Professionally translated parallel corpora for 115 under-resourced languages (6.1M tokens), with document- and sentence-level variants, factuality ratings, and annotations. (Open Data, arXiv 2024)</ListItem>
                  <ListItem><Link href="https://arxiv.org/abs/2501.14506" isExternal color="blue.500"><b>WanJuanSiLu</b></Link> – Large-scale web text dataset built for low-resource languages using a rigorous pipeline for filtering, deduplication, and evaluation. (Open Data, arXiv 2024)</ListItem>
                  <ListItem><Link href="https://github.com/BatsResearch/LexC-Gen" isExternal color="blue.500"><b>LexC-Gen</b></Link> – Synthetic text classification datasets for 17 extremely low-resource languages using bilingual lexicons and open LLMs. (Open Source, GitHub)</ListItem>
                  <ListItem><Link href="https://aclanthology.org/2024.lrec-main.790/" isExternal color="blue.500"><b>Indic-TEDST</b></Link> – Speech-to-text translation dataset across 9 Indic language pairs with strong baselines and evaluation protocols. (Open Data, ACL LREC 2024)</ListItem>
                  <ListItem><Link href="https://github.com/speech-recognition-community/Fongbe-speech-dataset" isExternal color="blue.500"><b>Fongbe Speech Dataset</b></Link> – ~4,000 speech samples from native Fongbe speakers for automatic speech recognition tasks. (Open Speech Dataset, Papers with Code)</ListItem>
                  <ListItem><Link href="https://arxiv.org/abs/2210.09948" isExternal color="blue.500"><b>Kencorpus</b></Link> – 5.6M word text corpus and 177 hours of speech data in Swahili, Dholuo, and Luhya for multilingual NLP applications in Kenya. (Open Data, arXiv 2022)</ListItem>
                  <ListItem><Link href="https://tatoeba.org/" isExternal color="blue.500"><b>Tatoeba Project</b></Link> – Multilingual dataset of example sentences and translations across 400+ languages, suitable for translation, training, and evaluation. (Community-led, open access)</ListItem>
                </UnorderedList>
                <Heading as="h4" size="sm" mt={4}>Frameworks & Guidelines (Safety Evaluation & Governance)</Heading>
                <Text as="i" color="gray.600" mb={2}>
                  This section includes formal frameworks and evaluation strategies that guide responsible AI development and risk assessment. It brings together globally inclusive governance documents, ranging from national standards to open benchmarks that support participatory oversight and context-sensitive evaluation. Together, these frameworks help anchor safety practices in shared norms and adaptable processes.
                </Text>
                <UnorderedList spacing={2}>
                  <ListItem><Link href="https://www.nist.gov/itl/ai-risk-management-framework" isExternal color="blue.500"><b>NIST AI Risk Management Framework (AI RMF 1.0)</b></Link> – Comprehensive guidelines for AI risk management emphasizing fairness and transparency. (NIST)</ListItem>
                  <ListItem><Link href="https://atlas.mitre.org/" isExternal color="blue.500"><b>MITRE ATLAS</b></Link> – Knowledge base mapping AI vulnerabilities and adversarial threats. (MITRE)</ListItem>
                  <ListItem><Link href="https://crfm.stanford.edu/helm/latest/" isExternal color="blue.500"><b>Holistic Evaluation of Language Models (HELM)</b></Link> – Framework evaluating language model performance and societal impacts. (Stanford CRFM)</ListItem>
                  <ListItem><Link href="https://github.com/openai/evals" isExternal color="blue.500"><b>OpenAI Evals</b></Link> – Crowdsourced benchmarks and evaluation methods for large language models. (OpenAI)</ListItem>
                  <ListItem><Link href="https://www.unesco.org/en/artificial-intelligence/ethics-recommendation" isExternal color="blue.500"><b>UNESCO Recommendation on the Ethics of AI</b></Link> – Global ethical principles for inclusive AI governance. (UNESCO)</ListItem>
                  <ListItem><Link href="https://www.apartresearch.com/project/reparative-algorithmic-impact-assessments-a-human-centered-justice-oriented-accountability-framework" isExternal color="blue.500"><b>Reparative Algorithmic Impact Assessments (RAIA)</b></Link> – Decolonial, justice-oriented framework for AI accountability centering the Global Majority. (Elise Racine, UN IGF DAIG Coalition)</ListItem>
                  <ListItem><Link href="https://aiverifyfoundation.sg/downloads/Proposed_MGF_Gen_AI_2024.pdf" isExternal color="blue.500"><b>Model AI Governance Framework for Generative AI (Singapore, 2024)</b></Link> – Developed by the AI Verify Foundation, this framework supports context-specific, risk-tiered safety evaluations, emphasizing global interoperability and accountability in generative AI governance. (Singapore, AI Verify Foundation)</ListItem>
                  <ListItem><Link href="https://pandectes.io/blog/chinas-tc260-introduces-new-framework-for-ai-safety-governance/" isExternal color="blue.500"><b>AI Safety Governance Framework (China, 2024)</b></Link> – China's TC260 proposes lifecycle-based governance, emergency response protocols, and inclusive stakeholder engagement to manage AI safety risks. (TC260, China)</ListItem>
                  <ListItem><Link href="https://www.meti.go.jp/press/2024/09/20240925001/20240925001.html" isExternal color="blue.500"><b>Guide to Evaluation Perspectives on AI Safety (Japan, 2024)</b></Link> – Japan's AI Safety Institute outlines methods for real-time, operational safety assessments grounded in global consensus and practical evaluation tools. (AI Safety Institute, Japan)</ListItem>
                  <ListItem><Link href="http://www.wfeo.org/wp-content/uploads/2024/CEIT_Safety-and-Global-Governance-of-Generative-AI.pdf" isExternal color="blue.500"><b>Safety and Global Governance of Generative AI (WFEO, 2024)</b></Link> – The World Federation of Engineering Organizations emphasizes culturally grounded governance, cross-border data ethics, and inclusive rulemaking for global AI safety. (WFEO, Global Engineering Community)</ListItem>
                  <ListItem><Link href="https://terryneumann.github.io/publications/" isExternal color="blue.500"><b>PRISM: A Design Framework for Open-Source Foundation Model Safety</b></Link> – A modular framework emphasizing privacy, robustness, and decentralized safety design for foundation models, intended to scale with open-source deployment. (Terrence Neumann, Bryan Jones - Link to author page)</ListItem>
                  <ListItem><Link href="https://arxiv.org/abs/2412.06483" isExternal color="blue.500"><b>SafeWorld: Geo-Diverse Safety Alignment Benchmark</b></Link> – Benchmarks LLMs on cultural and legal alignment using safety evaluations drawn from 50 countries and 493 regional contexts. (Da Yin, Haoyi Qiu, Kung-Hsiang Huang, Kai-Wei Chang, Nanyun Peng)</ListItem>
                </UnorderedList>
                <Heading as="h4" size="sm" mt={4}>Safety Proposals & Policy Initiatives</Heading>
                <Text as="i" color="gray.600" mb={2}>
                  While technical tools and datasets are essential, AI safety also requires legal protections, institutional incentives, and multilateral coordination. This section compiles forward-looking policy proposals and legal frameworks that advocate for more inclusive, enforceable, and equitable AI safety governance. It includes both governmental initiatives and civil society-driven calls for change.
                </Text>
                <UnorderedList spacing={2}>
                  <ListItem><Link href="https://encodeai.org/wp-content/uploads/2025/01/Encode-Justice-Report_Safety-Summit_Global-North.pdf" isExternal color="blue.500"><b>Encode Justice "Bridging the AI Governance Divide"</b></Link> – Policy recommendations for inclusive global AI governance.</ListItem>
                  <ListItem><Link href="https://knightcolumbia.org/content/experimental-publics-democracy-and-the-role-of-publics-in-genai-evaluation" isExternal color="blue.500"><b>Knight Institute "Safe Harbor for AI Red Teaming"</b></Link> – Proposal for legal protections for AI red teaming research. (Related Paper)</ListItem>
                  <ListItem><Link href="https://fas.org/publication/safe-harbor-for-ai-researchers/" isExternal color="blue.500"><b>FAS "Safe Harbor for AI Researchers" Letter</b></Link> – Advocacy for safe harbor protections and bug bounty programs for AI.</ListItem>
                  <ListItem><Link href="https://gpai.ai/projects/responsible-ai/" isExternal color="blue.500"><b>Global Partnership on AI "Responsible AI" Recommendations</b></Link> – Multi-stakeholder guidelines for responsible AI practices globally. (GPAI)</ListItem>
                  <ListItem><Link href="https://far.ai/events/idais" isExternal color="blue.500"><b>FAR AI "International Dialogue on AI Safety"</b></Link> – Global convening of experts to build cooperative AI safety norms and global public infrastructure for risk mitigation.</ListItem>
                  <ListItem><Link href="https://arxiv.org/abs/2412.12108" isExternal color="blue.500"><b>Responsible AI Coalition "Response to the UN Interim Report on AI Governance"</b></Link> – Policy recommendations advocating for binding global norms, transparency, and inclusive governance. (Paper)</ListItem>
                  <ListItem><Link href="https://www.researchgate.net/publication/381666948_Affirmative_safety_An_approach_to_risk_management_for_high-risk_AI" isExternal color="blue.500"><b>"Affirmative Safety: Risk Management for High-Risk AI"</b></Link> – Proposal requiring affirmative evidence of safety before releasing high-risk AI systems. (Paper)</ListItem>
                  <ListItem><Link href="https://www.brookings.edu/articles/integrating-caribbean-realities-into-global-ai-safety-policies/" isExternal color="blue.500"><b>Brookings "Integrating Caribbean Realities into Global AI Safety Policies"</b></Link> – Argument for incorporating Caribbean regional perspectives into global AI governance agendas.</ListItem>
                  <ListItem><Link href="https://www.nsf.gov/focus-areas/artificial-intelligence/nairr" isExternal color="blue.500"><b>National Science Foundation "National Artificial Intelligence Research Resource (NAIRR) Pilot"</b></Link> – A U.S. initiative providing researchers and educators with access to computational, data, and training resources to advance AI research and education. The pilot aims to democratize AI research by offering resources through collaborations with federal agencies and non-governmental partners.</ListItem>
                </UnorderedList>
                <Heading as="h4" size="sm" mt={4}>Organizations & Initiatives</Heading>
                <Text as="i" color="gray.600" mb={2}>
                  This section maps the communities and institutions working to democratize AI safety. These organizations build capacity, shape narratives, and challenge exclusionary practices in global AI development. Whether through advocacy, education, or independent research, they help redistribute power and expertise in AI governance—particularly in regions historically underrepresented in tech policymaking.
                </Text>
                <UnorderedList spacing={2}>
                  <ListItem><Link href="https://www.encodejustice.org/" isExternal color="blue.500"><b>Encode Justice</b></Link> – Youth-led global coalition advocating inclusive and ethical AI policies.</ListItem>
                  <ListItem><Link href="https://www.masakhane.io/" isExternal color="blue.500"><b>Masakhane</b></Link> – African community fostering NLP research and datasets for diverse African languages.</ListItem>
                  <ListItem><Link href="https://www.dair-institute.org/" isExternal color="blue.500"><b>Distributed AI Research Institute (DAIR)</b></Link> – Independent institute focusing on AI's societal impacts and marginalized communities.</ListItem>
                  <ListItem><Link href="https://partnershiponai.org/" isExternal color="blue.500"><b>Partnership on AI (PAI)</b></Link> – Multistakeholder initiative developing best practices for responsible AI.</ListItem>
                  <ListItem><Link href="https://lacunafund.org/" isExternal color="blue.500"><b>Lacuna Fund</b></Link> – Funding initiative supporting open datasets creation for underrepresented languages and communities.</ListItem>
                  <ListItem><Link href="https://deeplearningindaba.com/" isExternal color="blue.500"><b>Deep Learning Indaba</b></Link> – Initiative strengthening AI research and talent development across Africa.</ListItem>
                  <ListItem><Link href="https://ai-inclusive.org/" isExternal color="blue.500"><b>AI Inclusive</b></Link> – Global community working to increase participation of underrepresented groups in AI through events, mentorship, and local chapters worldwide.</ListItem>
                  <ListItem><Link href="https://partnershiponai.org/global-task-force-for-inclusive-ai/" isExternal color="blue.500"><b>Global Task Force for Inclusive AI</b></Link> – Multistakeholder working group developing standards and practices to center Global Majority communities in AI system design and deployment. (Part of PAI)</ListItem>
                  <ListItem><Link href="https://www.theinclusiveai.org/" isExternal color="blue.500"><b>Inclusive AI Foundation</b></Link> – Nonprofit advancing education and consulting around ethical AI, with a focus on marginalized and underrepresented populations in the Global South.</ListItem>
                  <ListItem><Link href="https://data.org/initiatives/challenges/artificial-intelligence-to-accelerate-inclusion-challenge/" isExternal color="blue.500"><b>AI and Inclusion</b></Link> – Collaborative research and storytelling initiative exploring how AI can amplify social justice, particularly in Latin America and other underrepresented regions. (Data.org Challenge)</ListItem>
                  <ListItem><Link href="https://www.ajl.org/" isExternal color="blue.500"><b>Algorithmic Justice League (AJL)</b></Link> – Advocacy group founded by Joy Buolamwini using art, research, and policy to expose algorithmic harms, with emphasis on racial justice and global equity.</ListItem>
                  <ListItem><Link href="https://blackinai.github.io/" isExternal color="blue.500"><b>Black in AI</b></Link> – Global network that promotes the inclusion of Black researchers in AI through community building, mentorship, and equitable research publishing.</ListItem>
                  <ListItem><Link href="https://www.dair-institute.org/" isExternal color="blue.500"><b>Distributed AI Research Institute (DAIR)</b></Link> – Independent research institute led by Timnit Gebru conducting AI research rooted in the lived experiences of communities most impacted by algorithmic harm. (Duplicate entry, linked above)</ListItem>
                  <ListItem><Link href="https://arxiv.org/abs/2303.08177" isExternal color="blue.500"><b>Equitable AI Research Roundtable (EARR)</b></Link> – Coalition creating participatory frameworks and equity-centered methods for community engagement in AI governance, especially in Global South regions. (Paper)</ListItem>
                  <ListItem><Link href="https://www.unesco.org/en/artificial-intelligence/inclusion" isExternal color="blue.500"><b>UNESCO "AI & Inclusion"</b></Link> – Global policy initiative promoting equitable access to AI systems and ensuring that digital transformation supports education, cultural diversity, and Global Majority empowerment.</ListItem>
                </UnorderedList>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading as="h3" size="md">References</Heading>
                <UnorderedList spacing={2}>
                  <ListItem>Adams, R. (2024, December 17). AI is bad news for the Global Majority. <i>Foreign Policy</i>. <Link href="https://foreignpolicy.com/2024/12/17/ai-global-south-inequality/" isExternal color="blue.500">https://foreignpolicy.com/2024/12/17/ai-global-south-inequality/</Link></ListItem>
                  <ListItem>Akgul, O., Eghtesad, T., Elazari, A., Gnawali, O., Grossklags, J., Mazurek, M. L., Votipka, D., & Laszka, A. (2023). Bug hunters' perspectives on the challenges and benefits of the bug bounty ecosystem. <i>Proceedings of the 32nd USENIX Security Symposium</i>, 1–18. <Link href="https://www.usenix.org/conference/usenixsecurity23/presentation/akgul" isExternal color="blue.500">https://www.usenix.org/conference/usenixsecurity23/presentation/akgul</Link></ListItem>
                  <ListItem>Belli, L., & Gaspar, W. B. (Eds.). (2024). AI from the Global Majority: Official outcome of the UN IGF Data and Artificial Intelligence Governance Coalition. <i>FGV Direito Rio</i>. <Link href="https://direitorio.fgv.br/en/publication/ai-global-majority" isExternal color="blue.500">https://direitorio.fgv.br/en/publication/ai-global-majority</Link></ListItem>
                  <ListItem>Eke, D. O., Wakunuma, K., & Akintoye, S. (Eds.). (2023). Responsible AI in Africa: Challenges and opportunities. <i>Palgrave Macmillan</i>. <Link href="https://doi.org/10.1007/978-3-031-08215-3" isExternal color="blue.500">https://doi.org/10.1007/978-3-031-08215-3</Link></ListItem>
                  <ListItem>FAS (Federation of American Scientists). (2025, March 24). Securing American AI Leadership: A Strategic Action Plan for Innovation, Adoption, and Trust. <Link href="https://fas.org/publication/rfi-development-of-artificial-intelligence-ai-action-plan/" isExternal color="blue.500">https://fas.org/publication/rfi-development-of-artificial-intelligence-ai-action-plan/</Link></ListItem>
                  <ListItem>Fort, K. (2024). The role of AI safety institutes in contributing to international standards for frontier AI safety. <i>arXiv preprint arXiv:2409.11314</i>. <Link href="https://arxiv.org/abs/2409.11314" isExternal color="blue.500">https://arxiv.org/abs/2409.11314</Link></ListItem>
                  <ListItem>Hamill-Stewart, C. (2024, September 18). The 'missed opportunity' with AI's linguistic diversity gap. <i>World Economic Forum Agenda</i>. <Link href="https://www.weforum.org/stories/2024/09/ai-linguistic-diversity-gap-missed-opportunity/" isExternal color="blue.500">https://www.weforum.org/stories/2024/09/ai-linguistic-diversity-gap-missed-opportunity/</Link></ListItem>
                  <ListItem>Knight First Amendment Institute. (2024). A safe harbor for AI evaluation and red teaming. <Link href="https://knightcolumbia.org/blog/a-safe-harbor-for-ai-evaluation-and-red-teaming" isExternal color="blue.500">https://knightcolumbia.org/blog/a-safe-harbor-for-ai-evaluation-and-red-teaming</Link></ListItem>
                  <ListItem>Le Scao, T., Fan, A., Akiki, C., Pavlick, E., Ilić, S., Hesslow, D., Castagné, R., Luccioni, A. S., Yvon, F., Gallé, M., et al. (2022). BLOOM: A 176B-Parameter Open-Access Multilingual Language Model. <i>arXiv</i>. <Link href="https://arxiv.org/abs/2211.05100v" isExternal color="blue.500">https://arxiv.org/abs/2211.05100v</Link></ListItem>
                  <ListItem>Longpre, S., Kapoor, S., Klyman, K., et al. (2024). A safe harbor for AI evaluation and red teaming. <i>arXiv preprint arXiv:2403.00090</i>. <Link href="https://doi.org/10.48550/arXiv.2403.00090" isExternal color="blue.500">https://doi.org/10.48550/arXiv.2403.00090</Link></ListItem>
                  <ListItem>Manvi, R., Khanna, S., Burke, M., Lobell, D., & Ermon, S. (2024). Large language models are geographically biased. <i>arXiv preprint arXiv:2402.02680</i>. <Link href="https://arxiv.org/abs/2402.02680" isExternal color="blue.500">https://arxiv.org/abs/2402.02680</Link></ListItem>
                  <ListItem>Meta AI. (2024, February 26). MART: Improving LLM safety with multi-round automatic red teaming. <i>Meta AI</i>. <Link href="https://ai.meta.com/research/publications/mart-improving-llm-safety-with-multi-round-automatic-red-teaming/" isExternal color="blue.500">https://ai.meta.com/research/publications/mart-improving-llm-safety-with-multi-round-automatic-red-teaming/</Link></ListItem>
                  <ListItem>Naha, A. (2023, August 9). Anthropic's comprehensive approach to red teaming AI models. <i>LinkedIn</i>. <Link href="https://www.linkedin.com/pulse/anthropics-comprehensive-approach-red-teaming-ai-models-ajay-naha-qk6xc" isExternal color="blue.500">https://www.linkedin.com/pulse/anthropics-comprehensive-approach-red-teaming-ai-models-ajay-naha-qk6xc</Link></ListItem>
                  <ListItem>Nugraha, T. (2025, March 4). Why is AI adoption slower in the Global South—and how can it leap forward? <i>Modern Diplomacy</i>. <Link href="https://moderndiplomacy.eu/2025/03/04/why-is-ai-adoption-slower-in-the-global-south-and-how-can-it-leap-forward/" isExternal color="blue.500">https://moderndiplomacy.eu/2025/03/04/why-is-ai-adoption-slower-in-the-global-south-and-how-can-it-leap-forward/</Link></ListItem>
                  <ListItem>OpenAI. (2023, July 6). Advancing red teaming with people and AI. <i>OpenAI</i>. <Link href="https://openai.com/index/advancing-red-teaming-with-people-and-ai/" isExternal color="blue.500">https://openai.com/index/advancing-red-teaming-with-people-and-ai/</Link></ListItem>
                  <ListItem>Organisation for Economic Co-operation and Development. (2024). Futures of Global AI Governance: Co-Creating an Approach for Transforming Economies and Societies (GSG(2024)1). <i>OECD</i>. <Link href="https://www.oecd.org/content/dam/oecd/en/about/programmes/strategic-foresight/GSG%20Background%20Note_GSG(2024)1en.pdf" isExternal color="blue.500">https://www.oecd.org/content/dam/oecd/en/about/programmes/strategic-foresight/GSG%20Background%20Note_GSG(2024)1en.pdf</Link></ListItem>
                  <ListItem>PricewaterhouseCoopers. (2017). Sizing the prize: What's the real value of AI for your business and how can you capitalise? <i>PwC</i>. <Link href="https://www.pwc.com/gx/en/issues/analytics/assets/pwc-ai-analysis-sizing-the-prize-report.pdf" isExternal color="blue.500">https://www.pwc.com/gx/en/issues/analytics/assets/pwc-ai-analysis-sizing-the-prize-report.pdf</Link></ListItem>
                  <ListItem>Png, M.-T. (2022). At the tensions of South and North: Critical roles of Global Majority stakeholders in AI governance. <i>Proceedings of the 2022 ACM Conference on Fairness, Accountability, and Transparency (FAccT '22)</i>, 1–12. <Link href="https://doi.org/10.1145/3531146.3533200" isExternal color="blue.500">https://doi.org/10.1145/3531146.3533200</Link></ListItem>
                  <ListItem>Sample, I. (2024, March 21). AI skin cancer diagnoses risk being less accurate for dark skin, study finds. <i>The Guardian</i>. <Link href="https://www.theguardian.com/society/2024/mar/21/ai-skin-cancer-diagnoses-risk-being-less-accurate-for-dark-skin-study-finds" isExternal color="blue.500">https://www.theguardian.com/society/2024/mar/21/ai-skin-cancer-diagnoses-risk-being-less-accurate-for-dark-skin-study-finds</Link></ListItem>
                  <ListItem>Storchan, V., Kumar, R., Chowdhury, R., Goldfarb-Tarrant, S., & Cattell, S. (2024). Generative AI red teaming challenge: Transparency report 2024. <i>Humane Intelligence/SeedAI/AI Village</i>. <Link href="https://www.humane-intelligence.org/grt" isExternal color="blue.500">https://www.humane-intelligence.org/grt</Link></ListItem>
                  <ListItem>Sugow, A., Zalo, M., & Rutenberg, I. (2021). Appraising the impact of Kenya's cyber-harassment law on the freedom of expression. <i>Journal of Intellectual Property and Information Technology Law (JIPIT)</i>, 1(1), 91–114. <Link href="https://www.ajol.info/index.php/jipit/article/view/233034/220116" isExternal color="blue.500">https://www.ajol.info/index.php/jipit/article/view/233034/220116</Link></ListItem>
                  <ListItem>Venkit, P. N. (2024, October 7). Non-Western cultures misrepresented, harmed by generative AI, researchers say. <i>Penn State College of Information Sciences and Technology</i>. <Link href="https://ist.psu.edu/about/news/venkit-aies-social-harms" isExternal color="blue.500">https://ist.psu.edu/about/news/venkit-aies-social-harms</Link></ListItem>
                </UnorderedList>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default TabContent;


