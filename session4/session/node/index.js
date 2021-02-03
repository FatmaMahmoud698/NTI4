// var validator = require('validator');
// console.log(validator.isEmail('foo@bar.com'))
// console.log('hello ')
fs =require('fs')
const writeData= (task)=>{
        let tasks=readData()
        tasks.push(task);
        fs.writeFileSync('data.json',JSON.stringify(tasks));
}
const readData= ()=>{
    let tasks=[]
    try{
        tasks=JSON.parse(fs.readFileSync('data.json').toString());
    }catch(e){
        tasks=[]
    }
    return tasks   
}
const d={
    d1:"q",
    d2:"w"
}
writeData(d)
console.log(readData());