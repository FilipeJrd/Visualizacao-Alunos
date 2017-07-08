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
          return user.login
        }).sort()
        Object.keys(usersDict).sort()
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
        filtragi[elem] = ""
      }
      const gambiDoInferno = Object.keys(filtragi)
      nodes = []
      for (var i = 0; i < gambiDoInferno.length ; i++){
        const object = {
          id: gambiDoInferno[i]
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
      source: srcUser,
      target: targetUser,
      value: 1
    }
    links.push(object)
  }
}

function addUsersToNodes(users) {
  for (var i = 0; i < users.length; i++) {
    const object = {
      id: users[i],
    }
    const contains = nodes.includes(object)
    if (!contains){
      nodes.push(object)
    }
  }
}


function test() {
  getGraphOfCollaboration().then(result => {
    console.log("links " + result[0]);
    console.log("nodes " + result[1]);
    debugger
  })
}
