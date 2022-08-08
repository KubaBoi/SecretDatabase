
function tagOnClick(tagElem=null) {
    if (tagElem != null) {
        if (tagElem.classList.contains("mainTagActive")) {
            tagElem.classList.remove("mainTagActive");
        } 
        else {
            tagElem.classList.add("mainTagActive");
        }

        let noneTag = document.getElementById("noneTagsSpan");
        noneTag.setAttribute("class", "mainTag");
    }
    else {
        if (tagsString == "None") {
            loadImagesByNoneTags();
            return;
        }
    }

    tagsString = "";
    let tagElems = document.getElementsByClassName("mainTag");
    
    for (let i = 0; i < tagElems.length; i++) {
        let el = tagElems[i];
        if (el.classList.contains("mainTagActive")) {
            tagsString += el.innerHTML + ","
        }
    }
    tagsString = tagsString.substring(0, tagsString.length - 1);
    loadImagesByTags();
}

function noneTags() {
    let tagElems = document.getElementsByClassName("mainTag");
    for (let i = 0; i < tagElems.length; i++) {
        let el = tagElems[i];
        el.setAttribute("class", "mainTag");
    }

    let noneTag = document.getElementById("noneTagsSpan");
    noneTag.setAttribute("class", "mainTag mainTagActive");
    
    tagsString = "None";
    loadImagesByNoneTags();
}

function changeOperator(elem) {
    let opButt = document.getElementsByClassName("operatorButtActive");
    for (let i = 0; i < opButt.length; i++) {
        opButt[i].setAttribute("class", "operatorButt");
    }

    elem.setAttribute("class", "operatorButtActive");
    operator = elem.innerHTML;

    tagOnClick();
}