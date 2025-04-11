document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById('message');

    // Perform validation (you can add more complex validation here)
    if (username === "" || password === "") {
        alert("Các trường không được để trống!");
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        const result = await response.json();
        if(result.success){
            localStorage.setItem('token', result.data);
            localStorage.setItem('user', JSON.stringify(result.user));
            if(result.user.role.name === 'Admin'){
                window.location.href = '/views/admins/index.html'; // Trang sau khi đăng nhập
            }
            if(result.user.role.name === 'User'){
                // window.location.href = '/views/users/index.html'; // Trang sau khi đăng nhập
                alert("Đăng nhập thành công")
            }
        }
        else{
            messageElement.style.color = 'red';
            messageElement.textContent = result.message;
        }
    } catch (error) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Có lỗi xảy ra. Vui lòng thử lại.';
        console.error(error);
    }
})