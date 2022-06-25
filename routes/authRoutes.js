const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
const passport = require('passport')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const flasherMiddlware = require('../middlewares/flasherMiddleware')

router.get('/register', guestMiddleware, flasherMiddlware, (req, res) => {
  return res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      aboutEarly: false
    })
    if (validationResult.error) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Erro na validação'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      }
      return res.redirect('/register')
    }
    // eslint-disable-next-line no-unused-vars
    const user = await addUser(req.body)
    req.session.flashData = {
      message: {
        type: 'success',
        body: 'Registrado com sucesso!'
      },
      formData: req.body
    }
    return res.redirect('/register')
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

router.get('/login', guestMiddleware, flasherMiddlware, (req, res) => {
  return res.render('login')
})

router.post('/login', guestMiddleware, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Err:', err)
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Ocorreu um erro'
        }
      }
      return res.redirect('/login')
    }

    if (!user) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: info.error
        }
      }
      return res.redirect('/login')
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Err:', err)
        req.session.flashData = {
          message: {
            type: 'error',
            body: 'Ocorreu um erro'
          }
        }
      }
      return res.redirect('/homepage')
    })
  })(req, res, next)
})

router.get('/logout', authMiddleware, (req, res, next) => {
  req.logout(req.user, err => {
    if (err) return next(err)
  })
  res.redirect('/')
})

module.exports = router
