import './App.css';
import Navbar from './components/navbar/navbar';
import About from './pages/about/about';
import Services from './pages/services/services';
import Contact from './pages/contact/contact';
import Products from './pages/products/products';
import Offers from './pages/offers/offers';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="main-bg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/ofertas" element={<Offers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
