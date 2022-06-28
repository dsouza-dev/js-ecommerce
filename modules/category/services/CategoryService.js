const Category = require('../models/Category')

/**
 * Criar nova categoria
 * @param {Object} categoryInput - Category input, validado pela Category validation
 * @returns {Category}
 */

const addCategory = async (categoryInput) => {
  const category = new Category(categoryInput)
  await category.save()
  return category
}

module.exports = {
  addCategory
}
