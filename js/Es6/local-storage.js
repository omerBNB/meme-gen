'use strict'

// Local Storage - Functional interface vs. dot notation
// When the key we are trying to retrieve doesn't exist...

var val = localStorage.getItem('babaPuki')
// console.log('val: ', val) // returns null

var val = localStorage.babaPuki
// console.log('val: ', val) // returns undefined

// When trying to use one of the LocalStorage objet's 
// predefined properties (There are six of these: 
// length, key, setItem, getItem, removeItem, and clear)

var val = localStorage.getItem('length')
console.log('val: ', val) // returns null - no such key in localStorage

var val = localStorage.length
console.log('val: ', val) // returns the number of entries in localStorage