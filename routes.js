// Route presets and patterns
const RoutePatterns = {
    // Go route - straight vertical
    go: (startX, startY, playerSide) => {
        return [
            { x: startX, y: startY },
            { x: startX, y: startY - 150 }
        ];
    },

    // Slant - 45 degree angle toward middle
    slant: (startX, startY, playerSide) => {
        const direction = playerSide === 'left' ? 1 : -1;
        return [
            { x: startX, y: startY },
            { x: startX, y: startY - 20 },
            { x: startX + (direction * 60), y: startY - 80 }
        ];
    },

    // Post - vertical then 45 degrees to post
    post: (startX, startY, playerSide) => {
        const direction = playerSide === 'left' ? 1 : -1;
        return [
            { x: startX, y: startY },
            { x: startX, y: startY - 60 },
            { x: startX + (direction * 70), y: startY - 130 }
        ];
    },

    // Corner - vertical then 45 degrees to sideline
    corner: (startX, startY, playerSide) => {
        const direction = playerSide === 'left' ? -1 : 1;
        return [
            { x: startX, y: startY },
            { x: startX, y: startY - 60 },
            { x: startX + (direction * 70), y: startY - 130 }
        ];
    },

    // Out route - vertical then horizontal to sideline
    out: (startX, startY, playerSide) => {
        const direction = playerSide === 'left' ? -1 : 1;
        return [
            { x: startX, y: startY },
            { x: startX, y: startY - 50 },
            { x: startX + (direction * 60), y: startY - 50 }
        ];
    },

    // In route - vertical then horizontal to middle
    in: (startX, startY, playerSide) => {
        const direction = playerSide === 'left' ? 1 : -1;
        return [
            { x: startX, y: startY },
            { x: startX, y: startY - 50 },
            { x: startX + (direction * 60), y: startY - 50 }
        ];
    },

    // Drag route - horizontal across field
    drag: (startX, startY, playerSide) => {
        const direction = playerSide === 'left' ? 1 : -1;
        return [
            { x: startX, y: startY },
            { x: startX, y: startY - 10 },
            { x: startX + (direction * 100), y: startY - 10 }
        ];
    },

    // Bubble/Now screen - quick horizontal
    bubble: (startX, startY, playerSide) => {
        const direction = playerSide === 'left' ? -1 : 1;
        return [
            { x: startX, y: startY },
            { x: startX + (direction * 40), y: startY + 5 }
        ];
    }
};

// Helper function to determine which side of field player is on
function getPlayerSide(x, fieldWidth) {
    return x < fieldWidth / 2 ? 'left' : 'right';
}

// Generate route based on pattern
function generateRoute(routeType, startX, startY, fieldWidth) {
    const playerSide = getPlayerSide(startX, fieldWidth);
    
    if (RoutePatterns[routeType]) {
        return RoutePatterns[routeType](startX, startY, playerSide);
    }
    
    // Custom route returns just the start point
    return [{ x: startX, y: startY }];
}
