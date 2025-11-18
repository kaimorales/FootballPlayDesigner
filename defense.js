// Defensive coverage schemes and zone definitions

const DefensiveFormations = {
    
    cover1: {
        name: "Cover 1 (Man Free)",
        players: [
            // 4 DL - positioned to match OL gaps
            { x: 0.366, y: 0.45, label: 'DE', type: 'DL' },
            { x: 0.456, y: 0.45, label: 'DT', type: 'DL' },
            { x: 0.544, y: 0.45, label: 'DT', type: 'DL' },
            { x: 0.634, y: 0.45, label: 'DE', type: 'DL' },
            // 3 LB
            { x: 0.40, y: 0.34, label: 'LB', type: 'LB' },
            { x: 0.50, y: 0.34, label: 'MLB', type: 'LB' },
            { x: 0.60, y: 0.34, label: 'LB', type: 'LB' },
            // 2 CB (man)
            { x: 0.13, y: 0.40, label: 'CB', type: 'DB' },
            { x: 0.87, y: 0.40, label: 'CB', type: 'DB' },
            // 1 FS (deep center)
            { x: 0.50, y: 0.20, label: 'FS', type: 'DB' },
            // 1 SS (man)
            { x: 0.27, y: 0.40, label: 'SS', type: 'DB' }
        ],
        zones: [
            { type: 'circle', centerX: 0.50, centerY: 0.20, radius: 0.12, color: 'rgba(220, 20, 60, 0.25)', label: 'FS Deep' }
        ]
    },

    cover2: {
        name: "Cover 2 (Zone)",
        players: [
            // 4 DL - positioned to match OL gaps
            { x: 0.366, y: 0.45, label: 'DE', type: 'DL' },
            { x: 0.456, y: 0.45, label: 'DT', type: 'DL' },
            { x: 0.544, y: 0.45, label: 'DT', type: 'DL' },
            { x: 0.634, y: 0.45, label: 'DE', type: 'DL' },
            // 3 LB
            { x: 0.40, y: 0.34, label: 'LB', type: 'LB' },
            { x: 0.50, y: 0.34, label: 'MLB', type: 'LB' },
            { x: 0.60, y: 0.34, label: 'LB', type: 'LB' },
            // 2 CB (flats)
            { x: 0.10, y: 0.42, label: 'CB', type: 'DB' },
            { x: 0.90, y: 0.42, label: 'CB', type: 'DB' },
            // 2 S (deep halves)
            { x: 0.30, y: 0.20, label: 'FS', type: 'DB' },
            { x: 0.70, y: 0.20, label: 'SS', type: 'DB' }
        ],
        zones: [
            // Two deep halves
            { type: 'circle', centerX: 0.30, centerY: 0.20, radius: 0.10, color: 'rgba(220, 20, 60, 0.3)', label: 'Deep Half' },
            { type: 'circle', centerX: 0.70, centerY: 0.20, radius: 0.10, color: 'rgba(220, 20, 60, 0.3)', label: 'Deep Half' },
            // Underneath zones
            { type: 'circle', centerX: 0.10, centerY: 0.42, radius: 0.06, color: 'rgba(178, 34, 34, 0.25)', label: 'Flat' },
            { type: 'circle', centerX: 0.90, centerY: 0.42, radius: 0.06, color: 'rgba(178, 34, 34, 0.25)', label: 'Flat' },
            { type: 'circle', centerX: 0.40, centerY: 0.34, radius: 0.07, color: 'rgba(205, 92, 92, 0.25)', label: 'Hook' },
            { type: 'circle', centerX: 0.60, centerY: 0.34, radius: 0.07, color: 'rgba(205, 92, 92, 0.25)', label: 'Hook' },
            { type: 'circle', centerX: 0.50, centerY: 0.34, radius: 0.07, color: 'rgba(240, 128, 128, 0.25)', label: 'Mid' }
        ]
    },

    cover3: {
        name: "Cover 3 (Zone)",
        players: [
            // 4 DL - positioned to match OL gaps
            { x: 0.366, y: 0.45, label: 'DE', type: 'DL' },
            { x: 0.456, y: 0.45, label: 'DT', type: 'DL' },
            { x: 0.544, y: 0.45, label: 'DT', type: 'DL' },
            { x: 0.634, y: 0.45, label: 'DE', type: 'DL' },
            // 3 LB
            { x: 0.40, y: 0.34, label: 'LB', type: 'LB' },
            { x: 0.60, y: 0.34, label: 'MLB', type: 'LB' },
            { x: 0.75, y: 0.40, label: 'LB', type: 'LB' },
            // 2 CB (deep thirds)
            { x: 0.17, y: 0.25, label: 'CB', type: 'DB' },
            { x: 0.83, y: 0.25, label: 'CB', type: 'DB' },
            // 1 FS (deep middle third)
            { x: 0.50, y: 0.20, label: 'FS', type: 'DB' },
            // 1 SS (curl/flat)
            { x: 0.25, y: 0.40, label: 'SS', type: 'DB' }
        ],
        zones: [
            // Three deep thirds
            { type: 'circle', centerX: 0.17, centerY: 0.22, radius: 0.09, color: 'rgba(220, 20, 60, 0.3)', label: 'Deep 1/3' },
            { type: 'circle', centerX: 0.50, centerY: 0.20, radius: 0.10, color: 'rgba(220, 20, 60, 0.3)', label: 'Deep 1/3' },
            { type: 'circle', centerX: 0.83, centerY: 0.22, radius: 0.09, color: 'rgba(220, 20, 60, 0.3)', label: 'Deep 1/3' },
            // Four underneath zones
            { type: 'circle', centerX: 0.25, centerY: 0.40, radius: 0.06, color: 'rgba(178, 34, 34, 0.25)', label: 'Flat' },
            { type: 'circle', centerX: 0.75, centerY: 0.40, radius: 0.06, color: 'rgba(178, 34, 34, 0.25)', label: 'Flat' },
            { type: 'circle', centerX: 0.40, centerY: 0.34, radius: 0.08, color: 'rgba(205, 92, 92, 0.25)', label: 'Curl' },
            { type: 'circle', centerX: 0.60, centerY: 0.34, radius: 0.08, color: 'rgba(205, 92, 92, 0.25)', label: 'Curl' }
        ]
    },
};

// Get defensive formation by coverage type
function getDefensiveFormation(coverageType) {
    return DefensiveFormations[coverageType] || null;
}
