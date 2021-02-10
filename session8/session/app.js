const {MongoClient, ObjectID}=require('mongodb')
// const mongodb = require('mongodb')
// const MongoClient=mongodb.MongoClient
// const ObjectID = new ObjectID()

const myDBUrl= 'mongodb://localhost:27017'
const dbName='myNewG4'
data = [
    {name:'a'},
    {name:'b',age:20},
    {age:30},
    {salary:2000}
]
MongoClient.connect(
    myDBUrl,
    {useNewUrlParser:true,useUnifiedTopology:true},
    (error,client)=>{
        if(error) return console.log(error)
        db = client.db(dbName)
        // insert
        // db.collection('t1').insertOne({name:'fatma'})
        // db.collection('newCollection').insert(data)
        // db.collection('newCollection').findOne({name:'a'}).toArray()
        
        
        //select
        // db.collection('newCollection').findOne(
        //     {_id:new ObjectID('60225bdb98f73b3de087728b')},(err,data)=>{console.log(data)}
        // )
        // db.collection('newCollection').find(
        //     {_id:new ObjectID('60225bdb98f73b3de087728b')}).toArray((err,data)=>{
        //         console.log(data)}
        // )


        db.collection('newCollection').updateMany(
            {x:{$exists:true}},
            {$inc:{x:1}}
            )
            .then((res)=>console.log(res.modifiedCount))
            .catch((err)=>console.log(err))
        db.collection('newCollection').deleteMany(
            {x:{$exists:true}}
        )
        .then((res)=>console.log(res.deletedCount))
        .catch((err)=>console.log(err))
    })