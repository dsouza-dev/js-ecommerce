const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é requirido'],
    minlength: [3, 'Nome deve ter no mínimo 3 caracteres'],
    maxlength: [64, 'Nome deve ter no máximo 64 caracteres']
  },
  email: {
    type: String,
    lowercase: true,
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

userSchema.path('email').validate(async (email) => {
  const emailCount = await mongoose.models.user.countDocuments({ email })
  return !emailCount
}, 'Email já cadastrado!')

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

const User = mongoose.model('user', userSchema)

module.exports = User
