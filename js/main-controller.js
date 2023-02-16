"use strict";

function onInit() {
  gElCanvas = document.querySelector("#my-canvas");
  gCtx = gElCanvas.getContext("2d");
  addEventListeners()
  addMouseListeners()
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
  if(!gMeme.isRnd){
    renderMeme(currImg);
  } else {
    onRndImgSelect(currImg)
  }
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
  if (gMeme.lines.length >= 3) {
    return;
  }
  document.getElementById(`txt-input`).value = "";
  addLine();
  currLineId++;
  if (currLineId > gMeme.lines.length - 1) {
    currLineId = 0;
  }
  let line = getCurrLine(currLineId);
  let currImg = setImg(gCurrImgId)
  renderMeme(currImg);
  drawRect(line.x - 100, line.y - 25);
}
function onSwichLine() {
  currLineId++;
  if (currLineId > gMeme.lines.length - 1) {
    currLineId = 0;
  }
  let currImg = setImg(gCurrImgId);
  renderMeme(currImg);
  let line = getCurrLine(currLineId);
  drawRect(line.x - 100, line.y - 25);
  document.getElementById('txt-input').value = ''
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL("image/jpeg");
  elLink.href = imgContent;
}

function onEraseLine(){
  eraseLine(currLineId)
  let currImg = setImg(gCurrImgId);
  renderMeme(currImg);
}


function onIncreaseLineHeight(){
  increaseLineHeight(currLineId)
  let currImg = setImg(gCurrImgId);
  renderMeme(currImg);
}
function onLowerLineHeight(){
  lowerLineHeight(currLineId)
  let currImg = setImg(gCurrImgId);
  renderMeme(currImg);
}

function addEventListeners(){
  let upBtn = document.querySelector('.upBtn')
  upBtn.addEventListener('mousedown', onIncreaseLineHeight)
  let downBtn = document.querySelector('.downBtn')
  downBtn.addEventListener('mousedown', onLowerLineHeight)
}

