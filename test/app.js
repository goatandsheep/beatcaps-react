'use strict'
// const express = require('express')
// const app = express()

const jsf = require('json-schema-faker')
jsf.extend('faker', () => require('faker'))

// new

const LoginModel = require('./mocks/LoginModel.json')
const LoginResponseModel = require('./mocks/LoginResponseModel.json')

const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const app = jsonServer.create()

let router = jsonServer.router({})

const mockRefs = [
]

const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (email && password)
  // return userdb.users.findIndex(user => user.email === 'user@example.com' && user.password === 'password') !== -1
}
const middlewares = jsonServer.defaults()

app.use((req, res, next) => {
  res.header('Allow')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Request-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization, Set-Cookie')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Request-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Content-Type', 'application/javascript')
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.options('/*', (req, res) => {
  res.status(200).jsonp({})
})

// app.use(/^(?!\/auth).*$/, (req, res, next) => {
app.use(/^(?!\/login).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    console.log(req.headers.authorization)
    res.status(status).json({ status, message })
    return
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1])
    next()
  } catch (err) {
    const status = 401
    const message = 'Error: access_token is not valid'
    res.status(status).json({ status, message })
  }
})

// app.post('/login', (req, res) => {
//   const rand = jsf.generate(LoginResponseModel)
//   res.status(200).jsonp(rand)
// })

// keep at the bottom

app.post('/auth/logout', (req, res) => {
  const rand = jsf.generate(LoginModel)
  res.status(200).jsonp(rand)
})

// app.post('/auth/login', (req, res) => {
app.post('/login', (req, res) => {
  const { email, password } = req.body
  if (isAuthenticated({ email, password }) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).jsonp({ status, message })
  } else {
    const access_token = createToken({ email, password })
    // res.cookie('access_token', access_token)
    // res.header('Set-Cookie', `access_token=${access_token}`)
    res.header('Authorization', `Bearer ${access_token}`)
    // res.status(200).jsonp({ access_token })
    const rand = Object.assign(jsf.generate(LoginResponseModel), { token: access_token })
    res.status(200).jsonp(rand)
  }
})

app.get('/*', (req, res) => {
  res.status(404).send('Route not found')
})

module.exports = app
