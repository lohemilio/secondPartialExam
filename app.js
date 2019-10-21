const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const met = require('./met.js')

app.get('/',function(req,res){
    res.send({
        Bienvenido: 'EXAMEN SEGUNDO PARCIAL'
    })
})

app.get('/students/:id',function(req,res){
    if(!req.params.id){
        res.send({
        error: "Debes enviar un id (matrícula)"
        })
    }
    return res.send({
        id: 'A01651283',
        fullname: 'Emilio Lopez Hernandez',
        nickname: 'Emilio',
        age: '22'
    })
})

app.get('/object',function(req,res){
    if(!req.query.search){
        res.send({
            error: 'Debes enviar un objeto'
        })
    }

    met.objectSearch(req.query.search,function(error,id){
        if(error){
            return res.send({
                error: error
            })
        }
        else{
            met.getObject(id,function(error,response){
                if(error){
                    return res.send({
                        error: error
                    })
                }
                else{
                    return res.send({
                        searchTerm: req.query.search,
                        artist: response.constituents[0].name,
                        title: response.title,
                        year: response.objectEndDate,
                        technique: response.medium,
                        metUrl: response.objectURL
                    })
                }
            })
        }
    })
})

app.get('*',function(req,res){
    res.send({
        error: 'Ruta no válida!'
    })
})


app.listen(port,function(){
    console.log('Up and running!')
})