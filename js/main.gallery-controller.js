"use strict";

function renderGallery() {
  let imgs = getImages();
  let strHTMLS = imgs.map(
    (img) =>
      `<img class="canvas-imgs" id="${img.id}" src=${img.url} onclick="onImgSelect(this)">`
  );
  document.querySelector(`.gallery`).innerHTML = strHTMLS.join("");
}

function onImgSelect(currImg) {
  const id = +currImg.id;
  const selectedImg = setImg(id);
  onEditMeme();
  renderMeme(selectedImg);
  drawRect(100, 75);
}

function onRndImgSelect(currImg) {
  onEditMeme();
  let lines = getRandomLine();
  let elImg = document.getElementById(`${currImg.id}`);
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
  if (!lines.length){
      drawText(lines.txt, lines.size, lines.align, lines.color, lines.x, lines.y);
    //   drawRect(100, lines.y-25);
  }else{
      lines.forEach((line) => {
        drawText(line.txt, line.size, line.align, line.color, line.x, line.y);
        // drawRect(100, line.y-25);
      })
    }
    gCurrImgId = currImg.id;
}

function onRenderRndImg() {
  let img = getRandomImg();
  onRndImgSelect(img)
  isRndLines()
}

function onEditMeme() {
  document.querySelector(".editor").style.display = "grid";
  document.querySelector(".gallery").style.display = "none";
}

function onBackHome() {
  document.querySelector(".editor").style.display = "none";
  document.querySelector(".gallery").style.display = "grid";
  isNotRndLines()
}

function onSaveMeme(){
    saveMeme()
}

function onGoToSavedMemes(){
    let memes = getSavedMemes()
    if (!memes){
        return
    }
    
}