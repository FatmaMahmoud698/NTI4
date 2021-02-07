const express = require('express')
const path = require('path')
const app = express()

const publicDir = path.join(__dirname , './public')
// console.log(publicDir)
app.use(express.static(publicDir))
 
const PORT = 3000

app.get('',(req,res)=>{
    res.send('hello')
})
app.get('/x',(req,res)=>{
    res.send('<h2> hello x</h2>')
})
app.get('/json',(req,res)=>{
    res.send({
        name:'ahmed'
    })
})
app.listen(PORT)


// console.log(__dirname)
// console.log(__filename)
