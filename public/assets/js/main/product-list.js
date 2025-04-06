{
    let URL = "http://localhost:3000/products";

    async function LoadSync(){
        try {
            let response = await fetch(URL);
            let products = await response.json();
        } catch (error) {
            
        }
    }
}