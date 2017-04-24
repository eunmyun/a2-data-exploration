$(function() {

    var margin = {
        top: 10,
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
        // Setting x axis and values here because they do not change.
        var xMin = d3.min(data.map(function(d) { return d.happiness_score; }));
        var xMax = d3.max(data.map(function(d) { return d.happiness_score; }));
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
            .text('Happiness Scores');
         

        // Setting Y scale, Y axis, Y axis label Y axis text
        var setYScale = function(yData) {
            var yMax = d3.max(yData);
            yScale = d3.scaleLinear()
                        .domain([0, yMax])
                        .range([drawHeight, 0]);
        }
        
        var setYAxis = function(val) {
            var yAxis = d3.axisLeft()
                            .scale(yScale);
            yAxisLabel.transition().duration(1500).call(yAxis);
            yAxisText.text(val);
        }

        var yAxisLabel = svg.append('g')
                            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
                            .attr('class', 'axis')
        var yAxisText = svg.append('text')
                            .attr('transform', 'translate(' + (margin.left - 50) + ', ' + (margin.top + drawHeight / 2) + ') rotate(-90)')
                            .attr('class', 'axis-label')
        
        var draw = function(val) {
            var yData;
            if (val == 'family') {
                yData = data.map(function(d) { return d.Family; });
            } else if (val == 'health') {
                yData = data.map(function(d) { return d.Health; });
            } else if (val == 'freedom') {
                yData = data.map(function(d) { return d.Freedom; });
            } else if (val == 'trust') {
                yData = data.map(function(d) { return d.Trust; });
            } else if (val == 'generosity') {
                yData = data.map(function(d) { return d.Generosity; });
            } else {
                yData = data.map(function(d) { return d.Economy; });
            }
            setYScale(yData);
            setYAxis(val);

            var circles = g.selectAll('circle').data(data);
            circles.enter().append('circle')
                            .attr('cx', 0)
                            .attr('cy', 0)
                            .merge(circles)
                            .transition()
                            .duration(1500)
                            .attr('r', 10)
                            .attr('fill', 'blue')
                            .attr('cy', height)
                            .style('opacity', 0.3)
                            .attr('cx', function(d) { return xScale(d.happiness_score); })
                            .attr('cy', function(d) { return yScale(d.Economy); })
                            .on('mouseover', function() { 
                                console.log('hello');
                                // div.transition()
                                //     .duration(200)
                                //     .style('opacity', .9);
                                // div .html(d.Country + "<br /> rank: " + d.hapiness_rank)
                                //     .style('left', (d3.event.pageX) + "px")
                                //     .style("top", (d3.event.pageY - 28) + "px");

                            });

            if (val == 'family') {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Family); });
            } else if (val == 'health') {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Health); });
            } else if (val == 'freedom') {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Freedom); });
            } else if (val == 'trust') {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Trust); });
            } else if (val == 'generosity') {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Generosity); });
            } else {
                circles.transition()
                        .duration(1500)
                        .attr('cy', function(d) { return yScale(d.Economy); });
            }

            circles.exit().remove();
        }
         
        $("input").on('change', function() {
            var val = $(this).val();
            draw(val);                                                       
        })
        draw('economy');

        // var tooltip = d3.selectAll('circle')
        //                 .append('div')
        //                 .text(function(d) { return (d.Country); })
        //                 .style('position', 'absolute')
        //                 .style('z=index', '10');
        //                 //.style('visibility', 'hidden')


    });

});