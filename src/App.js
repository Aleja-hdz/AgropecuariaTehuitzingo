import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/protectedRoute';
import AdminRoute from './auth/adminRoute';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Offers from './pages/offers/offers';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/adminPanel/adminPanel';
import Login from './pages/login/login';
import Register from './pages/register/register';
import UserProfile from './pages/userProfile/userProfile';
import Products from './pages/productsCategories/products';
import AlimentosBalanceados from './pages/productsSubCategories/Alimentos_Balanceados/alimentosBalanceados';
import MedicamentosVeterinarios from './pages/productsSubCategories/Medicamentos_Veterinarios/medicamentosVeterinarios';
import Mascotas from './pages/productsSubCategories/Mascotas/mascotas'
import Implementos from './pages/productsSubCategories/Implementos/implementos';
import ForgotPassword from './pages/passwordRecovery/forgotPassword/forgotPassword';
import ChangePassword from './pages/passwordRecovery/changePassword/changePassword';
import ResetPassword from './pages/passwordRecovery/resetPassword/resetPassword';


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
    const definedRoutes = [
      '/', 
      '/productos', 
      '/ofertas', 
      '/dashboard', 
      '/ingreso', 
      '/registro', 
      '/login',
      '/userProfile',
      '/alimentosBalanceados', 
      '/medicamentosVeterinarios', 
      '/mascotas', 
      '/implementos', 
      '/producto',
      '/recuperarContraseña',
      '/forgot-password',
      '/change-password',
      '/reset-password',
      '/nuevaContraseña',

    ];
    setIsNotFound(!definedRoutes.includes(location.pathname) && !location.pathname.startsWith('/producto/'));
  }, [location.pathname]);

  const hideNavbar = location.pathname === '/ingreso' || 
                     location.pathname === '/registro' || 
                     location.pathname === '/login' ||
                     location.pathname === '/recuperarContraseña' ||
                     location.pathname === '/forgot-password' ||
                     location.pathname === '/change-password' ||
                     location.pathname === '/reset-password' ||
                     location.pathname === '/nuevaContraseña' ||

                     location.pathname === '/userProfile' ||
                     isNotFound;

  return (
    <div className="app">
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/ingreso' element={<Login />}/>
          <Route path='/registro' element={<Register />}/>
          <Route path='/userProfile' element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }/>
          <Route path='/productos' element={<Products />}/>
          <Route path='/alimentosBalanceados' element={<AlimentosBalanceados />}/>
          <Route path='/medicamentosVeterinarios' element={<MedicamentosVeterinarios />}/>
          <Route path='/mascotas' element={<Mascotas />}/>
          <Route path='/implementos' element={<Implementos />}/>
          <Route path="/ofertas" element={
            <ProtectedRoute>
              <Offers />
            </ProtectedRoute>
          } />
          <Route path='/dashboard' element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }/>
          <Route path='/recuperarContraseña' element={<ForgotPassword />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/change-password' element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }/>
          <Route path='/nuevaContraseña' element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }/>
          <Route path='/reset-password' element={<ResetPassword />}/>

          <Route path='*' element={<NotFound />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
