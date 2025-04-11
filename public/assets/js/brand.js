let globalBrands = []
loadSync()
let i = 1;
async function loadSync(){
    try {
        let response = await fetch("http://localhost:3000/brands")
        let brands = await response.json()
        brands = brands.filter(b =>b.isDeleted == false)
        globalBrands = brands
        let body = document.getElementById("brand-list-tbody")
        body.innerHTML = ''
        for (const b of globalBrands) {
            body.innerHTML += convertFromObjToHTML(b)
            i++;
        }
        i = 0;
    } catch (error) {
        console.log(error);
    }
}
function convertFromObjToHTML(brand){
    let string = `<td>${i}</td>
                                <td>${brand.name}</td>
                                <td>${brand.description}</td>
                                <td>
                                    <button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button>
                                </td>`
    return string;
}
