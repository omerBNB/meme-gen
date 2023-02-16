"use strict";

function renderGallery() {
  let imgs = (!gFilteredImgs || !gFilteredImgs.length)?  getImages() : gFilteredImgs
  let strHTMLS = imgs.map(
    (img) =>
      `<img class="canvas-imgs" id="${img.id}" src=${img.url} onclick="onImgSelect(this)">`
  );
  document.querySelector(`.gallery`).innerHTML = strHTMLS.join("");
}

function onImgSelect(currImg) {
  currLineId = 0
  const id = +currImg.id;
  const selectedImg = setImg(id);
  onEditMeme();
  renderMeme(selectedImg);
  drawRect(50, 25);
  document.getElementById('txt-input').value = ''
}

function onRndImgSelect(currImg) {
  onEditMeme();
  let lines = getRandomLine();
  let elImg = document.getElementById(`${currImg.id}`);
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
  if (!gMeme.randLines) {
    drawText(lines.txt, lines.size, lines.align, lines.color, lines.x, lines.y);
    //   drawRect(100, lines.y-25);
  } else {
    gMeme.randLines.forEach((line) => {
      drawText(line.txt, line.size, line.align, line.color, line.x, line.y);
      // drawRect(100, line.y-25);
    });
  }
  gCurrImgId = currImg.id;
}

function onRenderRndImg() {
  let img = getRandomImg();
  onRndImgSelect(img);
  isRndLines();
}

function onEditMeme() {
  document.querySelector(".editor").style.display = "grid";
  document.querySelector(".gallery").style.display = "none";
  document.querySelector(".saved-memes").style.display = "none";
  gMemeIsInSaved = false
  resetLines()
}

function onBackHome() {
  document.querySelector(".editor").style.display = "none";
  document.querySelector(".gallery").style.display = "grid";
  document.querySelector(".saved-memes").style.display = "none";
  isNotRndLines();
  gMemeIsInSaved = false
}

function onSaveMeme() {
  saveMeme();
}

function onGoToSavedMemes() {
  document.querySelector(".editor").style.display = "none";
  document.querySelector(".gallery").style.display = "none";
  document.querySelector(".saved-memes").style.display = "grid";
  renderSavedMemes();
  gMemeIsInSaved = true
}

function renderSavedMemes() {
  let memes = getSavedMemes();
  if (!memes) {
    return;
  }
  let strHTMLS = memes.map((memeImg) => 
  `<img id="${memeImg.id}" src="${memeImg.img}" class="canvas-imgs" onclick="onEditSavedMeme(this)">`);

  console.log("strHTMLS", strHTMLS);
  document.querySelector(".saved-memes").innerHTML = strHTMLS.join("");
}

function onEditSavedMeme(img){
  document.querySelector(".editor").style.display = "grid";
  document.querySelector(".gallery").style.display = "none";
  document.querySelector(".saved-memes").style.display = "none"
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  gCurrSavedImgId = img.id
}

function onDown(ev) {
  console.log('Down')
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  // console.log('pos', pos)
  gIsDrag = true
  //Save the pos we start from
  // gStartPos = pos
  document.body.style.cursor = 'grabbing'
  gLastPos = pos
}

function onMove(ev) {
  // console.log('move')
  // console.log('ev',ev)
  if (!gIsDrag) return
  const diff = Math.abs(ev.movementX) > Math.abs(ev.movementY) ? Math.abs(ev.movementX) : Math.abs(ev.movementY)
  let size = 10 * diff
  if (size > 100) size = 100
  if (size < 10) size = 10

  const pos = getEvPos(ev)
  let line = moveLine(pos)
  console.log('line',line)
  if(gMeme.isRnd){
    drawText(line[0].txt, line[0].size, line[0].align, line[0].color, line[0].x, line[0].y);
    let currImg = setImg(gCurrImgId)
    onRndImgSelect(currImg)
  }else{
    drawText(line[0].txt, line[0].size, line[0].align, line[0].color, line[0].x, line[0].y);
    let currImg = setImg(gCurrImgId);
    renderMeme(currImg);
  }
}

function onUp() {
  console.log('Up')
  gIsDrag = false
  document.body.style.cursor = 'grab'
}
function getEvPos(ev) {
  // Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function onFilterByKeyword(){
  let elOption = document.getElementById('browser').value
  FilterMemes(elOption)
  renderGallery()
  document.getElementById('browser').value = ''
}