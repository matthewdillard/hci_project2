// create 2 data_set
var cri_data = [
  {group: "Puerto Rico", value: 7.17, color: "#db545a"},
  {group: "Myanmar", value: 10.00, color: "yellow"},
  {group: "Haiti", value: 13.67, color: "blue"},
  {group: "Philippines", value: 18.17, color: "darkblue"},
  {group: "Mozambique", value: 25.83, color: "teal"},
  {group: "The Bahamas", value: 27.67, color: "lightblue"},
  {group: "Bangladesh", value: 28.33, color: "green"},
  {group: "Pakistan", value: 29.00, color: "darkgreen"},
  {group: "Thailand", value: 29.83, color: "#d44f14"},
  {group: "Nepal", value: 13.33, color: "darkred"}
];

var fatal_data = [
  {group: "Puerto Rico", value: 149.85, color: "#db545a"},
  {group: "Myanmar", value: 7056.45, color: "yellow"},
  {group: "Haiti", value: 274.05, color: "blue"},
  {group: "Philippines", value: 859.35, color: "darkblue"},
  {group: "Mozambique", value: 125.4, color: "teal"},
  {group: "The Bahamas", value: 5.35, color: "lightblue"},
  {group: "Bangladesh", value: 572.5, color: "green"},
  {group: "Pakistan", value: 502.45, color: "darkgreen"},
  {group: "Thailand", value: 137.75, color: "#d44f14"},
  {group: "Nepal", value: 217.15, color: "darkred"}
]

var fatal_100_data = [
  {group: "Puerto Rico", value: 4.12, color: "#db545a"},
  {group: "Myanmar", value: 14.35, color: "yellow"},
  {group: "Haiti", value: 2.78, color: "blue"},
  {group: "Philippines", value: 0.93, color: "darkblue"},
  {group: "Mozambique", value: 0.52, color: "teal"},
  {group: "The Bahamas", value: 1.56, color: "lightblue"},
  {group: "Bangladesh", value: 0.38, color: "green"},
  {group: "Pakistan", value: 0.30, color: "darkgreen"},
  {group: "Thailand", value: 0.21, color: "#d44f14"},
  {group: "Nepal", value: 0.82, color: "darkred"}
];

var losses_1M = [
  {group: "Puerto Rico", value: 4149.98, color: "#db545a"},
  {group: "Myanmar", value: 1512.11, color: "yellow"},
  {group: "Haiti", value: 392.54, color: "blue"},
  {group: "Philippines", value: 3179.12, color: "darkblue"},
  {group: "Mozambique", value: 303.03, color: "teal"},
  {group: "The Bahamas", value: 426.88, color: "lightblue"},
  {group: "Bangladesh", value: 1860.04, color: "green"},
  {group: "Pakistan", value: 3771.91, color: "darkgreen"},
  {group: "Thailand", value: 7719.15, color: "#d44f14"},
  {group: "Nepal", value: 233.06, color: "darkred"}
];

var losses_GDP = [
  {group: "Puerto Rico", value: 3.66, color: "#db545a"},
  {group: "Myanmar", value: 0.80, color: "yellow"},
  {group: "Haiti", value: 2.30, color: "blue"},
  {group: "Philippines", value: 0.54, color: "darkblue"},
  {group: "Mozambique", value: 1.33, color: "teal"},
  {group: "The Bahamas", value: 3.81, color: "lightblue"},
  {group: "Bangladesh", value: 0.41, color: "green"},
  {group: "Pakistan", value: 0.52, color: "darkgreen"},
  {group: "Thailand", value: 0.82, color: "#d44f14"},
  {group: "Nepal", value: 0.39, color: "darkred"}
];

var num_events = [
  {group: "Puerto Rico", value: 24, color: "#db545a"},
  {group: "Myanmar", value: 57, color: "yellow"},
  {group: "Haiti", value: 80, color: "blue"},
  {group: "Philippines", value: 317, color: "darkblue"},
  {group: "Mozambique", value: 57, color: "teal"},
  {group: "The Bahamas", value: 13, color: "lightblue"},
  {group: "Bangladesh", value: 185, color: "green"},
  {group: "Pakistan", value: 173, color: "darkgreen"},
  {group: "Thailand", value: 146, color: "#d44f14"},
  {group: "Nepal", value: 191, color: "darkred"}
];

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
  width = 900 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

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
  .padding(0.3);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .style("color", "#f9d976")

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
    .append("rect") // Add a new rect for each new element
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
    .attr("x", function(d) { return x(d.group); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", "#f9d976")
    .style("border-radius", 100)

  // If less group in the new dataset, I delete the ones not in use anymore
  u
    .exit()
    .remove()
}

// Initialize the plot with the first dataset
update(data1)
