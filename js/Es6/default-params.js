'use strict'

function sum1(x, y = 12) {
    // y is 12 if not passed (or passed as undefined)
    return x + y
}
console.log('EXPECTED: sum1(3) to return 15. \nACTUAL:', sum1(3))

function sum2(x = 10, y) {
    return x + y
}
console.log('EXPECTED: sum2(undefined, 1) to return 11. \nACTUAL:', sum2(undefined, 1))