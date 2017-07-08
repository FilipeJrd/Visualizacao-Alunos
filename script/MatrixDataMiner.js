
function getMatrixOfLibariesForUsers(){
    
    return new Promise((fulfill, reject)=>{
        var matrix = []
        d3.json('libs.json', (errLib, libsArray) => {
            if (errLib) { reject(errLib) }

            d3.json('users.json', (errUsers, usersJson) => {
                if (errUsers) { reject(errUsers) }
                
                let keysUsers = Object.keys(usersJson)

                for (var i=0; i < libsArray.length; i++ ){
                    for ( var j = 0; j < keysUsers.length; j++){
                        var value = 0

                        if (usersJson[keysUsers[j]][libsArray[i]]){
                            value = usersJson[keysUsers[j]][libsArray[i]]
                        }
                    
                        matrix.push([i+1, j+1, value])
                    }
                }

                fulfill(matrix)               
            })
        })
    })
    
}