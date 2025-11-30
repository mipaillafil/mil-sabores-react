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
import PaymentProcess from './components/pages/PaymentProcess';
import AdminProfile from './components/pages/AdminProfile';


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
        <Route path='/Procesar-Compra' element={<PaymentProcess/>} />
        <Route path='/Perfil-Admin' element={<AdminProfile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;