var debug = true;
var alertTime = 3000;
var images = [];
var tagsArray = [];
var iterator = -1;
var tagsString = "";
var operator = "OR";

loadAllTags();
loadImagesByTags();

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