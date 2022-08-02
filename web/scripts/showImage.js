
function addIterator(add=1) {
    iterator += add;

    if (iterator >= images.length) iterator = 0;
    if (iterator < 0) iterator = images.length -1;

    showImageFullScreen();
    scrollToImage();
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
    dv.style.left = "0";

    let img = document.getElementById("fullImage");
    img.setAttribute("src", `./files/${images[iterator].PATH}`);
}

function closeImageFullScreen() {
    let dv = document.getElementById("fullScreen");
    dv.style.left = "-1000%";
}

function downloadImage() {
    let source = `./files/${images[iterator].PATH}`;
    const fileName = source.split('/').pop();
	var el = document.createElement("a");
	el.setAttribute("href", source);
	el.setAttribute("download", fileName);
	document.body.appendChild(el);
 	el.click();
	el.remove();
}

function scrollToImage() {
	var el = document.createElement("a");
	el.setAttribute("href", `#image${iterator}`);
	document.body.appendChild(el);
 	el.click();
	el.remove();
}