import './App.css';
import Navbar from './components/navbar/navbar';
import About from './pages/about/about';
import Services from './pages/services/services';
import Contact from './pages/contact/contact';
import Products from './pages/products/products';
import Offers from './pages/offers/offers';
import Home from './pages/home/home';
import React, { useState } from 'react';

function App() {
  const [pantalla, setPantalla] = useState('inicio');

  return (
    <div className="main-bg">
      <Navbar onNavigate={setPantalla} />
      {pantalla === 'inicio' && <Home />}
      {pantalla === 'nosotros' && <About />}
      {pantalla === 'servicios' && <Services />}
      {pantalla === 'contacto' && <Contact />}
      {pantalla === 'productos' && <Products />}
      {pantalla === 'ofertas' && <Offers />}
    </div>
  );
}

export default App;
