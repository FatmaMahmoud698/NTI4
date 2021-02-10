// const yargs = require('yargs')
// yargs.command({
//     command:'show',
// builder:{
//     title:{
//         describe:'show our title',
//         type:'string',
//         demandOption:true
//     },
//     content:{
//         describe:'show our content',
//         type:'string',
//         demandOption:true
//     },
//     type:{
//         describe:'show our type',
//         type:'string',
//         demandOption:true
//     }
// },
//     handler(argv){
// console.log(argv.title+argv.content+argv.type)
//     }
// })
// yargs.parse()
// fs =require('fs')
// const writeData= (task)=>{
//         let tasks=readData()
//         tasks.push(task);
//         fs.writeFileSync('data.json',JSON.stringify(tasks));
// }
// const readData= ()=>{
//     let tasks=[]
//     try{
//         tasks=JSON.parse(fs.readFileSync('data.json').toString());
//     }catch(e){
//         tasks=[]
//     }
//     return tasks   
// }
// const d={
//     title:argv.title,
//     content:argv.content,
//     type:argv.type
// }
// writeData(d)
/*
argv.x+argv.y
add --x --y
x required number
y required number
in terminal node app show --title=oo --content=ooo --type=222
*/



const yargs = require('yargs')
const myMethods = require('./myfunctions')
yargs.command({
    command:'addTask',
    builder:{
        title:{
            type:'string',
            demandOption:true
        },
        content:{
            type:'string',
            demandOption:true
        }
    },
    handler(argv){
        task= {
            title: argv.title,
            content: argv.content
        }
        myMethods.addNewTask(task)
    }
})
yargs.command({
    command:'delTask',
    handler(argv){
        console.log('test del')
    }
})
yargs.command({
    command:'editTask',
    handler(argv){
        console.log('test edit')
    }
})
yargs.command({
    command:'showAllTasks',
    handler(argv){
        const result = myMethods.loadData()
        console.log(result)
    }
})
yargs.command({
    command:'searchTask',
    builder:{
        title:{
            type:'string',
            demandOption:true
        },
    },
    handler(argv){
        const result = myMethods.searchTask(argv.title)
        console.log(result)
    }
})
yargs.parse()