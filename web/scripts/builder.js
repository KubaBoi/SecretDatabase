
function buildTable(clear=true) {
    let tbl = document.getElementById("galleryTable");
    if (clear) clearTable(tbl);

    if (images.length == 0) {
        addRow(tbl, [
            {"text": "There have been no images found"}
        ]);
    }

    for (let i = loaded; i < images.length; i++) {
        if (i >= imagesPerSite * site) break;
        let tags = prepareTags(images[i].TAGS.split(" "));

        addRow(tbl, [
            {
                "text": `<img src="./files/${images[i].PATH}" onclick="showImageOnClick(${i+1})" id="image${i}" width=100 height=100>`, 
                "attributes": [
                    {"name": "class", "value": "imageTd"}
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
    loaded += imagesPerSite;
    if (loaded >= images.length) {
        loaded = images.length;
        document.getElementById("moreButt").setAttribute("disabled", "true");
    }

    let searchCounter = document.getElementById("searchCounter");
    searchCounter.innerHTML = `Found ${images.length} images. Loaded ${loaded}`;
}

function loadMore() {
    site++;
    buildTable(false);
}

function prepareTags(tags, cls="tag", onclick="") {
    if (tags == "") return "";

    let tagsStringArray = tagsString.split(",");

    let tagsElems = "";
    for (let i = 0; i < tags.length; i++) {
        if (tags[i] == "") continue;

        let actCls = cls;
        if (tagsStringArray.includes(tags[i])) {
            if (cls == "tag") {
                actCls = "tagActive";
            }  
            else if (cls == "mainTag") {
                actCls = "mainTag mainTagActive";
            }
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
    
    let noneTagCls = "mainTag";
    if (tagsString == "None") noneTagCls = "mainTagActive";

    let tagsElements = `<span class="${noneTagCls}" onclick="noneTags()" id="noneTagsSpan">None</span> `
    tagsElements += prepareTags(tags, "mainTag", "tagOnClick(this)");

    dv.innerHTML = tagsElements;
}