import React, { useEffect, useState } from 'react'
import bookService from '../../services/books'
import categoryService from '../../services/category'
import FileUploader from '../file-upload/FileUploader'
import Select from 'react-select'
import './books.css'

const Books = () => {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    publication: '',
    availableCount: 0
  })
  const [selectedFile, setSelectedFile] = useState('')

  const options = categories.map(category => ({
    value: category._id,
    label: category.name
  }))


  useEffect(() => {
    bookService
      .getAll()
      .then(returnedObject => setBooks(returnedObject))

    categoryService
      .getAll()
      .then(returnedObject => setCategories(returnedObject))
  }, [])

  const onAddBook = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', book.title)
    formData.append('author', book.author)
    formData.append('publication', book.publication)
    formData.append('description', book.description)
    formData.append('category', book.category)
    formData.append('availableCount', book.availableCount)
    formData.append('image', selectedFile)
    bookService
      .create(formData)
      .then(newBook => setBooks(books.concat(newBook)))
  }

  const handleCategoryChange = selectedOption => {
    setBook({ ...book, category: selectedOption.value })
  }

  return (
    <div className='container'>
      <button className='btn btn-primary float-end' data-bs-toggle="modal" data-bs-target="#addBook">Add</button>
      <table className='table bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>publication</th>
            <th>availableCount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            books.map(book => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category.name}</td>
                <td>{book.publication}</td>
                <td>{book.availableCount}</td>
                <td>
                  <button className='btn btn-secondary'>Edit</button>
                  <button className='btn btn-danger mx-3'>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>


      {/* Modal Box for Add */}
      <div className="modal fade" id="addBook" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Book</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {/* Add Form */}
            <form onSubmit={onAddBook}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text"
                    value={book.title}
                    onChange={(e) => setBook({ ...book, title: e.target.value })}
                    className="form-control" id="title" />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Author</label>
                  <input type="text"
                    value={book.author}
                    onChange={(e) => setBook({ ...book, author: e.target.value })}
                    className="form-control" id="author" />
                </div>

                {/* start category select */}
                <div className="mb-3">
                  <Select options={options} onChange={handleCategoryChange} />
                </div>
                {/* end category select */}

                <div className="mb-3">
                  <label htmlFor="publication" className="form-label">Publication</label>
                  <input value={book.publication}
                    onChange={(e) => setBook({ ...book, publication: e.target.value })} type="date" className="form-control" id="publication" />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Description</label>
                  <textarea id='desc'
                    value={book.description}
                    onChange={(e) => setBook({ ...book, description: e.target.value })} className='form-control'></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="count" className="form-label">Available Count</label>
                  <input type="number"
                    value={book.availableCount}
                    onChange={(e) => setBook({ ...book, availableCount: Number(e.target.value) })} className="form-control" id="count" />
                </div>
                <div className="input-group mb-3">
                  <FileUploader
                    onFileSelectSuccess={(file) => setSelectedFile(file)}
                    onFileSelectError={({ error }) => alert(error)}
                  />
                  <label className="input-group-text" htmlFor="image">Upload</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End Add Modal Box */}
    </div>
  )
}

export default Books