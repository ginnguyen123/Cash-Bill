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
    let price = priceProducts();
    if(productName == ""){
        alert('Chưa nhập sản phẩm!');
        return;
    }
    let newProduct = new Product(productId, productName, Quantitys, price)
    products.push(newProduct);
    window.localStorage.setItem(cashBill_data, JSON.stringify(products));
    renderBill();
    resetForm();
}
function priceProducts(){
    let prices = 0;
    let productName = document.getElementById("product").value;
    switch (true) {
        case (productName == "Black Caffe"):{
            prices = 16000;
            return prices;
        }
        case (productName == "White Caffe"):{
            prices = 18000;
            return prices;
        }
        case (productName == "Orange Juice"):{
            prices = 20000;
            return prices;
        }
        case (productName == "Lemon Juice"):{
            prices = 12000;
            return prices;
        }
    }
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
    console.log(products[pdtId-1])
    let updateProduct = document.getElementById(`product-${pdtId}`).value;
    let quantityProduct = Number(document.getElementById(`quantity-${pdtId}`).value);
    if(updateProduct != "" && isNaN(quantityProduct) == false){
        products[pdtId-1].productName = document.getElementById(`product-${pdtId}`).value;
        products[pdtId-1].productQuantity = document.getElementById(`quantity-${pdtId}`).value;
    }else {
        return alert("Nhập dữ liệu cần thay đổi!");
    }
    renderBill()
    window.localStorage.setItem(cashBill_data, JSON.stringify(products));
    priceProducts(products[pdtId-1].productName);
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
