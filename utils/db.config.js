const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://daniel:1234@s-xstore.tlsvs.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('Database is connected')
})

module.exports = mongoURI
