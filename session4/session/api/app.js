// const getData = async() =>{
//     try{
//         const response =  await fetch('https://jsonplaceholder.typicode.com/photos?_limit=20')
//         const data = await response.json()
//         const mydata = document.querySelector('#mydata')
//         data.forEach(element => {
//             console.log(element)
//             div = document.createElement('div')
//             div.className="col-3"
//             img = document.createElement('img') 
//             img.setAttribute('src',element.url)
//             img.className="img-fluid"
//             div.appendChild(img)
//             mydata.appendChild(div)
//         });
//     }
//     catch(e){
//         console.log('fe error ', e.message)
//     }
// }
// getData()

function createNewElement(parent, element, txt='',attributes=[], classes='' ){
    myNewElement = document.createElement(element)
    if(classes!='') myNewElement.className=classes
    if(txt!='') myNewElement.innerText = txt
    if(attributes.length!=0){
        attributes.forEach(attribute=>{
            myNewElement.setAttribute(attribute.attrName,attribute.attrVal)
        })    
    }
    parent.appendChild(myNewElement)
    return myNewElement
}
const getCorona = async() => {
    const myTable = document.getElementById('myDataTable')
    try{
        const data = await fetch('https://backtest.achilleseg.com/api/ProductsUpdated?lang_id=1&page=0&limit=10')
        const jsonData = await data.json()
        const products = jsonData['result']['product_data']
        const headers = ['products_price','final_price','products_name']
        products.forEach((product,i) => {
                tr = createNewElement(myTable, 'tr')
                createNewElement(tr, 'td', i+1)
                headers.forEach(head=>{
                    createNewElement(tr, 'td', product[head])
                })
                url=`https://backtest.achilleseg.com/${product.image_path}`
                attributes = [
                    { attrName:'width', attrVal:100},
                    { attrName:'src', attrVal:url }
                ]
                td=createNewElement(tr, 'td')
                createNewElement(td, 'img','',attributes)
        });
    }
    catch(e){
        tr = createNewElement(myTable,'tr')
        attributes = [
            { attrName:'colspan', attrVal:6},
            { attrName:'id', attrVal:1 }
        ]
        createNewElement(tr, 'td', e.message,attributes, "alert alert-danger bg-danger text-white h2")
    }
}
getCorona()