import React, { useEffect, useState } from 'react'
import categoryService from '../../services/category'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    categoryService.getAll().then(returnedObject => setCategories(returnedObject))
  }, [])

  const onAddCategory = (e) => {
    e.preventDefault()

    const newCategory = { name }
    categoryService.create(newCategory)
      .then(result => setCategories(categories.concat(result)))
  }

  return (
    <div>
      <button className='btn btn-primary float-end' data-bs-toggle="modal" data-bs-target="#addCategory">Add</button>
      <table className='table bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map(category => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
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
      <div className="modal fade" id="addCategory" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Category</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {/* Add Form */}
            <form onSubmit={onAddCategory}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control" id="name" />
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

export default Categories