var debug = true;
var alertTime = 3000;
var images = [];
var tagsArray = [];
var iterator = -1;
var tagsString = "";
var operator = "OR";

loadAllTags();
loadImagesByTags();