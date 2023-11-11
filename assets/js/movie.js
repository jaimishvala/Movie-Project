let movieRef = document.getElementById("movieform");
let updateIndex = null;

const handleSubmit = async () => {
    // console.log("movieform");

    event.preventDefault();
    let arr = [];

    let name = document.getElementById("name").value;
    let des = document.getElementById("description").value;
    let cid = document.getElementById("Cinema").value;
    let time = document.getElementsByName("mtime");
    let poster = document.getElementById("poster");

    let obj = {
        name,
        des,
        cid,
        time: arr,
        poster: poster.files[0].name
    }

    console.log(obj);

    for (let i = 0; i < time.length; i++) {
        let ans = time[i].value;
        arr.push(ans);
        console.log(arr);

        // arr.push(time[i].value);
    }

    try {
        if (updateIndex) {
            const Response = await putRequest('movie/' + updateIndex, obj);
            console.log(Response);
        } else {
            const Response = await postRequest('movie', obj);
            console.log(Response);
        }
    } catch (error) {
        console.log(error);
    }

    updateIndex = null;

    display();
}

const handleEdit = async (id) => {
    // console.log("handleEdit");

    let divRef = document.getElementById("content");
    console.log(divRef);

    while (divRef.firstChild) {
        divRef.removeChild(divRef.firstChild);
    }

    let userdata = await getRequest("movie");

    let index = userdata.findIndex((v) => v.id === id);
    // console.log(index);
    // console.log(id);

    document.getElementById("name").value = userdata[index].name;
    document.getElementById("description").value = userdata[index].des;
    document.getElementById("Cinema").value = userdata[index].cid;
    // console.log(userdata);

    for (let i = 0; i < userdata[index].time.length; i++) {
        handleAdd();
    }

    let mtime = document.getElementsByName("mtime");
    for (let i = 0; i < userdata[index].time.length; i++) {
        mtime[i].value = userdata[index].time[i];
    }

    updateIndex = id;
}

const handleDelet = async (id) => {
    try {
        await deleteRequest('movie/' + id)
    } catch (error) {
        console.log(error);
    }
}

const display = async () => {
    // event.preventDefault();
    try {
        const data = await getRequest('movie');
        console.log(data);
        let print = '';
        print += '<table border="1"><tr><th>Sr No.</th><th>Name</th><th>Description</th><th>Cinema</th><th>Time</th><th>File</th><th>Delete</th><th>Edit</th></tr>';
        data.map((a, i) => {
            if (i === 1) {
                print += '<tr>';
                print += '<td>' + i + '</td>';
                print += '<td>' + a.name + '</td>';
                print += '<td>' + a.des + '</td>';
                print += '<td>' + a.cid + '</td>';
                print += '<td>' + a.time + '</td>';
                print += '<td>' + a.poster + '</td>';
                print += '<td><button onclick=handleDelet(' + a.id + ')><i class="fa-solid fa-trash"></i></button></td>';
                print += `<td><button onclick=handleEdit(${a.id})><i class="fa-solid fa-pen-to-square"></i></button></td>`;
                print += '</tr>';
            }
            else {
                print += '<tr>';
                print += '<td>' + i + '</td>';
                print += '<td>' + a.name + '</td>';
                print += '<td>' + a.des + '</td>';
                print += '<td>' + a.cid + '</td>';
                print += '<td>' + a.time + '</td>';
                print += '<td>' + a.poster + '</td>';
                print += '<td><button onclick=handleDelet(' + a.id + ')><i class="fa-solid fa-trash"></i></button></td>';
                print += `<td><button onclick=handleEdit(${a.id})><i class="fa-solid fa-pen-to-square"></i></button></td>`;
                print += '</tr>';
            }
        })
        print += '</table>';
        document.getElementById("disp").innerHTML = print;
    } catch (error) {
        console.log(error);
    }

    let print = '';
    const cinemaData = await getRequest('cinema');

    print += `<option>` + "Select" + `</option>`;
    cinemaData.map((v) => {
        print += `<option value= ${v.id}>` + v.name + `</option>`;
    })
    document.getElementById("Cinema").innerHTML = print;
}

const handleAdd = () => {
    console.log("handleAdd");

    let content = document.getElementById("content");
    let divE = document.createElement("div");

    let random = Math.floor(Math.random() * 1000);
    divE.setAttribute("id", "demo-" + random);

    let input = document.createElement("input");
    input.setAttribute("type", "time");
    input.setAttribute("name", "mtime");

    let Add = document.createElement("button");
    Add.setAttribute("onclick", "handleAdd()");

    let icon = document.createTextNode("+");
    Add.appendChild(icon);

    let Remove = document.createElement("button");
    Remove.setAttribute("onclick", "handleRemove(" + random + ")");

    let icon1 = document.createTextNode("-");
    Remove.appendChild(icon1);

    divE.appendChild(input);
    divE.appendChild(Add);
    divE.appendChild(Remove);
    content.appendChild(divE);

}

const handleRemove = (random) => {
    console.log("handleRemove");

    let RemoveData = document.getElementById("demo-" + random);
    RemoveData.remove();
}

movieRef.addEventListener("submit", handleSubmit);
window.onload = display;