'use strict'

var nums = [8, 3, 7, 10]

// nums.map(function(v) { . // ES5
//     console.log('v is: ', v)
//     return (v % 5 === 0) ? true : false
// })



// Arrow function syntax

nums.map((v) => {
    // console.log('v is: ', v)
    return (v % 5 === 0) ? true : false
})


// Expression bodies: the body of the function is a single expression
// In other words, if an arrow function has just one line...
nums.map((v) => {
    return (v % 5 === 0) ? true : false
})


// ...we can drop the return & {}
nums.map((v) => (v % 5 === 0) ? true : false)


// ...and if it has exactly one parameter, we can drop the ()
nums.map(v => (v % 5 === 0) ? true : false)


// Expression bodies: the body of the function is a single expression
var odds = nums.filter(n => n % 2)
var mults = nums.map(n => n * n)


// When returning an object from an expression body
// we need to wrap returned object in prenthesis

var sum = nums.reduce((acc, n) => ({ total: acc.total + n }), { total: 0 })


// console.log('Odds: ', odds)
// console.log('Mults: ', mults)
// console.log('sum is: ', sum)


// ********************************************
// Arrow function and 'this'
// ********************************************

// By default, the this of a global function is the window
// in strict mode it is set to undefined

// func1()

function func1() {
    console.log(this)
    this.papa = 'rolling stone'
    return 17
}

var obj = {
    name: 'Albert',
    func: func1, // func1() is assigned to an object property
}

// obj.func() // When activated in the context of obj, this becomes obj
// console.log('obj', obj)
// console.log('External this', this)


////////////////////////////////////////////////////


var person = {
    fullName: 'Muki',
    age: 19,
    speak() {
        console.log('this inside speak() -', this)
        console.log(this.fullName + ' is Speaking')
        // const that = this

        // the 'this' in arrow function is bound to the containing scope
        setTimeout(() => {
            // console.log(that, that.fullName + ' is Speaking')
            console.log(this, this.fullName + ' is Speaking')
        }, 1000)
    },
}

// person.speak()


////////////////////////////////////////////////////

var bob = {
    _name: 'Bob',
    _friends: ['Puki', 'Muki'],
    printFriends(promo) {
        console.log(promo)
        console.log('this inside printFriends', this)
        // var that = this
        // In arrow functions the "this" is lexically bound
        this._friends.forEach((friend) => {
            console.log('INSIDE FOREACH THIS', this, friend)
            // console.log(this._name + ' knows ' + friend)
        })
    },
}
bob.printFriends('Tadam!')
