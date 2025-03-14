import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import About from './pages/About';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Footer from './components/Footer';
import Signup from './pages/Signup';


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
    
  )
}

export default App
