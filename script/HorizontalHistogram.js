class HorizontalHistogram {
  constructor(name,width,height,data,margins) {
    this.histName = name
    this.width = width
    this.height = height
    this.data = data
    this.margins = margins
    this.svg = this.createSvg()

    this.createScale()
    this.createAxes()
    this.draw(this.data)
  }

  createScale() {
    this.scaleY = d3.scaleBand().domain(this.data.map(
      (d) => {
        return d.name
      }
    )).range([0,this.height - this.margins.bottom]).padding(1);
    this.scaleX = d3.scaleLinear().domain([this.biggest(),0]).range([this.width - this.margins.right-10,this.margins.left]);
    
  }

  biggest() {
    return d3.max(this.data, (d) =>{
      return d.frequency
    })
  }

  createAxes(){
    var axisX = this.svg.append("g")
    axisX.call(d3.axisBottom(this.scaleX).tickFormat(d3.format("d")))
    axisX.attr("transform","translate(50,"+(this.height-50)+")")

    var axisY = this.svg.append("g")
    axisY.call(d3.axisLeft(this.scaleY))
    axisY.attr("transform","translate(100,0)")
  }

  createSvg(){
    return (d3.select(".histograms")
      .append("svg")
      .attr("class", this.histName)
      .attr("width",this.width+this.margins.left+this.margins.right)
      .attr("height",this.height+this.margins.top+this.margins.bottom)
      .append("g")
      .attr("transform", "translate(" +this.margins.left + "," + this.margins.top + ")"))
  }
  
  draw(data){
    var that = this
    this.svg.append("text").text(that.histName).attr("x",this.width/2).attr("y", 0).attr("font-size",25);
    this.svg.append('g')
            .attr('transform',"translate(100,"+(-4)+")")
			.attr('id','bars')
            .selectAll('rect')
			.data(data)
			.enter()
		    .append('rect')
			.attr('height',8)
            .attr('x', function(d){
                return 0
            })
            .attr('y', function(d){
                return that.scaleY(d.name);
            })
			.style('fill','red')
      .transition()
      .duration(1000)
			.attr('width',function(d){ return that.scaleX(d.frequency) - that.scaleX(0); })
            .attr("onclick",function(d){
                return "clickedColumn('"+d.name+"')"
            });
  }
}
