function drawHeatMap() {
  d3.json('libs.json', (errLib, libsArray) => {
    if (errLib) { reject(errLib) }

    d3.json('users.json', (errUsers, usersJson) => {
      if (errUsers) { reject(errUsers) }

      const margin = { top: 100, right: 0, bottom: 100, left: 150 },
        width = 500 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom,
        gridSize = 10 ,
        legendElementWidth = gridSize * 2,
        buckets = 7,
        colors =["#f7fcfd",
"#e0ecf4",
"#bfd3e6",
"#9ebcda",
"#8c96c6",
"#8c6bb1",
"#88419d",
"#6e016b"] // alternatively colorbrewer.YlGnBu[9]
        days = libsArray,
        times =  Object.keys(usersJson)
       
      const svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const dayLabels = svg.selectAll(".dayLabel")
        .data(days)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", (d, i) => i * gridSize)
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"));

      const timeLabels = svg.selectAll(".timeLabel")
        .data(times)
        .enter().append("text")
        .text((d) => d)
        .attr("x", 10)
        .attr("y", (d, i) => (i * gridSize))
        .style("text-anchor", "start")
        .attr("transform", " rotate(-90) translate(" + -(gridSize / 2)+ ", 6)")
        .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"));

      const type = (d) => {
        return {
          day: +d[0],
          hour: +d[1],
          value: +d[2]
        };
      };

      const heatmapChart = function () {
        getMatrixOfLibariesForUsers().then(data =>{
          console.log(d3.max(data, (d) => d[2]))
          const colorScale = d3.scaleQuantile()
            .domain([0, buckets - 1 ,d3.max(data, (d) => d[2])])
            .range(colors);

          const cards = svg.selectAll(".hour")
            .data(data, (d) => d[0] + ':' + d[1]);

          cards.append("title");

          cards.enter().append("rect")
            .attr("x", (d) => (d[1] - 1) * gridSize)
            .attr("y", (d) => (d[0] - 1) * gridSize)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "hour bordered")
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style("fill", colors[0])
            .merge(cards)
            .transition()
            .duration(1000)
            .style("fill", (d) => colorScale(d[2]));

          cards.select("title").text((d) => d[2]);

          cards.exit().remove();
          
          const legend = svg.selectAll(".legend")
            .data([0].concat(colorScale.quantiles()), (d) => d);

          const legend_g = legend.enter().append("g")
            .attr("class", "legend")
            .attr("transform", "translate(60,10)")

          legend_g.append("rect")
            .attr("x", (d, i) => legendElementWidth * i)
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", (d, i) => colors[i]);

          legend_g.append("text")
            .attr("class", "mono")
            .text((d,i) =>{
              console.log((d,i))
              return "≥ " + i
            } )
            .attr("x", (d, i) => legendElementWidth * i)
            .attr("y", height + gridSize);

          legend.exit().remove();
        });
      }

      heatmapChart();

    })
  })
}