const mongoose = require('mongoose')

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
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
