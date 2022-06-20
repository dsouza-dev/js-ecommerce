const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é requirido'],
    minlength: [3, 'Nome deve ter no mínimo 3 caracteres'],
    maxlength: [64, 'Nome deve ter no máximo 64 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é requirido'],
    maxlength: [128, 'Email deve ter no máximo 128 caracteres'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Senha é requirida']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const User = mongoose.model('user', userSchema)

module.exports = User
