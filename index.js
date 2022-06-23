const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
require('./utils/db.config')
require('./utils/authStrategies/localStrategy')

const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
// app.set('trust proxy', 1)
app.use(session({
  secret: 'fcd6a5c874758d532f8b737b34e95fc9945763d4',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRoutes)

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  console.log('User: ', req.user)

  return res.render('index')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

module.exports = app
