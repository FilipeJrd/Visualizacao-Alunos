class Histogram {
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
    this.scaleX = d3.scaleBand().domain(this.data.map(
      (d) => {
        return d.name
      }
    )).range([this.margins.left,this.width - this.margins.right]).padding(0.1);
    this.scaleY = d3.scaleLinear().domain([this.biggest()+100,0]).range([0,this.height - this.margins.bottom]);
    
  }

  biggest() {
    return d3.max(this.data, (d) =>{
      return d.frequency
    })
  }

  createAxes(){
    var axisX = this.svg.append("g")
    axisX.call(d3.axisBottom(this.scaleX))
    axisX.attr("transform","translate(0,"+(this.height-50)+")")

    var axisY = this.svg.append("g")
    axisY.call(d3.axisLeft(this.scaleY))
    axisY.attr("transform","translate(30,0)")
  }

  createSvg(){
    return (d3.select("body")
      .append("svg")
      .attr("class", this.histName)
      .attr("width",this.width)
      .attr("height",this.height));
  }
  
  draw(data){
    var that = this

    this.svg.selectAll("rect")
      .remove()

    this.svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", function(d){
            return that.scaleX(d.name)
            })
          .attr("width", that.scaleX.bandwidth())
          .attr("y", function(d){
            var  y = d.frequency === 0 ? 0 : that.scaleY(d.frequency)
            return (y )
          })
          .attr("height", function(d){
            var  y = d.frequency === 0 ? 0 : that.height - that.scaleY(d.frequency) - 50
            return y
          })
          .attr("onclick",function(d){
            return "clickedColumn('"+d.name+"')"
          });
  }
}
