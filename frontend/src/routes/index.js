import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Products from '../pages/Products';
import Offers from '../pages/Offers';
import Management from '../pages/Management';
import Profile from '../pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/nosotros',
    element: <About />,
  },
  {
    path: '/servicios',
    element: <Services />,
  },
  {
    path: '/contacto',
    element: <Contact />,
  },
  {
    path: '/productos',
    element: <Products />,
  },
  {
    path: '/ofertas',
    element: <Offers />,
  },
  {
    path: '/gestion',
    element: <Management />,
  },
  {
    path: '/perfil',
    element: <Profile />,
  },
]);

export default router; 