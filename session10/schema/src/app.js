const express=require('express')
require('./db/db.js')
const userModel = require('./routes/user')

const app= express()
app.use(express.json())

app.use(userModel)


app.listen(3000)
