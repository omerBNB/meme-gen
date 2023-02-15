'use strict'

// A side story about copying an object
// 1 - Shallow copy

var user1 = {
    name: "Shaul",
    score: 90,
    address: { city: 'Tel Aviv', street: 'Nahmani' }
}

// Object.assign (ES5) performs shallow copy:
var user2 = Object.assign({}, user1)

// In ES6 we will usually use SPREAD for shallow copy
var user3 = { ...user1 }

user2.score = 175
user2.address.street = 'Nordeo'

console.log(user1)
// console.log(user2)
// console.log(user3)

// // Sharing the same address object 
// console.log('user1',user1.address)
// console.log('user2',user2.address)
// console.log('user3',user3.address)


////////////////////////////////////////////////////

var u1 = {
    name: "User 1",
    score: 90,
    address: { city: 'Tel Aviv', street: 'Nahmani' }
}

// Using Object.assign()

var u2 = Object.assign({}, u1, { score: 75, address: { city: 'Tel Aviv', street: 'Nordeo' } })
console.log('u1: ', u1)
console.log('u2: ', u2)
// console.log('Using separate address objects:', u1.address, u2.address)


////////////////////////////////////////////////////

// The new way using spread

var u2 = { ...u1, score: 99, address: { city: 'Tel Aviv', street: 'Nordeo' } }
// u2.address.city = 'Metula'
// console.log('Using a separate address object:', u1.address, u2.address)

////////////////////////////////////////////////////

// The new way using spread twice

var u2 = { ...u1, score: 99, address: { ...u1.address } }
// u2.address.city = 'Afula'
// console.log('Using separate address objects:', u1.address, u2.address)


////////////////////////////////////////////////////
// var user1 = {
//     name: "Shaul",
//     score: 90,
//     address: { city: 'Tel Aviv', street: 'Nahmani' }
// }

var user4 = Object.assign({}, user1, { isBaba: true, score: 40 }, { isLala: false })
// console.log('Object.assign can receive many objects:', user4)

var user5 = { ...user1, ...{ isBaba: true, score: 40 }, ...{ isLala: false } }
// console.log('We can do tis with spread too:', user5)


////////////////////////////////////////////////////


// Lets perform a DEEP copy for pet1:
const pet1 = { fullName: 'Charli B', score: 20, nicknames: ['Chuli', 'Chuchu'] }

// const pet2 = { ...pet1 } // shallow copy
const pet2 = { ...pet1, nicknames: [...pet1.nicknames] } // deep copy

pet2.fullName += 'lue'
pet2.nicknames.push('Chip')
// console.log('Here are some pets:', pet1, pet2)

// Usually Objects are nested, and we should be careful about performing shallow copies
// We can usually use this technique for performing DEEP COPY:

const pet3 = JSON.parse(JSON.stringify(pet1))
// const pet3 = structuredClone(pet1)




pet3.fullName += 'za'

// console.log('Here are some pets:', pet1, pet2, pet3)



