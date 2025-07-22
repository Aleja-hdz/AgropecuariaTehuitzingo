import './navbar.css';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo2.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="/#inicio">Inicio</a></li>
        <li><a href="/#nosotros">Nosotros</a></li>
        <li><a href="/#servicios">Servicios</a></li>
        <li><a href="/#contactanos">Contáctanos</a></li>
        <li><a href="/productos">Productos</a></li>
        <li><Link to="/ofertas">Ofertas</Link></li>
        <li><Link to="/dashboard">Gestión</Link></li>
      </ul>
      <div className="nav-user">
        <a href="/perfil">
          <button className="user-button">
              <User color='white' size={22} />
          </button>
        </a>
      </div>
    </nav>
  );
}
