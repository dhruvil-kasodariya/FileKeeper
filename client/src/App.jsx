import React from 'react';
import { Routes, Route } from "react-router-dom";
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import FileList from './pages/FileList';

function App() {


  return (
    <>
   <div >
      <Routes>
        <Route path='/' element={<Auth />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/file-list' element={<FileList/>}/>
      </Routes>
      <ToastContainer />
    </div>
    </>
  )
}

export default App
