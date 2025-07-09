import './navbar.css';
import { User } from 'lucide-react';
import logo from '../../assets/Logo2.png';
import { Link } from 'react-router-dom';

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
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/ofertas">Ofertas</Link></li>
        <li><Link to="/panelDeAdministracion">Gestión</Link></li>
      </ul>
      <div className="nav-user">
        <Link to="/perfil">
          <button className="user-button">
              <User color='white' size={22} />
          </button>
        </Link>
      </div>
    </nav>
  );
}
