import React, { useState } from 'react'
import { Container } from '@mui/material'
import './App.css'
import Topbar from './components/Topbar/Topbar'
import DeckProvider from './components/Deck/DeckProvider'

function App() {
  const [createMode, setCreateMode] = useState(false)

  return (
    <React.Fragment>
      <Topbar createCardHandler={() => { setCreateMode(true) }} />
      <Container width="md">
        <DeckProvider deckId="620d8ea5fced0e15829e5d35" createMode={createMode} endCreate/>
      </Container>
    </React.Fragment>
  )
}

export default App;
