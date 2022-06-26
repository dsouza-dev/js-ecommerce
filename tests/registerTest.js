/* eslint-disable n/handle-callback-err */
/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure Chai
chai.use(chaiHttp)
chai.should()

describe('ter certeza que vai retornar uma pagina de registro', () => {
  it('deve retornar uma página com o status 200', (done) => {
    chai.request(app)
      .get('/register')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
}) // fim do it

describe('ter certeza que o registro vai falhar na data', () => {
  it('deve retornar erro de validação', (done) => {
    // chai.request(app)
    const agent = chai.request.agent(app)
    agent
      .post('/register')
      .end((err, res) => {
        if (err) return done(err)
        res.text.should.contain('Erro na validação')
        done()
      })
  })
}) // fim do it

describe('ter certeza que o registro vai ter sucesso na data', () => {
  const email = `john.${new Date().getTime()}@example.com`
  it('deve retornar sucesso na validação', (done) => {
    // chai.request(app)
    const agent = chai.request.agent(app)
    agent
      .post('/register')
      .type('form')
      .send({
        name: 'John Doe',
        email,
        password: 'senha123',
        repeat_password: 'senha123'
      })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        res.text.should.not.contain('Erro na validação')
        done()
      })
  })
  it('deve retornar erro de email unico da validacao', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/register')
      .type('form')
      .send({
        name: 'John Doe',
        email,
        password: 'senha123',
        repeat_password: 'senha123'
      })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(400)
        res.text.should.contain('Email já cadastrado!')
        res.text.should.contain('Erro na validação')
        done()
      })
  })
})
