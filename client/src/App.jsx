import React from 'react';
import { Routes, Route } from "react-router-dom";
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';

function App() {


  return (
    <>
   <div >
      <Routes>
        <Route path='/' element={<Auth />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
      <ToastContainer />
    </div>
    </>
  )
}

export default App
