const request = require('request')
const todoUrl='https://jsonplaceholder.typicode.com/todos'

const getAllList=(callback)=>{
    request({url:todoUrl,json:true},(error,data,body)=>{
        if(error) callback('Api error',undefined)
        else if(data.error) callback('server error', undefined)
        else callback(undefined,body) 
    })

}
const getTodoId=(id,callback)=>{
    request({url:`${todoUrl}/${id}`,json:true},(error,data,body)=>{
        if(error) callback('Api error',undefined)
        else if(data.error) callback('server error', undefined)
        else if(data=={}) callback('no id', undefined)
        else {
            callback (undefined, body)
            getTodoComments(id, body, (err,res)=>{
                alldata= {post:body, comments:res}
                callback(undefined, alldata)
            })
        }
    })
}
const getTodoComments=(id,body,callback)=>{
    request({url:`${todoUrl}/${id}/comments`,json:true},(error,data,body)=>{
        if(error) callback('Api error',undefined)
        else if(data.error) callback('server error', undefined)
        else if(data=={}) callback('no id', undefined)
        else callback(undefined,body) 
    })
}

module.exports={
    getAllList,
    getTodoComments,
    getTodoId
}