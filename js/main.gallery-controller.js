"use strict"

function renderGallery() {
  let imgs = (!gFilteredImgs || !gFilteredImgs.length)?  getImages() : gFilteredImgs
  let strHTMLS = imgs.map(
    (img) =>
      `<img class="canvas-imgs" id="${img.id}" src=${img.url} onclick="onImgSelect(this)">`
  )
  document.querySelector(`.gallery`).innerHTML = strHTMLS.join("")
}

function onImgSelect(currImg) {
  currLineId = 0
  let id
  if(gMemeIsInSaved){
    id = currImg.id
  }else{
    id = +currImg.id
  }
  const selectedImg = setImg(id)
  onEditMeme()
  resizeCanvas()
  renderMeme(selectedImg)
  drawRect(gElContainer.offsetWidth/2, 25)
  document.getElementById('txt-input').value = ''
}

function onRndImgSelect(currImg) {
  onEditMeme()
  getRandomLine()
  let elImg = document.getElementById(`${currImg.id}`)
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    gMeme.lines.forEach((line) => {
      drawText(line.txt, line.size, line.align, line.color, line.x, line.y)
      // drawRect(100, line.y-25)
    })
  gCurrImgId = currImg.id
}

function onRenderRndImg() {
  let img = getRandomImg()
  onRndImgSelect(img)
  resizeCanvas()
  isRndLines()
}

function onEditMeme() {
  document.querySelector(".editor").style.display = "grid"
  document.querySelector(".gallery").style.display = "none"
  document.querySelector(".saved-memes").style.display = "none"
  document.querySelector(".search-bar").style.display = "none"
  gMemeIsInSaved = false
  resetLines()
}

function onBackHome() {
  document.querySelector(".editor").style.display = "none"
  document.querySelector(".gallery").style.display = "grid"
  document.querySelector(".saved-memes").style.display = "none"
  document.querySelector(".search-bar").style.display = "flex"
  isNotRndLines()
  gMemeIsInSaved = false
}

function onSaveMeme() {
  saveMeme()
}

function onGoToSavedMemes() {
  document.querySelector(".editor").style.display = "none"
  document.querySelector(".gallery").style.display = "none"
  document.querySelector(".search-bar").style.display = "flex"
  document.querySelector(".saved-memes").style.display = "grid"
  renderSavedMemes()
  gMemeIsInSaved = true
}

function renderSavedMemes() {
  let memes = getSavedMemes()
  if (!memes) {
    return
  }
  let strHTMLS = memes.map((memeImg) => 
  `<img id="${memeImg.id}" src="${memeImg.img}" class="canvas-imgs" onclick="onEditSavedMeme(this)">`)
  document.querySelector(".saved-memes").innerHTML = strHTMLS.join("")
}
function onShowAbout(){
  let elModal = document.querySelector(".modal1")
  elModal.style.opacity = '1'
}

function onCloseModal(){
  let elModal = document.querySelector(".modal1")
  elModal.style.opacity = '0'
}


function onEditSavedMeme(img){
  document.querySelector(".editor").style.display = "grid"
  document.querySelector(".gallery").style.display = "none"
  document.querySelector(".saved-memes").style.display = "none"
  document.querySelector(".search-bar").style.display = "none"
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  gCurrImgId = img.id
  resizeCanvas()
}

function onDown(ev) {
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  gIsDrag = true
  //Save the pos we start from
  // gStartPos = pos
  document.body.style.cursor = 'grabbing'
  gLastPos = pos
}

function onMove(ev) {
  if (!gIsDrag) return
  const diff = Math.abs(ev.movementX) > Math.abs(ev.movementY) ? Math.abs(ev.movementX) : Math.abs(ev.movementY)
  let size = 10 * diff
  if (size > 100) size = 100
  if (size < 10) size = 10

  const pos = getEvPos(ev)
  let line = moveLine(pos)
  if(gMemeIsInSaved){
    drawText(line[0].txt, line[0].size, line[0].align, line[0].color, line[0].x, line[0].y)
    let meme = getCurrSavedImg()
    let currImgId = gSavedMemes.findIndex((img) => {
      return img.id === meme.id
    })
    gSavedMemes.splice(currImgId, 1, meme)
    saveToStorage(STORAGE_KEY, gSavedMemes)
  } else{
    drawText(line[0].txt, line[0].size, line[0].align, line[0].color, line[0].x, line[0].y)
  }
    let currImg = setImg(gCurrImgId)
    renderMeme(currImg)
}

function onUp() {
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