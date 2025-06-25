import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Offers from './pages/offers/offers';
import Login from './pages/login/login';
import Products from './pages/productsCategories/products';
import ProductsSubCategories from './pages/productsSubCategories/productsSubCategories'
import Register from './pages/register/register';
import AdminPanel from './pages/adminPanel/adminPanel';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  return (
    <div className="app">
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/offers' element={<Offers />}/>
          <Route path='/productsSubCategories' element={<ProductsSubCategories />}/>
          <Route path='/adminPanel' element={<AdminPanel />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='*' element={<Home />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
