import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import NotFound from './pages/NotFound';

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
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const definedRoutes = ['/', '/productos', '/ofertas', '/panelDeAdministracion', '/ingreso', '/registro', '/alimentosBalanceados', '/medicamentosVeterinarios', '/mascotas', '/implementos', '/producto'];
    setIsNotFound(!definedRoutes.includes(location.pathname) && !location.pathname.startsWith('/producto/'));
  }, [location.pathname]);

  const hideNavbar = location.pathname === '/ingreso' || location.pathname === '/registro' || isNotFound;

  return (
    <div className="app">
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
