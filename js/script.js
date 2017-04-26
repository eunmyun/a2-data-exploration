$(function() {

    var margin = {
        top: 100,
        right: 10,
        bottom: 150,
        left: 60
    };
    var width = 960;
    var height = 600;

    var drawWidth = width - margin.left - margin.right;
    var drawHeight = height - margin.top - margin.bottom;

    var svg = d3.select('#vis')
                .append('svg')
                .style('width', width)
                .style('height', height);

    var g = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ', ' + margin.right + ')')
                .attr('width', drawWidth)
                .attr('height', drawHeight);

    
////////////////////////////////////Using Data////////////////////////////////////
    d3.csv('data/2016.csv', function(error, data) {
        var colorScale = d3.scaleOrdinal().domain(data.map(function(d) { return d.Region; })).range(d3.schemeCategory20);
        var tip = d3.tip()
                        .attr('class', 'd3-tip')
                        .html(function(d) {
                            return d.Country+"<br/>rank: "+d.happiness_rank;
                        });
        g.call(tip);
        var regions = data.map(function(d) { return d.Region; });
        uniqueRegions = regions.filter(function(d, pos) { return regions.indexOf(d) == pos; })

        // Setting x axis and values here because they do not change.
        var xMin = 0.8 * d3.min(data.map(function(d) { return d.happiness_score; }));
        var xMax = 1.1 * d3.max(data.map(function(d) { return d.happiness_score; }));
        var xScale = d3.scaleLinear()
                        .domain([xMin, xMax])
                        .range([0, drawWidth]);
        var xAxis = d3.axisBottom()
                        .scale(xScale);
        var xAxisLabel = svg.append('g')
                            .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + drawHeight) + ')')
                            .attr('class', 'axis')
                            .call(xAxis);
        var xAxisText = svg.append('text')
            .attr('transform', 'translate(' +  (drawWidth / 2) + ', ' + (margin.top + drawHeight + 50) + ')')
            .attr('class', 'axis-label')
            .text('Happiness Scores')
            .style('font-size', '15px');
         

        // Setting Y scale, Y axis, Y axis label Y axis text
        var setYScale = function(yData) {
            var yMax = 1.1 * d3.max(yData);
            yScale = d3.scaleLinear()
                        .domain([-1, yMax])
                        .range([drawHeight, 0]);
        }
        
        var setYAxis = function(val) {
            var yAxis = d3.axisLeft()
                            .scale(yScale);
            yAxisLabel.transition().duration(1500).call(yAxis);
            yAxisText.text(val + " (percentage)");
        }

        var yAxisLabel = svg.append('g')
                            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
                            .attr('class', 'axis')
        var yAxisText = svg.append('text')
                            .attr('transform', 'translate(' + (margin.left - 40) + ', ' + (margin.top + drawHeight / 2) + ') rotate(-90)')
                            .attr('class', 'axis-label')
                            .style('font-size', '15px')
        
        
        // Draw function gets called when the button select is changed
        var draw = function(val) {
            var yData;
            if (val == 'family') {
                yData = data.map(function(d) { return d.Family * 100; });
            } else if (val == 'health') {
                yData = data.map(function(d) { return d.Health * 100; });
            } else if (val == 'freedom') {
                yData = data.map(function(d) { return d.Freedom * 100; });
            } else if (val == 'trust') {
                yData = data.map(function(d) { return d.Trust * 100; });
            } else if (val == 'generosity') {
                yData = data.map(function(d) { return d.Generosity * 100; });
            } else {
                yData = data.map(function(d) { return d.Economy * 100; });
            }
            setYScale(yData);
            setYAxis(val);

            var circles = g.selectAll('circle').data(data);
            circles.enter().append('svg:circle')
                            .attr('cx', 0)
                            .attr('cy', 0)
                            .on("mouseover", tip.show)
                            .on("mouseout", tip.hide)
                            .merge(circles)
                            .transition()
                            .duration(1500)
                            .attr('r', 10)
                            .attr('fill', function(d, i) {
                                return colorScale(d.Region);
                            })
                            .attr('cy', height)
                            .style('opacity', 0.3)
                            .attr('cx', function(d) { return xScale(d.happiness_score); })
                            .attr('cy', function(d) { return yScale(d.Economy * 100) + 90; })                

            if (val == 'family') {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Family * 100) + 90; });
            } else if (val == 'health') {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Health * 100) + 90; });
            } else if (val == 'freedom') {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Freedom * 100) + 90; });
            } else if (val == 'trust') {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Trust * 100) + 90; });
            } else if (val == 'generosity') {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Generosity * 100) + 90; });
            } else {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Economy * 100) + 90; });
            }

            circles.exit().remove();

            var legend = svg.selectAll(".legend")
                            .data(uniqueRegions)
                            .enter()
                            .append("g")
                            .attr("class", "legend")
                            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                  .attr("class", "legend-rect")
                  .attr("x", width - 18)
                  .attr("width", 18)
                  .attr("height", 18)
                  .style("fill", (d) => colorScale(d))
                  .attr('opacity', '0.7')

            legend.append("text")
                  .attr("class", "legend-text")
                  .attr("x", width - 20)
                  .attr("y", 9)
                  .attr("dy", ".35em")
                  .style("text-anchor", "end")
                  .text(function(d) { return d; });
        }
         
        $("input").on('change', function() {
            var val = $(this).val();
            draw(val);                                                       
        })
        draw('economy');

        
    });

});