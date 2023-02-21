import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main/Main';
import { Navbar } from './components/navbar/Navbar';
import { SignUp } from './pages/signup/SignUp';
import { Profile } from './pages/profile/Profile';
import { CreatePost } from './pages/create-post/CreatePost';
import { MyPosts } from './pages/my-posts/MyPosts';

function App() {
	return (
    	<div className="App">
      		<BrowserRouter>
        		<Navbar/>
        		<Routes>
          			<Route path='/' element={<Main/>}/>
          			<Route path='/signup' element={<SignUp/>}/>
          			<Route path='/profile' element={<Profile/>}/>
          			<Route path='/create-post' element={<CreatePost/>}/>
          			<Route path='/my-posts' element={<MyPosts/>}/>
        		</Routes>
      		</BrowserRouter>
    	</div>
  	);
}

export default App;
