import React from 'react'
import { useParams } from 'react-router-dom'
import Missing from './Missing';
import { Link } from 'react-router-dom';
const PostPage = ({posts,handleDelete,handleUpdate}) => {
  const {id}=useParams();
  const clickItem=posts.find(post=>((post.id).toString()===id.toString()));
  return (
    <main className='PostPage'>
      {clickItem&&<><h2>
        {clickItem.title}
      </h2>
      <p className='postDate'>
        {clickItem.datetime}
      </p>
      <p className='postBody'>{
        clickItem.body
      }
      </p>
      <button className='deleteButton'onClick={()=>{handleDelete(clickItem.id)}}>
        Delete Post
      </button>
      <Link to={`/edit/${clickItem.id}`}><button className='editButton'>
        Edit Post
      </button>
      </Link>
      </>
}{!clickItem&&<Missing/>}
    </main>
  )
}

export default PostPage