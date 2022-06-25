const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoURI = require('./utils/db.config')
const bodyParser = require('body-parser')
const logger = require('morgan')
const passport = require('passport')
require('./utils/db.config')
require('./utils/authStrategies/localStrategy')
const authMiddleware = require('./middlewares/authMiddleware')
const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
// app.set('trust proxy', 1)
app.use(session({
  secret: 'fcd6a5c874758d532f8b737b34e95fc9945763d4',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: MongoStore.create({ mongoUrl: mongoURI })
}))
app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

app.use('/', authRoutes)

app.get('/', (req, res) => {
  console.log('User: ', req.user)
  return res.render('index')
})

app.get('/homepage', authMiddleware, (req, res) => {
  res.send(`bem vindo ${req.user.name}`)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

module.exports = app
