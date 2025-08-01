import './navbar.css';
import { User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../../lib/supabaseClient';
import logo from '../../assets/Logo2.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const getUserProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("usuarios")
            .select("nombre, tipo_usuario")
            .eq("auth_id", user.id)
            .single();

          if (!error && data) {
            setUserProfile(data);
          }
        } catch (error) {
          console.error("Error al obtener perfil:", error);
        }
      }
    };

    getUserProfile();
  }, [user]);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cerrar menú móvil cuando se hace clic en un enlace
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleOfertasClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate('/login');
      alert('Se necesita ser un usuario registrado para acceder a las ofertas');
    }
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/userProfile');
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.right - 180 // 180px es el ancho del dropdown
      });
    }
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Obtener la primera letra del nombre
  const getInitial = () => {
    if (userProfile?.nombre) {
      return userProfile.nombre.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const renderDropdown = () => {
    if (!showDropdown) return null;

    return createPortal(
      <div 
        ref={dropdownRef}
        className="user-dropdown-portal"
        style={{
          position: 'fixed',
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          zIndex: 999999,
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
          minWidth: '180px',
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          animation: 'dropdownFadeIn 0.2s ease'
        }}
      >
        <button 
          onClick={handleProfileClick}
          className="dropdown-item"
        >
          <User size={16} />
          Mi perfil
        </button>
        <button 
          onClick={handleLogout}
          className="dropdown-item"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>,
      document.body
    );
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      
      {/* Menú hamburguesa para móviles */}
      <button 
        className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><a href="/#inicio" onClick={handleMobileLinkClick}>Inicio</a></li>
        <li><a href="/#nosotros" onClick={handleMobileLinkClick}>Nosotros</a></li>
        <li><a href="/#servicios" onClick={handleMobileLinkClick}>Servicios</a></li>
        <li><a href="/#contactanos" onClick={handleMobileLinkClick}>Contáctanos</a></li>
        <li><a href="/productos" onClick={handleMobileLinkClick}>Productos</a></li>
        <li>
          <a href="/ofertas" onClick={handleOfertasClick}>
            Ofertas
          </a>
        </li>
        {user && userProfile?.tipo_usuario === 'admin' && (
          <li><Link to="/dashboard" onClick={handleMobileLinkClick}>Gestión</Link></li>
        )}
      </ul>
      
      <div className="nav-user">
        {user ? (
          <div className="user-dropdown-container">
            <button 
              ref={buttonRef}
              className="user-button"
              onClick={toggleDropdown}
            >
              {userProfile?.nombre ? (
                <span style={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  {getInitial()}
                </span>
              ) : (
                <User color='white' size={22} />
              )}
            </button>
            {renderDropdown()}
          </div>
        ) : (
          <Link to="/login">
            <button className="user-button">
              <User color='white' size={22} />
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
