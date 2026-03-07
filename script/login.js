// console.log('hello')

document.getElementById("login-btn").addEventListener("click", function () {
    // 1. get the Username: admin
    const usernameInput = document.getElementById("input-username");
    const loginUsername = usernameInput.value;
    console.log(loginUsername)

    // 1. get the Password: admin123
    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;
    console.log(password)

    //3. match password and username
    if(loginUsername == "admin" && password == "admin123") {
        alert("Login Success");

        window.location.assign("./home.html")

    } else {

        alert("Login Failed");
        return;
    }
})