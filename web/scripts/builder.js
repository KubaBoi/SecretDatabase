
function buildTable() {
    let tbl = document.getElementById("galleryTable");
    clearTable(tbl);

    if (images.length == 0) {
        addRow(tbl, [
            {"text": "There have been no images found"}
        ]);
    }

    let searchCounter = document.getElementById("searchCounter");
    searchCounter.innerHTML = `Found ${images.length} images`

    for (let i = 0; i < images.length; i++) {
        let tags = prepareTags(images[i].TAGS.split(" "));

        addRow(tbl, [
            {
                "text": `<img src="./files/${images[i].PATH}" onclick="showImageOnClick(${i})" id="image${i}" width=100 height=100>`, 
                "attributes": [
                    {"name": "class", "value": "imageTd"},
                    {"name": "onclick", "value": `onclick=showImageOnClick(${i})`}
                ]
            },
            {
                "text": `<img src="./images/addIcon.jpg" onclick="showTagEdit(${i})" width=35 height=35> ${tags}`,
                "attributes": [
                    {"name": "class", "value": "tagTd"},
                    {"name": "id", "value": `td${i}`}
                ]
            },
            {
                "text": `<img src="./images/deleteIcon.png" onclick="removeImage('${images[i].PATH}')" width=50 height=50>`
            }
        ]);
    }
}

function prepareTags(tags, cls="tag", onclick="") {
    if (tags == "") return "";

    let tagsElems = "";
    for (let i = 0; i < tags.length; i++) {
        if (tags[i] == "") continue;

        let actCls = cls;
        if (cls == "tag" && tagsString.search(tags[i]) != -1) {
            actCls = "tagActive";
        }  

        let tagElem = createElement("span", null, tags[i], [
            {"name": "class", "value": actCls},
            {"name": "onclick", "value": onclick}
        ]);
        tagsElems += tagElem.outerHTML + " ";
    }
    return tagsElems;
}

function buildTags() {
    let dv = document.getElementById("mainTags");
    clearTable(dv);

    let tags = [];
    for (let i = 0; i < tagsArray.length; i++) {
        tags.push(tagsArray[i].NAME);
    }
    let tagsString = `<span class="mainTag" onclick="noneTags()" id="noneTagsSpan">None</span> `
    tagsString += prepareTags(tags, "mainTag", "tagOnClick(this)");

    dv.innerHTML = tagsString;
}