const path=require('path')
const express = require('express')
const hbs = require('hbs')
const { MongoClient, ObjectID} = require('mongodb')
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
app.use(express.urlencoded())

function testConnect(callback){
    const myDBUrl = 'mongodb://127.0.0.1:27017'
    const dbName = "myMongoTask"
    MongoClient.connect(
        myDBUrl,
        {useNewUrlParser:true, useUnifiedTopology:true},
        (error, client)=>{
            if(error) return console.log('db error')
            
            const db = client.db(dbName)
            callback(db)
        })
}

app.get('', (req,res)=>{
    res.render('home')
})

app.post('/addTask', function(req, res){
    const data = req.body
    db = testConnect((db)=>{
     db.collection('tasks').insert(data, (err, result)=>{
         if(err) return console.log(err)
         console.log(`task inserted succesfully ${result.insertedCount} inserted`)
     })
    })

    res.redirect('/showAll')
});

app.get('/addTask',(req,res)=>{
    // res.redirect('/showAll')
    res.render('home')
})

app.get('/showAll', (req,res)=>{
    db = testConnect((db)=>{
        db.collection('tasks').find().toArray((err, result)=>{
                if(err) res.render('error')
                else res.render('tasks',{data:result})
            })
        })
})
app.get('/edit/:id', (req,res)=>{
    id=req.params.id
    db = testConnect((db)=>{
        db.collection('tasks').findOne(
            {_id :new ObjectID(`${id}`)},
            (err, data)=>{
                if(err) res.render('error')
                else res.render('home',{editTask:data})
            }
        )
        })
})
app.post('/edit/:id', (req,res)=>{
    id=req.params.id
    const data = req.body
    db = testConnect((db)=>{
        db.collection('tasks').updateOne(
            {_id :new ObjectID(`${id}`)},
            {$set:{title:data.title,content:data.content}})
            .then(()=>{
                res.redirect('/showAll')
            })
            .catch((er)=>res.send(er))
        })
})
app.get('/delete/:id', (req,res)=>{
    id=req.params.id
    const data = req.body
    db = testConnect((db)=>{
        db.collection('tasks').deleteOne(
            {_id :new ObjectID(`${id}`)})
            .then(()=>{res.redirect('/showAll')})
            .catch((er)=>res.send(er))
        })
})
app.listen(PORT)