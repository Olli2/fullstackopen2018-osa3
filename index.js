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
        .findById(Number(req.params.id))
        .then(a => {
            res.json(a)
        })
  })

  app.get('/info', (req, res) => {
    res.send(`<p> Luettelossa on ${persons.length} henkilön tiedot</p> <p> ${new Date()} </p>`)
  })

  app.post('/api/persons/', (req, res) => {
      const genId = Math.random() * (50000 - 5) + 5
      const body = req.body 
      if (body === undefined) {
        return res.status(400).json({error: 'content missing'})
      }
      const person = new Person({
        name: body.name,
        number: body.number
      })
      person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        
  })

  app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(person => person.id !== Number(req.params.id))
    res.status(204).end()
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
