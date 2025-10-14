import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './components/pages/Products';
import Cart from './components/pages/Cart';
import Contact from './components/pages/Contact';
import Blog from './components/pages/Blog';
import Promotions from './components/pages/Promotions';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Productos' element={<Products />} />
        <Route path='/Carrito' element={<Cart />} />
        <Route path='/Contacto' element={<Contact />} />
        <Route path='/Blog' element={<Blog/>} />
        <Route path='/Promociones' element={<Promotions/>} />
        <Route path='/Inicio-Sesion' element={<LogIn/>} />
        <Route path='/Registrarse' element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;