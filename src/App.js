import './App.css';
import Header from './Header';
import Home from './Home'
import Nav from './Nav'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
// import Post from './Post';
import Footer from './Footer'
import {Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './api/posts'
import { format } from 'date-fns';
import Edit from './Edit';
import useAxiosFetch from './hooks/useAxiosFetch';
import { DataProvider } from './context/DataContext';
function App() {
  const [posts,setPosts]=useState([])
  const [search,setSearch]=useState('');
  const [result,setResult]=useState(posts);
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const [updatedTitle,setUpdatedTitle]=useState('');
  const [updatedBody,setUpdatedBody]=useState('');

  const navigate=useNavigate();

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/db');

    useEffect(() => {
        setPosts(data);
    }, [data])
  useEffect(()=>{
    const filteredResults=posts.filter((post)=>(
    ((post.body).toLowerCase()).includes(search.toLowerCase())||((post.title).toLowerCase()).includes(search.toLowerCase())))
    setResult(filteredResults.reverse());
  },[posts,search])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id=posts.length?posts[posts.length-1].id+1:1;
    const datetime=format(new Date(),"MMMM dd, yyyy pp");
    const items={id:id,title:postTitle,datetime:datetime,body:postBody}
    try{
      await api.post('/db',items);
      const newData=[...posts,items];
      setPosts(newData);
      setPostTitle('');
      setPostBody('');
      navigate('/');
  }catch(err){
    console.error(`error:${err.response.message}`);
  }
  }
  const handleDelete= async(id)=>{
    try{
      const newArray=posts.filter(post=>id!==post.id);
      await api.delete(`/db/${id}`);
      setPosts(newArray);
      navigate('/');
    }catch(err){
      console.err(`Error:${err.message}`)
    }
  }
  const handleUpdate = async (id) => {
    try {
      // console.log(1);
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      // console.log(1);
      const updatedItem = { id, title: updatedTitle, datetime, body: updatedBody };
      // console.log(1);
      
      // Assuming `api` is an Axios instance configured for your backend
      await api.put(`/db/${id}`, updatedItem);
      // console.log(1);
      
      const newItems = posts.map((post) => (id === post.id ? updatedItem :post));
      // console.log(1);
      setPosts(newItems);
      // console.log(1);
  
      navigate('/');
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };
  return (
    <DataProvider>
    <div className="App">
      <Header title='Anigram'/>
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path='/' element={<Home 
        posts={result}
        fetchError={fetchError}
        isLoading={isLoading}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="/postpage">
          <Route index element={<NewPost
          handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}/>}/>
          <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
        </Route>
          <Route path='/edit/:id' element={<Edit  posts={posts} handleUpdate={handleUpdate}
          updatedBody={updatedBody} updatedTitle={updatedTitle} setUpdatedBody={setUpdatedBody} setUpdatedTitle={setUpdatedTitle}/>}/>
        <Route path='*' element={<Missing/>}/>
      </Routes>
      <Footer/>
    </div>
    </DataProvider>
  );
}

export default App;
