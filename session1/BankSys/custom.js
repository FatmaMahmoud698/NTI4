let customers=JSON.parse(localStorage.getItem('customers')) || []
const validateData = function(item, validationObj){
    let errors=[]
    options = Object.keys(validationObj)
    options.forEach(option => {
    if(option=='required'){
        if(!item || item == '')  errors.push('required')
    }
    else if(option=='unique'){
        customers.forEach(customer =>{
            if((customer[validationObj[option]])==item){
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
function showHide(type){
    element = document.getElementById(`${type}`);
   if(element.classList.contains('d-none')){
    var sections = document.querySelectorAll("section");
    console.log(sections[0])
       element.removeClass( "d-none" )
   }
}
//  لم اقم بانهاء التاسك بسبب ضيق الوقت ولكن قمت بمراجعة الكود 
//  في السيشن التالي واستكمال التاسك المطلوب 

