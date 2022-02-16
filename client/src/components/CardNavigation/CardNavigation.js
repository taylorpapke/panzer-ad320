import React from 'react'
import './CardNavigation.css'

// TODO cards in a particular deck
const cardLinks = ['Card A', 'Card B', 'Card C', 'Card A', 'Card B', 'Card C', 'Card A', 'Card B', 'Card C']
function CardNavigation() {
  return (
    <div className="card-nav">
      <ul>
        {cardLinks.map((link) => {
          return (<li>{link}</li>)
        })}
      </ul>
    </div>
  )
}

// TODO card provider handles card links and card display
// TODO add card action button

export default CardNavigation