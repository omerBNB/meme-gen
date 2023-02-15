'use strict'

// 1 - The old way, using 'arguments'

// func1(2, 4, 6)
// console.log(func1(2, 4, 6))

function func1() {
    console.log('func1() arguments', arguments) // arguments is not a real array
    return arguments.length
}


////////////////////////////////////////////////////

// 2 - The newer way, using the ...rest operator

// var count = func2(67, 'shlomo', 6)
// console.log(`EXPECTED: count=3, ACTUAL: count=${count}`)

function func2(...args) {
    console.log('func2() args', args)
    return args.length
}

// 3 - Get x and the ...rest (...rest has to be last)

const res = func3(3, 4, 5, 6, 7)
// const res = func3(3, ["hello", true], 'baba')

function func3(x, ...y) {
    console.log('x: ', x)
    console.log('func3(): y is an array:', y)
    return x * y.length
}

// 4 - No 'arguments' keyword in arrow functions 

const func4 = (...args) => {
    // console.log('arguments', arguments)
    // console.log('args', args)
}

func4(7, 1, 2, 2)