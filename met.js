const request = require('request')

const objectSearch = function(object,callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + object

    request({url,json: true}, function (error,response){
        if (error){
            callback(error,undefined)
        }
        else if(!response.body.objectIDs[0]){
            callback("Objeto no encontrado",undefined)
        }
        else{
            const data = response.body
            const id = data.objectIDs[0]
            
            
            callback(undefined,id)
        }
    })

}

const getObject = function(id, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id

    request({url,json:true}, function(error,response){
        if(error){
            callback('Unable to find the object',undefined)
        }
        else{
            const data = response.body
            const objectData = 
            {
                artist: data.constituents[0].name,
                title: data.title,
                year: data.objectEndDate,
                technique: data.medium,
                metUrl: data.objectURL

            }
            
            callback(error,data)
        }
    })
}

module.exports = {
    objectSearch : objectSearch,
    getObject : getObject
}

//objectSearch('sunflower')
//getObject(707887)