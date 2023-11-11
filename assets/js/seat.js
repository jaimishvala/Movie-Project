let seatRef = document.getElementById("SeatForm");
// let arr = [];
let updateIndex = null;

const handleSeat = async () => {
    event.preventDefault();

    // console.log("handleSeat");

    let cinema = document.getElementById("Cinema").value;
    let movie = document.getElementById("Movie").value;
    let time = document.getElementById("mtime").value;
    let seat = parseInt(document.getElementById("seat").value);
    let price = parseInt(document.getElementById("price").value);


    let obj = {
        cinema,
        movie,
        time,
        seat: new Array(seat).fill(0),
        price
    }
    console.log(obj);


    try {
        if (updateIndex !== null) {
            const Response = await putRequest('seat/' + updateIndex, obj);
            // console.log(Response);
        } else {
            const Response = await postRequest('seat', obj);
            // console.log(Response);
        }
    } catch (error) {
        console.log(error);
    }
    const data = await getRequest('seat');
    updateIndex = null;

    displaySeat();

}

const handleEdit = async (id) => {
    try {
        const data = await getRequest('seat');

        let index = data.findIndex((v) => v.id === id);

        document.getElementById("Cinema").value = data[index].cinema;
        document.getElementById("Movie").value = data[index].movie;
        document.getElementById("mtime").value = data[index].time;
        document.getElementById("seat").value = data[index].seat;
        document.getElementById("price").value = data[index].price;

        updateIndex = id;

    } catch (error) {
        console.log(error);
    }
}


const handleDelet = async (id) => {
    try {
        await deleteRequest('seat/' + id)
    } catch (error) {
        console.log(error);
    }
}


// const displaySeat = async () => {
//     try {
//         const data = await getRequest("seat");
//         const data1 = await getRequest("cinema");
//         const data2 = await getRequest("movie");

//         let cinema = '';
//         let movie = '';
//         let print = "";
//         let display = "";
//         let pre = "";
//         let pro = "";
//         let pra = "";
//         let prk = "";
//         let postr = "";

//         data.map(v => {
// cinema = data1.filter((value) => value.id == v.cinema);
// movie = data2.filter((value) => value.id == v.movie);

// cinema.map((v) => cinema = v.name);
// movie.map((v) => movie = v.name);

//             print = print + `<li>${v.id}`;
//             display = display + `<li>${cinema}`;
//             pre = pre + `<li>${movie}`;
//             pro = pro + `<li>${v.time}`;
//             postr = postr + `<li>${v.seat}`;
//             pra =
//                 pra +
//                 `<button class="hell" onclick=handleDelet(${v.id})><i class="fa-sharp fa-solid fa-trash"></i></button>`;
//             prk =
//                 prk +
//                 `<button class="hell" onclick=handleEdit(${v.id})><i class="fa-sharp fa-solid fa-pen"></i></button></li>`;
//         });
//         // document.getElementById("disp").innerHTML=print;
//         document.getElementById("one").innerHTML = print;
//         document.getElementById("two").innerHTML = display;
//         document.getElementById("three").innerHTML = pre;
//         document.getElementById("four").innerHTML = pro;
//         document.getElementById("five").innerHTML = postr;
//         document.getElementById("six").innerHTML = pra;
//         document.getElementById("seven").innerHTML = prk;
//     } catch (error) {
//         console.log(error);
//     }
// };



const displaySeat = async () => {
    // event.preventDefault();
    try {
        const data = await getRequest('seat');
        const data1 = await getRequest("cinema");
        const data2 = await getRequest("movie");
        // console.log(data,data1,data2);

        let print = '';
        print += '<table border="1"><tr><th>Sr No.</th><th>Cinema Name</th><th>Movie Name</th><th>Time</th><th>Seat</th><th>Price</th><th>Delete</th><th>Edit</th></tr>';
        data.map((a, i) => {
            cinema = data1.filter((value) => value.id == a.cinema);
            movie = data2.filter((value) => value.id == a.movie);

            cinema.map((v) => cinema = v.name);
            movie.map((v) => movie = v.name);

            if (i === 1) {
                print += '<tr>';
                print += '<td>' + i + '</td>';
                print += '<td>' + a.cinema + '</td>';
                print += '<td>' + a.movie + '</td>';
                print += '<td>' + a.time + '</td>';
                print += '<td>' + a.seat + '</td>';
                print += '<td>' + a.price + '</td>';
                print += '<td><button onclick=handleDelet(' + a.id + ')><i class="fa-solid fa-trash"></i></button></td>';
                print += `<td><button onclick=handleEdit(${a.id})><i class="fa-solid fa-pen-to-square"></i></button></td>`;
                print += '</tr>';
            }
            else {
                print += '<tr>';
                print += '<td>' + i + '</td>';
                print += '<td>' + a.cinema + '</td>';
                print += '<td>' + a.movie + '</td>';
                print += '<td>' + a.time + '</td>';
                print += '<td>' + a.seat + '</td>';
                print += '<td>' + a.price + '</td>';
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

}

const handlecinema = async () => {
    event.preventDefault();
    // console.log("handlecinema");

    const data = await getRequest('cinema');
    // console.log(data);

    let print = '';
    print += `<option value="0">` + "Select-Cinema" + `</option>`;
    data.map((v) => {
        print += `<option value= ${v.id}>` + v.name + `</option>`;
        // console.log(v.id);
    })
    document.getElementById("Cinema").innerHTML = print;
}

const handleMovie = async () => {
    event.preventDefault();
    console.log("handleMovie");

    const data = await getRequest('movie');
    // console.log(data);

    let cinemaID = document.getElementById("Cinema").value;
    // console.log(cinemaID);

    let Fdata = data.filter((v) => v.cid === cinemaID);
    // console.log(Fdata);

    let print = '';
    print += `<option value="0">` + "Select-Movie" + `</option>`;
    Fdata.map((v) => {
        print += `<option value= ${v.id}>` + v.name + `</option>`;
    })
    document.getElementById("Movie").innerHTML = print;
}

const handletime = async () => {
    event.preventDefault();
    // console.log("handletime");

    let mID = document.getElementById("Movie").value;
    // console.log(mID);

    const data = await getRequest('movie');
    // console.log(data);


    let Tdata = data.filter((v) => v.id == mID);
    // console.log(Tdata);

    let print = '';
    print += `<option value="0">` + "Select-Time" + `</option>`;
    Tdata.map((v) => {
        for (let i = 0; i < v.time.length; i++) {
            print += `<option value= ${v.time[i]}>${v.time[i]}</option>`;
        }
    })
    // console.log(Tdata);

    document.getElementById("mtime").innerHTML = print;
}

window.addEventListener("load", function () {
    handlecinema();
    displaySeat();
});

// window.onload = handlecinema();
// window.onload = displaySeat();
seatRef.addEventListener("submit", handleSeat);