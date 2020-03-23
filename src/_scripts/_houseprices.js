import * as d3 from "d3";
import prices from "../_data/houseprices";

console.log("test")

    var margin = {top: 20, right: 20, bottom: 20, left: 20};

    var container = d3.select('#house');
    var containerWidth = container.node().offsetWidth;
    var containerHeight = containerWidth * 0.66;
    var chartWidth = containerWidth - margin.left - margin.right;
    var chartHeight = containerHeight - margin.top - margin.bottom;

    var svg = container.append('svg')
                    .attr('width', containerWidth)
                    .attr('height', containerHeight)
                    .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // parse the date / time
    var parseTime = d3.timeParse("%Y");
    albums.forEach(function(d) {
        d.year = parseTime(d.year);
    });

    var cleaned_data = d3.nest()
            .key(function(d) {
                return d.area
            })
            .entries(prices);

            console.log(cleaned_data)

    