import React from 'react'
import {
  List,
  ListItemButton,
  ListItemText
} from '@mui/material'

const FlashcardList = ({ cards, selectedIndex, selectIndexHandler }) => {
  return <List>
    {cards.map((card, index) => {
      return (
        <ListItemButton
          key={index}
          selected={index === selectedIndex}
          onClick={() => { selectIndexHandler(index) }}
        >
          <ListItemText primary={`${card.frontText.slice(0, 10)}...`} />
        </ListItemButton>
      )
    })}
  </List>
}

export default FlashcardList