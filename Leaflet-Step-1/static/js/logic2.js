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
    return Math.pow(magnitude, 1.8)
    // return magnitude * 2.5
}

function markerColor(depth) {
    var color;
    if (depth < 5) {
        color = "#7eff38";
    }
    else if (depth >= 5 && depth <20) {
        color = "#f9ff52";
    }
    else if (depth >= 20 && depth <50) {
        color = "#f5932a";
    }
    else if (depth >= 50) {
        color = "#f51911";
    }
    return (color)
}

// Get the data from the queryUrl
d3.json(queryUrl, function(data) {
    var earthquakes = data.features;
    var updateTime = data.metadata.generated;
    console.log(earthquakes);
    console.log(updateTime);

    // Loop through the quakes and create a marker sized on magnitude and colored on depth
    earthquakes.forEach(function(quake) {
        if (quake.properties.mag < 2) {
            L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
                radius: markerSize(quake.properties.mag),
                color: markerColor(quake.geometry.coordinates[2]),
            }).bindPopup("<h3>" + quake.properties.place +
            "</h3>" + new Date(quake.properties.time) + 
            "<br>Magnitude: " + quake.properties.mag + 
            "<br>Depth (km): " + quake.geometry.coordinates[2]).addTo(myMap);
        }
        else if (quake.properties.mag < 4) {
            L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
                radius: markerSize(quake.properties.mag),
                color: markerColor(quake.geometry.coordinates[2]),
            }).bindPopup("<h3>" + quake.properties.place +
            "</h3>" + new Date(quake.properties.time) + 
            "<br>Magnitude: " + quake.properties.mag + 
            "<br>Depth (km): " + quake.geometry.coordinates[2]).addTo(myMap);
        }
        else if (quake.properties.mag < 5) {
            L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
                radius: markerSize(quake.properties.mag),
                color: markerColor(quake.geometry.coordinates[2]),
            }).bindPopup("<h3>" + quake.properties.place +
            "</h3>" + new Date(quake.properties.time) + 
            "<br>Magnitude: " + quake.properties.mag + 
            "<br>Depth (km): " + quake.geometry.coordinates[2]).addTo(myMap);
        }
        else if (quake.properties.mag >= 5 ) {
            L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
                radius: markerSize(quake.properties.mag),
                color: markerColor(quake.geometry.coordinates[2]),
            }).bindPopup("<h3>" + quake.properties.place +
            "</h3>" + new Date(quake.properties.time) + 
            "<br>Magnitude: " + quake.properties.mag + 
            "<br>Depth (km): " + quake.geometry.coordinates[2]).addTo(myMap);
        }
    });
});

// Build the legend
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h3>Depth (km):</h4>";
    div.innerHTML += '<i style="background: #7eff38"></i><span>0 to 5</span><br>';
    div.innerHTML += '<i style="background: #f9ff52"></i><span>5 to 20</span><br>';
    div.innerHTML += '<i style="background: #f5932a"></i><span>20 to 50</span><br>';
    div.innerHTML += '<i style="background: #f51911"></i><span>50+</span><br>';
    div.innerHTML += "Circle size indicates <br>magnitude";
    return div;
};

legend.addTo(myMap);