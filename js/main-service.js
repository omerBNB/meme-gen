"use strict";

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gElCanvas;
const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];
let gLastPos = { x: null, y: null };
let gCurrSavedImgId;
var gCurrImgId;
var currLineId = 0;
var gCtx;
var gFilteredImgs
var gMemeIsInSaved = false;
var gIsDrag = false;
const STORAGE_KEY = "memes";
var gSavedMemes;
var gImgs = [
  { id: 1, url: "imgs/1.jpg", keywords: ["funny", "president"] },
  { id: 2, url: "imgs/2.jpg", keywords: ["dog", "cute"] },
  { id: 3, url: "imgs/3.jpg", keywords: ["baby", "dog"] },
  { id: 4, url: "imgs/4.jpg", keywords: ["cute", "cat"] },
  { id: 5, url: "imgs/5.jpg", keywords: ["funny", "baby"] },
  { id: 6, url: "imgs/6.jpg", keywords: ["funny", "idiotic"] },
  { id: 7, url: "imgs/7.jpg", keywords: ["funny", "baby"] },
  { id: 8, url: "imgs/8.jpg", keywords: ["funny", "idiotic"] },
  { id: 9, url: "imgs/9.jpg", keywords: ["funny", "baby"] },
  { id: 10, url: "imgs/10.jpg", keywords: ["funny", "president"] },
  { id: 11, url: "imgs/11.jpg", keywords: ["funny", "idiotic"] },
  { id: 12, url: "imgs/12.jpg", keywords: ["funny", "idiotic"] },
  { id: 13, url: "imgs/13.jpg", keywords: ["funny", "idiotic"] },
  { id: 14, url: "imgs/14.jpg", keywords: ["funny", "idiotic"] },
  { id: 15, url: "imgs/15.jpg", keywords: ["funny", "idiotic"] },
  { id: 16, url: "imgs/16.jpg", keywords: ["funny", "idiotic"] },
  { id: 17, url: "imgs/17.jpg", keywords: ["funny", "president"] },
  { id: 18, url: "imgs/18.jpg", keywords: ["funny", "idiotic"] },
];
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Text Here",
      size: 20,
      align: "center",
      color: "red",
      x: 150,
      y: 50,
    },
  ],
  randLines: [
    {
      txt: makeLorem(3),
      size: getRandomIntInclusive(20, 24),
      align: "center",
      color: getRandomColor(),
      x: 150,
      y: 50,
    },
    {
      txt: makeLorem(3),
      size: getRandomIntInclusive(20, 24),
      align: "center",
      color: getRandomColor(),
      x: 150,
      y: 100,
    },
    {
      txt: makeLorem(3),
      size: getRandomIntInclusive(20, 24),
      align: "center",
      color: getRandomColor(),
      x: 150,
      y: 150,
    },
  ],
  isRnd: false,
};

function getImages() {
  return gImgs;
}

function getMemes() {
  return gMeme;
}

function setImg(id) {
  let currImg;
  if (gMemeIsInSaved) {
    let memeStorage = loadFromStorage(STORAGE_KEY);
    currImg = memeStorage.find((item) => {
      return item.id === +gCurrSavedImgId;
    });
  } else {
    currImg = gImgs.find((img) => {
      return img.id === id;
    });
  }
  return currImg;
}

function drawText(text, size, align, color, x, y) {
  gCtx.beginPath();
  let imgClr = color;
  let txtSize = size;
  let textASlign = align;
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = `${imgClr}`;
  gCtx.fillStyle = "white";
  gCtx.font = `${txtSize}px Impact`;
  gCtx.textAlign = `${textASlign}`;
  gCtx.textBaseline = "middle";

  gCtx.fillText(text, x, y); // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x, y); // Draws (strokes) a given text at the given (x, y) position.
  gCtx.closePath();
}

function drawRect(x, y) {
  gCtx.strokeStyle = "white";
  gCtx.strokeRect(x, y, 200, 50);

  gCtx.fillStyle = "rgba(255,255,255,0.3)";
  gCtx.fillRect(x, y, 200, 50);
}

function SetTxtColor(clr) {
  gMeme.lines[currLineId].color = clr;
}

function setLineTxt(txt) {
  if (!gMeme.isRnd) {
    gMeme.lines[currLineId].txt = txt;
  } else {
    gMeme.randLines[currLineId].txt = txt;
  }
  
}

function getCurrMemeTxtSize() {
  if (!gMeme.isRnd) {
    return gMeme.lines[currLineId].size;
  } else {
    return gMeme.randLines[currLineId].size;
  }
}

function changeFontSize(txtSize) {
  if (!gMeme.isRnd) {
    gMeme.lines[currLineId].size = txtSize;
  } else gMeme.randLines[currLineId].size = txtSize;
}

function addLine() {
  let prevLine;
  if (gMeme.isRnd) {
    prevLine = gMeme.lines[gMeme.randLines.length - 1];
  } else {
    prevLine = gMeme.lines[gMeme.lines.length - 1];
  }
  let newLine;
  if (!prevLine) {
    newLine = {
      txt: "Text Here",
      size: 20,
      align: "center",
      color: "red",
      x: 150,
      y: 50,
    };
  } else {
    newLine = {
      txt: "",
      size: 20,
      align: "center",
      color: "red",
      x: prevLine.x,
      y: prevLine.y + 75,
    };
  }
  gMeme.lines.push(newLine);
  drawRect();
}

function getCurrLine(lineid) {
  return gMeme.lines[lineid];
}

function getRandomImg() {
  let img = gImgs[getRandomIntInclusive(0, gImgs.length - 1)];
  return img;
}

function getRandomLine() {
  let line =
    gMeme.randLines[getRandomIntInclusive(0, gMeme.randLines.length - 1)];
  let lines =
    Math.random() > 0.5
      ? line
      : [
          gMeme.randLines[getRandomIntInclusive(0, gMeme.randLines.length - 1)],
          gMeme.randLines[getRandomIntInclusive(0, gMeme.randLines.length - 1)],
        ];
  if (lines.length) {
    if (lines[0].y === lines[1].y) {
      getRandomLine();
    }
  } else {
    return lines;
  }
  return lines;
}

function clearRect() {
  let line = gMeme.lines[currLineId];
  gCtx.clearRect(line.x, line.y, 300, 50);
}

function isRndLines() {
  gMeme.isRnd = true;
}

function isNotRndLines() {
  gMeme.isRnd = false;
}

function eraseLine(lineId) {
  gMeme.lines.splice(gMeme.lines[lineId], 1);
}

function increaseLineHeight(lineId) {
  let line = getCurrLine(lineId);
  line.y -= 5;
}
function lowerLineHeight(lineId) {
  let line = getCurrLine(lineId);
  line.y += 5;
}

function saveMeme() {
  gSavedMemes = loadFromStorage(STORAGE_KEY);
  if (!gSavedMemes || !gSavedMemes.length) {
    gSavedMemes = [];
  }
  let img = gElCanvas.toDataURL();
  let lines;
  if (gMeme.isRnd) {
    lines = gMeme.randLines;
  } else {
    lines = gMeme.lines;
  }

  let meme = {
    img: img,
    lines: lines,
    id: gCurrImgId,
  };
  gSavedMemes.push(meme);
  saveToStorage(STORAGE_KEY, gSavedMemes);
}

function getSavedMemes() {
  return (gSavedMemes = loadFromStorage(STORAGE_KEY));
}

function moveLine(pos) {
  let line
  if(gMemeIsInSaved){
    let savedLines = getSavedMemes()
    console.log('savedLines',savedLines)
    line = savedLines[0].lines.filter(line =>{
      return (pos.x >= line.x-100 && pos.x < line.x + 100 && pos.y >= line.y-25 && pos.y < line.y + 25)
    })
      line[0].x = pos.x
      line[0].y = pos.y
      saveToStorage(STORAGE_KEY, gSavedMemes)
  }else{
    line = gMeme.lines.filter(line =>{
      // console.log('line',line)
      return (pos.x >= line.x-100 && pos.x < line.x + 100 && pos.y >= line.y-25 && pos.y < line.y + 25)
    })
      line[0].x = pos.x
      line[0].y = pos.y
  }
  return line
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  // Note: changing the canvas dimension this way clears the canvas
  gElCanvas.width = elContainer.offsetWidth/2
  console.log('gElCanvas.width',gElCanvas.width)
  console.log('elContainer.offsetWidth',elContainer.offsetWidth)
  let currImg = setImg(gCurrImgId);
  if(!currImg){
    return
  }
  renderMeme(currImg);
}

function resetLines(){
  gMeme.lines = [
    {
      txt: "Text Here",
      size: 20,
      align: "center",
      color: "red",
      x: 150,
      y: 50,
    },
  ]
}

function FilterMemes(val){
  let imgs = getImages()
  gFilteredImgs = imgs.filter(img => {
     return img.keywords.includes(val.toLowerCase())
     })
  return gFilteredImgs
}