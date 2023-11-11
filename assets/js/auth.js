let registerRef = document.getElementById("RegisterForm");
let updateIndex = null;

const handleSubmit = async () => {
    // console.log("handleRegistration");

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;

    let data = {
        name: name,
        email: email,
        password,
        dob
    }
    console.log(data);

    try {
        if (updateIndex !== null) {
            const Response = await putRequest('user/' + updateIndex, data);
            console.log(Response);
        } else {
            const Response = await postRequest('user', data);
            console.log(Response);
        }
    } catch (error) {
        console.log(error);
    }

    updateIndex = null;


    //redirect:
    window.location.href = "../../login.html";

    event.preventDefault();
}

const handleDelet = async (id) => {
    try {
        await deleteRequest('user/' + id)
    } catch (error) {
        console.log(error);
    }
}

const handleEdit = async (id) => {
    try {
        const data = await getRequest('user');

        let index = data.findIndex((v) => v.id === id);
        document.getElementById("name").value = data[index].name;
        updateIndex = id;

    } catch (error) {
        console.log(error);
    }
}

registerRef.addEventListener("submit", handleSubmit)