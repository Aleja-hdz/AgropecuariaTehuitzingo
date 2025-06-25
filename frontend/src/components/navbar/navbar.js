import './navbar.css';
import { User } from 'lucide-react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="/#index">Inicio</a></li>
        <li><a href="/#about">Nosotros</a></li>
        <li><a href="/#service">Servicios</a></li>
        <li><a href="/#contact">Contáctanos</a></li>
        <li><Link to="/products">Productos</Link></li>
        <li><Link to="/offers">Ofertas</Link></li>
        <li><Link to="/adminPanel">Gestión</Link></li>
      </ul>
      <div className="nav-user">
        <Link to="/login">
          <button className="user-button">
              <User size={22} />
          </button>
        </Link>
      </div>
    </nav>
  );
}
