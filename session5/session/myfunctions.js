const fs = require('fs')
const loadData = () => {
    try{
        data = JSON.parse(fs.readFileSync('todo.json').toString())
        if(!data.length) throw new Error() //Array.isArray(data)
    }
    catch(e){
        data = []
    }
    return data
}
const addNewTask =(task)=>{
    data = loadData()
    data.push(task)
    fs.writeFileSync('todo.json', JSON.stringify(data))
}
const searchTask=(title)=>{
    data = loadData()
    da=data.filter(d => d.title == title)
    result= da.length ? da: 'not found'
    return result
}
module.exports={
    loadData,
    addNewTask,
    searchTask
}
pushedarray
headers=[]
for(i=0;i<headers.length;i++){
    if(newtask.headers[i]){
        pushedarray=push()
    }
}