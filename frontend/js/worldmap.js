
//// D3 VERSION

var widthMap = d3.select('#map-area').node().clientWidth,
    heightMap = 500;

var projection = d3.geo.equirectangular()
    .center([40.5, 8.5])
    .scale(1800)
    .translate([widthMap / 2, heightMap / 2]);

var path = d3.geo.path()
    .projection(projection);

var pointColors = d3.scale.ordinal()
    // .range(['#a80084','#aaff00','#73b2ff']) // 
    .range(['#73b2ff','#aaff00','#fbb117']) // blue, green, orage
    .domain(['Grid', 'MicroGrid', 'StandAlone']);

var svgMap = d3.select('#map-area')
    .append('svg')
    .attr('class', 'map-svg')
    .attr('width', widthMap)
    .attr('height', heightMap);

var countries = svgMap.append("g")
    .attr("class", "countries");

queue()
    .defer(d3.json, './js/world2.json')
    .defer(d3.csv, './js/ethiopia.csv')
    .defer(d3.json, './js/regions.json')
    .await(ready);

function ready(err, world, ethiopia, regions) {
    if (err) console.warn('error', err);

    ethiopia.forEach(function (d) {
        d.X = +d.X;
        d.Y = +d.Y;
    })


    var countryBoundaries = topojson.feature(world, world.objects.countries).features;

    var regionsAfrica = regions.filter(function (d) {
        return d.region === 'AFRICA';
    });

    var regionById = d3.nest()
        .key(function (d) { return d.numeric; })
        .map(regionsAfrica);

    countries.selectAll(".countries")
        .data(countryBoundaries)
      .enter().append("path")
        .attr("class", function (d) { return "countries "; })
        .attr("d", path);

    countries.append("path")
        .datum(topojson.mesh(world, world.objects.countries, function (a, b) { return a !== b; }))
        .attr("d", path)
        .attr("class", "countries-boundary");

    var points = countries.selectAll('.point-group')
        .data(ethiopia)
      .enter().append('g')
        .attr('class', 'point-group')
        .attr('transform', function (d) {
            return 'translate(' + projection([d.X, d.Y]) + ')'
        });

    points.append('rect')
        .attr('width', 2)
        .attr('height', 2)
        .style('fill', function (d) {
            return pointColors(d.Split300);
        });

    countryLabels = countries.selectAll("text")
        .data(countryBoundaries)
      .enter().append("text")
        .attr('class', 'country-label')
        .attr("transform", function (d) { 
            return "translate(" + path.centroid(d) + ")"; 
        })
        .each(function (d) {
            try {
                var arr = regionById[d.id][0].name.split(' ');
                if (arr != undefined) {
                    for (i = 0; i < arr.length; i++) {
                        d3.select(this).append("tspan")
                            .text(arr[i])
                            .attr("dy", i ? "1.2em" : 0)
                            .attr("x", 0)
                            .attr("text-anchor", "middle")
                            .attr("class", "tspan" + i);
                    }
                }                
            }
            catch(err) { return ""; }
        })
        .style('fill', '#fff');
        // .text(function (d) { 
        //     try { 
        //         var nameAsList = regionById[d.id][0].name.split(' ')
        //         if (nameAsList.length > 1) {
        //             for (i = 0; i < nameAsList.length; i++) {
        //                 d3.select(this).append("tspan")
        //                     .text(nameAsList[i])
        //                     .attr("dy", i ? "1.2em" : 0)
        //                     .attr("x", 0)
        //                     .attr("text-anchor", "middle")
        //                     .attr("class", "tspan" + i);
        //         } else {
        //             return regionById[d.id][0].name;
        //         } 
        //     }
        //     catch(err) { return ""; }
        // })
        // .style('fill', '#fff')
        // .style('text-anchor', 'middle');

    var legend = svgMap.selectAll('.legend-group')
        .data(['Grid', 'Mini-Grid', 'Stand Alone'])
      .enter().append('g')
        .attr('class', 'legend-group')
        .attr('transform', function (d, i) {
            return 'translate(0,' + ((20 * i) + 15) + ')'
        });

    legend.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('x', 15)
        .style('fill', function (d, i) {
            // console.log(pointColors.range())
            return pointColors.range()[i];
        });

    legend.append('text')
        .attr('x', 35)
        .attr('y', 12)
        .text(function (d) {
            return d;
        })
        .style('fill', '#ddd')
        .style('text-shadow', '3px 3px 5px #000');

}

// countries.selectAll("path")
//       .data(topojson.object(topology, topology.objects.countries)
//           .geometries)
//     .enter()
//       .append("path")
//       .attr("d", path);

// zoom and pan
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        countries.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        console.log(d3.event.scale);
        // countries.selectAll("rect")
        //     .attr("d", path.projection(projection));
        // countries.selectAll("path")  
        //     .attr("d", path.projection(projection));
        // countryLabels.attr("transform", function (d) { 
        //     return "translate(" + path.centroid(d) + ")"; 
        });

  // });

svgMap.call(zoom)


