// AI Safety Institutes Data
const institutesData = [
    {
        "name": "UK AI Safety Institute (AISI)",
        "type": "National Institute",
        "location_primary": "UK",
        "location_secondary": "USA (San Francisco office)",
        "latitude": 51.5074,
        "longitude": -0.1278,
        "notes": "Also operates an office in SF. Part of the international network."
    },
    {
        "name": "US AI Safety Institute (US AISI)",
        "type": "National Institute",
        "location_primary": "USA",
        "latitude": 38.9072,
        "longitude": -77.0369,
        "notes": "Part of NIST. Coordinates US AISIC. Part of the international network."
    },
    {
        "name": "European AI Office",
        "type": "Supranational Body",
        "location_primary": "Belgium (Brussels)",
        "latitude": 50.8503,
        "longitude": 4.3517,
        "notes": "Part of European Commission, oversees AI Act. Represents EU in the international network."
    },
    {
        "name": "Canada AI Safety Institute Canada",
        "type": "National Institute",
        "location_primary": "Canada",
        "latitude": 45.4215,
        "longitude": -75.6972,
        "notes": "Part of the international network."
    },
    {
        "name": "Japan AI Safety Institute",
        "type": "National Institute",
        "location_primary": "Japan",
        "latitude": 35.6895,
        "longitude": 139.6917,
        "notes": "Part of the international network."
    },
    {
        "name": "Singapore AI Safety Institute",
        "type": "National Institute",
        "location_primary": "Singapore",
        "latitude": 1.3521,
        "longitude": 103.8198,
        "notes": "Part of IMDA. Part of the international network."
    },
    {
        "name": "South Korea AI Safety Institute",
        "type": "National Institute",
        "location_primary": "South Korea",
        "latitude": 37.5665,
        "longitude": 126.9780,
        "notes": "Part of the international network."
    },
    {
        "name": "France AI Safety Effort",
        "type": "National Initiative",
        "location_primary": "France",
        "latitude": 48.8566,
        "longitude": 2.3522,
        "notes": "Participant in international AISI network agreement."
    },
    {
        "name": "Germany AI Safety Effort",
        "type": "National Initiative",
        "location_primary": "Germany",
        "latitude": 52.5200,
        "longitude": 13.4050,
        "notes": "Participant in international AISI network agreement."
    },
    {
        "name": "Italy AI Safety Effort",
        "type": "National Initiative",
        "location_primary": "Italy",
        "latitude": 41.9028,
        "longitude": 12.4964,
        "notes": "Participant in international AISI network agreement."
    },
    {
        "name": "Australia AI Safety Effort",
        "type": "National Initiative",
        "location_primary": "Australia",
        "latitude": -35.2809,
        "longitude": 149.1300,
        "notes": "Participant in international AISI network agreement."
    },
    {
        "name": "India AI Safety & Ethics Consultation",
        "type": "National Initiative",
        "location_primary": "India",
        "latitude": 28.6139,
        "longitude": 77.2090,
        "notes": "MeitY consulting with UNESCO on AI Readiness Assessment Methodology."
    }
];

// Red Teaming Resources Data
const redTeamingData = [
    // Open Source Tools
    {"name": "Garak (NVIDIA)", "type": "OSS Tool", "latitude": 37.3861, "longitude": -121.9655, "url": "https://github.com/nvidia/Garak"},
    {"name": "PyRIT (Microsoft)", "type": "OSS Tool", "latitude": 47.6396, "longitude": -122.1283, "url": "https://github.com/Azure/PyRIT"},
    {"name": "AI Fairness 360 (IBM)", "type": "OSS Tool", "latitude": 41.1496, "longitude": -73.7893, "url": "https://github.com/Trusted-AI/AIF360"},
    {"name": "ART (IBM)", "type": "OSS Tool", "latitude": 41.1496, "longitude": -73.7893, "url": "https://github.com/Trusted-AI/adversarial-robustness-toolbox"},
    {"name": "Counterfit (Microsoft)", "type": "OSS Tool", "latitude": 47.6396, "longitude": -122.1283, "url": "https://github.com/Azure/counterfit"},
    {"name": "CleverHans", "type": "OSS Tool", "latitude": 38.9072, "longitude": -77.0369, "notes": "Academic origins, widely used"},
    
    // Conferences
    {"name": "AI Safety Summit 2023", "type": "Conference", "latitude": 51.9447, "longitude": -0.8009, "location": "Bletchley Park, UK"},
    {"name": "AI Safety Summit 2024", "type": "Conference", "latitude": 37.5665, "longitude": 126.9780, "location": "Seoul, South Korea"},
    {"name": "AI Safety Summit 2025", "type": "Conference", "latitude": 48.8566, "longitude": 2.3522, "location": "France"},
    {"name": "SecurityWeek AI Risk Summit 2025", "type": "Conference", "latitude": 37.4636, "longitude": -122.4286, "location": "Half Moon Bay, CA, USA"},
    
    // Research Hubs
    {"name": "Stanford HAI", "type": "Research Hub", "latitude": 37.4275, "longitude": -122.1697, "location": "Stanford, CA, USA"},
    {"name": "Berkeley AI Research (BAIR)", "type": "Research Hub", "latitude": 37.8719, "longitude": -122.2585, "location": "Berkeley, CA, USA"},
    {"name": "MIT CSAIL", "type": "Research Hub", "latitude": 42.3601, "longitude": -71.0942, "location": "Cambridge, MA, USA"},
    {"name": "Oxford Internet Institute / Future of Humanity Institute", "type": "Research Hub", "latitude": 51.7520, "longitude": -1.2577, "location": "Oxford, UK"},
    {"name": "Vector Institute", "type": "Research Hub", "latitude": 43.6532, "longitude": -79.3832, "location": "Toronto, Canada"},
    
    // Bug Bounty Programs
    {"name": "Google AI Bug Bounty", "type": "Bug Bounty", "latitude": 37.4220, "longitude": -122.0841, "location": "Mountain View, CA, USA"},
    {"name": "Microsoft AI Bug Bounty", "type": "Bug Bounty", "latitude": 47.6396, "longitude": -122.1283, "location": "Redmond, WA, USA"},
    {"name": "OpenAI Bug Bounty", "type": "Bug Bounty", "latitude": 37.7749, "longitude": -122.4194, "location": "San Francisco, CA, USA"},
    {"name": "Meta AI Bug Bounty", "type": "Bug Bounty", "latitude": 37.4848, "longitude": -122.1484, "location": "Menlo Park, CA, USA"},
    {"name": "NeurIPS", "type": "Conference", "latitude": 43.6532, "longitude": -79.3832, "location": "Example: Toronto", "notes": "Major AI conf with safety tracks"},
    {"name": "ICML", "type": "Conference", "latitude": 48.1351, "longitude": 11.5820, "location": "Example: Munich", "notes": "Major AI conf with safety tracks"},
    {"name": "FAccT", "type": "Conference", "latitude": -33.8688, "longitude": 151.2093, "location": "Example: Sydney", "notes": "Focus on Fairness, Accountability, Transparency"}
];

// Barriers to Participation Data
const barriersData = [
    {
        "region_code": "USA",
        "region_name": "United States",
        "legal_risk": "Medium",
        "legal_notes": "CFAA narrowed by Van Buren & DOJ policy, but state laws vary. ToS restrictions common. Lack of specific AI safe harbor.",
        "resource_access": "High",
        "resource_notes": "High concentration of compute, data, talent, and funding. Costs can be high."
    },
    {
        "region_code": "EU",
        "region_name": "European Union",
        "legal_risk": "Medium",
        "legal_notes": "AI Act provides framework, GDPR impacts data use. Specific safe harbors for adversarial research still developing.",
        "resource_access": "High",
        "resource_notes": "Strong infrastructure and research networks in core countries (DE, FR, NL etc.). Data regs require care."
    },
    {
        "region_code": "GBR",
        "region_name": "United Kingdom",
        "legal_risk": "Medium",
        "legal_notes": "Active policy focus on AI safety, but specific legal safe harbors for research still debated. Post-Brexit regs differ from EU.",
        "resource_access": "High",
        "resource_notes": "Strong research base and govt initiatives (AISI). Access to EU data pools changed post-Brexit."
    },
    {
        "region_code": "CAN",
        "region_name": "Canada",
        "legal_risk": "Low/Medium",
        "legal_notes": "Generally research-friendly environment, active in global AI policy discussions. Specific AI research laws less developed.",
        "resource_access": "High",
        "resource_notes": "Strong AI research hubs (Toronto, Montreal, Edmonton). Good infrastructure."
    },
    {
        "region_code": "CHN",
        "region_name": "China",
        "legal_risk": "High",
        "legal_notes": "Extensive AI regulations focusing on state control, content, algorithms. Legal environment complex for independent external research.",
        "resource_access": "High",
        "resource_notes": "Massive data generation, significant govt/industry investment in AI infra and talent."
    },
    {
        "region_code": "JPN",
        "region_name": "Japan",
        "legal_risk": "Low/Medium",
        "legal_notes": "Active AI strategy, generally stable legal environment. Focus on human-centric AI. Specific research protections less emphasized than in US/EU debates.",
        "resource_access": "High",
        "resource_notes": "Technologically advanced, strong industrial AI focus. Data privacy laws in place."
    },
    {
        "region_code": "SGP",
        "region_name": "Singapore",
        "legal_risk": "Low/Medium",
        "legal_notes": "Proactive govt approach (AISI, FEAT principles). Clear regulations often favor industry growth and pragmatic governance.",
        "resource_access": "Very High",
        "resource_notes": "Leading data/infra hub (per Oxford Insights). Strong govt support."
    },
    {
        "region_code": "IND",
        "region_name": "India",
        "legal_risk": "Medium/High",
        "legal_notes": "Developing AI strategy and regulations (e.g., Digital India Act). Legal landscape evolving rapidly, some uncertainty for researchers.",
        "resource_access": "Medium",
        "resource_notes": "Large talent pool, growing digital infra, but compute access/cost and data quality/access can be barriers."
    },
    {
        "region_code": "BRA",
        "region_name": "Brazil",
        "legal_risk": "Medium",
        "legal_notes": "Active legislative debate on AI regulation (influenced by EU AI Act). Data protection law (LGPD) in place. Legal clarity for research evolving.",
        "resource_access": "Medium",
        "resource_notes": "Major LATAM economy, growing tech sector but infrastructure/cost barriers exist compared to Global North."
    },
    {
        "region_code": "ZAF",
        "region_name": "South Africa",
        "legal_risk": "Medium/Unclear",
        "legal_notes": "Data protection law (POPIA) similar to GDPR. Specific AI policy/regulation less developed. Legal environment for research relatively stable but lacks specific safe harbors.",
        "resource_access": "Medium",
        "resource_notes": "Most developed tech hub in Sub-Saharan Africa, but faces infrastructure challenges (e.g., power stability) and higher compute costs."
    },
    {
        "region_code": "SSA",
        "region_name": "Sub-Saharan Africa (General)",
        "legal_risk": "Medium/High",
        "legal_notes": "Legal frameworks often underdeveloped or not specific to AI/cyber research. Lack of established safe harbors.",
        "resource_access": "Low",
        "resource_notes": "Significant digital divide, compute/data/infrastructure access are major challenges. Exceptions in hubs like ZA, KE, NG, RW."
    },
    {
        "region_code": "LATAM",
        "region_name": "Latin America (General)",
        "legal_risk": "Medium",
        "legal_notes": "Active regional cooperation (Montevideo Decl.). National laws emerging (Peru, Brazil, Chile, etc.). Data protection laws common. Research environment varies by country.",
        "resource_access": "Low/Medium",
        "resource_notes": "Growing tech adoption but infrastructure, funding, and compute access lag behind Global North."
    }
];

// Funding & Investment Data
const fundingData = [
    // Government Funding
    {"name": "US NSF AI Safety Funding", "type": "Govt Funding", "latitude": 38.9072, "longitude": -77.0369, "notes": "e.g., Safe Learning-Enabled Systems"},
    {"name": "EU AI Act Funding/Programs", "type": "Govt Funding", "latitude": 50.8503, "longitude": 4.3517, "notes": "Associated R&D funding"},
    {"name": "UK National AI Strategy Funding", "type": "Govt Funding", "latitude": 51.5074, "longitude": -0.1278},
    {"name": "Canada Pan-Canadian AI Strategy Funding", "type": "Govt Funding", "latitude": 45.4215, "longitude": -75.6972},
    {"name": "France National Strategy on AI Funding", "type": "Govt Funding", "latitude": 48.8566, "longitude": 2.3522},
    {"name": "Germany National AI Strategy Funding", "type": "Govt Funding", "latitude": 52.5200, "longitude": 13.4050},
    {"name": "Japan AI Strategy Funding", "type": "Govt Funding", "latitude": 35.6895, "longitude": 139.6917},
    {"name": "South Korea National Strategy for AI Funding", "type": "Govt Funding", "latitude": 37.5665, "longitude": 126.9780},
    
    // VC Investment Examples
    {"name": "Lambda Labs", "type": "VC Investment", "latitude": 37.7749, "longitude": -122.4194, "amount_usd": 480000000, "date": "Feb 2025"},
    {"name": "Baseten", "type": "VC Investment", "latitude": 37.7749, "longitude": -122.4194, "amount_usd": 75000000, "date": "Feb 2025"},
    {"name": "Liquid AI", "type": "VC Investment", "latitude": 42.3601, "longitude": -71.0942, "amount_usd": 250000000, "date": "Dec 2024"},
    {"name": "SplxAI", "type": "VC Investment", "latitude": 52.2297, "longitude": 21.0122, "amount_eur": 6500000, "date": "Mar 2025"},
    {"name": "Qraft Technologies", "type": "VC Investment", "latitude": 37.5665, "longitude": 126.9780, "amount_usd": 146000000, "date": "Jan 2025"},
    {"name": "Augury", "type": "VC Investment", "latitude": 32.0853, "longitude": 34.7818, "amount_usd": 75000000, "date": "Feb 2025"},
    
    // Philanthropic Funding
    {"name": "Schmidt Sciences AI Safety Program", "type": "Philanthropic Source", "latitude": 40.7128, "longitude": -74.0060, "notes": "Global grants, HQ NYC"},
    {"name": "Open Philanthropy AI Safety Funding", "type": "Philanthropic Source", "latitude": 37.7749, "longitude": -122.4194, "notes": "Major funder, HQ SF"},
    {"name": "Future of Life Institute Grants", "type": "Philanthropic Source", "latitude": 42.3736, "longitude": -71.1097, "notes": "HQ Cambridge MA"},
    {"name": "CZI Grant for Diverse Datasets", "type": "Philanthropic Grant", "latitude": null, "longitude": null, "amount_usd": 1900000, "notes": "Research in USA/Africa/Caribbean"}
]; 

// Example usage
fetchGeoJSONData()
    .then(data => {
        console.log('GeoJSON data loaded, features count:', data.features.length);
        updateMap(data);
    }); 