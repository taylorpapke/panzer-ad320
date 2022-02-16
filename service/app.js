import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { createCard } from './handlers/cards.js'
import {
  cardsById,
  cardsInDeck,
  getDecks,
  createDeck,
} from './handlers/decks.js'

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

app.use(cors())
app.use(express.json())

// Routes

app.get('/decks/:id/cards', cardsInDeck)
app.get('/cards/:id', cardsById)
app.post('/cards', createCard)
app.get('/decks', getDecks)
app.post('/decks', createDeck)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
