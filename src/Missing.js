import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>404 Page not found</h2>
      <p>
        Well,that's disappointing.
      </p>
      <Link to='/'>
      view our home page
      </Link>
    </main>
  )
}

export default Missing