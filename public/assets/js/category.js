let globalCategories = []
loadSync()
let i = 1;
async function loadSync(){
    try {
        let response = await fetch("http://localhost:3000/categories")
        let categories = await response.json()
        categories = categories.filter(c =>c.isDeleted == false)
        globalCategories = categories
        let body = document.getElementById("category-list-tbody")
        body.innerHTML = ''
        for (const c of globalCategories) {
            body.innerHTML += convertFromObjToHTML(c)
            i++;
        }
        i = 0;
    } catch (error) {
        console.log(error);
    }
}
function convertFromObjToHTML(category){
    let string = `<td>${i}</td>
                                <td>${category.name}</td>
                                <td>
                                    <button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button>
                                </td>`
    return string;
}
