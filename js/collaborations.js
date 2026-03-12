document.addEventListener('DOMContentLoaded', () => {
    // Determine the base path so we can load the JSON properly whether local or on GH Pages
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    let basePath = '/';
    if (window.location.pathname.includes('stegala.github.io')) {
        basePath = '/stegala.github.io/';
    }

    // Initialize the map
    const map = L.map('collaborations-map').setView([47.0, 8.0], 4); // Centered roughly on Europe

    // Add OpenStreetMap tiles
    // We can use standard OSM, or CartoDB Positron for a cleaner look
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Fetch collaboration data dynamically
    fetch(`${basePath}js/collaborations-data.json`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                // Ensure required fields exist
                if (item.coordinates && item.coordinates.length === 2) {
                    // Create marker
                    const marker = L.marker(item.coordinates).addTo(map);
                    
                    // Build popup content
                    let collaboratorsHtml = item.collaborators.map(c => `<li>${c}</li>`).join('');
                    
                    let popupContent = `
                        <h4 class="popup-title">${item.institution}</h4>
                        <div class="popup-location">${item.location}</div>
                        <strong>Co-authors:</strong>
                        <ul class="collaborator-list">
                            ${collaboratorsHtml}
                        </ul>
                    `;

                    marker.bindPopup(popupContent, { maxWidth: 300 });
                }
            });
        })
        .catch(err => console.error("Error loading collaborations data:", err));
});
