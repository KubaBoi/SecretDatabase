
function loading() {
    let loading = document.getElementById("loadingDiv");
    loading.style.setProperty("visibility", "visible");
    setTimeout(uploadingText, loadingTimeout);
}

function uploadingText() {
    let h1 = document.getElementById("loadingLabel");
    let dots = h1.innerHTML.replace("Uploading", "");

    if (dots.length == 3) {
        h1.innerHTML = "Uploading";
    }
    else {
        h1.innerHTML += ".";
    }

    setTimeout(uploadingText, loadingTimeout);
}