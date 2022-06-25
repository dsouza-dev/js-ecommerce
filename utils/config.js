module.exports = {
  port: parseInt(process.env.PORT) || 3000,
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://daniel:1234@s-xstore.tlsvs.mongodb.net/?retryWrites=true&w=majority'
}
