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

app.get('/',(req,res)=>{
    url='en'
    data.getAllblogs(url,(err,response)=>{
        let myResponse
        if(err) myResponse={error:err,data:false}
        else {
            myResponse={error:false,data:response.data}
        }
        res.render('blogs',myResponse)
        // res.send(myResponse.data)
    })
})


app.get('/ar',(req,res)=>{
    url='ar'
    data.getAllblogs(url,(err,response)=>{
        let myResponse
        if(err) myResponse={error:err,data:false}
        else {
            myResponse={error:false,data:response.data}
        }
        res.render('blogs_ar',myResponse)
    })
})
app.get('/en/:id',(req,res)=>{
    id=req.params.id
    data.getSingleblog('en',id,(err,response)=>{
        let myResponse
        if(err) myResponse={error:err,data:false}
        else {
            myResponse={error:false,data:response.data}            
        }
        res.render('single',myResponse)
    })
})
app.get('/ar/:id',(req,res)=>{
    id=req.params.id
    data.getSingleblog('ar',id,(err,response)=>{
        let myResponse
        if(err) myResponse={error:err,data:false}
        else {
            myResponse={error:false,data:response.data} 
            // myResponse.data[0].lang='ar'           
        }
        res.render('single_ar',myResponse)
    })
})
app.listen(PORT)