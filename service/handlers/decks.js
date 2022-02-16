import { Deck } from '../models/Deck.js'

export const cardsById = async (req, res) => {
  const card = await Deck.findOne({
    'cards._id': req.params.id,
  })
  res.status(200).send(card)
}

export const cardsInDeck = async (req, res) => {
  // const { limit } = req.query
  const deck = await Deck.findById(req.params.id)
  if (deck) {
    res.send(deck.cards.slice(0, 5))
  } else {
    res.sendStatus(404)
  }
}

export const getDecks = async (req, res) => {
  // In a later lecture we'll explore how to use auth info to limit operations
  // to a particular user. For now, we'll just get all decks
  const decks = await Deck.find({}) // Returns all decks
  if (decks.length < 1) {
    res.status(404).send('No decks found')
  } else {
    res.status(200).send(decks)
  }
}

export const createDeck = async (req, res) => {
  const newDeck = req.body
  if (!newDeck) {
    res.status(400).send('No deck info found')
  } else {
    await Deck.create({
      name: newDeck.name,
      cards: [],
      size: 0,
      userId: 'user-from-auth-token',
    })
    res.status(204)
  }
}
