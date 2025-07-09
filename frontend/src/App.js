import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Offers from './pages/offers/offers';
import Login from './pages/login/login';
import Products from './pages/productsCategories/products';
import Register from './pages/register/register';
import AdminPanel from './pages/adminPanel/adminPanel';
import AlimentosBalanceados from './pages/productsSubCategories/Alimentos_Balanceados/alimentosBalanceados';
import MedicamentosVeterinarios from './pages/productsSubCategories/Medicamentos_Veterinarios/medicamentosVeterinarios';
import Mascotas from './pages/productsSubCategories/Mascotas/mascotas'
import Implementos from './pages/productsSubCategories/Implementos/implementos';
import NotFound from './pages/NotFound';
import UserProfile from './pages/userProfile/userProfile';
import ForgotPassword from './pages/passwordRecovery/forgotPassword/forgotPassword';
import ResetPassword from './pages/passwordRecovery/resetPassword/resetPassword';
import ChangePassword from './pages/passwordRecovery/changePassword/changePassword';
import ChangeTypeUser from './pages/changeTypeUser/changeTypeUser';

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
          <Route path='/productos' element={<Products />}/>
          <Route path='/ofertas' element={<Offers />}/>
          <Route path='/panelDeAdministracion' element={<AdminPanel />}/>
          <Route path='/ingreso' element={<Login />}/>
          <Route path='/registro' element={<Register />}/>
          <Route path='/recuperarContraseña' element={<ForgotPassword />}/>
          <Route path='/cambiarContraseña' element={<ResetPassword />}/>
          <Route path='/alimentosBalanceados' element={<AlimentosBalanceados />}/>
          <Route path='/medicamentosVeterinarios' element={<MedicamentosVeterinarios />}/>
          <Route path='/mascotas' element={<Mascotas />}/>
          <Route path='/implementos' element={<Implementos />}/>
          <Route path='/perfil' element={<UserProfile />}/>
          <Route path='/nuevaContraseña' element={<ChangePassword />}/>
          <Route path='/cambioUsuario' element={<ChangeTypeUser />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;


/*
 <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/productos' element={<Products />}/>
          <Route path='/ofertas' element={<Offers />}/>
          <Route path='/panelDeAdministracion' element={<AdminPanel />}/>
          <Route path='/ingreso' element={<Login />}/>
          <Route path='/registro' element={<Register />}/>
          <Route path='/alimentosBalanceados' element={<AlimentosBalanceados />}/>
          <Route path='/medicamentosVeterinarios' element={<MedicamentosVeterinarios />}/>
          <Route path='/mascotas' element={<Mascotas />}/>
          <Route path='/implementos' element={<Implementos />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </main>
*/