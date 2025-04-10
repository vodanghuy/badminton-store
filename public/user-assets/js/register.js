document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = ''
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const fullName = document.getElementById("fullName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const gender = document.getElementById("gender").value;
    const password_confirmation = document.getElementById("password_confirmation").value;
    if(password !== password_confirmation){
        alert("Mật khẩu không khớp, vui lòng nhập lại!");
        return;
    }
    try {
        let response = await fetch("http://localhost:3000/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                fullName: fullName,
                phoneNumber: phoneNumber,
                dateOfBirth: dateOfBirth,
                gender: gender,
                role: "User"
            })
        })
        const result = await response.json()
        if(result.success){
            alert("Đăng ký thành công")
            window.location.href = '/views/users/login.html'; // Trang sau khi đăng nhập
        }
        else if(result.errors){
            for (const e of result.errors) {
                messageElement.innerHTML += `<p style="color: red;">${e.msg}</p>`
            }
        }
        else
        {
            messageElement.innerHTML += `<p style="color: red;">${result.message}</p>`
        }
    } catch (error) {
        let messageElement = document.getElementById('message');
        messageElement.innerHTML = `<p style="color: red;">Có lỗi xảy ra, vui lòng thử lại!</p>`
        console.error(error);
    }
})