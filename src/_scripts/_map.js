import * as L from "leaflet";
import * as d3 from "d3";
import gigs from "../_data/gigs";

if(d3.select('#map').empty() == false) {
var map = L.map('map');
var sat = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png');
sat.addTo(map);
map.setView([50, 10], 4);

gigs.forEach(gig => {
    L.circleMarker([gig.Latitude, gig.Longitude])
    .setRadius(4)
    .addTo(map)
    .bindTooltip(gig.Venue + " in " + gig.City + " on " + gig.Date);
})
}

