class Product{
    constructor(productId, productName, productQuantity, productPrice){
        this.productId = productId;
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
        this.Amount = this.productPrice*this.productQuantity;
    }
}
let products = [];
const cashBill_data = "productdData";
function init() {
    if (window.localStorage.getItem(cashBill_data) == null) {
        products.push(item)
        window.localStorage.setItem(cashBill_data, JSON.stringify(products));
    }
    else {
        products = JSON.parse(window.localStorage.getItem(cashBill_data));
    }
}
function renderBill(){
    let htmlDislays = products.map((can)=>{
        return `
            <tr id="tr_${can.productId}">
                <td class="text-center">${can.productId}</td>
                <td class="text-center">${can.productName}</td>
                <td class="text-center">${can.productQuantity}</td>
                <td class="text-center">${can.productPrice}</td>
                <td class="text-center">${can.Amount}</td>
                <td class="btnover">
                    <button class="btn btnRemove" onclick="removeProduct(${can.productId})">Remove</button>
                    <button class="btn btnEdit" onclick="editProduct(${can.productId})">Edit</button>
                    <button class="btn btnUpdate" onclick="updateProduct(${can.productId})">Update</button>
                    <button class="btn btnCancel" onclick="cancelProduct(${can.productId})">Cancel</button>
                </td>
            <tr>
        `
    })
    document.getElementById('tbBill').innerHTML = htmlDislays.join("");
    document.getElementById("totalamount").innerHTML = totalAmount();
}
function addProduct(){
    let productName = document.getElementById("product").value;
    let Quantitys = Number(document.getElementById("quantity").value);
    let productId = getLastProductId() + 1; 
    if(productName == ""){
        alert('Chưa nhập sản phẩm!');
        return;
    }
    let price = getProductPrice(productName);
    let newProduct = new Product(productId, productName, Quantitys, price)
    products.push(newProduct);
    window.localStorage.setItem(cashBill_data, JSON.stringify(products));
    renderBill();
    resetForm();
}
function getProductPrice(productName){
    let price;
    switch(productName) {
        case "Black Caffe" :
            price = 16000; 
            break;
        case "White Caffe" : 
            price = 18000; 
            break;
        case "Orange Juice" :
            price = 20000; 
            break;
        case "Lemon Juice" :
            price = 12000; 
            break;
        default : price = 0;
    }
    return price;
}
function getLastProductId(){
    let pdtTemp = [...products];
    if(pdtTemp.length == 0){
        let productName = document.getElementById("product").value;
        let Quantitys = Number(document.getElementById("quantity").value); 
        let initProduct  = new Product(0, productName, Quantitys);
        pdtTemp.push(initProduct);
    }
    let maxId = pdtTemp.sort((pdt1, pdt2)=>{
        return pdt2.productId - pdt1.productId;
    });
    return maxId[0].productId;
}
function totalAmount(){
    let totalAmount = products.reduce(function(total, pdtpri){
        return total + pdtpri.Amount;
    },0)
    return totalAmount;
}
function removeProduct(productId){
    let comfirmed = window.confirm("Bạn muốn xóa sản phẩm này?");
    console.log(comfirmed);
    if (comfirmed) {
        let index = products.findIndex(function (can) {
            return can.id == productId;
        })
        products.splice(index, 1);
        renderBill();
    }
}
function editProduct(pdtId){
    let tr = document.getElementById(`tr_${pdtId}`);
    let product = getLastProductId(pdtId);
    tr.children[1].innerHTML = `<select id="product-${pdtId}" class="form-control" >
                                    <option value="" selected disabled>--Select product--</option>
                                    <option value="Black Caffe">Black Coffee</option>
                                    <option value="White Caffe">White Caffee</option>
                                    <option value="Orange Juice">Orange Juice</option>
                                    <option value="Lemon Juice">Lemon Juice</option>
                                </select>`
    tr.children[2].innerHTML = `<input type="number" id="quantity-${pdtId}" class="form-control">`
   // let action = document.getElementById(`tr_${pdtId}`);
    //action.children[1].classList.removeProduct('d-none');
    //action.children[2].classList.removeProduct('d-none');
    //window.localStorage.setItem(cashBill_data, JSON.stringify(products));
   
    //renderBill();
}
function updateProduct(pdtId){
    const productName = document.getElementById(`product-${pdtId}`).value;
    const quantityProduct = Number(document.getElementById(`quantity-${pdtId}`).value);
    if(updateProduct != "" && isNaN(quantityProduct) == false){
        products[pdtId-1].productName = productName;
        products[pdtId-1].productQuantity = document.getElementById(`quantity-${pdtId}`).value;
        products[pdtId-1].productPrice = getProductPrice(productName);
        products[pdtId-1].Amount = products[pdtId-1].productPrice * products[pdtId-1].productQuantity;
    }else {
        return alert("Nhập dữ liệu cần thay đổi!");
    }
    renderBill()
}
function cancelProduct(){
    renderBill();
}
function resetForm(){
    document.getElementById("product").value = "";
    document.getElementById("quantity").value = "";
}
function ready(){
    init();
    renderBill();
}
ready();
