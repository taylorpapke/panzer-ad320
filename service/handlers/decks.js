import { Deck } from '../models/Deck.js'

export const cardsById = async (req, res) => {
  const card = await Deck.findOne({
    'cards._id': req.params.id,
  })
  res.status(200).send(card)
}
