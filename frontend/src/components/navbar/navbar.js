import './navbar.css';
import { User } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  // Función para hacer scroll suave
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInicioClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      // El scroll se hará automáticamente al cargar Home
    } else {
      handleScroll('inicio');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#inicio" onClick={handleInicioClick}>Inicio</a></li>
        <li><a href="#nosotros" onClick={e => { e.preventDefault(); handleScroll('nosotros'); }}>Nosotros</a></li>
        <li><a href="#servicios" onClick={e => { e.preventDefault(); handleScroll('servicios'); }}>Servicios</a></li>
        <li><a href="#contacto" onClick={e => { e.preventDefault(); handleScroll('contacto'); }}>Contáctanos</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); navigate('/productos'); }}>Productos</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); navigate('/ofertas'); }}>Ofertas</a></li>
      </ul>
      <div className="nav-user">
        <button className="user-button">
            <User size={22} />
        </button>
      </div>
    </nav>
  );
}
