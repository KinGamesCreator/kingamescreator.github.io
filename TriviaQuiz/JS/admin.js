
adminKey = document.getElementById("adminKey");
levelID = document.getElementById("levelID");
levelData = document.getElementById("levelData");
list = document.getElementById("list");
imageList = document.getElementById("images");

function loadLevel() {
    fetch(`https://kingames.tk/revLevel?key=${adminKey.value}&id=${levelID.value}`)
        .then(r => r.text())
        .then(data => {
            levelData.value = data;
            showImages();
        }).catch(error => console.error(error))
}

function getList() {
    fetch(`https://kingames.tk/revList?key=${adminKey.value}`)
        .then(r => r.text())
        .then(data => {
            list.innerHTML = data;
            //levelData.value = data;
        }).catch(error => console.error(error))
}

function acceptLevel() {
    fetch('https://kingames.tk/revAccept', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key : adminKey.value,
            id : levelID.value,
            data : levelData.value
        })
    }).then(r => r.text())
        .then(data => {
            alert(data);
        });
}

function declineLevel() {
    fetch(`https://kingames.tk/revDecline?key=${adminKey.value}&id=${levelID.value}`)
        .then(r => r.text())
        .then(data => {
            alert(data);
        }).catch(error => console.error(error))
}

function showImages() {
    imageList.innerHTML = "";
    try {
        let _d = JSON.parse(levelData);
        _d.data.forEach(q => {
            if (q.image != "") {
                imageList.innerHTML += `<img scr="${q.image}"><br>`
            }
        });
    } catch {
        console.log("error en las imágenes.")
    }
}
