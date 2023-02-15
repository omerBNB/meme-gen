'use strict'

// Array Destructuring
// 1 - Basic syntax

// var a, b
// [a, b] = [11, 22, 33, 4, 5]
// console.log(`a: ${a}    b: ${b}`)

const [c, d] = [11, 22, 33, 4, 5]
// console.log(`c: ${c}    d: ${d}`)

////////////////////////////////////////////////////

// 2 - Swapping variables

var x = 6
var y = 2;


// Must use semicolon here if not defining the vars here:
[x, y] = [y, x]
// console.log(`x: ${x}    y: ${y}`)


////////////////////////////////////////////////////
// 3 - Ignoring some of the array's values

// var [i, , , j] = [11, 22, 33, 44, 55]
// console.log(`i: ${i}    j: ${j}`)


////////////////////////////////////////////////////

// 3 - Taking the ...rest into an array

// var [m, n, ...rest] = [1, 2, 3, 4, 5]
// console.log('Result:', m, n, rest)

////////////////////////////////////////////////////

// Object destructuring
// 1 - Basic assignment

var info = { p: 42, d: 55, baba: 8, mama: 10, q: true }
// var p = info.p
// var q = info.q
const { p, q } = info
// const { p, q, ...rest } = info
// console.log(rest);
// console.log(`p: ${p}    q: ${q}`)


////////////////////////////////////////////////////

// 2 - Destructuring function parameters

// foo1(info)
// foo2(info)

function foo1(obj) {
    console.log(`foo1: p: ${obj.p}    q: ${obj.q}`)
}

function foo2({ p, q }) {
    console.log(`foo2: p: ${p}    q: ${q}`)
}
////////////////////////////////////////////////////

// 2 - Destructuring with default values

// j & k are being given default values
// ...but j is being overriden by assignment

const obj = { j: 8, popo: true }
var { j = 10, k = 5 } = obj
console.log(`Result: j: ${j}    k: ${k}`)

////////////////////////////////////////////////////

// 3 - Renaming properties + default values

const pet1 = {
    name: 'Charli',
    age: 5,
}

const pet2 = {
    name: 'puki',
    age: 6,
}

// var { name: petName, age: petAge } = pet1
var { name: petName = 'Arik', age: petAge } = pet1
// var petName = pet1.name || 'Arik'
// var petAge = pet1.age
// console.log('petName, petAge: ', petName, petAge)

////////////////////////////////////////////////////


// 4 - More examples

printAge(pet1, pet2)

function printAge({ age }, { name }) {
    // age = 8
    console.log('age, name: ', age, name)
}


////////////////////////////////////////////////////


// Assignment without declaration needs paranthesis:
var s1, s2;
({ s1, s2 } = { s1: 1, s2: 2 })
// console.log('s1, s2: ', s1, s2)