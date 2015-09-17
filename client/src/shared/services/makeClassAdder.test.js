// var path     = './makeClassAdder.js'
// var subject  = require(path)
// var expect   = require('chai').expect
// var adder

// describe('makeClassAdder', function() {
//   before(function() {
//     adder = subject('foo')
//   })

//   it('returns the base class if given no element', function() {
//     var res = adder()
//     expect(res).to.eql('foo')
//   })

//   it('returns the base class if given no element', function() {
//     var res = adder('')
//     expect(res).to.eql('foo')
//   })

//   it('returns class for an element', function() {
//     var res = adder('bar')
//     expect(res).to.eql('foo--bar')
//   })

//   it('adds classes as a string', function() {
//     var res = adder('bar', 'one', 'two')
//     expect(res).to.eql('foo--bar one two')
//   })

//   it('adds classes as a string', function() {
//     var res = adder('bar', 'one two')
//     expect(res).to.eql('foo--bar one two')
//   })

//   it('adds classes as an array', function() {
//     var res = adder('bar', ['one', 'two'])
//     expect(res).to.eql('foo--bar one two')
//   })

//   it('adds classes as an object', function() {
//     var res = adder('bar', {one: true, two: false, three: true})
//     expect(res).to.eql('foo--bar one three')
//   })

// })
