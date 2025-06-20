import './navbar.css';
import { User } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function Navbar({ onNavigate }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('inicio'); }}>Inicio</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('nosotros'); }}>Nosotros</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('servicios'); }}>Servicios</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('contacto'); }}>Contáctanos</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('productos'); }}>Productos</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('ofertas'); }}>Ofertas</a></li>
      </ul>
      <div className="nav-user">
        <button className="user-button">
            <User size={22} />
        </button>
      </div>
    </nav>
  );
}
