import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './components/pages/Products';
import Cart from './components/pages/Cart';
import Contact from './components/pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Productos' element={<Products />} />
        <Route path='/Carrito' element={<Cart />} />
        <Route path='/Contacto' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;