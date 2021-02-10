const path=require('path')
const express = require('express')
const hbs = require('hbs')
const data = require('./utils/data')

const app = express()
const PORT = 3000

const myPublicFiles = path.join(__dirname, '../public')
const myViewsFiles = path.join(__dirname, '../frontend/views')
const myPartialsFiles = path.join(__dirname, '../frontend/layouts')


app.set('view engine', 'hbs')
app.set('views', myViewsFiles)
hbs.registerPartials(myPartialsFiles)
app.use(express.static(myPublicFiles))

app.get('',(req,res)=>{
    data.getAllList((err,response)=>{
        let myResponse
        if(err) myResponse={error:err,data:false}
        else myResponse={error:false,data:response}
        res.render('posts',myResponse)
    })
})
app.get('/todo/:id', (req,res)=>{
    id=req.params.id
    data.getTodoId(id,(err,response)=>{
        let myResponse
        if(err) myResponse={error:err,data:undefined}
        else{
            myRespone = {error:undefined, data:response}
           data.getTodoComments(id, myRespone, (e, r)=>{
               if(e) res.send(e)
               else res.send({myRespone, r})
           })
           }
    })
})

app.listen(PORT)