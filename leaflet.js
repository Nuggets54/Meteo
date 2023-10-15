export{loc, marker};

// Initializes map
const map = L.map('map'); 

// Sets initial coordinates and zoom level
map.setView([47, 1.5], 5); 

// Sets map data source and associates with map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map); 

let marker, circle, zoomed;
let loc, accuracy;

// Add marker on click
map.on('click', function(e) {
    accuracy = NaN
    loc = e.latlng;
    newMarker(loc);
});

function newMarker(loc){
// Removes any existing marker and circle
    if (marker) {map.removeLayer(marker)};
    if (circle) {map.removeLayer(circle)};
    
// Adds marker to the map and a circle for accuracy
    marker = L.marker(loc).addTo(map);
    if (accuracy) {
        circle = L.circle(loc, { radius: accuracy }).addTo(map);  
    };
// Set zoom to boundaries of accuracy circle
    if (!zoomed && circle) {
        zoomed = map.fitBounds(circle.getBounds()); 
    };
// Set map focus to current user position    
    map.setView(loc);
};

// Geolocation
function success(pos){
    loc = [pos.coords.latitude, pos.coords.longitude];
    accuracy = pos.coords.accuracy;
    newMarker(loc)
};

function error(err) {
    if (err.code === 1) {
        alert("Merci d'autoriser la géolocalisation");
    } else {
        alert("Impossible de récupérer la localisation actuelle");
    }
};

const options = {
    enableHighAccuracy: true, 
    // Get high accuracy reading, if available (default false)
//    timeout: 5000, 
    // Time to return a position successfully before error (default infinity)
    maximumAge: 2000, 
    // Milliseconds for which it is acceptable to use cached position (default 0)
};
const buttonLocalisation = document.querySelector(".btn-localisation");
buttonLocalisation.addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(success, error, options);
});