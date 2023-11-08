//import { popup } from "leaflet";
import { fetchData } from "./meteo.js";
// Initializes map, sets initial coordinates and zoom level
const map = new L.map('map').setView([47, 1.5], 5);

// // Sets map data source and associates with map
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map); 


// Basemap1
var basemap1 = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");

// Basemap2
var basemap2 = L.tileLayer("http://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png");

// Add marker layers to the map
map.addLayer(basemap1);

// Add controls to the map
L.control.layers({
	"Map 1": basemap1,
  "Map 2": basemap2
}).addTo(map);


// Add marker on click
let loc, accuracy;
map.on('click', function(e) {
    if (accuracy){accuracy = NaN}
    loc = e.latlng;
    newLocation(loc);
});

//Create a new marker
let marker, circle, zoomed;
function newMarker(loc){
// Removes any existing marker and circle
    if (marker) {map.removeLayer(marker)};
    if (circle) {map.removeLayer(circle)};
// Adds marker to the map and a circle for accuracy
    marker = L.marker(loc).addTo(map);
    if (accuracy) {circle = L.circle(loc, { radius: accuracy }).addTo(map)};
// Set zoom to boundaries of accuracy circle
    if (!zoomed && circle) {zoomed = map.fitBounds(circle.getBounds())}
    else {zoomed = map.setView(loc,12)};
// Set map focus to current user position    
    map.setView(loc);
};

// Geolocation
const lc = L.control.locate({
    strings: {title: "Rechercher ma position"},
    locateOptions: {enableHighAccuracy: true},
    flyTo: true,
}).addTo(map);

//If found, create marker and fetch data
map.on('locationfound', function(e){
    accuracy = e.accuracy;
    newLocation(e.latlng);
    lc.stop();
});

map.on('locationerror', function(e){
    alert("La géolocalisation n'est pas autorisée.");
});

//Geocoding
const geocoder = L.Control.Geocoder.nominatim();
const geocoderControl = new L.Control.geocoder({
    geocoder: geocoder,
    defaultMarkGeocode: false,
    //expand : "touch",
    position: "topleft",
    placeholder: "Rechercher une adresse...",
    errorMessage: "Adresse introuvable",
    //showResultIcons: true,
    suggestMinLength: 3,
    suggestTimeout: 250,
    queryMinLength: 1,
}).addTo(map);

geocoderControl.on('markgeocode', function(e){
    if(accuracy){accuracy=null};
    const lat = e.geocode.center.lat
    const lng = e.geocode.center.lng
    const loc =  {lat, lng}
    newLocation(loc);
});

//Reverse geocoding, fetch city name
async function reverseGeocoding(loc){
    //https://nominatim.org/release-docs/develop/api/Reverse/
    const ZOOM = 13;
    const reverse_url = "https://nominatim.openstreetmap.org/reverse?format=json&lat="+ loc.lat + "&lon="+ loc.lng + "&zoom=" + ZOOM + "&addressdetails=1";
    const reverse_response = await fetch(reverse_url);
    const reverse_data = await reverse_response.json();
    const city_key = Object.keys(reverse_data.address)[0];
    const city = reverse_data["address"][city_key];
    const postcode = Object(reverse_data.address.postcode);
    editTitle(city, postcode);
};

function editTitle(city, postcode){
    document.getElementById('h1').innerHTML= `Prévisions météo - ` + city + ` (` + postcode + `)`;
};

function newLocation(loc){
    newMarker(loc);
    reverseGeocoding(loc);
    //refresh_frame(loc, city);
    fetchData(loc);
};