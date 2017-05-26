
var width = 1500
var height = 400

var margins = { left : 50 , right : 50, top : 50, bottom : 50 }
loadAllLibs().then(results => {
    var hist = new Histogram(width,height,results);
})



