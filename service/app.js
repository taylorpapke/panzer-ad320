import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { Deck } from './models/Deck.js'
import { cardsById } from './handlers/decks.js'

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

app.get('/decks/:id/cards', async (req, res) => {
  // const { limit } = req.query
  const deck = await Deck.findById(req.params.id)
  if (deck) {
    res.send(deck.cards.slice(0, 5))
  } else {
    res.sendStatus(404)
  }
})

app.get('/cards/:id', cardsById)

const isUrl = (value) => {
  const re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  return re.test(value)
}

app.post('/cards', async (req, res) => {
  const cardRequest = req.body

  if (
    (!cardRequest.frontImage && !cardRequest.frontText)
    || (!cardRequest.backImage && !cardRequest.backText)
  ) {
    res.status(400).send('Card data incomplete')
  }

  if ((cardRequest.frontImage && !isUrl(cardRequest.frontImage))
    || (cardRequest.backImage && !isUrl(cardRequest.backImage))) {
    res.status(400).send('Image fields must be valid URLs')
  }

  if (!cardRequest.deckId) {
    res.status(400).send('Deck ID is required')
  }

  try {
    const deck = await Deck.findById(cardRequest.deckId)
    if (deck) {
      deck.cards.push({
        frontImage: cardRequest.frontImage,
        frontText: cardRequest.frontText,
        backImage: cardRequest.backImage,
        backText: cardRequest.backText,
      })
      await deck.save()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.log(`error in creating card ${err}`)
    res.sendStatus(502)
  }
})

app.get('/decks', async (req, res) => {
  // In a later lecture we'll explore how to use auth info to limit operations
  // to a particular user. For now, we'll just get all decks
  const decks = await Deck.find({}) // Returns all decks
  if (decks.length < 1) {
    res.status(404).send('No decks found')
  } else {
    res.status(200).send(decks)
  }
})

app.post('/decks', (req, res) => {
  const newDeck = req.body
  if (!newDeck) {
    res.status(400).send('No deck info found')
  } else {
    res.status(204)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
