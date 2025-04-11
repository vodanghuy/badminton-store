loadSync()
async function loadSync(){
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");
        if (!productId) {
            alert("Không tìm thấy ID sản phẩm!");
            return;
        }
        const response = await fetch(`http://localhost:3000/products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json()
        if(result.success){
            const product = result.data
            document.getElementById("name").textContent = product.name
            document.getElementById("category").textContent = product.category.name
            document.getElementById("brand").textContent = product.brand.name
            document.getElementById("price").textContent = product.price.toLocaleString('vi-VN') + '₫'
            document.getElementById("quantity").textContent = product.quantity
            document.getElementById("description").textContent = product.description || "Không có mô tả"
            document.getElementById("image").innerHTML = `<img src="/public/assets/img/products/${product.imageURL}" alt="${product.name}">`
        }
        else
        {
            alert(result.message)
        }
    } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        alert("Đã có lỗi xảy ra!");
    }
}