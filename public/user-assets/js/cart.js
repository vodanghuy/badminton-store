async function addToCart(productId, event){
    event.preventDefault()
    try {
        let token = 'Bearer ' + localStorage.getItem('token')
        let response = await fetch(`http://localhost:3000/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                productId: productId,
            })

        })
        let result = await response.json()
        if (result.success) {
            alert("Thêm vào giỏ hàng thành công")
        } else {
            alert(result.message)
        }
    } catch (error) {
        console.log(error);
    }
}