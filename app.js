// Main application code
class FootballPlayDesigner {
    constructor() {
        this.canvas = document.getElementById('football-field');
        this.ctx = this.canvas.getContext('2d');
        
        // Canvas dimensions
        this.canvas.width = 900;
        this.canvas.height = 600;
        
        // Field dimensions
        this.fieldWidth = this.canvas.width;
        this.fieldHeight = this.canvas.height;
        
        // State
        this.offensePlayers = [];
        this.defensePlayers = [];
        this.routes = [];
        this.currentRoute = null;
        this.selectedPlayer = null;
        this.isDragging = false;
        this.draggedPlayer = null;
        this.selectedRouteType = 'custom';
        this.currentDefense = null;
        this.showZones = true;
        this.history = [];
        this.moveMode = false;
        
        // Initialize
        this.setupEventListeners();
        this.draw();
    }

    setupEventListeners() {
        // Personnel and formation
        document.getElementById('load-offense-btn').addEventListener('click', () => {
            const personnel = document.getElementById('personnel-select').value;
            this.loadOffense(personnel);
        });

        // Defense
        document.getElementById('load-defense-btn').addEventListener('click', () => {
            const defense = document.getElementById('defense-select').value;
            if (defense) {
                this.loadDefense(defense);
            }
        });

        document.getElementById('show-zones-toggle').addEventListener('change', (e) => {
            this.showZones = e.target.checked;
            this.draw();
        });

        // Route selection
        document.querySelectorAll('.route-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.route-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedRouteType = e.target.dataset.route;
            });
        });

        // Canvas interactions
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));

        // Toolbar buttons
        document.getElementById('clear-routes-btn').addEventListener('click', () => {
            this.routes = [];
            this.currentRoute = null;
            this.draw();
        });

        document.getElementById('clear-all-btn').addEventListener('click', () => {
            this.offensePlayers = [];
            this.defensePlayers = [];
            this.routes = [];
            this.currentRoute = null;
            this.currentDefense = null;
            this.draw();
        });

        document.getElementById('undo-btn').addEventListener('click', () => {
            if (this.routes.length > 0) {
                this.routes.pop();
                this.draw();
            }
        });

        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportAsPNG();
        });

        // Save/Load
        document.getElementById('save-play-btn').addEventListener('click', () => {
            this.savePlay();
        });

        this.loadSavedPlays();
    }

    loadOffense(personnel) {
        this.offensePlayers = this.generateOffense(personnel);
        this.routes = [];
        this.currentRoute = null;
        this.draw();
    }

    generateOffense(personnel) {
        const players = [];
        const centerX = this.fieldWidth / 2;
        const losY = this.fieldHeight * 0.5; // Line of scrimmage
        
        // Offensive line (always 5) - positioned to match DL alignment
        // Using consistent spacing that aligns with typical DL gaps
        const olSpacing = 40; // Increased spacing to match DL positioning
        players.push(
            { x: centerX - olSpacing * 2, y: losY, label: 'LT', position: 'OL', radius: 15 },
            { x: centerX - olSpacing, y: losY, label: 'LG', position: 'OL', radius: 15 },
            { x: centerX, y: losY, label: 'C', position: 'OL', radius: 15 },
            { x: centerX + olSpacing, y: losY, label: 'RG', position: 'OL', radius: 15 },
            { x: centerX + olSpacing * 2, y: losY, label: 'RT', position: 'OL', radius: 15 }
        );

        // QB (always present)
        players.push({ x: centerX, y: losY + 40, label: 'QB', position: 'QB', radius: 18 });

        // Position players based on personnel
        switch (personnel) {
            case '11': // 1 RB, 1 TE, 3 WR
                players.push({ x: centerX - 30, y: losY + 40, label: 'RB', position: 'RB', radius: 16 });
                players.push({ x: centerX + olSpacing * 2 + 20, y: losY, label: 'TE', position: 'TE', radius: 16 });
                players.push({ x: centerX - 200, y: losY, label: 'WR', position: 'WR', radius: 16 });
                players.push({ x: centerX - 100, y: losY, label: 'WR', position: 'WR', radius: 16 });
                players.push({ x: centerX + 200, y: losY, label: 'WR', position: 'WR', radius: 16 });
                break;
            
            case '12': // 1 RB, 2 TE, 2 WR
                players.push({ x: centerX - 30, y: losY + 40, label: 'RB', position: 'RB', radius: 16 });
                players.push({ x: centerX - olSpacing * 2 - 20, y: losY, label: 'TE', position: 'TE', radius: 16 });
                players.push({ x: centerX + olSpacing * 2 + 20, y: losY, label: 'TE', position: 'TE', radius: 16 });
                players.push({ x: centerX - 200, y: losY, label: 'WR', position: 'WR', radius: 16 });
                players.push({ x: centerX + 200, y: losY, label: 'WR', position: 'WR', radius: 16 });
                break;
            
            case '21': // 2 RB, 1 TE, 2 WR
                players.push({ x: centerX - 40, y: losY + 40, label: 'RB', position: 'RB', radius: 16 });
                players.push({ x: centerX + 40, y: losY + 40, label: 'RB', position: 'RB', radius: 16 });
                players.push({ x: centerX + olSpacing * 2 + 20, y: losY, label: 'TE', position: 'TE', radius: 16 });
                players.push({ x: centerX - 200, y: losY, label: 'WR', position: 'WR', radius: 16 });
                players.push({ x: centerX + 200, y: losY, label: 'WR', position: 'WR', radius: 16 });
                break;
            
            case '10': // 1 RB, 0 TE, 4 WR
                players.push({ x: centerX - 30, y: losY + 40, label: 'RB', position: 'RB', radius: 16 });
                players.push({ x: centerX - 250, y: losY, label: 'WR', position: 'WR', radius: 16 });
                players.push({ x: centerX - 150, y: losY, label: 'WR', position: 'WR', radius: 16 });
                players.push({ x: centerX + 150, y: losY, label: 'WR', position: 'WR', radius: 16 });
                players.push({ x: centerX + 250, y: losY, label: 'WR', position: 'WR', radius: 16 });
                break;
            
            case '13': // 1 RB, 3 TE, 1 WR
                players.push({ x: centerX - 30, y: losY + 40, label: 'RB', position: 'RB', radius: 16 });
                players.push({ x: centerX - olSpacing * 2 - 20, y: losY, label: 'TE', position: 'TE', radius: 16 });
                players.push({ x: centerX + olSpacing * 2 + 20, y: losY, label: 'TE', position: 'TE', radius: 16 });
                players.push({ x: centerX - olSpacing * 2 - 45, y: losY + 10, label: 'TE', position: 'TE', radius: 16 });
                players.push({ x: centerX + 200, y: losY, label: 'WR', position: 'WR', radius: 16 });
                break;
            
            case '22': // 2 RB, 2 TE, 1 WR
                players.push({ x: centerX - 40, y: losY + 40, label: 'RB', position: 'RB', radius: 16 });
                players.push({ x: centerX + 40, y: losY + 40, label: 'RB', position: 'RB', radius: 16 });
                players.push({ x: centerX - olSpacing * 2 - 20, y: losY, label: 'TE', position: 'TE', radius: 16 });
                players.push({ x: centerX + olSpacing * 2 + 20, y: losY, label: 'TE', position: 'TE', radius: 16 });
                players.push({ x: centerX + 200, y: losY, label: 'WR', position: 'WR', radius: 16 });
                break;
        }

        return players;
    }

    loadDefense(coverageType) {
        const formation = getDefensiveFormation(coverageType);
        if (!formation) return;

        this.currentDefense = coverageType;
        this.defensePlayers = formation.players.map(p => ({
            x: p.x * this.fieldWidth,
            y: p.y * this.fieldHeight,
            label: p.label,
            position: p.type,
            radius: 15
        }));

        this.draw();
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        const clickedPlayer = this.getPlayerAtPosition(x, y);
        if (!clickedPlayer) return;
    
        // If double-click → ROUTE
        if (e.detail === 2) {
            // Only offense & not OL
            const isOffense = this.offensePlayers.includes(clickedPlayer);
            const isEligible = clickedPlayer.position !== 'OL';
    
            if (isOffense && isEligible) {
                if (this.selectedRouteType !== 'custom') {
                    const routePoints = generateRoute(
                        this.selectedRouteType,
                        clickedPlayer.x,
                        clickedPlayer.y,
                        this.fieldWidth
                    );
    
                    this.routes.push({
                        player: clickedPlayer,
                        points: routePoints,
                        type: this.selectedRouteType
                    });
    
                    this.currentRoute = null;
                    this.selectedPlayer = null;
                } else {
                    this.currentRoute = {
                        player: clickedPlayer,
                        points: [{ x: clickedPlayer.x, y: clickedPlayer.y }],
                        type: 'custom'
                    };
                }
                this.draw();
                return;
            }
        }
    
        // Single-click → DRAG
        this.isDragging = true;
        this.draggedPlayer = clickedPlayer;
    }
    
    

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.isDragging && this.draggedPlayer) {
            this.draggedPlayer.x = x;
            this.draggedPlayer.y = y;
            this.draw();
        } else if (this.currentRoute) {
            // Preview custom route as mouse moves
            this.draw();
            this.ctx.strokeStyle = '#FFD700';
            this.ctx.lineWidth = 3;
            this.ctx.setLineDash([5, 5]);
            this.ctx.beginPath();
            this.ctx.moveTo(this.currentRoute.points[0].x, this.currentRoute.points[0].y);
            this.currentRoute.points.forEach(point => {
                this.ctx.lineTo(point.x, point.y);
            });
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
    }

    handleMouseUp(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.isDragging) {
            this.isDragging = false;
            this.draggedPlayer = null;
        } else if (this.currentRoute) {
            // Add point to custom route
            this.currentRoute.points.push({ x, y });
            
            // End route on double click or far from start (optional: implement double-click)
            // For now, we'll add a point each click and user can press elsewhere to end
        }

        this.draw();
    }

    getPlayerAtPosition(x, y) {
        // Check offense
        for (let player of this.offensePlayers) {
            const dist = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
            if (dist <= player.radius) {
                return player;
            }
        }
        // Check defense
        for (let player of this.defensePlayers) {
            const dist = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
            if (dist <= player.radius) {
                return player;
            }
        }
        return null;
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.fieldWidth, this.fieldHeight);

        // Draw field
        this.drawField();

        // Draw zones (if defense loaded and zones enabled)
        if (this.currentDefense && this.showZones) {
            this.drawZones();
        }

        // Draw routes
        this.drawRoutes();

        // Draw players
        this.drawPlayers();
    }

    drawField() {
        // Green background
        this.ctx.fillStyle = '#1E7A1E';
        this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);

        // Yard lines (every 5 yards - simplified)
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        
        const numLines = 10;
        for (let i = 0; i <= numLines; i++) {
            const y = (this.fieldHeight / numLines) * i;
            
            // Make line of scrimmage (middle) thicker
            if (i === Math.floor(numLines / 2)) {
                this.ctx.lineWidth = 4;
                this.ctx.strokeStyle = '#FFD700';
            } else {
                this.ctx.lineWidth = 1;
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            }
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.fieldWidth, y);
            this.ctx.stroke();
        }

        // Hash marks
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 1;
        const hashLeft = this.fieldWidth * 0.35;
        const hashRight = this.fieldWidth * 0.65;
        
        for (let i = 0; i <= numLines; i++) {
            const y = (this.fieldHeight / numLines) * i;
            // Left hash
            this.ctx.beginPath();
            this.ctx.moveTo(hashLeft - 10, y);
            this.ctx.lineTo(hashLeft + 10, y);
            this.ctx.stroke();
            // Right hash
            this.ctx.beginPath();
            this.ctx.moveTo(hashRight - 10, y);
            this.ctx.lineTo(hashRight + 10, y);
            this.ctx.stroke();
        }
    }

    drawZones() {
        const formation = getDefensiveFormation(this.currentDefense);
        if (!formation || !formation.zones) return;

        formation.zones.forEach(zone => {
            if (zone.type === 'circle') {
                // Draw circular zones
                const centerX = zone.centerX * this.fieldWidth;
                const centerY = zone.centerY * this.fieldHeight;
                const radius = zone.radius * this.fieldWidth; // Use width for consistent scaling

                this.ctx.fillStyle = zone.color;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                this.ctx.fill();

                // Draw zone label
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                this.ctx.font = 'bold 11px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(zone.label, centerX, centerY);
            } else {
                // Legacy polygon support (in case any remain)
                this.ctx.fillStyle = zone.color;
                this.ctx.beginPath();
                const firstPoint = zone.points[0];
                this.ctx.moveTo(firstPoint[0] * this.fieldWidth, firstPoint[1] * this.fieldHeight);
                
                zone.points.slice(1).forEach(point => {
                    this.ctx.lineTo(point[0] * this.fieldWidth, point[1] * this.fieldHeight);
                });
                
                this.ctx.closePath();
                this.ctx.fill();

                // Draw zone label
                const centerX = zone.points.reduce((sum, p) => sum + p[0], 0) / zone.points.length * this.fieldWidth;
                const centerY = zone.points.reduce((sum, p) => sum + p[1], 0) / zone.points.length * this.fieldHeight;
                
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                this.ctx.font = 'bold 11px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(zone.label, centerX, centerY);
            }
        });
    }

    drawPlayers() {
        // Draw offense
        this.offensePlayers.forEach(player => {
            this.ctx.fillStyle = '#4A90E2';
            this.ctx.beginPath();
            this.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.strokeStyle = '#2E5C8A';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 11px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(player.label, player.x, player.y);
        });

        // Draw defense
        this.defensePlayers.forEach(player => {
            this.ctx.fillStyle = '#E74C3C';
            this.ctx.beginPath();
            this.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.strokeStyle = '#A93226';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(player.label, player.x, player.y);
        });
    }

    drawRoutes() {
        this.routes.forEach(route => {
            if (route.points.length < 2) return;

            this.ctx.strokeStyle = '#FFD700';
            this.ctx.lineWidth = 3;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';

            this.ctx.beginPath();
            this.ctx.moveTo(route.points[0].x, route.points[0].y);
            
            route.points.slice(1).forEach(point => {
                this.ctx.lineTo(point.x, point.y);
            });
            
            this.ctx.stroke();

            // Draw arrow at end
            const lastPoint = route.points[route.points.length - 1];
            const secondLast = route.points[route.points.length - 2];
            
            const angle = Math.atan2(lastPoint.y - secondLast.y, lastPoint.x - secondLast.x);
            const arrowLength = 12;
            
            this.ctx.beginPath();
            this.ctx.moveTo(lastPoint.x, lastPoint.y);
            this.ctx.lineTo(
                lastPoint.x - arrowLength * Math.cos(angle - Math.PI / 6),
                lastPoint.y - arrowLength * Math.sin(angle - Math.PI / 6)
            );
            this.ctx.moveTo(lastPoint.x, lastPoint.y);
            this.ctx.lineTo(
                lastPoint.x - arrowLength * Math.cos(angle + Math.PI / 6),
                lastPoint.y - arrowLength * Math.sin(angle + Math.PI / 6)
            );
            this.ctx.stroke();
        });

        // Draw current route being drawn
        if (this.currentRoute && this.currentRoute.points.length > 0) {
            this.ctx.strokeStyle = '#FFD700';
            this.ctx.lineWidth = 3;
            this.ctx.setLineDash([5, 5]);
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.currentRoute.points[0].x, this.currentRoute.points[0].y);
            
            this.currentRoute.points.slice(1).forEach(point => {
                this.ctx.lineTo(point.x, point.y);
            });
            
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
    }

    savePlay() {
        const playName = document.getElementById('play-name-input').value.trim();
        if (!playName) {
            alert('Please enter a play name');
            return;
        }

        const playData = {
            name: playName,
            personnel: document.getElementById('personnel-select').value,
            offense: this.offensePlayers,
            defense: this.defensePlayers,
            routes: this.routes,
            coverage: this.currentDefense,
            timestamp: Date.now()
        };

        // Get existing plays
        let savedPlays = JSON.parse(localStorage.getItem('footballPlays') || '[]');
        
        // Add new play
        savedPlays.push(playData);
        
        // Save to localStorage
        localStorage.setItem('footballPlays', JSON.stringify(savedPlays));
        
        // Clear input
        document.getElementById('play-name-input').value = '';
        
        // Refresh list
        this.loadSavedPlays();
        
        alert('Play saved successfully!');
    }

    loadSavedPlays() {
        const savedPlays = JSON.parse(localStorage.getItem('footballPlays') || '[]');
        const listContainer = document.getElementById('saved-plays-list');
        
        if (savedPlays.length === 0) {
            listContainer.innerHTML = '<p class="empty-state">No saved plays yet</p>';
            return;
        }

        listContainer.innerHTML = '';
        
        savedPlays.forEach((play, index) => {
            const playItem = document.createElement('div');
            playItem.className = 'saved-play-item';
            
            const playName = document.createElement('span');
            playName.className = 'saved-play-name';
            playName.textContent = play.name;
            playName.addEventListener('click', () => this.loadPlay(play));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deletePlay(index);
            });
            
            playItem.appendChild(playName);
            playItem.appendChild(deleteBtn);
            listContainer.appendChild(playItem);
        });
    }

    loadPlay(playData) {
        this.offensePlayers = playData.offense;
        this.defensePlayers = playData.defense;
        this.routes = playData.routes;
        this.currentDefense = playData.coverage;
        
        // Update UI
        document.getElementById('personnel-select').value = playData.personnel;
        if (playData.coverage) {
            document.getElementById('defense-select').value = playData.coverage;
        }
        
        this.draw();
    }

    deletePlay(index) {
        if (!confirm('Are you sure you want to delete this play?')) {
            return;
        }

        let savedPlays = JSON.parse(localStorage.getItem('footballPlays') || '[]');
        savedPlays.splice(index, 1);
        localStorage.setItem('footballPlays', JSON.stringify(savedPlays));
        
        this.loadSavedPlays();
    }

    exportAsPNG() {
        // Use html2canvas to export the canvas
        const fieldContainer = document.querySelector('.field-container');
        
        html2canvas(this.canvas, {
            backgroundColor: '#1E7A1E',
            scale: 2
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'football-play.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }
}

// Add keyboard support for ending custom routes
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && app.currentRoute) {
        // End current route
        if (app.currentRoute.points.length > 1) {
            app.routes.push(app.currentRoute);
        }
        app.currentRoute = null;
        app.selectedPlayer = null;
        app.draw();
    } else if (e.key === 'Enter' && app.currentRoute) {
        // Finish route
        if (app.currentRoute.points.length > 1) {
            app.routes.push(app.currentRoute);
        }
        app.currentRoute = null;
        app.selectedPlayer = null;
        app.draw();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'f') {
        this.moveMode = !this.moveMode;
        console.log("Move Mode:", this.moveMode);
    }
});

// Initialize app
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new FootballPlayDesigner();
});
