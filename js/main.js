var productName = document.getElementById("pname");
var productCategory = document.getElementById("pcategory");
var productPrice = document.getElementById("pprice");
var productDescription = document.getElementById("pdesc");
var searchWord = document.getElementById("searchWord");
var updatePro = document.getElementById("updatePro");
var currentIndex;
var nameAlert = document.getElementById("nameAlert");
var priceAlert = document.getElementById("priceAlert")
var categoryAlert = document.getElementById("categoryAlert")
var addBtn = document.getElementById("addPro")



if(localStorage.getItem("productData") === null){
   var productList =[];
}
else{
   var productList = JSON.parse(localStorage.getItem("productData"));
}
displayData();


function addProduct() {
    if(validateProductName() == true &&
      validateProductCategory() == true &&
      validateProductPrice() == true &&
      productDescription.value !=''
       ){
    var product = {
        name: productName.value,
        category: productCategory.value,
        price: productPrice.value,
        desc: productDescription.value
    }
    
    productList.push(product);
    localStorage.setItem("productData", JSON.stringify(productList) );
    displayData();
    clearData();
}
else{
    
}
}

addBtn.addEventListener("click",addProduct)


function displayData() {
    var trs = '';
    for (var i = 0; i < productList.length; i++) {
        trs += `
           <tr>
           <td>${i}</td>
           <td>
            ${productList[i].name} 
            </><td>
           ${productList[i].category }
            </td><td>
             ${productList[i].price }
            </td><td>
             ${productList[i].desc} 
             </td><td>
            <button class='btn bg-warning' onclick='deleteProduct(${i} );'>delete</button>
            </td><td>
            <button onclick='updateData(${i});' class='btn bg-danger'>update</button>
            </td></tr>`;
    }
    document.getElementById("tbody").innerHTML = trs;

}


function deleteProduct(index){
    productList.splice(index,1)
    localStorage.setItem("productData", JSON.stringify(productList))
    displayData();
}

function clearData(){
    productName.value = " ";
    productCategory.value = " ";
    productPrice.value = " ";
    productDescription.value = " ";
    }



function updateData(index){  

    
    productName.value = productList[index].name ;
    productCategory.value = productList[index].category;
    productPrice.value = productList[index].price;
    productDescription.value = productList[index].desc;
     
    currentIndex=index;
    document.getElementById('addPro').style.display='none';
    document.getElementById('updatePro').style.display='inline'

}



function editData(){
   

    productList[currentIndex].name = productName.value;
    productList[currentIndex].category= productCategory.value;
    productList[currentIndex].price =  productPrice.value;
    productList[currentIndex].desc =productDescription.value;

    document.getElementById('updatePro').style.display='none';
    document.getElementById('addPro').style.display='inline'

    localStorage.setItem("productData", JSON.stringify(productList));
    displayData();
    clearData();

}



function searchData(){
    var trs = '';
    for (var i = 0; i < productList.length; i++) {

        if(productList[i].name.toLowerCase().includes(searchWord.value.toLowerCase())){
            trs += `
           <tr>
           <td>${i}</td>
           <td>
            ${productList[i].name.replace(searchWord.value, `
            <span style="background-color: yellow;">${searchWord.value}</span>
            `)} 
            </><td>
           ${productList[i].category }
            </td><td>
             ${productList[i].price }
            </td><td>
             ${productList[i].desc} 
             </td><td>
            <button class='btn bg-warning' onclick='deleteProduct(${i} );'>delete</button>
            </td><td>
            <button onclick='updateData(${i});' class='btn bg-danger'>update</button>
            </td></tr>`;
        }
    }
    document.getElementById("tbody").innerHTML = trs;
}

function validateProductName(){
    var regex = /^[A-Z][a-zA-Z ]{3,15}$/ ;
    
    var pName = productName.value;
    regex.test(pName)
    if( regex.test(pName) == true){
       
        nameAlert.classList.add("d-none")
        productName.classList.remove("is-invalid")
        productName.classList.add("is-valid");
        addBtn.removeAttribute("disabled");
        return true;
    }
    else{
        nameAlert.classList.remove("d-none")
        productName.classList.add("is-invalid");
        addBtn.setAttribute("disabled","true");
    
        return false;
    }
}

productName.addEventListener("blur",validateProductName)


function validateProductCategory(){
    var regex = /^[A-Z][a-zA-Z ]{1,15}$/ ;
    
    var pCategory = productCategory.value;
    regex.test(pCategory)
    if( regex.test(pCategory) == true){
        // alert("sa7");
       
        categoryAlert.classList.add("d-none")
        productCategory.classList.remove("is-invalid")
        productCategory.classList.add("is-valid");
        addBtn.removeAttribute("disabled");
        return true;
    }
    else{
        categoryAlert.classList.remove("d-none")
        productCategory.classList.add("is-invalid");
        addBtn.setAttribute("disabled","true");
    
        return false;
    }
}

productCategory.addEventListener("blur",validateProductCategory);



function validateProductPrice(){
    var regex = /[0-9]{3}/;
    
    var pPrice = productPrice.value;
    regex.test(pPrice)
    if( regex.test(pPrice) == true){
       
        priceAlert.classList.add("d-none")
        productPrice.classList.remove("is-invalid")
        productPrice.classList.add("is-valid");
        addBtn.removeAttribute("disabled");
        return true;
    }
    else{
        priceAlert.classList.remove("d-none")
        productPrice.classList.add("is-invalid");
        addBtn.setAttribute("disabled","true");
    
        return false;
    }
}



productPrice.addEventListener("blur" , validateProductPrice)
