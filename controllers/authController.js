import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const register = async (req, res) => {
  const validationResults = validationResult(req)
  if (!validationResults.isEmpty()) {
    console.log(`Validation failed ${validationResult}`)
    res.status(400).send('Payload invalid')
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email })
    console.log(`Existing user ${existingUser}`)
    if (existingUser) {
      res.status(400).send('That email is already registered')
    } else {
      const newUser = req.body
      // We create an encrypted string that represents the password but
      // is not the same as the password. This may only be decoded
      // here with these tools
      newUser.password = await bcrypt.hash(req.body.password, 10)
      const savedUser = await User.create(newUser)
      res.status(200).send(savedUser._id)
    }
  } catch (err) {
    console.log(`User creation failed: ${err}`)
    res.status(502).send('User creation failed')
  }
}

export async function login(req, res) {
  const validationResults = validationResult(req)
  if (!validationResults.isEmpty()) {
    console.log(`Validation failed ${validationResult}`)
    res.status(400).send('Payload invalid')
  }

  const creds = req.body

  try {
    const existingUser = await User.find({ email: creds.email })

    if (!existingUser) {
      res.status(404).send('No user found')
    } else {
      const passwordComparison = await bcrypt.compare(existingUser.password, creds.password)
      if (!passwordComparison) {
        res.status(401).send('Username or password are invalid')
      } else {
        const payload = {
          user: existingUser._id,
          otherData: 'for-example'
        }
        const token = await jwt.sign(payload, 'not a secret', { expiresIn: 86400 })
        res.status(200).send({
          expiresIn: 86400,
          token: `Bearer ${token}`
        })
      }
    }
  } catch (err) {
    console.log(`User creation failed: ${err}`)
    res.status(502).send('There was an error in login')
  }
}
