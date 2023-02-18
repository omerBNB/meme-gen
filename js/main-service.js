"use strict";

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gElCanvas;
const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];
let gLastPos = { x: null, y: null };
let gCurrSavedImgId;
var gCurrImgId;
var currLineId = 0;
var gCtx;
var gFilteredImgs;
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
    let meme = getCurrSavedImg();
    currImg = meme.img;
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
  if (gMemeIsInSaved) {
    let meme = getCurrSavedImg();
    meme.lines[currLineId].color = clr;
    let currImgId = gSavedMemes.findIndex((img) => {
      return img.id === meme.id;
    });
    gSavedMemes.splice(currImgId, 1, meme);
    saveToStorage(STORAGE_KEY, gSavedMemes);
  }
  gMeme.lines[currLineId].color = clr;
}

function setLineTxt(txt) {
  if (gMemeIsInSaved) {
    let meme = getCurrSavedImg();
    meme.lines[currLineId].txt = txt;
    let currImgId = gSavedMemes.findIndex((img) => {
      return img.id === meme.id;
    });
    gSavedMemes.splice(currImgId, 1, meme);
    saveToStorage(STORAGE_KEY, gSavedMemes);
  }
  gMeme.lines[currLineId].txt = txt;
}

function getCurrMemeTxtSize() {
  if (gMemeIsInSaved) {
    let meme = getCurrSavedImg();
    return meme.lines[gCurrSavedImgId].size;
  }
  return gMeme.lines[currLineId].size;
}

function changeFontSize(txtSize) {
  if (gMemeIsInSaved) {
    let meme = getCurrSavedImg();
    meme.lines[gCurrSavedImgId].size = txtSize;
    let currImgId = gSavedMemes.findIndex((img) => {
      return img.id === meme.id;
    });
    gSavedMemes.splice(currImgId, 1, meme);
    saveToStorage(STORAGE_KEY, gSavedMemes);
  }
  gMeme.lines[currLineId].size = txtSize;
}

function getCurrSavedImg() {
  let memes = loadFromStorage(STORAGE_KEY);
  let meme = memes.find((img) => {
    return img.id === gCurrSavedImgId;
  });
  console.log('meme',meme)
  return meme;
}

function addLine() {
  let meme;
  if (gMemeIsInSaved) {
    meme = getCurrSavedImg();
  }
  let prevLine;
  prevLine = gMemeIsInSaved
    ? meme.lines[meme.lines.length - 1]
    : gMeme.lines[gMeme.lines.length - 1];
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
  if (gMemeIsInSaved) {
    meme.lines.push(newLine);
    let currImgId = gSavedMemes.findIndex((img) => {
      return img.id === meme.id;
    });
    gSavedMemes.splice(currImgId, 1, meme);
    saveToStorage(STORAGE_KEY, gSavedMemes);
  }
  gMeme.lines.push(newLine);
  drawRect();
}

function getCurrLine(lineid) {
  let meme;
  if (gMemeIsInSaved) {
    meme = getCurrSavedImg();
  }
  return gMemeIsInSaved ? meme.lines[lineid] : gMeme.lines[lineid];
}

function getRandomImg() {
  let img = gImgs[getRandomIntInclusive(0, gImgs.length - 1)];
  return img;
}

function getRandomLine() {
  gMeme.lines = [
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
  ];
  let line = gMeme.lines[getRandomIntInclusive(0, gMeme.lines.length - 1)];
  let lines =
    Math.random() > 0.5
      ? line
      : [
          gMeme.lines[getRandomIntInclusive(0, gMeme.lines.length - 1)],
          gMeme.lines[getRandomIntInclusive(0, gMeme.lines.length - 1)],
        ];
  if (lines.length) {
    if (lines[0].y === lines[1].y) {
      getRandomLine();
    }
  }
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
  let lines = gMeme.lines;
  let meme = {
    img: img,
    lines: lines,
    id: makeId(),
  };
  gSavedMemes.push(meme);
  saveToStorage(STORAGE_KEY, gSavedMemes);
}

function getSavedMemes() {
  return (gSavedMemes = loadFromStorage(STORAGE_KEY));
}

function moveLine(pos) {
  let line;
  if (gMemeIsInSaved) {
    let meme = getCurrSavedImg();
    console.log('meme',meme)
    let test = meme.lines.filter((newline) => {
      return (
        pos.x >= newline.x - 100 &&
        pos.x < newline.x + 100 &&
        pos.y >= newline.y - 25 &&
        pos.y < newline.y + 25
      )
    })
    test[0].x = pos.x;
    test[0].y = pos.y;
    let currImgId = gSavedMemes.findIndex((img) => {
      return img.id === meme.id;
    });
    gSavedMemes.splice(currImgId, 1, meme);
    saveToStorage(STORAGE_KEY, gSavedMemes)
    return test
  } else {
    line = gMeme.lines.filter((line) => {
      return (
        pos.x >= line.x - 100 &&
        pos.x < line.x + 100 &&
        pos.y >= line.y - 25 &&
        pos.y < line.y + 25
      )
    });
    line[0].x = pos.x;
    line[0].y = pos.y;
  }
  return line;
}

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  // Note: changing the canvas dimension this way clears the canvas
  gElCanvas.width = elContainer.offsetWidth / 2;
  console.log("gElCanvas.width", gElCanvas.width);
  console.log("elContainer.offsetWidth", elContainer.offsetWidth);
  let currImg = gMemeIsInSaved ? getCurrSavedImg() : setImg(gCurrImgId);
  if (!currImg) {
    return;
  }
  renderMeme(currImg);
}

function resetLines() {
  gMeme.lines = [
    {
      txt: "Text Here",
      size: 20,
      align: "center",
      color: "red",
      x: 150,
      y: 50,
    },
  ];
}

function FilterMemes(val) {
  let imgs = getImages();
  gFilteredImgs = imgs.filter((img) => {
    return img.keywords.includes(val.toLowerCase());
  });
  return gFilteredImgs;
}
