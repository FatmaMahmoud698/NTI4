account={
    name:'',
    income:100,
    tax:1
}
let addIncome=function(inc){
    account.income += inc
    account.tax += inc*0.1
}
let resetAccount=function(){
    account.income=0
    account.tax=0
}
let showAccount=function(){
console.log(
    `name  is ${account.name} 
    income is ${account.income}
    tax is ${account.tax}`
)
}
addIncome(500)
showAccount()
addIncome(500)
showAccount()
resetAccount()
showAccount()
