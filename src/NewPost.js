import React from 'react'

const NewPost = ({handleSubmit,postTitle,setPostTitle,postBody,setPostBody}) => {
  return (
    <main className='NewPost'>
      <form className='newPostForm'onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input required
        type='text'
        id='postTitle'
        placeholder='Title'
        value={postTitle}
        onChange={(e)=>{
          setPostTitle(e.target.value);
        }}/>
        <label htmlFor='postBody'>Body:</label>
        <textarea required
        placeholder='post content'
        id='postBody'
        value={postBody}
        onChange={(e)=>{
          setPostBody(e.target.value);
        }}
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost