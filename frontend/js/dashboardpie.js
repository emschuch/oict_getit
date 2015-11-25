

var widthPie = d3.select('.pie-chart-area').node().clientWidth,
    heightPie = 60,
    radius = Math.min(widthPie, heightPie) / 2;

var dummyData = [ {'type': 'electrified',
                    'val': 0.43,
                    'fill': '#2185ff' }, 
                {'type': 'rural',
                    'val': 0.58,
                    'fill': '#f3a000' }
                    // 'fill': '#ed00e0' }
                ];


var arc = d3.svg.arc()
    .outerRadius(radius - 4)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) { return d; });

dummyData.forEach(function (d) {
    var svg = d3.select('.pie-chart-area.' + d.type)
        .append('svg')
        .attr('class', 'pie-chart-svg')
        .attr('height', heightPie)
        .attr('width', widthPie)
        .append("g")
        .attr("transform", "translate(" + (radius - 4) + "," + (radius - 2) + ")");

    var g = svg.selectAll(".arc")
        .data(pie([d.val, 1 - d.val]))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", d.fill)
        .style("fill-opacity", function (d, i) {
            return i === 0 ? 1 : 0.3;
        });

    g.append('text')
        .attr('class', 'pie-chart-text')
        .attr("transform", "translate(" + (radius) + ",4)")
        .text(d3.format('%')(d.val));

})


