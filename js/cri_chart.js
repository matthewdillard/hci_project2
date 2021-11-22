// create 2 data_set
var cri_ = [
  {group: "Puerto Rico", value: 7.17},
  {group: "Myanmar", value: 10.00},
  {group: "Haiti", value: 13.67},
  {group: "Philippines", value: 18.17},
  {group: "Mozambique", value: 25.83},
  {group: "The Bahamas", value: 27.67},
  {group: "Bangladesh", value: 28.33},
  {group: "Pakistan", value: 29.00},
  {group: "Thailand", value: 29.83},
  {group: "Nepal", value: 13.33}
];

var data2 = [
  {group: "Puerto Rico", value: 4.12},
  {group: "Myanmar", value: 14.35},
  {group: "Haiti", value: 2.78},
  {group: "Philippines", value: 0.93},
  {group: "Mozambique", value: 0.52},
  {group: "The Bahamas", value: 1.56},
  {group: "Bangladesh", value: 0.38},
  {group: "Pakistan", value: 0.30},
  {group: "Thailand", value: 0.21},
  {group: "Nepal", value: 0.82}
];

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
  width = 700 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update(data) {

  // Update the X axis
  x.domain(data.map(function(d) { return d.group; }))
  xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  y.domain([0, d3.max(data, function(d) { return d.value }) ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u = svg.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
    .attr("x", function(d) { return x(d.group); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", "#69b3a2")

  // If less group in the new dataset, I delete the ones not in use anymore
  u
    .exit()
    .remove()
}

// Initialize the plot with the first dataset
update(data1)
