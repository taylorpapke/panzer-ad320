import { Router } from 'express'
import { User } from '../models/User.js'

const usersRouter = Router()

function sanitizeUsers(users) {
  const sanitizedUsers = users.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      decks: user.decks,
      active: user.active
    }))
    return sanitizedUsers
}

const getUsers = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  if (requestor.role === 'admin' || requestor.role === 'superuser') {
    const users = await User.find({})
    res.send(sanitizeUsers(users))
  } else {
    res.status(403).send('Forbidden')
  }
}

const getUsersById = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  if (requestor.role === 'admin' || requestor.role === 'superuser') {
    const user = await User.findById(req.params.id)
    res.send(sanitizeUsers(user))  
  } else {
    res.status(403).send('Forbidden')
  }
}

const updateUser = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  if (requestor.role === 'admin') {
    const result = await User.findByIdAndUpdate(req.params.id, req.body)
    console.log('result ', result)
    res.sendStatus(200)
  } else if (requestor.role === 'superuser') {
    const result = await User.findById(req.params.id)
    if (result === 'superuser') {
      update(req.body)
    }
  } else if (requestor.role === 'user') {
    const result = await User.findById(req.params.id)
    if (result === 'user') {
      update(req.body)
    }
  } else {
    res.sendStatus(503)
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  if (requestor.role === 'admin') {
    const result = await User.findByIdAndUpdate(req.params.id, { active: false })
    console.log('result ', result)
    res.sendStatus(200)
  } else if (requestor.role === 'superuser') {
    const result = await User.findById(req.params.id)
    if (result === 'superuser') {
      update({ active: false })
    }
  } else {
    res.sendStatus(503)
  }
}

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUsersById)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter
