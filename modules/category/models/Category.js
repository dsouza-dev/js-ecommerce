const mongoose = require('mongoose')

const choicesSchema = {
  label: {
    type: String,
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed
  }
}

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigratório'],
    minLength: [3, 'Nome não pode ter menos que 3 caracteres'],
    maxLength: [32, 'Nome não pode ter mais que 32 caracteres']
  },
  description: {
    type: String,
    required: [true, 'É obrigatório ter uma descrição']
  },
  seoDescription: {
    type: String,
    max: 160
  },
  thumbnail: {
    type: String
  },
  filters: [{
    name: {
      type: String,
      required: true
    },
    choices: [choicesSchema],
    required: {
      type: Boolean
    },
    input: {
      type: {
        type: String,
        enum: ['numberInput', 'textInput', 'selectOne', 'selectMultiple']
      },
      choices: [choicesSchema]
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  deletedAt: {
    type: Date
  }
}, {
  timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
