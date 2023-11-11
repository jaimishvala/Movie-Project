const DisplayAllData = async () => {
    // console.log("handleUserData");
    event.preventDefault();

    const Cdata = await getRequest('cinema');
    const Mdata = await getRequest('movie');
    // console.log(Cdata);

    let print = '';
    print += '<h2>Cinema Name:</h2><div id="divdata">';

    Cdata.map((v) => {
        print += '<div id="cinemaN">'
        print += '<div id="lidata">' + v.name + '</div>';
        print += '</div>'
    });
    print += '</div>'
    document.getElementById("disp").innerHTML = print;

    let uniq = Mdata.filter((value, index) => {
        return index === Mdata.findIndex(v => value.name === v.name);
    });


    let print1 = '';

    print1 += '<h2>Movie Name:</h2><div id="divdata">';
    uniq.map((v) => {
        print1 += '<div>'
        print1 += '<img class = "d_card" width="300" height="400" src="assets/img/' + v.poster + '"  alt="">';
        print1 += '<div id="moviedata">' + v.name + '</div>';
        print1 += `<a href="#" onclick="handleRedirect('${v.name}')" id="ancor">Book</a>`
        print1 += '</div>'
    });

    // console.log(uniq);

    document.getElementById("disp1").innerHTML = print1;
}

const handleRedirect = async (name) => {
    event.preventDefault();
    // console.log("b");
    // console.log(name);

    localStorage.setItem("movie", name);

    window.location.href = "redirectcinema.html";
}

// window.onload = handleRedirect;

window.addEventListener("load", function () {
    DisplayAllData();
});