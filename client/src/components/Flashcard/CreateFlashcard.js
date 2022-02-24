import React, {useState} from "react"
import { Button, Stack, TextField } from "@mui/material"

const CreateFlashcard = ({ deckId }) => {
  // how can we use state here to make sure we're validating info
  console.log(`[CreateFlashcard] deckId is ${deckId}`)
  const [frontText, setFrontText] = useState('')
  const [backText, setBackText] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    // console.log("[CreateFlashcard] onChange ", event)
    if (event.target.name === 'frontText') {
      console.log("[CreateFlashcard] front text changed!")
      setFrontText(event.target.value)
    } else {
      console.log("[CreateFlashcard] back text changed!")
      setBackText(event.target.value)
    }
  }
  
  const handleSubmit = (event) => {
    console.log("[CreateFlashcard] onSubmit ", event)
    event.preventDefault()
    // make that network request
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <span>Form values: {frontText} &amp; {backText}</span>
      <TextField
        margin="normal"
        required
        fullWidth
        id="frontImage"
        label="Front Image"
        name="frontImage"
        onChange={handleChange}
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="frontText"
        label="Front Text"
        id="frontText"
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="backImage"
        label="Back Image"
        name="backImage"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="backText"
        label="Back Text"
        id="backText"
        onChange={handleChange}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
      <Button fullWidth variant="contained" sx={{ mt: 1, mb: 1 }}>
        Cancel
      </Button>
    </Stack>
  )
}

export default CreateFlashcard
