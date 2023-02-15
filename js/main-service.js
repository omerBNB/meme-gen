"use strict";

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gElCanvas;
var gCurrImgId;
var currLineId = 0
var gCtx;
var gImgs = [
  { id: 1, url: "imgs/1.jpg", keywords: ["funny", "cat"] },
  { id: 2, url: "imgs/2.jpg", keywords: ["funny", "cat"] },
  { id: 3, url: "imgs/3.jpg", keywords: ["funny", "cat"] },
  { id: 4, url: "imgs/4.jpg", keywords: ["funny", "cat"] },
  { id: 5, url: "imgs/5.jpg", keywords: ["funny", "cat"] },
  { id: 6, url: "imgs/6.jpg", keywords: ["funny", "cat"] },
  { id: 7, url: "imgs/7.jpg", keywords: ["funny", "cat"] },
  { id: 8, url: "imgs/8.jpg", keywords: ["funny", "cat"] },
  { id: 9, url: "imgs/9.jpg", keywords: ["funny", "cat"] },
  { id: 10, url: "imgs/10.jpg", keywords: ["funny", "cat"] },
  { id: 11, url: "imgs/11.jpg", keywords: ["funny", "cat"] },
  { id: 12, url: "imgs/12.jpg", keywords: ["funny", "cat"] },
  { id: 13, url: "imgs/13.jpg", keywords: ["funny", "cat"] },
  { id: 14, url: "imgs/14.jpg", keywords: ["funny", "cat"] },
  { id: 15, url: "imgs/15.jpg", keywords: ["funny", "cat"] },
  { id: 16, url: "imgs/16.jpg", keywords: ["funny", "cat"] },
  { id: 17, url: "imgs/17.jpg", keywords: ["funny", "cat"] },
  { id: 18, url: "imgs/18.jpg", keywords: ["funny", "cat"] },
];
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I sometimes eat Falafel",
      size: 20,
      align: "center",
      color: "red",
      x:250,
      y:100,
    },

  ],
};

function getImages() {
  return gImgs;
}

function getMemes() {
  return gMeme;
}

//! function getImgs(){
//   let imgs = []
//   for (let i = 1; i <= 18; i++) {
//     let img = {
//       id: i, url: `imgs/${i}.jpg`, keywords: ["funny", "cat"]
//     }
//     imgs.push(img)
//   }
//   console.log('imgs',imgs)
// }

function setImg(id) {
  let currImg = gImgs.find((img) => {
    return img.id === id;
  });
  return currImg;
}

function drawText(text,size,align,color, x, y) {
  gCtx.beginPath()
  let imgClr = color
  let txtSize = size
  let textASlign = align
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = `${imgClr}`;
  gCtx.fillStyle = "white";
  gCtx.font = `${txtSize}px Impact`;
  gCtx.textAlign = `${textASlign}`;
  gCtx.textBaseline = "middle";

  gCtx.fillText(text, x, y); // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x, y); // Draws (strokes) a given text at the given (x, y) position.
  gCtx.closePath()
}

function SetTxtColor(clr) {
  gMeme.lines[currLineId].color = clr
}

function setLineTxt(txt) {
  gMeme.lines[currLineId].txt = txt;
}

function getCurrMemeTxtSize(){
  return gMeme.lines[currLineId].size
}

function changeFontSize(txtSize){
  gMeme.lines[currLineId].size = txtSize
}

function addLine(){
  let prevLine = gMeme.lines[gMeme.lines.length-1]
  let newLine = {
    txt: "",
    size: 20,
    align: "center",
    color: "red",
    x:prevLine.x,
    y:prevLine.y + 150,
  }
  gMeme.lines.push(newLine)
}