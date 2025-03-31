{
  let URL = "http://localhost:3000/api/categories";
  var categoryGlobal;
  LoadSync();
  async function LoadSync() {
    try {
      let response = await fetch(URL);
      let categories = await response.json();
      categories = categories.filter((c) => !c.isDeleted);
      categoryGlobal = categories;
      let body = document.getElementById("category-list-tbody");
      body.innerHTML = "";
      let i = 1;
      for (const category of categoryGlobal) {
        body.innerHTML += ConvertFromObjToHTML(category, i);
        i++;
      }
    } catch (error) {
      console.log(error);
    }
  }
  function ConvertFromObjToHTML(category, index) {
    let string = `<tr>`;
    string += `<td>${index}</td>`;
    string += `<td>${category.name}</td>`;
    string += `<td>
                    <button onclick="EditCategory('${category._id}')" class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button>
                    <button onclick="DeleteCategory('${category._id}')"  class="btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button>
            </td>`;
    string += `</tr>`;
    return string;
  }
  function DeleteCategory(id) {
    try {
      let deletedCategory = categoryGlobal.find(function(c){p=>p._id == id})
      fetch(URL + "/" + id, {
        method: "DELETE",
        body: JSON.stringify(deletedCategory),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function () {
        LoadSync();
      });
    } catch (error) {}
  }
}
