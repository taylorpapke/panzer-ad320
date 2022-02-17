import { Container } from '@mui/material';
import React from 'react'
import './App.css';
import Topbar from './components/Topbar/Topbar'
import FlashcardProvider from './components/Flashcard/FlashcardProvider';

function App() {
  return (
    <React.Fragment>
      <Topbar />
      <Container width="md">
        <FlashcardProvider deckId="620d8ea5fced0e15829e5d35" />
      </Container>
    </React.Fragment>
  )
}

export default App;
