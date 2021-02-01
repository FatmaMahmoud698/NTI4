let taskTypes=['type 1', 'type 2', 'type 3','type 4']
let tasks=JSON.parse(localStorage.getItem('tasks')) || []
const validateData = function(item, validationObj){
        let errors=[]
        options = Object.keys(validationObj)
        options.forEach(option => {
        if(option=='required'){
            if(!item || item == '')  errors.push('required')
        }
        else if(option=='unique'){}
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
    titleValidation = validateData(title,{required:true, unique:'title', minlength:5})
    if(titleValidation.length>0) console.log(titleValidation)
    else{
        tasks.push(task)
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }
}
const showAllTasks=function(){
    console.log(tasks)
}

addNewTask(1,'wwwwwwwwwwwwwwwww','b','c')
showAllTasks()