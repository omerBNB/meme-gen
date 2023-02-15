'use strict'


// 1 - SPREAD: Passes each element of an array as separate argument

const nums = [3, 7, 2]

var max = Math.max(...nums)
// console.log('EXPECTED: max=7, ACTUAL: max=', max)

var res = func1(...nums)
// console.log('EXPECTED: 12 ACTUAL:', res)

function func1(x, y, z) {
    return x + y + z
}

////////////////////////////////////////////////////

// 2 - Shallow copy - with SPREAD:

// var copy = [...nums]
// copy.pop()
// console.log('EXPECTED: nums.length=3, ACTUAL:', nums.length)
// console.log('EXPECTED: copy.length=2, ACTUAL:', copy.length)

////////////////////////////////////////////////////

// 3 - Try with or without spreading the sent array

// func2(...[9, 5], 999)

// function func2(...args) {    // ...rest
//     console.log('args', args)
// }