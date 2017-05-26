var allLibs = []
var projectsForLib = []

function addLibToAllLibs (name, frequency){
  var didEnter = false
  for (var i = 0; i < allLibs.length; i++){
    if (allLibs[i]["name"] === name) {
      allLibs[i]["frequency"] += frequency
      didEnter = true
      break
    }
  }

  if (!didEnter) {
    var object = {
      name: name,
      frequency: frequency
    }
    allLibs.push(object)
  }
}

function loadAllLibs() {
  allLibs = []
  return new Promise(  (fulfill, reject) => {
    d3.json('result.json', (error, json) => {
      if (error) {
        throw reject(error)
      }
      var keysArray = Object.keys(json)

      for ( var i = 0; i < keysArray.length;  i++) {
          var libsForProjectDictionary = json[keysArray[i]]["libs"]

          var libNames = Object.keys(libsForProjectDictionary)

          for (var j =0 ; j < libNames.length; j++ ){
            const name = libNames[j]
            const frequency = libsForProjectDictionary[name]

            addLibToAllLibs(name, frequency)
          }
      }
      fulfill(allLibs)
    })
  })
}

function getProjectsFor(lib){
  projectsForLib = []
  return new Promise( (fulfill, reject) => {
    d3.json('result.json', (err, json) => {
      if (err){
        reject(err)
      }

      var keysArray = Object.keys(json)


      for (var i = 0; i < keysArray.length; i++){
        var projectName = keysArray[i]

        var libsForProjectDictionary = json[keysArray[i]]["libs"]

        var libNames = Object.keys(libsForProjectDictionary)

        for (var j = 0; j < libNames.length; j++){
          if (libNames[j] === lib) {
            const object = {
                  name: projectName,
                  frequency: libsForProjectDictionary[lib]
            }
            projectsForLib.push(object)
            break
          }
        }
      }
      fulfill(projectsForLib)
    })
  })
}
