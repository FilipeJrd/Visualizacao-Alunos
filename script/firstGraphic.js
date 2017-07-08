
var width = 500
var height = 600

var margins = { left : 50 , right : 50, top : 50, bottom : 50 }
loadAllLibs().then(results => {
    var hist = new HorizontalHistogram("libs",width,height,results,margins);
})

function clickedColumn(name){
    d3.select(".projects").remove()
    
    getProjectsFor(name).then( resul2 => {
        var width2 = width
        var margins2 = { left : 50 , right : 50, top : height+50, bottom : 50 }
        var hist = new HorizontalHistogram("projects",width,height,resul2,margins2)
    })
}


