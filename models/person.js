const mongoose = require('mongoose')
const url = 'mongodb://usr:pass@ds155663.mlab.com:55663/fullsdb'
mongoose.connect(url, { useNewUrlParser: true })

var personSchema = mongoose.Schema({
    name: String,
    number: String
})

personSchema.statics.format = function(person) {
    return {name: person.name, number: person.number}
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
