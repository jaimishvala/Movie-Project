let loginRef = document.getElementById("loginForm");
const handlelogin = async () => {
    // console.log("handlelogin");

    event.preventDefault();


    const userdata = await getRequest('user');

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // console.log(email,password);

    //Admin page Open.

    if (email === "abc@gmail.com" && password === "123") {
        return window.location.href = "../../cinema.html"

    }

    let flag = false;

    userdata.map((v) => {
        if (v.email === email && v.password === password) {
            flag = true;
        }
    });

    // USer => Home Page Open.

    if (flag) {
        window.location.href = "../../index.html";
    } else {
        alert("Wrong email and password.")
    }

}

loginRef.addEventListener("submit", handlelogin);