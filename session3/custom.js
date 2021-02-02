// counter=0
// const increment = function(){
//     counter++
// }
// const decrement = function(){
//     counter--
// }
// const getCounter = function(){
//     return counter
// }

// const mycounter=(c)=>{
//     return{
//         add(x){console.log(c+x)},
//         sub(x){console.log(c-x)},
//     }
// }
// const y= mycounter(15)
// y.add(10)
// y.add(5)

// const mycallBack= (num)=>{
//     setTimeout(()=>{
//         console.log(num);
//     })
//     mycallBack(4)
// }
// mycallBack(5)


class Person{
    constructor(fname,lname,age){
        this.fname=fname
        this.lname=lname
        this.age=age 
    }
    getFullName(){
        console.log(`Name is ${this.fname} ${this.lname} `)
    }
    getBrithYear(){
        console.log(`BrithYear is ${2021-this.age}`)
    }
}
class Student extends Person{
    constructor(fname,lname,age,sub=[]){
        super(fname,lname,age)
        this.sub=sub
    }
    addSub(sub){
        this.sub.push(sub)   
    }
    showAllSub(){
        this.sub.forEach(s=>{
            console.log(s)
        })
    }
}
class Teacher extends Person{
    constructor(fname,lname,age,salary){
        super(fname,lname,age)
        this.salary=salary
    }
    getNet(){
        const x=this.salary*0.1
        console.log(`Net Salary is ${this.salary-x}`) 
    }
}
const p = new Student('Ahmed', 'Mohammed', 20)
p.getFullName()
p.getBrithYear()
p.addSub(['en',60])
p.addSub(['en',60])
p.addSub(['en',60])
p.showAllSub()
const t = new Teacher('Qqqqq', 'zzzzz', 40,5000)
t.getNet()
