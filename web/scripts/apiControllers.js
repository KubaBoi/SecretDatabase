async function loadImagesByTags() {
    let response = await callEndpoint("GET", `/file/getByTags?tags=${tagsString}&operator=${operator}`);
    if (response.ERROR == null) {
        images = response.FILES;
        buildTable();
    }
    else {
        showErrorAlert(response.ERROR, alertTime);
    }
}

async function loadAllTags() {
    let response = await callEndpoint("GET", "/tags/getAll");
    if (response.ERROR == null) {
        tagsArray = response.TAGS;
        buildTags();
    }
    else {
        showErrorAlert(response.ERROR, alertTime);
    }
}

async function updateTags(index) {
    let textArea = document.getElementById("textAreaTags");

    let req = {
        "FILE_NAME": images[index].PATH,
        "TAGS": textArea.value
    };

    let response = await callEndpoint("POST", "/file/update", req);
    if (response.ERROR == null) {
        loadAllTags();
        tagOnClick();
    }
    else {
        showErrorAlert(response.ERROR, alertTime);
    }
}

function removeImage(path) {
    showConfirm("Really?", `Do you want to remove this image?`, function() {removeImageReally(path);});
}

async function removeImageReally(path) {
    let req = {
        "FILES": [path]
    };

    let response = await callEndpoint("POST", "/file/remove", req);
    if (response.ERROR == null) {
        tagOnClick();
    }
    else {
        showErrorAlert(response.ERROR, alertTime);
    }
}