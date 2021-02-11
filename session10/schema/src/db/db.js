const mongoose=require('mongoose')
mongoose.connect(process.env.db_connection,{
    useCreateIndex:true, useFindAndModify:true,
    useNewUrlParser:true, useUnifiedTopology:true
})