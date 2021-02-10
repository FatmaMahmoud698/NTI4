// const https= require('https')
const request = require('request')
const albumsApi= 'https://jsonplaceholder.typicode.com/albums'
// data=''
let getAlbums= (callback)=>{
    request({url:albumsApi,json:true},(err,albumsData)=>{
        if (err) callback(err, undefined)
        else callback(undefined,albumsData)
    })

}

// let getAlbums= (cb)=>{
//     const req= https.request(albumsApi,async(response)=>{
//         response.on('data',(chunk)=>{
//             data+=chunk.toString()
//         })
//         response.on('end',()=>{
//             data=JSON.parse(data)
//             cb(undefined,data)
//         })
//     })
//     req.on('error',(error)=>console.log(cb('error',undefined)))
//     req.end()
// }
// getAlbums()
const a = 'test'
const services=[
    {img:'/images/1.jpg',title:'service 1',content:'content 1'},
    {img:'/images/2.jpg',title:'service 2',content:'content 2'},
    {img:'/images/3.jpg',title:'service 3',content:'content 3'},
    {img:'/images/4.jpg',title:'service 4',content:'content 4'},
    {img:'/images/5.jpg',title:'service 5',content:'content 5'},
]
module.exports={
    a,services,getAlbums
}