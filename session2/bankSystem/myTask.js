customers = getCustomers()
addbtn = document.querySelector('#addbBtn')
showAllBtn = document.querySelector('#showAllBtn')
showBtn = document.querySelector('#showBtn')
function getCustomers(){
    return(JSON.parse(localStorage.getItem('customers')) || [])
}
const saveCustomers = function(){
    localStorage.setItem('customers', JSON.stringify(customers))
}
const showAllCustomers = function(){
    customers = getCustomers()
    tableBody = document.querySelector('tbody')
    tableBody.innerText=''
    customers.forEach(customer=>{
        let tr = document.createElement('tr')
        addTd(tr,customer.accNum,'textContent')
        addTd(tr,customer.cName,'textContent')
        addTd(tr,customer.balance,'textContent')
        addTd(tr,'<button class ="btn btn-danger mx-2" onclick="deleteCst('+customer.accNum+')">delete</button><button class ="btn btn-success mx-2">edit</button>','innerHTML')
        tableBody.appendChild(tr)
    })
    console.log(customers)
}
const addCustomer = function(customer){
    customers.push(customer)
    saveCustomers()
}
const showHide = function(btnName,sectionId,txt1, txt2) {
    document.querySelectorAll('section').forEach((section, index)=>{
        if(index!=0) section.classList.add('d-none')
    })
    if(btnName.textContent == txt1 ){
        btnName.textContent=txt2
        document.querySelector(`#${sectionId}`).classList.remove('d-none');
    }else{
        btnName.textContent=txt1
    }
    
}
addbtn.addEventListener('click', function(){
    showHide(addbtn, 'addCustomer', 'Add Customer','Hide Customer')
})
showAllBtn.addEventListener('click',function(e){
    showHide(showAllBtn, 'allCustomers', 'show All Customer','Hide customers')
    showAllCustomers();
})
document.querySelector('#addForm').addEventListener('submit',function(e){
    e.preventDefault()
    const ele = this.elements
    let user = {
        accNum : Date.now(),
        cName: ele.cName.value,
        balance: ele.balance.value
    }
    addCustomer(user)
    this.reset()
    showHide()
})
const addTd=function(tr,value,type){
    td = document.createElement('td')
    td[type]=value
    tr.appendChild(td)
}
function deleteCst(id){
    customers = customers.filter(customer=>{
        return customer['accNum']!=id
    })
    localStorage.setItem('customers', JSON.stringify(customers))
    showAllCustomers()
}
function editCst(id){
    let cust = customers.filter(customer=>{
        return customer['accNum']==id
    })
    let section = document.querySelector('#addCustomer');
    section.classList.remove('d-none');
    document.querySelector('#allCustomers').classList.add('d-none');   
    let elements=document.querySelector('#addForm').elements
    console.log(elements)
    elements['cName'].value=cust[0].cName
    elements['balance'].value=cust[0].balance
    elements[2].value='Edit Customer'

}
showBtn.addEventListener('click',function(e){
    showHide(showBtn, 'searchForm', 'show Customer','Hide Customer')
})
document.querySelector('#searchAcc').addEventListener('input',function(e){
    let cust = customers.filter(customer=>{
        return customer['accNum']==this.value
    })
    console.log(cust[0]["accNum"])
    if(cust.length!=0){
        console.log(cust[0]["accNum"])
        let section = document.querySelector('#singleCustomer')
        section.classList.remove('d-none');
        section.innerHTML='<div><span>'+cust[0]["accNum"]+'</span><h3>'+cust[0]["cName"]+'</h3><h4>'+cust[0]["balance"]+' $</h4></div>';
    }else{
        console.log('Not Found')      
    }
    
})