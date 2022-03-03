import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import decksRouter from './routers/decks.js'
import usersRouter from './routers/users.js'
import authRouter, { verifyToken } from './routers/auth.js'

const app = express()
const port = 8000

// Connect to MongoDB

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@crit-cluster.bpw1p.mongodb.net/notoriety?retryWrites=true&w=majority`
try {
  await mongoose.connect(connectionString)
} catch (err) {
  console.log('error ', err)
}

// Middleware

app.use(cors())
app.use(express.json())

// Routes

app.use('/auth', authRouter)
app.use('/decks', verifyToken, decksRouter)
app.use('/users', verifyToken, usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

/**
 * Week 9 assignment
 * Add a 'role' property to the user model with one of three values
 * Admin, SuperUser, User.
 * - An admin should be able to call every route and without being rejected
 * - A superuse should be able to get all users and users by id, add, update and
 * delete other users' decks and cards, but should not have permission to update
 * or delete OTHER user objects. They may update and delete their own user
 * profile.
 * - A user should only have access to create, update and delete their own cards
 * and decks. They should be able to update their own user data but NOT to
 * delete their own user account. They can choose to deactivate their own
 * account, but cannot reactivate it without admin assistance
 */
