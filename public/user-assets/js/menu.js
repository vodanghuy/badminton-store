menuLoadSync();
async function menuLoadSync() {
  try {
    let menuResponse = await fetch("http://localhost:3000/menu");
    let menus = await menuResponse.json();
    let menuBody = document.getElementById("menu");
    menuBody.innerHTML = '';
    for (const m of menus) {
      if (m.children.length > 0) {
        menuBody.innerHTML += convertMenuFromObjToHTML(m);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
function convertMenuFromObjToHTML(menu) {
  let menuString = `<li class="main-nav-list"><a data-toggle="collapse" href="#${menu.url}" aria-expanded="false" aria-controls="${menu.url}"><span
								 class="lnr lnr-arrow-right">${menu.text}</span></a>
							<ul class="collapse" id="${menu.url}" data-toggle="collapse" aria-expanded="false" aria-controls="${menu.url}">`
  for (const i of menu.children) {
    menuString += `<li class="main-nav-list child"><a href="#">${i.text}</a></li>`
  }
  menuString += `</ul>
                        </li>`
  return menuString;
}
