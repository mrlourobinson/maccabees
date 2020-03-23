import * as d3 from "d3";
import albums from "../_data/albums";


    var margin = {top: 20, right: 20, bottom: 20, left: 20};

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
    var mindate = new Date(2006,11,1),
    maxdate = new Date(2016,3,31);

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");
    albums.forEach(function(d) {
        d.date = parseTime(d.date);
    });

    var yDomain = [40, 1];

    var xScale = d3.scaleTime().domain([mindate,maxdate])
    .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
    .domain(yDomain)
    .range([chartHeight, 0]);

    var xAxis = d3.axisBottom(xScale);

    var yAxis = d3.axisLeft(yScale)
    .tickSize(-chartWidth)
    .ticks(4)
    .tickValues([40,30,20,10,1]);

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

    var tooltip = svg.append('text')
    .attr('class', 'chart-tooltip');

    svg.selectAll("circle")   
    .data(albums)
    .enter()
    .append("circle")
    .attr("class","dot")
      .attr("cx", function(d) {
        return xScale(d.date);
      })
      .attr("cy", function(d) {
        return yScale(d.UKChartPosition);
      })
      .attr("r", 3)
      .on('mouseenter', function(d) {
        d3.select(this).classed('highlight', true);
        d3.select(this).attr("r",5);
        // centers the text above each bar
        var x = xScale(d.date);
        // the - 5 bumps up the text a bit so it's not directly over the bar
        var y = yScale(d.UKChartPosition) - 10;

        tooltip.text(d.Album)
            .attr('transform', `translate(${x}, ${y})`)
    })
    .on('mouseleave', function(d) {
        d3.select(this).classed('highlight', false);
        tooltip.text('');
        d3.select(this).attr("r",3);
    });

    