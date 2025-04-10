let globalProducts = []
loadSync()
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
        }
    } catch (error) {
        console.log(error);
    }
}
function convertFromObjToHTML(product){
    let string = `<div class="col-lg-4 col-md-6">
							<div class="single-product">`
    string += `<img class="img-fluid resize" src="/public/user-assets/img/product/${product.imageURL}" alt="">`
    string += `<div class="product-details">`
    string += `<a href=""><h6>${product.name}</h6></a>`
    string += `<div class="price"><h6>${product.price.toLocaleString('vi-VN')}₫</h6>`
    string += `<div class="prd-bottom">

										<a onclick="addToCart('${product._id}', event);return false" href="" class="social-info add-to-cart"
										   data-name="">
											<span class="ti-bag"></span>
											<p class="hover-text">thêm vào giỏ</p>
										</a>
										<a onclick="productDetail(${product._id});return false" href="" class="social-info">
											<span class="lnr lnr-move"></span>
											<p class="hover-text">Xem thêm</p>
										</a>
									</div>`
    string += `</div>
    </div>
    </div>`
    return string;
}
async function productDetail(productId){
    
}