import React from 'react'

import CreateFlashcard from '../Flashcard/CreateFlashcard'
import FlashcardProvider from '../Flashcard/FlashcardProvider'

const DeckProvider = ({ deckId, createMode }) => {
  if (createMode) {
    return <CreateFlashcard deckId={deckId} />
  } else {
    return <FlashcardProvider deckId={deckId} />
  }
}

export default DeckProvider