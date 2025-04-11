let globalAccounts = []
loadSync()
let i = 1;
async function loadSync(){
    try {
        let response = await fetch("http://localhost:3000/users")
        let accounts = await response.json()
        accounts = accounts.filter(a =>a.isDeleted == false)
        globalAccounts = accounts
        let body = document.getElementById("account-list-tbody")
        body.innerHTML = ''
        for (const a of globalAccounts) {
            body.innerHTML += convertFromObjToHTML(a)
            i++;
        }
        i = 0;
    } catch (error) {
        console.log(error);
    }
}
function convertFromObjToHTML(account){
    let string = `<td>${i}</td>
                                <td>${account.fullName}</td>
                                <td>${account.userName}</td>
                                <td>${account.email}</td>
                                <td>${account.phoneNumber}</td>
                                <td>
                                    <button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button>
                                </td>`
    return string;
}
