"use strict";

function onInit() {
  gElCanvas = document.querySelector("#my-canvas");
  gCtx = gElCanvas.getContext("2d");
  renderGallery();
}

function renderMeme(img) {
  let elImg = document.getElementById(`${img.id}`);
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
  let memes = getMemes();
  memes.lines.forEach((line) => {
    drawText(line.txt, line.size, line.align, line.color, line.x, line.y);
  });
  gCurrImgId = img.id;
}

function onSetLineTxt(txt) {
  setLineTxt(txt);
  let currImg = setImg(gCurrImgId);
  renderMeme(currImg);
  document.getElementById(`txt-input`).value = "";
}

function onSetTxtColor(selectedColor) {
  SetTxtColor(selectedColor);
  let currImg = setImg(gCurrImgId);
  renderMeme(currImg);
}

function onIncreaseFont() {
  let txtSize = getCurrMemeTxtSize();
  if (txtSize >= 56) {
    return;
  }
  txtSize += 4;
  console.log("txtSize", txtSize);
  changeFontSize(txtSize);
  let currImg = setImg(gCurrImgId);
  renderMeme(currImg);
}

function onDecreaseFont() {
  let txtSize = getCurrMemeTxtSize();
  if (txtSize <= 24) {
    return;
  }
  txtSize -= 4;
  console.log("txtSize", txtSize);
  changeFontSize(txtSize);
  let currImg = setImg(gCurrImgId);
  renderMeme(currImg);
}

function onAddLine() {
  if(gMeme.lines.length >= 3){
    return
  }
  console.log('example')
  addLine();
  currLineId++;
  if (currLineId > gMeme.lines.length - 1) {
    currLineId = 0;
  }
  let line = getCurrLine(currLineId)
  drawRect(line.x - 150, line.y - 25)
}
function onSwichLine() {
  currLineId++;
  if (currLineId > gMeme.lines.length - 1) {
    currLineId = 0;
  }
  let currImg = setImg(gCurrImgId);
  renderMeme(currImg);
  let line = getCurrLine(currLineId)
  drawRect(line.x - 150, line.y - 25);
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL("image/jpeg");
  elLink.href = imgContent;
}
