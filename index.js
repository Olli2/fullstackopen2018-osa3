const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
app.use(bodyParser.json())
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const Person = require('./models/person')

  app.get('/api/persons', (req, res) => {
      Person
        .find({})
        .then(persons => {
            res.json(persons.map(Person.format))
        })
  })

  app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
          if(person) {
            res.json(Person.format(person))
          } else {
            res.status(404).end()
          }
        })
        .catch(error => {
          res.status(400).send({error: 'invalid id'})
        })
  })

  app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
      res.send(`<p> Luettelossa on ${persons.length} henkilön tiedot</p> <p> ${new Date()} </p>`)
    })
  })

  app.post('/api/persons/', (req, res) => {
    const body = req.body 
    if (body === undefined) {
      return res.status(400).json({error: 'content missing'})
    }
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person
      .save()
      .then(savedPerson => {
          res.json(savedPerson)
      })
})

  app.put('/api/persons/:id', (req, res) => {
    const body = req.body
    const person = {
      name: body.name,
      number: body.number
    }
    Person.findOneAndUpdate({ _id: body.id }, person, {new: true})
      .then(updatedPerson => {  
        res.json(updatedPerson.format)
      })
  })

  app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => {
        res.status(400).send({error: 'invalid id'})
      })
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
