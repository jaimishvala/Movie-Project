const redirecttime = async () => {
    // console.log("redirecttime");

    let localdata = localStorage.getItem("id");
    // console.log(localdata);
    let localMovie = localStorage.getItem("movie");
    // console.log(localdata, localMovie);

    let Mdata = await getRequest('movie');
    // console.log(Mdata);

    let fData = Mdata.filter((v) => v.name === localMovie && v.cid === localdata)
    console.log(fData);

    let print = '';

    fData.map((v) => {
        for (let i = 0; i < v.time.length; i++) {
            print += `<a href="#" id="BTN"  onclick="redirectSeating('${v.time[i]}', '${v.id}')">${v.time[i]}</a>`
            // console.log(v.time[i]);
        }
    })

    // console.log(fData);

    document.getElementById("disp").innerHTML = print;
}

const redirectSeating = (time, mid) => {
    // console.log("redirectSeating");
    console.log(time);

    localStorage.setItem("time", time);

    localStorage.setItem("movieid", mid);

    location.href = "redirectseating.html"
}

window.onload = redirecttime;