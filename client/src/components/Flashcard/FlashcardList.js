import React from "react"
import { List, ListItemButton, ListItemText, Paper } from "@mui/material"

const FlashcardList = ({ cards, selectedIndex, selectIndexHandler }) => {
  console.log("[Flashcard List] cards length ", cards.length)
  return (
    <Paper elevation={3}>
      <List sx={{ width: "15vw" }}>
        {cards.map((card, index) => {
          return (
            <ListItemButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => {
                selectIndexHandler(index)
              }}
            >
              <ListItemText primary={`${card.frontText.slice(0, 15)}...`} />
            </ListItemButton>
          )
        })}
      </List>
    </Paper>
  )
}

export default FlashcardList
