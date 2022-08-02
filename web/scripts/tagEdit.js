
function showTagEdit(index) {
    let td = document.getElementById(`td${index}`);
    clearTable(td);

    createElement("textarea", td, images[index].TAGS, [
        {"name": "id", "value": "textAreaTags"},
        {"name": "rows", "value": "4"},
        {"name": "cols", "value": "25"}
    ]);
    createElement("br", td);
    createElement("button", td, "Save", [
        {"name": "onclick", "value": `updateTags(${index})`}
    ]);
}