const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
app.use(bodyParser.json())
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))


  let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    },
  ]


  app.get('/api/persons', (req, res) => {
      res.json(persons)
  })

  app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(a => a.id === Number(req.params.id))
    if(person) {
       res.json(person) 
    } else {
        res.status(404).end()
    }
  })

  app.get('/info', (req, res) => {
    res.send(`<p> Luettelossa on ${persons.length} henkilön tiedot</p> <p> ${new Date()} </p>`)
  })

  app.post('/api/persons/', (req, res) => {
      const genId = Math.random() * (50000 - 5) + 5
      const body = req.body

      if(body.number === undefined || body.number === "") {
          return res.status(404).json({error: 'invalid number in POST request'})
      }
      if(body.name === undefined || body.name === "") {
        return res.status(404).json({error: 'invalid name in POST request'})
      } else if (persons.find(person => person.name === body.name)) {
        return res.status(404).json({error: 'name must be LÉ UNIQUE!'})
      }

      const person = {
          name: body.name,
          number: body.number,
          id: genId,
      }

      persons.push(person)
      res.json(person)
  })

  app.delete('/api/persons/:id', (req, res) => {
    console.log('DELETE /api/persons/'+req.params.id)
    persons = persons.filter(person => person.id !== Number(req.params.id))
    res.status(204).end()
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
