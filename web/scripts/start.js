var debug = true;
var alertTime = 3000;
var loadingTimeout = 200;
var images = [];
var tagsArray = [];
var iterator = -1;
var tagsString = "";
var operator = "OR";
var loaded = 0;
var imagesPerSite = 20;
var site = 1;

while (true) {
    let pass = prompt("Enter password");
    if (pass == "heslo12") {
        loadAllTags();
        loadImagesByTags();
        break;
    }
}

document.onclick = function(e) {
    if (iterator != -1) {
        if (e.x > window.innerWidth / 2) {
            addIterator();
        }
        else {
            addIterator(-1);
        }
    }
}