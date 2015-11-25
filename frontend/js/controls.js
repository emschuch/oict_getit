
d3.json('./js/regions.json', makeList);

function makeList (data) {

    var africa = data.filter(function (d) {
        return d.region === 'AFRICA'
    });

    var countryList = d3.select('#country-dropdown').selectAll('.country-choice')
        .data(africa)
      .enter().append('li')
        .append('a')
        .attr('class', 'country-choice')
        .attr('href', '#')
        .attr('data-value', function (d) {
            return d.iso3;
        })
        .text(function (d) {
            return d.name;
        });

    countryList.on('click', function (d) {
        updateRegion(d);
    });

}

d3.selectAll('.scenario-choice')
    .on('click', function () {
        updateScenario($(this).data('value')[4]);
    });

d3.selectAll('.diesel-choice')
    .on('click', function () {
        updateDiesel($(this).data('value'));
    })

function updateRegion (d) {
    d3.select('#active-region')
        .text(d.name + ' ')
        .append('span')
        .attr('class', 'caret');
}

function updateScenario (d) {
    d3.select('#active-scenario')
        .text('Tier ' + d + ' ')
        .append('span')
        .attr('class', 'caret');
}

function updateDiesel (d) {
    d3.select('#active-diesel')
        .text(d.charAt(0).toUpperCase() + d.slice(1) + ' ')
        .append('span')
        .attr('class', 'caret');
}
