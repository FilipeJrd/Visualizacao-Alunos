function drawHeatMap() {
  d3.json('libs.json', (errLib, libsArray) => {
    if (errLib) { reject(errLib) }

    d3.json('users.json', (errUsers, usersJson) => {
      if (errUsers) { reject(errUsers) }

      var tooltipDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)

      const margin = { top: 200, right: 0, bottom: 100, left: 150 },
        width = 450 - margin.left - margin.right,
        height = 900 - margin.top - margin.bottom,
        gridSize = 10,
        legendElementWidth = gridSize * 2,
        buckets = 7,
        colors =["#f7fcfd",
"#e0ecf4",
"#bfd3e6",
"#9ebcda",
"#8c96c6",
"#8c6bb1",
"#88419d",
"#6e016b"] 
        days = libsArray,
        times =  Object.keys(usersJson)
       
      const svg = d3.select(".fdg").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("text").text("Library/Student Matrix").attr("x",0).attr("y", -150).attr("font-size",25);
      const dayLabels = svg.selectAll(".dayLabel")
        .data(days)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", (d, i) => i * gridSize)
        .attr("font-size",10)
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"));

      const timeLabels = svg.selectAll(".timeLabel")
        .data(times)
        .enter().append("text")
        .text((d) => d)
        .attr("x", 10)
        .attr("y", (d, i) => (i * gridSize))
        .attr("font-size",10)
        .style("text-anchor", "start")
        .attr("transform", " rotate(-90) translate(" + -(gridSize / 2) + ", 6)")
        .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"));

      const type = (d) => {
        return {
          day: +d[0],
          hour: +d[1],
          value: +d[2]
        };
      };

      const heatmapChart = function () {
        getMatrixOfLibariesForUsers().then(data => {
        
          const colorScale = d3.scaleQuantile()
            .domain([0, buckets - 1, d3.max(data, (d) => d[2])])
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
            //.transition()
            //.duration(1000)
            .style("fill", (d) => colorScale(d[2]))
            .on("mouseover", function (d) {
              tooltipDiv.transition()
                .duration(200)
                .style("opacity", 1)

              tooltipDiv.html(d[2])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
            })
            .on("mouseout", function (d) {
              tooltipDiv.transition()
                .duration(500)
                .style("opacity", 0)
            })

          cards.select("title").text((d) => d[2]);

          cards.exit().remove();

          const legend = svg.selectAll(".legend")
            .data([0].concat(colorScale.quantiles()), (d) => d);

          const legend_g = legend.enter().append("g")
            .attr("class", "legend")
            .attr("transform", "translate(60,0)")

          legend_g.append("rect")
            .attr("x", (d, i) => legendElementWidth * i)
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", (d, i) => colors[i]);

          legend_g.append("text")
            .attr("class", "mono")
            .text((d,i) =>{
              
              return "   " + i
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