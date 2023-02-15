'use strict'

// 1 - Basic usage I

const name1 = 'Bob'
const time = 'today'

const line1 = 'Hello ' + name1 +', how are you ' + time + '?'
const line2 = `Hello ${name1}, how are you ${time}?`

// console.log(line1)
// console.log(line2)

// 2 - Basic usage II

const txt = 'The Text'
const cls = 'my-class'

const strHtml1 = '<div class="' + cls + '">' + txt + '</div>'
const strHtml2 = `<div class="${cls}">${txt}</div>`

// console.log(strHtml1)
// console.log(strHtml2)

// 3 - Escaping special character sequences (\n and \\n)

var s1 = `In JavaScript '\n' is a line-feed.`
var s2 = `In JavaScript '\\n' is a line-feed.`

// console.log(s1)
// console.log(s2)

// 4 - Multiline strings

// ES5 Multiline strings:
var s3 = `In ES5 \
we could split a string into \
multiple lines like this`

// ES6 Multiline strings:
var s4 = `The same in \
ES6`

var s5 = `With no slash 
   in ES6`

// console.log(s3)
// console.log(s4)
// console.log(s5)