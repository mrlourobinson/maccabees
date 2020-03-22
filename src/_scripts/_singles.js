import * as d3 from "d3";
import albums from "../_data/albums";


    var margin = {top: 20, right: 20, bottom: 20, left: 40};

    var container = d3.select('#albums');
    var containerWidth = container.node().offsetWidth;
    var containerHeight = containerWidth * 0.66;
    var chartWidth = containerWidth - margin.left - margin.right;
    var chartHeight = containerHeight - margin.top - margin.bottom;

    var svg = container.append('svg')
                    .attr('width', containerWidth)
                    .attr('height', containerHeight)
                    .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // define the x scale (horizontal)
    var mindate = new Date(2007,0,1),
    maxdate = new Date(2015,12,31);

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");
    albums.forEach(function(d) {
        d.date = parseTime(d.date);
    });

    var yDomain = [0, 25];

    var xScale = d3.scaleTime().domain(d3.extent(albums, function(d) { return d.date; }))
    .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
    .domain(yDomain)
    .range([chartHeight, 0]);

    var xAxis = d3.axisBottom(xScale);

    var yAxis = d3.axisLeft(yScale)
    .tickSize(-chartWidth)
    .ticks(4);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

    svg.selectAll("circle")   
    .data(albums)
    .enter()
    .append("circle")
    .attr("class","dot")
      .attr("cx", function(d) {
        return xScale(d.date);
      })
      .attr("cy", function(d) {
        return yScale(d.UKChartPosition) - 3;
      })
      .attr("r", function(d) {
        return d.WeeksinCharts;
      });

    