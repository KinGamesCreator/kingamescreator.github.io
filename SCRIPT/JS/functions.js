
let selected = undefined;
let alpha = 0;

setInterval(step,1000/60);

let hrefs = document.getElementsByClassName("tags");
for (var i = 0; i < hrefs.length; i++) {
    for (var k = 0; k < hrefs[i].children.length; k++) {
        let hijo = hrefs[i].children[k];
        let objetivo = hijo.getAttribute("href").slice(1);
        hijo.addEventListener("click", ()=>{remark(objetivo)});
    }
}

function remark(section) {
    console.log(section)
    alpha = 0.7;
    if (selected != undefined) selected.style["background-color"] = "";
    selected = document.getElementById(section);
}

function step() {
    if (selected == undefined) return;
    if (alpha > 0) alpha -= 0.01; else return;
    if (alpha <= 0) { alpha = 0; selected.style["background-color"] = ""; return; }
    selected.style["background-color"] = `${rgba(255,255,255,Math.round(alpha*255))}`;
}

function rgba(r,g,b,a) {
    return "#"+(r).toString(16)+(g).toString(16)+(b).toString(16)+(a).toString(16);
}
