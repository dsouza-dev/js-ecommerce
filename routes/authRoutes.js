const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')

router.get('/register', (req, res) => {
  return res.render('register', { message: null })
})

router.post('/register', async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, { abortEarly: false }) // abortEarly: false => it will show all errors
    if (validationResult.error) {
      return res.render('register', { message: 'Erro na validação!' })
    }
    const result = await addUser(req.body)
    return res.render('register', { message: 'Registrado com sucesso!' })
  } catch (e) {
    console.error(e)
    return res.status(400).render('register', { message: 'Erro ao registrar usuário!' })
  }
})

module.exports = router
