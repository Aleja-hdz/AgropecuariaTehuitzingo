import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Agropecuaria Tehuitzingo</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/ofertas">Ofertas</Link>
        <Link to="/gestion">Gestión</Link>
        <Link to="/contacto">Contáctanos</Link>
        <Link to="/perfil">Mi Perfil</Link>
      </div>
    </nav>
  );
};

export default Navbar; 