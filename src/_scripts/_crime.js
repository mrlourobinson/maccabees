import * as d3 from "d3";
import crime from "../_data/crime";
import mapData from "../_data/LondonBoroughs";

if(d3.select('#crime').empty() == false) {
    console.log("Mapping")
    console.log(d3.mouse[1])
    var margin = {top: 20, right: 20, bottom: 20, left: 40};

    var container = d3.select('#crime');
    var containerWidth = container.node().offsetWidth;
    var containerHeight = containerWidth * 0.66;
    var chartWidth = containerWidth - margin.left - margin.right;
    var chartHeight = containerHeight - margin.top - margin.bottom;


    //Define map projection 
    var projection = d3.geoMercator();
    projection.center([-0.10, 51.5171])
        .scale(48000)
        .translate([chartWidth / 2, chartHeight / 2.3]);
    //Define path generator
    var path = d3.geoPath()
        .projection(projection);
    // Set svg width & height
    var svg = container.append('svg')
                    .attr('width', containerWidth)
                    .attr('height', containerHeight)
                    .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    // Add background
    svg.append("rect")
        .attr("class", "background")
        .attr("width", chartWidth)
        .attr("height", chartWidth);
    var g = svg.append("g");
    var mapLayer = g.append("g")
        .classed("map-layer", true);

    var features = mapData.features;
    // Set initial min and max for scale
    var min = d3.min(d3.values(crime));
    var max = d3.max(d3.values(crime));
    // Define color scale
    var colour = d3.scaleLinear()
    .domain([0, 60000])
    .range([d3.rgb("#5eff00"), d3.rgb("#005eff")]);
// combined json and csv file
var combined = [];
for (var i = 0; i < features.length; i++) {
    for (var j = 0; j < crime.length; j++) {
        if (features[i].properties.Name == crime[j].Boroughs) {
            let merged = { ...features[i],
                ...crime[j]
            }
            combined.push(merged)
        }
    }
}

function findMax(cat) {
    var temp_max = 0;
    for (var i = 0; i < crime.length; i++) {
        if (crime[i][cat] > temp_max) {
            temp_max = crime[i][cat];
        }
        console.log(temp_max);
        return temp_max;
    }
};

// Set initial min and max for scale
var min = d3.min(0);
var max = d3.max(1000000);
var selected = "Total";

var tooltip = d3.select('#crime').append('div')
            .attr('class', 'hidden tooltip');

// Define color scale
colour = d3.scaleLinear()
    .domain([0, findMax(selected)])
    .range([d3.rgb("#D1D2D4"), d3.rgb("#382A73"), d3.rgb("#be1e2d")]);

var div = mapLayer.append("text")
    .attr("class", "chart-tooltip")
    .style("display", "none");

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

// Draw each province as a path
mapLayer.selectAll("path")
    .data(combined)
    .enter()
    .append("path")
    .attr("d", path)
       .attr('id',function(d) { 
        return d.Boroughs;
      })
    .attr("stroke", function (d) {
        return "white";
    })
    .style("fill", function (d) {
        return colour(d[selected]);
    })
    .on('mousemove', function(d) {
        var mouse = d3.mouse(svg.node()).map(function(d) {
            return parseInt(d);
        });

        var html_str = d.Boroughs + " had " + numberWithCommas(d[selected]) + " cases <br>per thousand people in 2016-17.";
         
        tooltip.classed('hidden', false)
            .attr('style', 'left:' + (mouse[0] + 15) +
                    'px; top:' + (mouse[1] - 50) + 'px')
            .html(html_str);
    })
    .on('mouseout', function() {
        tooltip.classed('hidden', true);
    });

// move to front
d3.selection.prototype.moveToFront = function() {  
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

    function mouseover() {
        div.style("display", "block");

        d3.select(this).moveToFront();
        
        var coords = d3.mouse(this);
        div
            .text(d3.event.pageX + ", " + d3.event.pageY)
            .attr("class","chart-tooltip")
            .attr("x", coords[0])
            .attr("y", coords[1]);
      }
      
      function mouseout() {
        div.style("display", "none");
      }





function updateData(newDataCat) {
selected = newDataCat
// Define color scale
colour = d3.scaleLinear()
    .domain([0, findMax(selected)])
    .range([d3.rgb("#D1D2D4"), d3.rgb("#382A73"), d3.rgb("#be1e2d")]);

mapLayer.selectAll('path')
        .data(combined)
        .transition()
        .duration(500)
        .style('fill', function(d) {
            return colour(d[selected]);
        });
    };

// handle on click event
d3.select('#search_categories')
.on('change', function() {
var newData = d3.select(this).property('value');
updateData(newData)

});











} //end