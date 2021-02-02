// Store USGS earthquake API endpoint into variable
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Perform the GET request 
d3.json(queryUrl, function(data) {
    // send the data.features object to the createFeatures function
    var earthquakeData = data.features;
    console.log(earthquakeData);

    d3.json(platesUrl, function(data) {
        var platesData = data.features;
        console.log(platesData);

        createMap(earthquakeData, platesData);
    });
});

function createMap(earthquakeData, platesData) {

    // Create the quake layer using pointToLayer
    quakesLayer = L.geoJSON(earthquakeData, {
        pointToLayer: function(quake, location) {
            return L.circleMarker(location);
        },
        style: markerOptions,
        onEachFeature: function(quake, layer) {
            layer.bindPopup("<h3>" + quake.properties.place +
            "</h3>" + new Date(quake.properties.time) + 
            "<br>Magnitude: " + quake.properties.mag + 
            "<br>Depth (km): " + quake.geometry.coordinates[2])
        } 
    });

    // Create functions for marker size and color
    function markerSize(magnitude) {
        return Math.pow(magnitude, 1.8)
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
    function markerOptions(quake) {
        markerStyle = {
            radius: markerSize(quake.properties.mag),
            color: markerColor(quake.geometry.coordinates[2]),
        };
        return markerStyle;
    };

    function makePlates(feature, layer) {
        L.polyline(feature.geometry.coordinates);
    }

    // Create the plates layer
    var platesLayer = L.geoJSON(platesData, {
        onEachFeature: makePlates, 
            style: {
                color: 'yellow', 
            }
    });


    // Define the tile layers to be used as base maps
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });
    
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Define a baseMaps object
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap,
        "Light Map": lightmap,
    };

    // Create overlay object 
    var overlayMaps = {
        Earthquakes: quakesLayer,
        "Tectonic Plate Boundaries": platesLayer,
    };

    var myMap = L.map("map", {
        center: [18.07, -23.15],
        zoom: 3,
        layers: [darkmap, quakesLayer, platesLayer]
    });

    // Create a layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}