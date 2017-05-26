var allLibs = []

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
  return new Promise(  (fulfill, reject) => {
    d3.json('result.json', (error, json) => {
      if (error) {
        throw reject(error)
      }
      var keysArray = Object.keys(json)

      for ( var i = 0; i < keysArray.length;  i++) {
          console.log(keysArray[i]);
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

// loadAllLibs().then(result => {
//   console.log(result);
// })
