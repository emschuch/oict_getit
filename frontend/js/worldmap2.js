
//// MAPBOX VERSION

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1zY2h1Y2giLCJhIjoiajhfaDVpMCJ9.hH50bW3MaxsEtQtxF_RSTA';

var map = new mapboxgl.Map({
    container: 'map-area', // container id
    style: 'mapbox://styles/emschuch/cihayeaxe005g4llz1gtttmbn', //stylesheet location
    center: [40.50, 9], // starting position
    zoom: 4.5 // starting zoom
});

map.addControl(new mapboxgl.Navigation());

// map.legendControl.addLegend(document.getElementById('legend').innerHTML);

var widthLegend = d3.select('#legend').node().clientWidth,
    heightLegend = d3.select('#legend').node().clientHeight;

// var pointColors = ['#73b2ff','#aaff00','#ff4ff9']; // blue, bright green, magenta

var pointColors = ['#73b2ff','#aaff00','#fbb117']; // blue, bright green, orange

var legend = d3.select('#legend')
    .append('svg')
    .attr('width', widthLegend)
    .attr('height', heightLegend);

var legendGroup = legend.selectAll('.legend-group')
    .data(['Grid', 'Mini-Grid', 'Stand Alone'])
  .enter().append('g')
    .attr('class', 'legend-group')
    .attr('transform', function (d, i) {
        return 'translate(0,' + ((i * 20) + 10) + ')'
    });

legendGroup.append('rect')
    .attr('width', 15)
    .attr('height', 15)
    .attr('x', 15)
    .style('fill', function (d, i) {
        // console.log(pointColors.range())
        return pointColors[i];
    });

legendGroup.append('text')
    .attr('x', 35)
    .attr('y', 12)
    .text(function (d) {
        return d;
    })
    .style('fill', '#ddd');