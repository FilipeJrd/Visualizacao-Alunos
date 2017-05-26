
var width = 1500
var height = 400

var margins = { left : 50 , right : 50, top : 50, bottom : 50 }
loadAllLibs().then(results => {
    var hist = new Histogram("libs",width,height,results,margins);
})

function clickedColumn(name){
    d3.select(".projects").remove()
    
    getProjectsFor(name).then( resul2 => {
        console.log(resul2)
        var width2 = (100* resul2.length)+ 100
        var margins2 = { left : 50 , right : 50, top : height+50, bottom : 50 }
        var hist = new Histogram("projects",width2,height,resul2,margins2)
    })
}


