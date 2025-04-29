// Declare map variable globally
let map;

// Define Layer Groups Globally
const institutesLayer = L.layerGroup();
const redTeamingLayer = L.layerGroup();
const barriersLayer = L.layerGroup();
const fundingLayer = L.layerGroup();

// Define Helper Functions Globally
const instituteIcon = L.divIcon({
    className: 'institute-marker',
    html: '<div style="background-color: #800080; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; display: flex; justify-content: center; align-items: center;"><span style="color: white; font-size: 12px;">🏛️</span></div>',
    iconSize: [20, 20]
});

function getRiskColor(risk) {
    switch (risk.toLowerCase()) {
        case 'high': return '#FF0000';
        case 'medium': return '#FFA500';
        case 'low': return '#FFFF00';
        default: return '#808080';
    }
}

function getTypeColor(type) {
    switch (type.toLowerCase()) {
        case 'oss tool': return '#4CAF50';
        case 'conference': return '#2196F3';
        case 'research hub': return '#9C27B0';
        case 'bug bounty': return '#F44336';
        default: return '#607D8B';
    }
}

function getFundingColor(type) {
    switch (type.toLowerCase()) {
        case 'government': return '#4CAF50';
        case 'vc': return '#2196F3';
        case 'philanthropic': return '#9C27B0';
        default: return '#607D8B';
    }
}

// Define Layer Creation Functions Globally
function createInstituteMarkers() {
    console.log("Creating Layer 1 Markers...");
    if (!institutesData || !Array.isArray(institutesData)) {
        console.error("institutesData is not defined or not an array!");
        return;
    }

    institutesData.forEach(institute => {
        if (!institute.latitude || !institute.longitude) {
            console.warn(`Invalid coordinates for institute: ${institute.name}`);
            return;
        }

        const marker = L.marker([institute.latitude, institute.longitude], { icon: instituteIcon });
        const popupContent = `
            <strong>${institute.name}</strong><br>
            Type: ${institute.type}<br>
            Location: ${institute.location_primary}<br>
            ${institute.location_secondary ? `Secondary Location: ${institute.location_secondary}<br>` : ''}
            ${institute.notes ? `Notes: ${institute.notes}` : ''}
        `;
        marker.bindPopup(popupContent);
        institutesLayer.addLayer(marker);
    });
    console.log("Layer 1 created");
}

function createRedTeamingHeatmap() {
    console.log("Creating Layer 2 Heatmap...");
    if (!redTeamingData || !Array.isArray(redTeamingData)) {
        console.error("redTeamingData is not defined or not an array!");
        return;
    }

    // Filter valid points for heatmap
    const validPoints = redTeamingData.filter(point => 
        point.latitude && point.longitude && 
        !isNaN(point.latitude) && !isNaN(point.longitude)
    );

    // Create heatmap layer
    const heatmapPoints = validPoints.map(point => [
        point.latitude,
        point.longitude,
        1  // constant intensity for now
    ]);

    if (heatmapPoints.length > 0) {
        const heatmap = L.heatLayer(heatmapPoints, {
            radius: 30,
            blur: 20,
            maxZoom: 10,
            gradient: {0.4: '#ADD8E6', 0.6: '#4169E1', 0.8: '#0000CD', 1.0: '#00008B'}
        });
        redTeamingLayer.addLayer(heatmap);
    }

    // Add individual markers with popups
    validPoints.forEach(point => {
        const marker = L.circleMarker([point.latitude, point.longitude], {
            radius: 8,
            fillColor: getTypeColor(point.type),
            color: '#fff',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.8
        });

        const popupContent = `
            <strong>${point.name}</strong><br>
            Type: ${point.type}<br>
            ${point.location ? `Location: ${point.location}<br>` : ''}
            ${point.notes ? `Notes: ${point.notes}` : ''}
        `;
        
        marker.bindPopup(popupContent);
        redTeamingLayer.addLayer(marker);
    });

    console.log(`Layer 2 created with ${validPoints.length} points`);
}

function createBarriersOverlay() {
    console.log("Creating Layer 3 Overlays...");
    if (!barriersData || !Array.isArray(barriersData)) {
        console.error("barriersData is not defined or not an array!");
        return;
    }

    const regionBounds = {
        'USA': [[24.396308, -125.000000], [49.384358, -66.934570]],
        'EU': [[35.000000, -10.000000], [71.000000, 40.000000]],
        'GBR': [[49.000000, -8.000000], [61.000000, 2.000000]],
        'CAN': [[41.676556, -141.001944], [83.110626, -52.636291]],
        'CHN': [[18.000000, 73.000000], [53.550000, 135.000000]],
        'JPN': [[24.000000, 123.000000], [45.000000, 146.000000]],
        'SGP': [[1.130000, 103.600000], [1.470000, 104.100000]],
        'IND': [[8.000000, 68.000000], [37.000000, 97.000000]],
        'BRA': [[-33.000000, -74.000000], [5.000000, -34.000000]],
        'ZAF': [[-35.000000, 16.000000], [-22.000000, 33.000000]],
        'SSA': [[-35.000000, -17.000000], [37.000000, 51.000000]],
        'LATAM': [[-56.000000, -117.000000], [32.000000, -34.000000]]
    };

    barriersData.forEach(region => {
        if (!regionBounds[region.region_code]) {
            console.warn(`No bounds defined for region: ${region.region_code}`);
            return;
        }

        const bounds = regionBounds[region.region_code];
        const rectangle = L.rectangle(bounds, {
            color: getRiskColor(region.legal_risk),
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.35
        });

        const popupContent = `
            <strong>${region.region_name}</strong><br>
            Legal Risk: ${region.legal_risk}<br>
            Resource Access: ${region.resource_access}<br>
            ${region.notes ? `Notes: ${region.notes}` : ''}
        `;

        rectangle.bindPopup(popupContent);
        barriersLayer.addLayer(rectangle);
    });

    console.log("Layer 3 created");
}

function createFundingHeatmap() {
    console.log("Creating Layer 4 Heatmap...");
    if (!fundingData || !Array.isArray(fundingData)) {
        console.error("fundingData is not defined or not an array!");
        return;
    }

    // Filter valid points and create heatmap
    const validPoints = fundingData.filter(point => 
        point.latitude && point.longitude && 
        !isNaN(point.latitude) && !isNaN(point.longitude) &&
        point.amount && !isNaN(point.amount)
    );

    const heatmapPoints = validPoints.map(point => [
        point.latitude,
        point.longitude,
        Math.log10(point.amount) // Use log scale for better visualization
    ]);

    if (heatmapPoints.length > 0) {
        const heatmap = L.heatLayer(heatmapPoints, {
            radius: 35,
            blur: 25,
            maxZoom: 10,
            gradient: {0.4: '#90EE90', 0.6: '#32CD32', 0.8: '#228B22', 1.0: '#006400'}
        });
        fundingLayer.addLayer(heatmap);
    }

    // Add markers with popups
    validPoints.forEach(point => {
        const radius = Math.max(6, Math.min(15, Math.log10(point.amount) * 2));
        const marker = L.circleMarker([point.latitude, point.longitude], {
            radius: radius,
            fillColor: getFundingColor(point.type),
            color: '#fff',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.8
        });

        const formattedAmount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(point.amount);

        const popupContent = `
            <strong>${point.name}</strong><br>
            Type: ${point.type}<br>
            Amount: ${formattedAmount}<br>
            ${point.date ? `Date: ${point.date}<br>` : ''}
            ${point.notes ? `Notes: ${point.notes}` : ''}
        `;
        
        marker.bindPopup(popupContent);
        fundingLayer.addLayer(marker);
    });

    console.log(`Layer 4 created with ${validPoints.length} points`);
}

// Main Execution within DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded. Initializing map...");

    try {
        // Initialize the map
        map = L.map('map', {
            center: [20, 0],
            zoom: 2,
            minZoom: 2,
            maxZoom: 10
        });
        
        // Add the tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Create all layers
        createInstituteMarkers();
        createRedTeamingHeatmap();
        createBarriersOverlay();
        createFundingHeatmap();

        // Define overlay maps
        const overlayMaps = {
            "AI Safety Institutes": institutesLayer,
            "Red Teaming Resources": redTeamingLayer,
            "Barriers to Participation": barriersLayer,
            "Funding & Investment": fundingLayer
        };

        // Add layer control
        L.control.layers(null, overlayMaps, {
            collapsed: false,
            position: 'topright'
        }).addTo(map);

        // Add all layers to map by default
        institutesLayer.addTo(map);
        redTeamingLayer.addTo(map);
        barriersLayer.addTo(map);
        fundingLayer.addTo(map);

        console.log("Map initialization complete");
    } catch (error) {
        console.error("Error initializing map:", error);
    }
}); 