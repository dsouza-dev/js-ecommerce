/* eslint-disable no-undef */
/* eslint-disable n/handle-callback-err */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure Chai
chai.use(chaiHttp)
chai.should()

describe('ter certeza que o servidor esta rodando', () => {
  it('deve retornar uma página com o status 200', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
}) // fim do it
