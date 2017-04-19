var margin = { top: 20, right: 30, bottom: 30, left: 40 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom')
  ;

var yAxis = d3.svg.axis()
  .scale(y)
  .orient('left')
  .ticks(10, '%')
  ;

var chart = d3.select('.chart')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  ;

d3.tsv('data.tsv', type, (error, data) => {

  x.domain(data.map(d => d.name));
  y.domain([0, d3.max(data.map(d => d.value))]);

  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy','.71em')
    .style('text-anchor', 'end')
    .text('Frequency')
    ;

  chart.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.name))
    .attr('y', d => y(d.value))
    .attr('width', x.rangeBand())
    .attr('height', d => height - y(d.value))
    ;

});



function type(d) {
  d.value = +d.value;
  return d;
}