import './navbar.css';
import { User } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a className="active" href="#">Inicio</a></li>
        <li><a href="#">Nosotros</a></li>
        <li><a href="#">Servicios</a></li>
        <li><a href="#">Contáctanos</a></li>
        <li><a href="#">Productos</a></li>
        <li><a href="#">Ofertas</a></li>
      </ul>
      <div className="nav-user">
        <button className="user-button">
            <User size={22} />
        </button>
      </div>
    </nav>
  );
}