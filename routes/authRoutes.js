const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')

router.get('/register', (req, res) => {
  return res.render('register', { message: null })
})

router.post('/register', async (req, res) => {
  try {
    const result = await addUser(req.body)
    return res.render('register', { message: 'Registrado com sucesso!' })
  } catch (e) {
    console.error(e)
    return res.status(400).render('register', { message: 'Erro ao registrar usuário!' })
  }
})

module.exports = router
