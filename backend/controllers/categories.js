const categoryRouter = require('express').Router()
const Category = require('../models/category')

categoryRouter.post('/', async (req, res) => {
  const body = req.body

  const category = new Category(body)
  const savedCategory = await category.save()
  res.json(savedCategory)
})

categoryRouter.get('/', async (req, res) => {
  const categories = await Category.find({})
  res.json(categories)
})

module.exports = categoryRouter