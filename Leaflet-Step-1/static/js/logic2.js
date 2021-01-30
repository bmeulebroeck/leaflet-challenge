// Store USGS earthquake API endpoint into variable
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the map
var myMap = L.map("map", {
    center: [18.07, -23.15],
    zoom: 3
});

// Define the tile layer for the map base
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
}).addTo(myMap);

// Create functions for marker size and color
function markerSize(magnitude) {
    return Math.pow(magnitude, 1.5)
}

// TO DO: FIGURE OUT WHAT NEEDS TO BE DONE WITH DEPTH TO MAKE IT USABLE AND CONVERT TO COLOR
function markerColor(depth) {
    return (depth)
}

// Get the data from the queryUrl
d3.json(queryUrl, function(data) {
    var earthquakes = data.features;
    console.log(earthquakes);

    // Loop through the quakes and create a marker sized on magnitude and colored on depth
    // RIGHT NOW COLORS ARE HARD-CODED - NEED TO MAKE IT DYNAMIC BASED ON DEPTH
    earthquakes.forEach(function(quake) {
        if (quake.properties.mag < 2) {
            L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
                radius: markerSize(quake.properties.mag),
                fillColor: "#7eff38",
                color: "#7eff38"
            }).bindPopup("<h3>" + quake.properties.place +
            "</h3>" + new Date(quake.properties.time) + 
            "<br>Magnitude: " + quake.properties.mag + 
            "<br>Depth: " + quake.geometry.coordinates[2]).addTo(myMap);
        }
        else if (quake.properties.mag < 4) {
            L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
                radius: markerSize(quake.properties.mag),
                fillColor: "#f9ff52",
                color: "#f9ff52"
            }).bindPopup("<h3>" + quake.properties.place +
            "</h3>" + new Date(quake.properties.time) + 
            "<br>Magnitude: " + quake.properties.mag + 
            "<br>Depth: " + quake.geometry.coordinates[2]).addTo(myMap);
        }
        else if (quake.properties.mag < 5) {
            L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
                radius: markerSize(quake.properties.mag),
                fillColor: "#f5932a",
                color: "#f5932a"
            }).bindPopup("<h3>" + quake.properties.place +
            "</h3>" + new Date(quake.properties.time) + 
            "<br>Magnitude: " + quake.properties.mag + 
            "<br>Depth: " + quake.geometry.coordinates[2]).addTo(myMap);
        }
        else if (quake.properties.mag >= 5 ) {
            L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
                radius: markerSize(quake.properties.mag),
                fillColor: "#f51911",
                color: "#f51911"
            }).bindPopup("<h3>" + quake.properties.place +
            "</h3>" + new Date(quake.properties.time) + 
            "<br>Magnitude: " + quake.properties.mag + 
            "<br>Depth: " + quake.geometry.coordinates[2]).addTo(myMap);
        }
    });
});

