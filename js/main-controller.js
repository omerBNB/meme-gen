"use strict"

var gIsDownLoading = false

function onInit() {
  gElCanvas = document.querySelector("#my-canvas")
  gCtx = gElCanvas.getContext("2d")
  addEventListeners()
  addMouseListeners()
  renderGallery()
  resizeCanvas()
}

function renderMeme(img) {
  if(gMemeIsInSaved){
    let meme = getCurrSavedImg()
    console.log('meme',meme)
    let elImg = document.getElementById(`${meme[0].id}`)
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    meme[0].lines.forEach((line) => {
      drawText(line.txt, line.size, line.align, line.color, line.x, line.y)
    })
    gCurrImgId = meme[0].id
  }else{
    let elImg = document.getElementById(`${img.id}`)
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    let memes = getMemes()
    memes.lines.forEach((line) => {
      drawText(line.txt, line.size, line.align, line.color, line.x, line.y)
    })
    gCurrImgId = img.id
  }
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
  let currImg = (gMemeIsInSaved)?  getCurrSavedImg():setImg(gCurrImgId)
  renderMeme(currImg)
}

function onSetTxtColor(selectedColor) {
  SetTxtColor(selectedColor)
  let currImg = (gMemeIsInSaved)?  getCurrSavedImg():setImg(gCurrImgId)
  renderMeme(currImg)
}

function onIncreaseFont() {
  let txtSize = getCurrMemeTxtSize()
  if (txtSize >= 56) {
    return
  }
  txtSize += 4
  console.log("txtSize", txtSize)
  changeFontSize(txtSize)
  let currImg = (gMemeIsInSaved)?  getCurrSavedImg():setImg(gCurrImgId)
  renderMeme(currImg)
}

function onDecreaseFont() {
  let txtSize = getCurrMemeTxtSize()
  if (txtSize <= 24) {
    return
  }
  txtSize -= 4
  console.log("txtSize", txtSize)
  changeFontSize(txtSize)
  let currImg = (gMemeIsInSaved)?  getCurrSavedImg():setImg(gCurrImgId)
  renderMeme(currImg)
}

function onAddLine() {
  let determ = lineLengthDetermination()
  if (!determ){
    return
  }
  document.getElementById(`txt-input`).value = ""
  addLine()
  currLineId++
  lineDetermination()
  let line = getCurrLine(currLineId)
  let currImg = (gMemeIsInSaved)?  getCurrSavedImg():setImg(gCurrImgId)
  renderMeme(currImg)
  drawRect(line.x - 100, line.y - 25)
}

function lineLengthDetermination(){
  if(gMemeIsInSaved){
    let meme = getCurrSavedImg()
    if (meme.lines.length >= 3) {
      return false
    } else{
      return true
    }
}
else if (gMeme.lines.length >= 3) {
  return false
}else{
  return true
}
}

function lineDetermination(){
  if(gMemeIsInSaved){
    let meme = getCurrSavedImg()
    if (currLineId > meme.lines.length - 1) {
      currLineId = 0
    }
  } else if (currLineId > gMeme.lines.length - 1) {
    currLineId = 0
  }
  }

function onSwichLine() {
  currLineId++
  lineDetermination()
  let currImg = (gMemeIsInSaved)?  getCurrSavedImg():setImg(gCurrImgId)
  renderMeme(currImg)
  let line = getCurrLine(currLineId)
  drawRect(line.x - 100, line.y - 25)
  document.getElementById('txt-input').value = ''
}

function downloadImg(elLink) {
  gIsDownLoading = true
  let currImg = (gMemeIsInSaved)?  getCurrSavedImg():setImg(gCurrImgId)
  renderMeme(currImg)
  const imgContent = gElCanvas.toDataURL("image/jpeg")
  elLink.href = imgContent
  gIsDownLoading = false
}

function onEraseLine(){
  eraseLine(currLineId)
  let currImg = (gMemeIsInSaved)?  getCurrSavedImg():setImg(gCurrImgId)
  renderMeme(currImg)
}


function onIncreaseLineHeight(){
  increaseLineHeight(currLineId)
  let currImg = (gMemeIsInSaved)?  getCurrSavedImg():setImg(gCurrImgId)
  renderMeme(currImg)
}
function onLowerLineHeight(){
  lowerLineHeight(currLineId)
  let currImg = (gMemeIsInSaved)?  getCurrSavedImg():setImg(gCurrImgId)
  renderMeme(currImg)
}

function addEventListeners(){
  let upBtn = document.querySelector('.upBtn')
  upBtn.addEventListener('mousedown', onIncreaseLineHeight)
  let downBtn = document.querySelector('.downBtn')
  downBtn.addEventListener('mousedown', onLowerLineHeight)
}

