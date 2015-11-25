
var widthBar = d3.select('.bar-chart-area').node().clientWidth - 5,
    heightBar = 20;

var dummyData2 = [ 
                { 'type': 'new-electrified',
                  'values': [
                    { 'grid': 71237860,
                      'mini_grid': 3729647,
                      'stand_alone': 1132641
                    }
                    ]
                }, 
                { 'type': 'cost-breakdown',
                  'values':
                    [
                    { 'grid': 507,
                      'mini_grid': 281,
                      'stand_alone': 340 
                    }
                    ]
                }
                ];

var costBreakdown = dummyData2[1].values[0],
    totalCost = costBreakdown.grid + costBreakdown.mini_grid + costBreakdown.stand_alone;

// console.log(costBreakdown);

d3.select('.threshold-text').text( function () {
    if (totalCost/100 >= 100) {
        return 'high';
    } else if (totalCost/100 < 10) {
        return 'low';
    } else {
        return 'moderate';
    }
});

d3.select('.cost-text').text('$' + (totalCost/100) + ' Billion');

// var color = d3.scale.ordinal()
//     .range(['#73b2ff','#aaff00','#ed00e0']); // blue, green, magenta

var color = d3.scale.ordinal()
    .range(['#73b2ff','#aaff00','#fbb117']); // blue, green, orange

var xScale = d3.scale.linear()
    .range([0, widthBar])
    .domain([0, 1]);

dummyData2.forEach(function (d) {

    color.domain(d3.keys(d.values[0]));

    var svg = d3.selectAll('.bar-chart-area.' + d.type)
        .append('svg')
        .attr('class', 'bar-chart-svg')
        .attr('height', heightBar)
        .attr('width', widthBar);

    var values = d.values[0];

    d3.entries(values).forEach( function (e) {
            var y0 = 0;
            values.technology = color.domain().map( function (name) { 
                return { name: name, y0: y0, y1: y0 += values[name]}; 

            });
            values.technology.forEach( function (d) { d.y0 /= y0; d.y1 /= y0; });
        });

    var barGroup = svg.selectAll('.bar-group')
        .data(values.technology)
      .enter().append('g')
        .attr('class', 'bar-group')
        .attr('transform', function (d) {
            return 'translate(' + xScale(d.y0) + ',0)'
        });

    barGroup.append('rect')
        .attr('class', 'bar')
        .attr('width', function (d) { return xScale(d.y1 - d.y0); })
        .attr('height', heightBar)
        .style('fill', function (d) { return color(d.name); });

    barGroup.append('text')
        .attr('x', 5)
        .attr('y', heightBar - 5)
        .text(function (d) { 
            if (d.y1 - d.y0 >= 0.2) {
                return d3.format('%')(d.y1 - d.y0); 
            }
        });
        // .style('fill', function (d, i) {
        //     return i === 2 ? '#fff' : '#000';
        // });

});

d3.select(window).on('resize', resized);

function resized () {

    var w = d3.select('.bar-chart-area').node().clientWidth - 5;

    d3.selectAll('.bar-chart-svg')
        .attr('width', w);

    xScale
        .range([0, w]);

    d3.selectAll('.bar-group')
        .attr('transform', function (d) {
            return 'translate(' + xScale(d.y0) + ',0)'
        });

    d3.selectAll('.bar')
        .attr('width', function (d) { return xScale(d.y1 - d.y0); });

}

function updateBars (country) {

    var data = dummy.country;
    
    var costBreakdown = data[1].values[0],
        totalCost = costBreakdown.grid + costBreakdown.mini_grid + costBreakdown.stand_alone;

    d3.select('.threshold-text').text( function () {
        if (totalCost/100 >= 100) {
            return 'high';
        } else if (totalCost/100 < 10) {
            return 'low';
        } else {
            return 'moderate';
        }

    });

    d3.select('.cost-text').text('$' + (totalCost/100) + ' Billion');

}

