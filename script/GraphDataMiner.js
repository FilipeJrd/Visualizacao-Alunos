links = []
nodes = []

function getGraphOfCollaboration() {
  links = []
  nodes = []
  return new Promise((fulfill, reject) => {
    d3.json("result.json", (err, json) => {
      if (err){
        reject(err)
      }
      var projectListName = Object.keys(json)

      for (var i = 0; i < projectListName.length; i++){

          var usersDict = json[projectListName[i]]["users"]
          const users = Object.keys(usersDict).sort()
          addUsersToNodes(users)
        
          for ( var j = 0; j < users.length; j++){
            for (var k = j+1 ; k < users.length; k++){
              ifexitsUpdate(users[j], users[k])
            }
          }
      }
      result = [links, nodes]
      fulfill(result)
    })
  })
}

function ifexitsUpdate(srcUser, targetUser){
  var hasConnectionAlready = false
  for(var i = 0; i < links.length; i++){
    var edge  = links[i]
    if (edge.source === srcUser  && edge.target === targetUser){
      edge.value += 1
      hasConnectionAlready = true
      break
    }
  }

  if (!hasConnectionAlready){
    const object = {
      source: srcUser,
      target: targetUser,
      value: 1
    }
    links.push(object)
  }
}

function addUsersToNodes(users){
  var uniqueUsers = []
  for (var j = 0; j < users.length; j++){
    for (var i = 0; i < nodes.length; i++ ){
      if (node.id ===  users[i]) {
        continue
      }else{
        uniqueUsers.push(users[i])
      }
    }
  }

  for (var i = 0; i < uniqueUsers.length; i++){
    const object = {
      id: uniqueUsers[i],
    }
    nodes.push(object)
  }
}

getGraphOfCollaboration().then(result => {
  console.log("links " + result[0]);
  console.log("nodes " + result[1]);
})
