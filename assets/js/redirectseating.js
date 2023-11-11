const redirectSeating = async () => {
    // console.log("redirectSeating");

    let movieid = localStorage.getItem("movieid");
    // console.log(movieid);   

    let cinemaID = localStorage.getItem("id")
    // console.log(cinemaID);

    let localdata2 = localStorage.getItem("time")
    // console.log(localdata2);

    const data = await getRequest('seat');
    // console.log(data);

    let data1 = data.filter((value) => (value.movie == movieid) && (value.time == localdata2) && (value.cinema == cinemaID))
    // console.log(data1);

    let print = '';

    data1.map((v) => {
        for (let i = 0; i < v.seat.length; i++) {
            if (v.seat[i] == 1) {
                print += `<button class="btn" disabled="true" id="button-${i}" onclick="BookTicket('${i}','${v.price}')">${i + 1}</button>`
            } else {
                print += `<button class="btn" id="button-${i}" onclick="BookTicket('${i}','${v.price}')">${i + 1}</button>`
            }
        }
        // console.log(data1);
    })

    document.getElementById("disp").innerHTML = print;
}

let seatarr = [];

const BookTicket = async (i, price) => {
    event.preventDefault();
    // console.log("BookTicket");
    console.log(i, price);

    document.getElementById("button-" + i).style.background = "#911";

    seatarr.push(i);
    console.log(seatarr);

    let print = '';

    let ans = price * seatarr.length;
    // console.log(ans);

    print += `<span>Total Seat:-</span>`;
    print += `<span>${seatarr.length}</span>`;
    print += `<br>`;
    print += `<span>Total Price:-</span>`;
    print += `<span>${ans}</span>`;

    document.getElementById("ans").innerHTML = print;
}

const handleSubmit = async () => {
    // console.log("handleSubmit");

    let movieid = localStorage.getItem("movieid");
    // console.log(movieid);

    let cinemaID = localStorage.getItem("id")
    // console.log(cinemaID);

    let localdata2 = localStorage.getItem("time")
    // console.log(localdata2);

    const data = await getRequest('seat');
    // console.log(data);

    let fData = data.filter((value) => (value.movie == movieid) && (value.time == localdata2) && (value.cinema == cinemaID))
    // console.log(fData);

    fData.map((value) => {
        seatarr.map((v, i) => {
            value.seat.map((v1, i1) => {
                if (i1 == v) {
                    value.seat[i1] = 1;
                    // console.log(value.seat[i1]);
                };
            });
        });

    });

    console.log(fData[0]);

    putRequest('seat/' + fData[0].id, fData[0]);
}

window.onload = redirectSeating;    