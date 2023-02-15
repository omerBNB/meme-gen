'use strict'

function renderGallery(){
    let imgs = getImages()
    let strHTMLS = imgs.map((img) =>
        `<img class="canvas-imgs" id="${img.id}" src=${img.url} onclick="onImgSelect(this)">`
    )
    document.querySelector(`.gallery`).innerHTML = strHTMLS.join("")
}



function onImgSelect(currImg){
    const id = +currImg.id
    const selectedImg = setImg(id)
    onEditMeme()
    renderMeme(selectedImg)
    drawRect(100, 75);
}


function onEditMeme(){
    document.querySelector('.editor').style.display = 'grid'
    document.querySelector('.gallery').style.display = 'none'
}

function onBackHome(){
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'grid'
}