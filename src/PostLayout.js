import React from 'react'
import { Link, Outlet } from 'react-router-dom'
const PostLayout = () => {
  return (
    <div>
        <ul>
        <li>
          <Link to='newpost'>
          newPost</Link>
        </li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default PostLayout