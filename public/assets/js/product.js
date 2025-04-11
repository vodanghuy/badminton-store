let globalProducts = []
loadSync()
let i = 1;
async function loadSync(){
    try {
        let response = await fetch("http://localhost:3000/products")
        let products = await response.json()
        products = products.filter(p => p.isDeleted == false)
        globalProducts = products
        let body = document.getElementById("product-list")
        body.innerHTML = ''
        for (const p of globalProducts) {
            body.innerHTML += convertFromObjToHTML(p)
            i++;
        }
        i = 0;
    } catch (error) {
        console.log(error);
    }
}
function convertFromObjToHTML(product){
    let string = `<td>${i}</td>
                                <td>${product.name}</td>
                                <td>${product.category.name}</td>
                                <td>${product.price.toLocaleString('vi-VN')} đ</td>
                                <td>${product.quantity}</td>
                                <td>
                                    <button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button>
                                </td>`
    return string;
}
async function productDetail(productId){
    
}