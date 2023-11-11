
let CinemaRef = document.getElementById("cinemaform");
let updateIndex = null;

const handleCinema = async () => {
    console.log("udguyg");

    let name = document.getElementById("name").value;
    let location = document.getElementById("location").value;
    let facility = document.getElementById("facility").value;

    let data = {
        name,
        location,
        facility
    }
    console.log(data);

    try {
        if (updateIndex) {
            const Response = await putRequest('cinema/' + updateIndex, data);
            console.log(Response);
        } else {
            const Response = await postRequest('cinema', data);
            console.log(Response);
        }
    } catch (error) {
        console.log(error);
    }

    updateIndex = null;

    displayData();

    event.preventDefault();

}

const handleDelet = async (id) => {
    try {
        await deleteRequest('cinema/' + id)
    } catch (error) {
        console.log(error);
    }
}

const handleEdit = async (id) => {
    try {
        const data = await getRequest('cinema');

        let index = data.findIndex((v) => v.id === id);
        document.getElementById("name").value = data[index].name;
        updateIndex = id;

    } catch (error) {
        console.log(error);
    }
}

const displayData = async () => {
    try {
        const data = await getRequest('cinema');
        // console.log(data);
        let print = '';

        print += '<table border="1"><tr><th>Sr No.</th><th>Name</th><th>Location</th><th>Facility</th><th>Action</th><th>Edit</th></tr>';
        data.map((a, i) => {
            if (i === 1) {
                print += '<tr>';
                print += '<td>' + i + '</td>';
                print += '<td>' + a.name + '</td>';
                print += '<td>' + a.location + '</td>';
                print += '<td>' + a.facility + '</td>';
                print += '<td><button onclick=handleDelet(' + a.id + ')><i class="fa-solid fa-trash"></i></button></td>';
                print += `<td><button onclick=handleEdit(${a.id})><i class="fa-solid fa-pen-to-square"></i></button></td>`;
                print += '</tr>';
            }
            else {
                print += '<tr>';
                print += '<td>' + i + '</td>';
                print += '<td>' + a.name + '</td>';
                print += '<td>' + a.location + '</td>';
                print += '<td>' + a.facility + '</td>';
                print += '<td><button onclick=handleDelet(' + a.id + ')><i class="fa-solid fa-trash"></i></button></td>';
                print += `<td><button onclick=handleEdit(${a.id})><i class="fa-solid fa-pen-to-square"></i></button></td>`;
                print += '</tr>';
            }
        })
        print += '</table>'
        document.getElementById("disp").innerHTML = print;
        document.getElementById("disp").style.display = 'block';
    } catch (error) {
        console.log(error);
    }
}


CinemaRef.addEventListener("submit", handleCinema);
window.onload = displayData;