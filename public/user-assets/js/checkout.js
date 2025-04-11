loadCart()

async function loadCart(){
    try {
        let totalAmount = 0;
        let body = document.getElementById("product-list")
        let fullName = document.getElementById("fullName")
        let token = localStorage.getItem('token')
        let user = JSON.parse(localStorage.getItem('user'))
        fullName.setAttribute("value", user.fullName)
        document.getElementById("address").setAttribute("value", user.address)
        document.getElementById("phoneNumber").setAttribute("value", user.phoneNumber)
        document.getElementById("email").setAttribute("value", user.email)
        let response = await fetch(`http://localhost:3000/cart/getCart/${user._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        let result = await response.json()
        if (result.success) {
            let products = result.data[0].products
            body.innerHTML = ''
            for (const p of products) {
                let response1 = await fetch(`http://localhost:3000/products/${p.productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                let result1 = await response1.json()
                let productDetail = result1
                totalAmount += productDetail.price * p.quantity;
                body.innerHTML += convertFromObjToHTML(productDetail, p.quantity);
                
            }
            document.getElementById("totalAmount").textContent = totalAmount.toLocaleString('vi-VN') + '₫'
        } else {
            alert(result.message)
        }
    } catch (error) {
        console.log(error);
    }
}
function convertFromObjToHTML(product, quantity){
    let string = `<li><a href="#">${product.name}<span class="middle">x ${quantity}</span> <span class="last">${product.price.toLocaleString('vi-VN')}đ</span></a></li>`
    return string;
}
async function checkout(event){
    event.preventDefault()
    try {
        let token = localStorage.getItem('token')
        if(!token){
            alert("Bạn chưa đăng nhập")
            return
        }
        let user = JSON.parse(localStorage.getItem('user'))
        let response = await fetch(`http://localhost:3000/cart/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                userId: user._id
            })
        })
        let result = await response.json()
        if (result.success) {
            alert("Đặt hàng thành công")
            // window.location.href = '/views/users/index.html'; // Trang sau khi đăng nhập
        } else {
            alert(result.message)
        }
    } catch (error) {
        console.log(error);
    }
}