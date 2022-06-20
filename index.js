const express = require('express')
const User = require('./models/User')
const bodyParser = require('body-parser')
require('./utils/db.config')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/register', (req, res) => {
  return res.render('register')
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body
  const user = new User({ name, email, password })
  user.save()
    .then(() => {
      return res.render('register', { message: 'Registro concluído com sucesso!' })
    })
    .catch(err => {
      console.log(err)
    })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

module.exports = app
