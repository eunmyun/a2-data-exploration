$(function() {

    var margin = {
        top: 10,
        right: 10,
        bottom: 150,
        left: 60
    };

    var width = 960;
    var height = 500;

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


    d3.csv('data/2016.csv', function(error, data) {
        console.log(data);
        var _ = data.map(function(d) {
            return d.happiness_score;
        });

        var xMax = Math.max(data.map(function(d) { return d.happiness_score; }));
        var xScale = d3.scaleLinear()
                        .domain([0, xMax])
                        .range([0, drawWidth]);
        var xAxis = d3.axisBottom()
                        .scale(xScale);

        var yMax = Math.max(data.map(function(d) { return d.Economy; }));
        var yScale = d3.scaleLinear()
                        .domain([0, yMax])
                        .range([drawHeight, 0]);
        var yAxis = d3.axisLeft()
                        .scale(yScale);

        var xAxisLabel = svg.append('g')
                            .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + drawHeight) + ')')
                            .attr('class', 'axis')
                            .call(xAxis);

        svg.append('text')
            .attr('transform', 'translate(' +  (drawWidth / 2) + ', ' + (margin.top + drawHeight + 50) + ')')
            .attr('class', 'axis-label')
            .text('Device-App Combinations');

        var yAxisLabel = svg.append('g')
                            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
                            .attr('class', 'axis')
                            .call(yAxis);

        svg.append('text')
            .attr('transform', 'translate(' + (margin.left - 50) + ', ' + (margin.top + drawHeight / 2) + ') rotate(-90)')
            .attr('class', 'axis-label')
            .text('Count');

        $("input").on('change', function() {
            var val = $(this).val();
            //var yData = data.map(function(d) { return d.Economy; });
            if (val == 'family') {
                var yData = data.map(function(d) { return d.Family; });
            } else if (val == 'health') {
                var yData = data.map(function(d) { return d.Health; });
            } else if (val == 'freedom') {
                var yData = data.map(function(d) { return d.Freedom; });
            } else if (val == 'trust') {
                var yData = data.map(function(d) { return d.Trust; });
            } else if (val == 'generosity') {
                var yData = data.map(function(d) { return d.Generosity; });
            } else {
                var yData = data.map(function(d) { return d.Economy; });
            }
            console.log(yData);                                                             
        })
    });

});