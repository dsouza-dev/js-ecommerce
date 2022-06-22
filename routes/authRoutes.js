const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')

router.get('/register', (req, res) => {
  return res.render('register', { message: {}, formData: {}, errors: {} })
})

router.post('/register', async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      aboutEarly: false
    })
    console.log(validationResult)
    if (validationResult.error) {
      return res.render('register', {
        message: {
          type: 'error',
          body: 'Erro na validação'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      })
    }
    // eslint-disable-next-line no-unused-vars
    const user = await addUser(req.body)
    return res.render('register', {
      message: {
        type: 'success',
        body: 'Registrado com sucesso!'
      },
      errors: {},
      formData: req.body
    })
  } catch (e) {
    console.error(e)
    return res.status(400).render('register', {
      message: {
        type: 'error',
        body: 'Erro na validação'
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body
    })
  }
})

module.exports = router
