const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://daniel:1234@s-xstore.tlsvs.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('Database is connected')
})
