import * as d3 from "d3";
import prices from "../_data/houseprices";

if(d3.select('#house').empty() == false) {

    var margin = {top: 20, right: 20, bottom: 20, left: 40};

    var container = d3.select('#house');
    var containerWidth = container.node().offsetWidth / 3;
    var containerHeight = containerWidth * 0.33;
    var chartWidth = containerWidth - margin.left - margin.right;
    var chartHeight = containerHeight - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%Y");
    prices.forEach(function(d) {
        d.year = parseTime(d.year);
    });

    var x = d3.scaleTime().range([0, chartWidth]);
    var y = d3.scaleLinear().rangeRound([chartHeight, 0]);

    var cleaned_data = d3.nest()
            .key(function(d) {
                return d.area
            })
            .entries(prices);

            console.log(cleaned_data)

        }


        for (var i = 0; i < cleaned_data.length; i++) {


            var data = cleaned_data[i].values
            var area_name = data[0].area;
            console.log(data[0].area)

            var svg = d3.select("#house")
                .append("svg")
                .attr("id", area_name)
                .style("height", chartHeight + margin.top + margin.bottom)
                .style("width", chartWidth + margin.left + margin.right);

            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            console.log(data);

            var dates = data.length;
            var barWidth = chartWidth / dates;

            console.log(dates)

            var min = 0;
            var max = Math.ceil(1500000);

            x.domain([new Date("1995"), new Date("2016")]);
            y.domain([min, max]);

            // g.selectAll(".bar")
            //   .data(data)
            //   .enter().append("rect")
            //     .attr("class", "bar")
            //     .attr("x", function(d) { return x(d.date); })
            //     .attr("y", function(d) { return y(d.data_bar); })
            //     .attr("width", barWidth)
            //     .attr("height", function(d) { return height - y(d.data_bar); });


            var line = d3.line()
                .x(function(d) {
                    return x(d.year);
                })
                .y(function(d) {
                    return y(d.value);
                });

            g.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "#1e497d")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 2)
                .attr("d", line);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + chartHeight + ")")
                .call(d3.axisBottom(x)
                    .ticks(3));


            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y)
                    .ticks(3)
                    .tickFormat(d3.format(".2s")));

            // g.append("g")    
            //   .append("text")
            //     .attr("class","unit")
            //     .attr("y", -17)
            //     .attr("x", -15)
            //     .attr("dy", "0.71em")
            //     .attr("text-anchor", "end")
            //     .text("£");

            g.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr("class", "text")
                .attr("x", function(d) {
                    return 10;
                })
                .attr("y", function(d) {
                    return 5;
                })
                .text(area_name);

 
       };