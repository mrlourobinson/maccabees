import * as d3 from "d3";
import singles from "../_data/singles";

if(d3.select('#singles').empty() == false) {

    var margin = {top: 20, right: 20, bottom: 20, left: 20};

    var container = d3.select('#singles');
    var containerWidth = container.node().offsetWidth;
    var containerHeight = containerWidth * 0.66;
    var chartWidth = containerWidth - margin.left - margin.right;
    var chartHeight = containerHeight - margin.top - margin.bottom;

    var svg = container.append('svg')
                    .attr('width', containerWidth)
                    .attr('height', containerHeight)
                    .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    var xDomain = singles.map(d => d.Year);

    var yDomain = [200,1];

    var xScale = d3.scaleBand()
    .domain(xDomain)
    .range([0, chartWidth])
    .padding(0.1);

    var yScale = d3.scaleLinear()
    .domain(yDomain)
    .range([chartHeight, 0]);

    var xAxis = d3.axisBottom(xScale);

    var yAxis = d3.axisLeft(yScale)
    .tickSize(-chartWidth)
    .ticks(4)
    .tickValues([200,150,100,50,1]);

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
    .data(singles)
    .enter()
    .append("circle")
    .attr("class","dot")
      .attr("cx", function(d) {
        return xScale(d.Year);
      })
      .attr("cy", function(d) {
        return yScale(d.PeakPosition);
      })
      .attr("r", 3)
      .on('mouseenter', function(d) {
        d3.select(this).classed('highlight', true);
        d3.select(this).attr("r",5);
        // centers the text above each bar
        var x = xScale(d.Year) + xScale.bandwidth() / 2;
        // the - 5 bumps up the text a bit so it's not directly over the bar
        var y = yScale(d.PeakPosition) - 10;

        tooltip.text(d.Title)
            .attr('transform', `translate(${x}, ${y})`)
    })
    .on('mouseleave', function(d) {
        d3.select(this).classed('highlight', false);
        tooltip.text('');
        d3.select(this).attr("r",3);
    });
  }