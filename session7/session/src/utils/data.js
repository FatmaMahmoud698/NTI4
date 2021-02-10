const request = require('request')
const path = require('path')
// const https= require('https')
commonUrl='http://medical.marwa-radwan.com/api/'
// console.log(commonUrl)
// enUrl=path.join(commonUrl,'blog/1')
// arUrl=path.join(commonUrl,'blog/2')
// enSingleUrl=path.join(commonUrl,'SingleBlog/1/1')
// arSingleUrl=path.join(commonUrl,'SingleBlog/1/2')
// console.log(enUrl)

const getAllblogs=(lan,callback)=>{
    let urlc, errMsgApi, errMsg
    if(lan=='ar'){
        urlc= 2
        errMsgApi='يوجد مشكلة في اللينك'
        errMsg='يوجد مشكلة في السيرفر'
    } 
    else {
        urlc= 1
        errMsgApi='Api error'
        errMsg='server error'
    }
    request({url:`${commonUrl}blog/${urlc}`,json:true},(error,info,body)=>{
        if(error) callback(errMsgApi,undefined)
        else if(info.error) callback(errMsg, undefined)
        else callback(undefined,body) 
    })
}
const getSingleblog = (lan,id,callback)=>{
    let urlc, errMsgApi, errMsg
    if(lan=='ar'){
        urlc= 2
        errMsgApi='يوجد مشكلة في اللينك'
        errMsg='يوجد مشكلة في السيرفر'
    } 
    else {
        urlc= 1
        errMsgApi='Api error'
        errMsg='server error'
    }
    request({url:`${commonUrl}SingleBlog/${id}/${urlc}`,json:true},(error,info,body)=>{
        if(error) callback(errMsgApi,undefined)
        else if(info.error) callback(errMsg, undefined)
        else callback(undefined,body) 
    })
}

module.exports={
    getAllblogs,
    getSingleblog
}
