loadSync()

async function loadSync(){
    loadCategories()
    loadBrands()
}
async function loadCategories(){
    try {
        let response = await fetch("http://localhost:3000/categories")
        let categories = await response.json()
        let body = document.getElementById("category-list")
        body.innerHTML = ''
        for (const c of categories) {
            body.innerHTML += `<option value="${c._id}">${c.name}</option>`
        }
    } catch (error) {
        console.log(error);
    }
}
async function loadBrands(){
    try {
        let response = await fetch("http://localhost:3000/brands")
        let brands = await response.json()
        let body = document.getElementById("brand-list")
        body.innerHTML = ''
        for (const b of brands) {
            body.innerHTML += `<option value="${b._id}">${b.name}</option>`
        }
    } catch (error) {
        console.log(error);
    }
}
document.getElementById("add-product-form").addEventListener("submit", async function(event){
    event.preventDefault(); // Prevent the default form submission
    try {
        const name = document.getElementById("name").value;
        const category = document.getElementById("category-list").value;
        const brand = document.getElementById("brand-list").value;
        const price = document.getElementById("price").value;
        const quantity = document.getElementById("quantity").value;
        const description = document.getElementById("description").value;
        const imageURL = document.getElementById("imageURL").files[0];
        if(!name || !category || !brand || !price || !quantity || !imageURL){
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm!")
            return
    }
        let response = await fetch("http://localhost:3000/products", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                category: category,
                brand: brand,
                price: price,
                quantity: quantity,
                description: description ? description : "",
                imageURL: ""
            })
        })
        const result = await response.json()
        if(result.success){
            const formData = new FormData();
            formData.append('image', imageURL);
            const uploadResponse = await fetch(`http://localhost:3000/products/change_image/${result.data._id}`,{
                method: 'POST',
                body: formData,
            })
            const uploadResult = await uploadResponse.json()
            if(uploadResult.success){
                alert(result.message)
                window.location.href = '/views/admins/products/product.html'; // Trang sau khi đăng nhập
            }
            else{
                alert(uploadResult.message)
            }
        }
        else
        {
            alert(result.message)
        }
    } catch (error) {
        console.log(error);
        alert(error.message)
    }
    
    })