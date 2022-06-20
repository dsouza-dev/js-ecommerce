const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure Chai
chai.use(chaiHttp)
chai.should()

describe('ter certeza que o status é 200', () => {
  it('deve retornar status 200', (done) => {
    chai.request(app)
  	  .get('/')
      .end((err, res) => {
          res.should.have.status(200)
          res.should.be.a('object')
          done()        })
  })
}) // fim do it