const express = require('express')
const server = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const User = require('./User')
const { makeToken, verifyToken } = require('./authFunctions')

server.listen(5000, () => {
  console.log('\n === API running on Port 5000 === \n')
})

mongoose.connect('mongodb://localhost/JWTDemo')
server.use(cors())
server.use(express.json())
server.use(jwt)

server.get('/api/users', verifyToken, (req, res) => {
  User.find()
    .populate('-password') // may need to change to select or delete
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.status(500).json({msg: err.message}))
})
server.get('/api/self', verifyToken, (req, res) => {
  const { jwtpayload } = req
  User.findById(jwtpayload.sub)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({msg: err.message}))
})

server.post('/api/register', (req, res) => {
  const userInfo = req.body
  const newUser = new User(userInfo)
  newUser.save()
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => res.status(500).json({msg: err.message}))
})

server.post('/api/register', (req, res) => {
  const userInfo = req.body
  const newUser = new User(userInfo)
  newUser.save()
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => res.status(500).json({msg: err.message}))
})

server.put('/api/login', (req, res) => {
  const { username, password } = req.body
  User.findOne({username})
    .then(user => {
      user.comparePasswords(password)
    })
})
