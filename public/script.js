// Define Helper Functions
function getRiskColor(risk) {
    switch(risk.toLowerCase()) {
        case 'low':
            return '#4CAF50';
        case 'low/medium':
            return '#8BC34A';
        case 'medium':
            return '#FFC107';
        case 'medium/high':
            return '#FF9800';
        case 'high':
            return '#F44336';
        default:
            return '#9E9E9E';
    }
}

function getTypeColor(type) {
    switch(type.toLowerCase()) {
        case 'oss tool':
            return '#4CAF50';
        case 'conference':
            return '#2196F3';
        case 'research hub':
            return '#9C27B0';
        case 'bug bounty':
            return '#F44336';
        default:
            return '#757575';
    }
}

function getFundingRadius(amount) {
    if (!amount) return 8;
    return Math.min(20, Math.max(8, Math.log(amount) / Math.log(10)));
}

function getFundingColor(type) {
    switch(type.toLowerCase()) {
        case 'govt funding':
            return '#4CAF50';
        case 'vc investment':
            return '#2196F3';
        case 'philanthropic source':
            return '#9C27B0';
        case 'philanthropic grant':
            return '#E91E63';
        default:
            return '#757575';
    }
}

// Layer Creation Functions
window.createInstituteMarkers = function() {
    const instituteIcon = L.divIcon({
        className: 'institute-marker',
        html: '<div style="background-color: #4a90e2; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; justify-content: center; align-items: center;"><span style="color: white; font-size: 14px;">🏛️</span></div>',
        iconSize: [24, 24]
    });

    institutesData.forEach(institute => {
        const marker = L.marker([institute.latitude, institute.longitude], { icon: instituteIcon });
        const popupContent = `
            <strong>${institute.name}</strong><br>
            Type: ${institute.type}<br>
            Location: ${institute.location_primary}<br>
            ${institute.location_secondary ? `Secondary Location: ${institute.location_secondary}<br>` : ''}
            ${institute.notes ? `Notes: ${institute.notes}` : ''}
        `;
        marker.bindPopup(popupContent);
        window.institutesLayer.addLayer(marker);
    });
};

window.createRedTeamingHeatmap = function() {
    const points = redTeamingData.map(item => [item.latitude, item.longitude, 1]);
    
    const heatmap = L.heatLayer(points, {
        radius: 35,
        blur: 20,
        maxZoom: 10,
        gradient: {0.4: '#00008B', 0.6: '#0000FF', 0.7: '#4169E1', 0.8: '#1E90FF', 1.0: '#87CEEB'}
    });

    redTeamingData.forEach(point => {
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
            Location: ${point.location}<br>
            ${point.url ? `<a href="${point.url}" target="_blank">Resource Link</a><br>` : ''}
            ${point.notes ? `Notes: ${point.notes}` : ''}
        `;
        
        marker.bindPopup(popupContent);
        window.redTeamingLayer.addLayer(marker);
    });

    window.redTeamingLayer.addLayer(heatmap);
};

window.createBarriersOverlay = function() {
    barriersData.forEach(region => {
        let bounds;
        switch(region.region_code) {
            case "USA":
                bounds = [[49.384358, -124.848974], [24.396308, -66.934570]];
                break;
            case "EU":
                bounds = [[70.0, -25.0], [35.0, 45.0]];
                break;
            case "GBR":
                bounds = [[58.6350, -8.1896], [50.0834, 1.7627]];
                break;
            case "CAN":
                bounds = [[83.110626, -141.002655], [41.675105, -52.619991]];
                break;
            case "CHN":
                bounds = [[53.55, 73.55], [15.75, 134.77]];
                break;
            case "JPN":
                bounds = [[45.5231, 122.9340], [24.0490, 145.9189]];
                break;
            case "SGP":
                bounds = [[1.4504, 103.6020], [1.1496, 104.0945]];
                break;
            case "IND":
                bounds = [[35.6745, 68.1113], [6.5546, 97.3959]];
                break;
            case "BRA":
                bounds = [[5.2842, -74.0195], [-33.7683, -34.7299]];
                break;
            case "ZAF":
                bounds = [[-22.1259, 16.3449], [-34.8351, 32.8931]];
                break;
            case "SSA":
                bounds = [[14.7302, -17.5205], [-34.8351, 51.4175]];
                break;
            case "LATAM":
                bounds = [[32.7187, -117.1269], [-55.9798, -34.7299]];
                break;
            default:
                return;
        }

        if (bounds) {
            const rectangle = L.rectangle(bounds, {
                color: getRiskColor(region.legal_risk),
                weight: 1,
                fillOpacity: 0.4
            });
            
            const popupContent = `
                <strong>${region.region_name}</strong><br>
                Legal Risk: ${region.legal_risk}<br>
                Legal Notes: ${region.legal_notes}<br>
                Resource Access: ${region.resource_access}<br>
                Resource Notes: ${region.resource_notes}
            `;
            
            rectangle.bindPopup(popupContent);
            window.barriersLayer.addLayer(rectangle);
        }
    });
};

window.createFundingHeatmap = function() {
    fundingData.forEach(fund => {
        const marker = L.circleMarker([fund.latitude, fund.longitude], {
            radius: getFundingRadius(fund.amount_usd),
            fillColor: getFundingColor(fund.type),
            color: '#fff',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.8
        });

        const popupContent = `
            <strong>${fund.name}</strong><br>
            Type: ${fund.type}<br>
            ${fund.amount_usd ? `Amount: $${(fund.amount_usd / 1000000).toFixed(2)}M<br>` : ''}
            ${fund.date ? `Date: ${fund.date}<br>` : ''}
            ${fund.location ? `Location: ${fund.location}<br>` : ''}
            ${fund.notes ? `Notes: ${fund.notes}` : ''}
        `;
        
        marker.bindPopup(popupContent);
        window.fundingLayer.addLayer(marker);
    });

    const points = fundingData
        .filter(fund => fund.amount_usd)
        .map(fund => [
            fund.latitude,
            fund.longitude,
            Math.log(fund.amount_usd) / Math.log(10)
        ]);

    if (points.length > 0) {
        const heatmap = L.heatLayer(points, {
            radius: 40,
            blur: 30,
            maxZoom: 10,
            max: 9,
            gradient: {0.4: '#90EE90', 0.6: '#32CD32', 0.7: '#228B22', 0.8: '#006400', 1.0: '#004D00'}
        });

        window.fundingLayer.addLayer(heatmap);
    }
}; 