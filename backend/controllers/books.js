const bookRouter = require('express').Router()
const Book = require('../models/book')
const upload = require('../utils/upload')

bookRouter.get('/', async (req, res, next) => {
  try {
    const books = await Book.find({}).populate('category', { name: 1 })
    res.json(books)
  } catch (error) {
    next(error)
  }
})

bookRouter.post('/', upload.single('image'), async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  const body = req.body
  const filename = req.file.filename

  const book = new Book({
    title: body.title,
    author: body.author,
    publication: body.publication,
    category: body.category,
    description: body.description,
    availableCount: Number(body.availableCount),
    image: filename
  })

  const savedBook = await book.save()
  res.json(savedBook)
})

module.exports = bookRouter