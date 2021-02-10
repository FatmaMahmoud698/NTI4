const express=require('express')
require('./dbConnection/mongoose.js')
const doctorModel = require('./routers/doctorRoute')

const app= express()
app.use(express.json())

app.use(doctorModel)


app.listen(3000)
