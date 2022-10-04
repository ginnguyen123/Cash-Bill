class Product{
    constructor(productId, productName, productQuantity, productPrice){
        this.productId = productId;
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
        this.Amount = this.productPrice*this.productQuantity;
    }
}
var products = [
    {
        productId: 1,
        productName: 'Iphone x',
        productQuantity: 2,
        productPrice: 3000,
        Amount: 4000
    },
];
function renderBill(){
    console.log(products);
    let htmlDislays = products.map((can)=>{
        return `
            <tr>
                <td>${can.productId}</td>
                <td>${can.productName}</td>
                <td>${can.productQuantity}</td>
                <td>${can.productPrice}</td>
                <td>${can.Amount}</td>
            <tr>
        `
    })
    document.getElementById('tbBill').innerHTML = htmlDislays.join("");
}
function addProduct(){
    let productName = document.getElementById("product").value;
    let Quantitys = Number(document.getElementById("quantity").value);
    let productId = getLastProductId() + 1; 

    if(productName == ""){
        alert('Product name is required!');
        return;
    }
    let price = 0;
    switch(productName){
        case (productName == "blackCaffe"):
            price = 16000;
        case (productName == "whiteCaffe"):
            price = 18000;
        case (productName == "orangeJuice"):
            price = 20000;
        case (productName == "LemonJuice"):
            price = 12000;
    }
    let newProduct = new Product(productId, productName, Quantitys, price)
    products.push(newProduct);
    renderBill();
}
function getLastProductId(){
    let pdtTemp = [...products];
    let maxId = pdtTemp.sort((pdt1, pdt2)=>{
        return pdt2.productId - pdt1.productId;
    });
    return maxId[0].productId;
}
renderBill();