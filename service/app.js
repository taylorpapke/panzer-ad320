import express from 'express'
import cors from 'cors'

import Deck from './models/Deck'

const app = express()
const port = 8000

// Middleware

const exampleMiddleware = (req, res, next) => {
  console.log('example middleware')
  next()
}

app.use(cors())
app.use(express.json())
app.use(exampleMiddleware())

// Routes

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

const cardsByDeck = (req, res) => {
  const cards = await Deck.findById(req.params.id)
  console.log(`cards found ${cards.length}`)
  res.json(cards)
}

app.get('/deck/:id/cards', cardsByDeck)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})