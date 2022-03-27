// Accessing the airport GeoJSON URL
let torontoData = "torontoRoutes.json";

console.log("-------------------------------------------")


// Grabbing our GeoJSON data.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
})

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Light: light,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [dark]
})


// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    color: "lightyellow",
    weight: 2,
    onEachFeature: function(feature, layer) {
      console.log(feature.properties.airline)
      console.log("-------------------------------------------")
      layer.bindPopup("<h2> Airport Code: " + feature.properties.airline + "</h2> <hr> <h2> Destination: " + feature.properties.dst + "</h2>")
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