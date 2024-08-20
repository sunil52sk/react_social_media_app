import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Edit = ({posts,handleUpdate,updatedTitle,updatedBody,setUpdatedTitle,setUpdatedBody}) => {
    const{id}=useParams();
    const post=posts.find(item=>((item.id).toString()===id));
    useEffect(()=>{
        if(post){
            setUpdatedTitle(post.title);
            setUpdatedBody(post.body);
        }
    },[post,setUpdatedTitle,setUpdatedBody])
  return (
    <main className='NewPost'>
      <form className='newPostForm'onSubmit={(e)=>{
        e.preventDefault();
      }}>
        <label htmlFor='postTitle'>Edit Title:</label>
        <input required
        type='text'
        id='postTitle'
        placeholder='Title'
        value={updatedTitle}
        onChange={(e)=>{
          setUpdatedTitle(e.target.value);
        }}/>
        <label htmlFor='postBody'>Edit Body:</label>
        <textarea required
        placeholder='post content'
        id='postBody'
        value={updatedBody}
        onChange={(e)=>{
          setUpdatedBody(e.target.value);
        }}
        />
        <button type='submit' onClick={()=>{
            handleUpdate(post.id);
        }}>Confirm</button>
      </form>
    </main>
  )
}

export default Edit