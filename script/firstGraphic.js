
var width = 350
var height = 600

var margins = { left : 50 , right : 30, top : 50, bottom : 50 }
loadAllLibs().then(results => {
    var hist = new HorizontalHistogram("libs",width,height,results,margins);

    drawFDG()
    drawHeatMap()
})

function clickedColumn(name){
    d3.select(".projects").remove()
    
    getProjectsFor(name).then( resul2 => {
        var width2 = width
        var hist = new HorizontalHistogram("projects",width,height,resul2,margins)
    })
}