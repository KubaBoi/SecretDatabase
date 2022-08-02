
function addIterator(add=1) {
    iterator += add;

    if (iterator >= images.length) iterator = 0;
    if (iterator < 0) iterator = images.length -1;

    showImageFullScreen();
}

function setIterator(index) {
    iterator = index;
}

function showImageOnClick(index) {
    setIterator(index);
    showImageFullScreen();
}

function showImageFullScreen() {
    let dv = document.getElementById("fullScreen");
    dv.style.visibility = "visible";

    let img = document.getElementById("fullImage");
    img.setAttribute("src", `./files/${images[iterator].PATH}`);
}

function closeImageFullScreen() {
    let dv = document.getElementById("fullScreen");
    dv.style.visibility = "hidden";
}