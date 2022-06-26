/* eslint-disable no-undef */
/* eslint-disable n/handle-callback-err */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure Chai
chai.use(chaiHttp)
chai.should()

describe('ter certeza que vai retornar uma pagina de login', () => {
  it('deve retornar uma página de login com o status 200', (done) => {
    chai.request(app)
      .get('/login')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
}) // fim do it

describe('deve retornar usuario nao exise', () => {
  it('usuario nao exise', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .type('form')
      .send({
        email: 'danielsdsdsd@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.text.should.contain('Usuário não existe')
        done()
      })
  })
}) // fim do it

describe('ter certeza q o login vai errar com data invalido', () => {
  it('deve retornar senha incorreta', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .type('form')
      .send({
        email: 'daniel@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.text.should.contain('Senha Incorreta')
        done()
      })
  })
}) // fim do it

describe('deve retornar sem credencial no post', () => {
  it('sem data', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .end((err, res) => {
        res.text.should.contain('Missing credentials')
        done()
      })
  })
})

describe('deve logar com sucesso', () => {
  it('login com sucesso', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .type('form')
      .send({
        email: 'daniel@gmail.com',
        password: 'daniel'
      })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
})
