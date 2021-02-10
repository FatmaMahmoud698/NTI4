const express = require('express')
const path = require('path')
const hbs=require('hbs')
const app = express()

const publicDir = path.join(__dirname , '../public')
// console.log(publicDir)
const viewDir = path.join(__dirname , '../myViews')
const layouts = path.join(__dirname , '../layouts')


app.set('view engine','hbs')
app.set('views',viewDir)
hbs.registerPartials(layouts)
app.use(express.static(publicDir))
 
app.get('',(req,res)=>{
    name="fatma mahmoud"
    res.render('test',{
        data:name,
        age:30
    })
})
app.get('/a',(req,res)=>{
    res.render('first')
})
app.get('/b',(req,res)=>{
    res.render('second')
})
const PORT = 3000


app.listen(PORT)

// app.get('',(req,res)=>{
//     res.send('hello')
// })
// app.get('/x',(req,res)=>{
//     res.send('<h2> hello x</h2>')
// })
// app.get('/json',(req,res)=>{
//     res.send({
//         name:'ahmed'
//     })
// })



// console.log(__dirname)
// console.log(__filename)
