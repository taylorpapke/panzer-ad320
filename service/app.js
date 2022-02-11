import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { Deck } from './models/Deck.js'

const app = express()
const port = 8000

// Connect to MongoDB

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@crit-cluster.bpw1p.mongodb.net/notoriety?retryWrites=true&w=majority`
try {
  await mongoose.connect(connectionString)
} catch (err) {
  console.log('error ', err)
}

// Middleware

const exampleMiddleware = (req, res, next) => {
  console.log('example middleware')
  next()
}

app.use(cors())
app.use(express.json())
app.use(exampleMiddleware)

// Routes

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

const cardsByDeck = async (req, res) => {
  const cards = await Deck.findById(req.params.id)
  console.log(`cards found ${cards.length}`)
  res.json(cards)
}

app.get('/decks/:id/cards', cardsByDeck)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})