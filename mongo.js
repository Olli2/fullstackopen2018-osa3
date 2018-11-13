const mongoose = require('mongoose')
const len = process.argv.length
const url = 'mongodb://username:password@ds155663.mlab.com:55663/fullsdb'
mongoose.connect(url, { useNewUrlParser: true })



const Contact = mongoose.model("Contact", {
    name: String,
    number: String
})

if(len === 2) {
    console.log('puhelinluettelo:')
    Contact.find({}).then(res => {

        res.forEach(o => {
            console.log(`${o.name} ${o.number}`);
        })
        
        mongoose.connection.close()
    })
}

if(len === 4) {
    const name = process.argv[2]
    const num = process.argv[3]

    const contact = new Contact({
        name: name,
        number: num,
    })
    contact.save().then(res => {
        console.log(`Lisätään henkilö ${name} numero ${num} luetteloon.`)
        mongoose.connection.close()
    })

}
