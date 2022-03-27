// Accessing the airport GeoJSON URL
let torontoData = "torontoNeighborhoods.json";

console.log("-------------------------------------------")


// Grabbing our GeoJSON data.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
})

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Streets: streets,
  Satellite: satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 10,
  layers: [streets]
})


// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    weight: 1,
    fillColor: "lightyellow",
    onEachFeature: function(feature, layer) {
      console.log(feature)
      layer.bindPopup("<h2> Neighbourhood: " + feature.properties.AREA_NAME + "</h2>")
    }
  }).addTo(map);
  });


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
/*
L.geoJSON(sanFranAirport, {
  pointToLayer: function(feature, latlng) {
    console.log(feature)
    return L.marker(latlng)
    .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
  }
}).addTo(map)
*/