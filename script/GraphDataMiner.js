links = []
nodes = []

function getGraphOfCollaboration() {
  links = []
  nodes = []

  return new Promise((fulfill, reject) => {
    d3.json("result2.json", (err, json) => {
      
      if (err) {
        reject(err)
      }
      var projectListName = Object.keys(json)

      for (var i = 0; i < projectListName.length; i++) {

        var usersDict = (json[projectListName[i]])["users"]
        const users = usersDict.map(function(user){
          return [user.login, user.type]
        }).sort( function(a, b){
          return a[0] > b[0]
        })
        addUsersToNodes(users)

        for (var j = 0; j < users.length; j++) {
          for (var k = j + 1; k < users.length; k++) {
            ifexitsUpdate(users[j], users[k])
          }
        }
      }
      var filtragi = {}
      for (var i = 0 ; i < nodes.length; i++){
        let elem = (nodes[i]).id
        filtragi[elem] = (nodes[i]).type
      }
      const gambiDoInferno = Object.keys(filtragi)
      const gambiDoInferno2 = Object.values(filtragi
      )
      nodes = []
      for (var i = 0; i < gambiDoInferno.length ; i++){
        const object = {
          id: gambiDoInferno[i],
          type: gambiDoInferno2[i]
        }
        
        nodes.push(object)
      }
      result = [links, nodes]
      fulfill(result)
    })
  })
}

function ifexitsUpdate(srcUser, targetUser) {
  var hasConnectionAlready = false
  for (var i = 0; i < links.length; i++) {
    var edge = links[i]
    if (edge.source === srcUser && edge.target === targetUser) {
      edge.value += 1
      hasConnectionAlready = true
      break
    }
  }

  if (!hasConnectionAlready) {
    const object = {
      source: srcUser[0],
      target: targetUser[0],
      value: 1
    }
    links.push(object)
  }
}

function addUsersToNodes(users) {
  
  for (var i = 0; i < users.length; i++) {
    const object = {
      id: (users[i])[0],
      type: (users[i])[1],
    }

    const contains = nodes.includes(object)
    if (!contains){
      nodes.push(object)
    }
  }
}

