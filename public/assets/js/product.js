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
                                    <button onclick="productDetail('${product._id}'); return false;" class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button>
                                    <button onclick="deleteProduct('${product._id}', event); return false;" class="btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button>
                                </td>`
    return string;
}
async function deleteProduct(productId, event){
    event.preventDefault()
    try {
        let response = await fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let result = await response.json()
        if (result.success) {
            alert(result.message)
            loadSync()
        } else {
            alert(result.message)
        }
    } catch (error) {
        console.log(error);
    }
}
function productDetail(productId){
    window.location.href= `/views/admins/products/product-detail.html?id=${productId}`
}