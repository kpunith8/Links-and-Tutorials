## Visualisation using D3 - Data Driven Documents

Libraries built on top of D3, `NVD3`, `Dimple.js`, and `Rickshaw` most popular

`RAW` and `Chartio` to define charts on top of D3

Involves three steps for data visualization, `HCI - Human Computer Interaction`,
`Data Wragling`, and `EDA - Exploratory Data Analysis`

## Examples

### Bar Graph with labels using svg

```js
const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

const w = 500;
const h = 100;

const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", (d, i) => i * 30)
   .attr("y", (d, i) => h - 3 * d)
   .attr("width", 25)
   .attr("height", (d, i) => d * 3)
   .attr("fill", "navy")
   .attr('class', 'bar') // To Give a hover effect
   .append('title') // To add a tooltip
   .text(d => d)

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text") // Labels
   .text((d) => d)
   .attr("x", (d, i) => i * 30)
   .attr("y", (d, i) => h - (3 * d) - 3)
```

### Scatter Plot Circles
```js
const dataset = [
                [ 34,    78 ],
                [ 109,   280 ],
                [ 310,   120 ],
                [ 79,    411 ],
                [ 420,   220 ],
                [ 233,   145 ],
                [ 333,   96 ],
                [ 222,   333 ],
                [ 78,    320 ],
                [ 21,    123 ]
              ];


const w = 500;
const h = 500;

const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", (d, i) => d[0]) // can be changed to use xScale
   .attr("cy", (d, i) => h - d[1])
   .attr("r", 5);

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text") // labels with x,y
   .text(d => (d[0] + ", " + d[1]))
   .attr('x', (d, i) => d[0] + 5)
   .attr("y", (d, i) => h - d[1])
```

Use scale to scale the input/output, the `domain()` and `range()` methods can be
used to specify the max and min range for the data
```js
let scale = d3.linearScale()

let output = scale(50)

d3.select("body")
    .append("h2")
    .text(output)

const dataset = [
                [ 34,    78 ],
                [ 109,   280 ],
                [ 310,   120 ],
                [ 79,    411 ],
                [ 420,   220 ],
                [ 233,   145 ],
                [ 333,   96 ],
                [ 222,   333 ],
                [ 78,    320 ],
                [ 21,    123 ]
              ];

const w = 500;
const h = 500;

// Padding between the SVG canvas boundary and the plot
const padding = 30;

// Create an x and y scale
const xScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, (d) => d[0])])
                .range([padding, w - padding]);

const yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, (d) => d[1])])
                .range([h - padding, padding]);

const output = yScale(411);
d3.select("body")
  .append("h2")
  .text(output)
```

Add x and y axis to the graph
```js
const dataset = [
                [ 34,     78 ],
                [ 109,   280 ],
                [ 310,   120 ],
                [ 79,   411 ],
                [ 420,   220 ],
                [ 233,   145 ],
                [ 333,   96 ],
                [ 222,    333 ],
                [ 78,    320 ],
                [ 21,   123 ]
              ];

const w = 500;
const h = 500;
const padding = 60;

const xScale = d3.scaleLinear()
                 .domain([0, d3.max(dataset, (d) => d[0])])
                 .range([padding, w - padding]);

const yScale = d3.scaleLinear()
                 .domain([0, d3.max(dataset, (d) => d[1])])
                 .range([h - padding, padding]);

const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

  svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle")
     .attr("cx", (d) => xScale(d[0]))
     .attr("cy",(d) => yScale(d[1]))
     .attr("r", (d) => 5);

  svg.selectAll("text")
     .data(dataset)
     .enter()
     .append("text")
     .text((d) =>  (d[0] + "," + d[1]))
     .attr("x", (d) => xScale(d[0] + 10))
     .attr("y", (d) => yScale(d[1]))

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);


  svg.append("g")
     .attr("transform", "translate(0," + (h - padding) + ")")
     .call(xAxis);

svg.append("g")
   .attr("transform", "translate(60," + (0) + ")")
   .call(yAxis);
```

## Links

[Visual Encoding](https://www.targetprocess.com/articles/visual-encoding/)
