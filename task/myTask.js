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
const delCustomer= function (id){
    customers = customers.filter(cust=>{
        return cust['accNum']!=id
    })
    localStorage.setItem('customers', JSON.stringify(customers))
}
const editCustomer = function(btnEdit,index){
    showHide(btnEdit, 'editCustomer', 'edit','edit')
    let ele = document.querySelector('#editForm').elements
    ele.cName.value = customers[index]['cName']
    ele.balance.value = customers[index]['balance']
    ele.editAction.value = index
}
const createNewElement = (elementName,parent,txt='', classes='') =>{
    element = document.createElement(elementName)
    if(classes!='') element.className = classes
    if(txt!='')element.textContent = txt
    parent.appendChild(element)
    return element
}
const showAllCustomers = function(){
    customers = getCustomers()
    tableBody = document.querySelector('tbody')
    tableBody.innerText=''
    customers.forEach((customer,index)=>{
        tr=createNewElement('tr',tableBody)
        td1=createNewElement('td',tr,customer.accNum)
        td2=createNewElement('td',tr,customer.cName)
        td2=createNewElement('td',tr,customer.balance)
        td3=createNewElement('td',tr)
        td4=createNewElement('td',tr)
        creatBtnEve(td3,index,'edit','btn btn-warning')
        creatBtnEve(td3,customer.accNum,'delete','btn btn-danger','showAll')
        creatBtnEve(td4,index,'Add Balance','btn btn-success')
        creatBtnEve(td4,index,'Withdraw Balance','btn btn-danger')
    })
}
const addCustomer = function(customer){
    customers.push(customer)
    saveCustomers()
}
const showHide = function(btnName,sectionId,txt1, txt2) {
    document.querySelector('#searchAcc').value=''
    btnName != addbtn ? addbtn.textContent='Add Customer' : null 
    btnName != showAllBtn ? showAllBtn.textContent='Show All Customers' :null
    btnName != showBtn ? showBtn.textContent='Show Customer':null
    document.querySelectorAll('section').forEach((section, index)=>{
        if(index!=0) section.classList.add('d-none')
    })
    if(btnName){
        if(btnName.textContent == txt1 ){
            btnName.textContent=txt2
            document.querySelector(`#${sectionId}`).classList.remove('d-none');
        }else{
            btnName.textContent=txt1
        }
    }
    
}
addbtn.addEventListener('click', function(){
    showHide(addbtn, 'addCustomer', 'Add Customer','Hide Customer')
})
showAllBtn.addEventListener('click',function(e){
    showHide(showAllBtn, 'allCustomers', 'Show All Customers','Hide Customers')
    showAllCustomers();
})
showBtn.addEventListener('click',function(e){
    showHide(showBtn, 'searchForm', 'Show Customer','Hide Customer')
})
document.querySelector('#addForm').addEventListener('submit',function(e){
    e.preventDefault()
    const ele = this.elements
    let cName=ele.cName.value
    let balance=ele.balance.value
    let user = {
        accNum : Date.now(),
        cName: cName,
        balance: balance
    }
    myValidators={
        Name:validateData(cName,{required:true, minlength:5, maxlength:100}),
        Balance:validateData(balance,{required:true, min:100,max:10000}),
    }
    myValidatorsKeys=Object.keys(myValidators);
    validationErrFlag=false
    myValidatorsKeys.forEach(key=>{
        if(myValidators[key].length>0) validationErrFlag=true
    })
    if(validationErrFlag) console.log(myValidators)
    else{
        addCustomer(user)
        this.reset()
        showHide()
    }
})
document.querySelector('#searchAcc').addEventListener('input',function(e){
    let cust= customers.filter(customer=>{
        return customer['accNum']==this.value
    })
    let section = document.querySelector('#singleCustomer')
    section.classList.remove('d-none');
    if(cust.length!=0){
        let indexCust=customers.findIndex(customer => customer.accNum == cust[0]['accNum'])
        section.innerHTML=''
        let table=createNewElement('table',section,'','table')

        let thead=createNewElement('thead',table)
        let tr1=createNewElement('tr',thead)
        let th1=createNewElement('th',tr1,'id')
        let th2=createNewElement('th',tr1,'Name')
        let th3=createNewElement('th',tr1,'Balance')
        let th4=createNewElement('th',tr1,'actions')
        let th5=createNewElement('th',tr1,'Control Balance')

        let tbody=createNewElement('tbody',table)
        let tr2=createNewElement('tr',tbody)
        let td1=createNewElement('td',tr2,cust[0]['accNum'])
        let td2=createNewElement('td',tr2,cust[0]['cName'])
        let td3=createNewElement('td',tr2,cust[0]['balance'])
        let td4=createNewElement('td',tr2)
        let td5=createNewElement('td',tr2)
        creatBtnEve(td4,indexCust,'edit','btn btn-warning')
        creatBtnEve(td4,cust[0]['accNum'],'delete','btn btn-danger','search')
        creatBtnEve(td5,indexCust,'Add Balance','btn btn-success')
        creatBtnEve(td5,indexCust,'Withdraw Balance','btn btn-danger')
        
    }else{
        section.innerHTML=''
        let div=createNewElement('div',section,'Not Found','bg-danger')     
    }
})
document.querySelector('#editForm').addEventListener('submit',function(e){
    e.preventDefault()
    const ele = this.elements
    let index= ele.editAction.value
    let cName=ele.cName.value
    let balance=ele.balance.value
    myValidators={
        Name:validateData(cName,{required:true, minlength:5, maxlength:100}),
        Balance:validateData(balance,{required:true, min:100,max:10000}),
    }
    myValidatorsKeys=Object.keys(myValidators);
    validationErrFlag=false
    myValidatorsKeys.forEach(key=>{
        if(myValidators[key].length>0) validationErrFlag=true
    })
    if(validationErrFlag) console.log(myValidators)
    else{
        customers[index]['cName']=cName
        customers[index]['balance']=balance
        saveCustomers()
        showHide()
    }
})
document.querySelector('#balanceForm').addEventListener('submit',function(e){
    e.preventDefault()
    const ele = this.elements
    let index= ele.cstIndex.value
    let operation=ele.balanceBtn.value
    operation=='Withdraw Balance'?
        `${customers[index]['balance'] -= ele.balance.value}` :
        customers[index]['balance']=parseInt(customers[index]['balance'],10)+parseInt(ele.balance.value,10)
    saveCustomers()
    showHide()
})
const creatBtnEve = function(parent,customer,txt,classes,place=false){
    let btn=createNewElement('button',parent,txt,classes)
    btn.addEventListener('click', (e)=>{
        if(txt=='edit'){
            editCustomer(btn,customer)
        }else if(txt=='delete'){
            delCustomer(customer)
            if(place=='search') parent.parentNode.remove()
            else if(place=='showAll') showAllCustomers()
        }else if(txt=='Add Balance'||txt=='Withdraw Balance'){
            controlBalance(btn,customer,txt)
        }
    })
}
const controlBalance = function(btn,index,operation){
    showHide(btn, 'balanceSection',operation,operation)
    let ele = document.querySelector('#balanceForm').elements
    ele.balance.value=''
    ele.cstIndex.value = index
    ele.balanceBtn.value = operation
}
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
    else if(option=='min'){
        value = validationObj[option]
        if(item<value) errors.push(`minimum number must be more than ${value}`)
    }
    else if(option=='max'){
        value = validationObj[option]
        if(item>value) errors.push(`maximum number must be less than ${value}`)
    }        
});
return errors
}