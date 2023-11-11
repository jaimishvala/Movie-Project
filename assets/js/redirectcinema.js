let Temp = [];
// let Temp1 = [];

const redirectcinema = async () => {
    // console.log("handleRedirect");

    let localdata = localStorage.getItem("movie");
    console.log(localdata);
    const Mdata = await getRequest('movie');
    // console.log(Mdata);

    let fData = Mdata.filter((v) => v.name === localdata)
    console.log(fData);

    fData.map((v) => {
        Temp.push(v.cid)
    });
    console.log(Temp);

    const cinema = await getRequest("cinema");
    // console.log(cinema); 


    // let display = '';
    let cinameaList = [];

    Temp.map((t) => {
        cinema.map((c) => {
            if (t == c.id) {
                cinameaList.push(c);
            }
        })
    });

    console.log(cinameaList);

    let print = '';
    cinameaList.map((c) => {
        print += `<a href=# class="reCi" onclick=redirecttime(${c.id})>${c.name}</a>`
    })
    console.log(cinameaList);

    document.getElementById("disp").innerHTML = print;
}

const redirecttime = (id) => {
    // console.log("redirecttime.html");
    console.log(id);

    localStorage.setItem("id", id);
    location.href = "redirecttime.html"
}

window.onload = redirectcinema;