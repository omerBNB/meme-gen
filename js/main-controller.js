"use strict";

function onInit() {
  gElCanvas = document.querySelector("#my-canvas");
  gCtx = gElCanvas.getContext("2d");
  addEventListeners()
  addEventsToCanvas()
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
  drawRect(line.x - 150, line.y - 25);
}
function onSwichLine() {
  currLineId++;
  if (currLineId > gMeme.lines.length - 1) {
    currLineId = 0;
  }
  let currImg = setImg(gCurrImgId);
  renderMeme(currImg);
  let line = getCurrLine(currLineId);
  drawRect(line.x - 150, line.y - 25);
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
  console.log('upBtn',upBtn)
  upBtn.addEventListener('mousedown', onIncreaseLineHeight)
  let downBtn = document.querySelector('.downBtn')
  downBtn.addEventListener('mousedown', onLowerLineHeight)
}






function handleMouseDown(e){
  e.preventDefault();
  startX=parseInt(e.clientX-offsetX);
  startY=parseInt(e.clientY-offsetY);
  // Put your mousedown stuff here
  for(var i=0;i<texts.length;i++){
      if(textHittest(startX,startY,i)){
          selectedText=i;
      }
  }
}

// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(x,y,textIndex){
    var text=texts[textIndex];
    return(x>=text.x && 
        x<=text.x+text.width &&
        y>=text.y-text.height && 
        y<=text.y);
}
// In mousemove

// Change the selected text's x,y by the distance the mouse has been dragged:

//     handle mousemove events
//     calc how far the mouse has been dragged since
//     the last mousemove event and move the selected text
//     by that distance

    function handleMouseMove(e){
      if(selectedText<0){return;}
      e.preventDefault();
      mouseX=parseInt(e.clientX-offsetX);
      mouseY=parseInt(e.clientY-offsetY);

//  Put your mousemove stuff here
      var dx=mouseX-startX;
      var dy=mouseY-startY;
      startX=mouseX;
      startY=mouseY;

      var text=texts[selectedText];
      text.x+=dx;
      text.y+=dy;
      draw();
    }
// In mouseup

// The drag is over:

// done dragging
function handleMouseUp(e){
  e.preventDefault();
  selectedText=-1;
}

function addEventsToCanvas(){
  document.getElementById("my-canvas").mousedown(function(e){handleMouseDown(e);});
  document.getElementById("my-canvas").mousemove(function(e){handleMouseMove(e);});
  document.getElementById("my-canvas").mouseup(function(e){handleMouseUp(e);});
  document.getElementById("my-canvas").mouseout(function(e){handleMouseOut(e);});
}