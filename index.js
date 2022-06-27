require('dotenv').config()
require('./utils/db.config')
require('./utils/authStrategies/localStrategy')

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
const logger = require('morgan')
const passport = require('passport')

const authMiddleware = require('./middlewares/authMiddleware')
const authRoutes = require('./routes/authRoutes')
const config = require('./utils/config')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug')

app.use(session({
  secret: 'fcd6a5c874758d532f8b737b34e95fc9945763d4',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: MongoStore.create({ mongoUrl: config.mongoUrl })
}))

app.use(logger('dev'))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))

app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null
  return next()
})

app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

app.use('/', authRoutes)

app.get('/', (req, res) => {
  // console.log('User: ', req.user)
  return res.render('index')
})

app.get('/homepage', authMiddleware, (req, res) => {
  res.render('dashboard')
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
})

module.exports = app
