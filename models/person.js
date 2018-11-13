const mongoose = require('mongoose')
const url = 'mongodb://user:passwd@ds155663.mlab.com:55663/fullsdb'
mongoose.connect(url, { useNewUrlParser: true })

var personSchema = mongoose.Schema({
    name: String,
    number: String,
    id: String
})

personSchema.statics.format = function(person) {
    return {name: person.name, number: person.number, id: person._id}
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
