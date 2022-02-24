import React, { useState } from "react"

import {
  Paper,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material"

import FlashcardProvider from '../Flashcard/FlashcardProvider'
import CreateFlashcard from '../Flashcard/CreateFlashcard'

const DeckProvider = ({ decks, createMode }) => {
  const [index, setIndex] = useState(0)

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="flex-start"
      spacing={2}
      sx={{ mt: 3 }}
    >
      <Paper elevation={3}>
        <List
          sx={{ width: "15vw" }}
          subheader={<ListSubheader>Decks</ListSubheader>}
        >
          {decks.map((deck, idx) => {
            return (
              <ListItemButton
                key={idx}
                selected={idx === index}
                onClick={() => {
                  setIndex(idx)
                }}
              >
                <ListItemText primary={`${deck.name}`} />
              </ListItemButton>
            )
          })}
        </List>
      </Paper>
      <div>{createMode ? <CreateFlashcard deckId={decks[index]._id}/> : <FlashcardProvider deck={decks[index]} />}</div>
    </Stack>
  )
}

export default DeckProvider
