let taskTypes=['type 1', 'type 2', 'type 3','type 4']
let tasks=JSON.parse(localStorage.getItem('tasks')) || []
const validateData = function(item, validationObj){
        let errors=[]
        options = Object.keys(validationObj)
        options.forEach(option => {
        if(option=='required'){
            if(!item || item == '')  errors.push('required')
        }
        else if(option=='unique'){
            tasks.forEach(task =>{
                if((task[validationObj[option]])==item){
                    errors.push('Unique')
                }
            })
        }
        else if(option=='minlength'){
            value = validationObj[option]
            if(item.length<value) errors.push(`minimum length must be more than ${value}`)
        }
        else if(option=='maxlength'){
            value = validationObj[option]
            if(item.length>value) errors.push(`maximum length must be less than ${value}`)
        }        
    });
    return errors
}
const addNewTask = function (id, title, content, type, status=false){
    const task={ id, title, content, type, status }
    myValidators={
        id:validateData(id,{required:true}),
        title:validateData(title,{required:true, minlength:5, maxlength:20}),
        content:validateData(content,{required:true, minlength:15}),
        type:validateData(type,{required:true})
    }
    myValidatorsKeys=Object.keys(myValidators);
    validationErrFlag=false
    myValidatorsKeys.forEach(key=>{
        if(myValidators[key].length>0) validationErrFlag=true
    })
    if(validationErrFlag) console.log(myValidators)
    else{
        tasks.push(task)
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }
}
const showAllTasks=function(){
    console.log(tasks)
}
function getbyId (id) {
    return tasks.find(x => x.id == id);
}
function getByTitle(title) {
    x = tasks.filter(task=>{
        return task.title==title
    })
    return x
}
// addNewTask(Date.now(),'Ahmed','anbvcgjuiytrfghb','c')
// showAllTasks()
console.log(getByTitle('Ahmed'))
console.log(getbyId(1612201592290))