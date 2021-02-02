# leaflet-challenge

## Visualizing earthquake data from the USGS API

### Step 1: Basic Visualization
The first task was to generate a basic map of earthquakes from one of the USGS datasets. I chose to use the [Last 7 Days][usgs_7d] API endpoint which delivered world-wide earthquake data for - you guessed it - the last 7 days.

I started by using Leaflet to draw the basemap with a world-wide view and using the dark version of the map. I setup functions for markerSize and markerColor that I could call when generating the markers. I connected to the data using d3.json, and setup a loop based on magnitude that would assign the properly sized and colored marker depending on magnitude and depth.

### Step 2: More Data
The ask for step 2 was to add another layer to the map that would draw the tectonic plate boundaries in a seperate layer from the earthquakes.

I reused much of my code from step 1, but decided to try another method to draw the quake layer. I used the pointToLayer method of the geoJSON function from the leaflet documentation to generate the markers, and setup a markerOptions function that called markerSize and markerColor to dynamically generate the marker based on the data retrieved.

I also setup a new function (makePlates) to draw the plate boundaries from the reference geoJSON file.

Finally I set up a layer control in the upper right to toggle the earthquakes and tectonic plates on/off.

[usgs_7d]: <https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson>