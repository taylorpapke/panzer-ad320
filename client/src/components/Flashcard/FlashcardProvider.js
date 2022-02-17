import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Stack } from '@mui/material'

import Flashcard from './Flashcard'
import FlashcardList from './FlashcardList'

const CardProvider = ({ deckId }) => {
  const [cards, setCards] = useState(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/decks/${deckId}/cards`)
      .then(response => {
          const data = response.data
          setCards(data)
      })
      .catch(err => {
        console.log('error in FlashcardProvider', err)
      })
  }, [deckId])

  const previous = () => {
    if (index > 0) {
      setIndex(index-1)
    }
  }

  const next = () => {
    if (index < cards.length - 1) {
      setIndex(index+1)
    }
  }

  const selectIndex = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  if (!cards) {
    return <span>Loading...</span>
  } else {
    // TODO list of cards on side
    return (
      <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={2}
      >
        <FlashcardList cards={cards} selectedIndex={index} selectIndexHandler={selectIndex} /> 
        <Flashcard card={cards[index]} previous={previous} next={next} />
      </Stack>
    )
  }
}
export default CardProvider