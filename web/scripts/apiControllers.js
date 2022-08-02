async function loadAllImages() {
    let response = await callEndpoint("GET", "/file/getAll");
    if (response.ERROR == null) {
        images = response.FILES;

        let tbl = document.getElementById("galleryTable");
        clearTable(tbl);

        for (let i = 0; i < images.length; i++) {
            addRow(tbl, [
                {
                    "text": `<img src="./files/${images[i].PATH}" width=100 height=100>`, 
                    "attributes": [
                        {"name": "onclick", "value": `onclick=showImageOnClick(${i})`}
                    ]
                }
            ]);
        }
    }
    else {
        showErrorAlert(response.ERROR, alertTime);
    }
}