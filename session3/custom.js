counter=0
const increment = function(){
    counter++
}
const decrement = function(){
    counter--
}
const getCounter = function(){
    return counter
}

const mycounter=(c)=>{
    return{
        add(x){console.log(c+x)},
        sub(x){console.log(c-x)},
    }
}
const y= mycounter(15)
y.add(10)
y.add(5)