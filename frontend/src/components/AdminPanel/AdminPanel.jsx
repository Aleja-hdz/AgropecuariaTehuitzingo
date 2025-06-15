import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h2>Dashboard</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Ventas</h3>
                <p className="stat-value">$25,000</p>
                <span className="stat-change positive">+15%</span>
              </div>
              <div className="stat-card">
                <h3>Productos</h3>
                <p className="stat-value">150</p>
                <span className="stat-change positive">+5%</span>
              </div>
              <div className="stat-card">
                <h3>Usuarios</h3>
                <p className="stat-value">1,200</p>
                <span className="stat-change positive">+10%</span>
              </div>
              <div className="stat-card">
                <h3>Pedidos</h3>
                <p className="stat-value">45</p>
                <span className="stat-change negative">-2%</span>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="products-content">
            <h2>Gestión de Productos</h2>
            <div className="action-bar">
              <button className="add-button">Agregar Producto</button>
              <input type="text" placeholder="Buscar productos..." className="search-input" />
            </div>
            <div className="products-table">
              {/* Aquí iría la tabla de productos */}
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="orders-content">
            <h2>Gestión de Pedidos</h2>
            <div className="orders-filters">
              <select className="filter-select">
                <option value="all">Todos los pedidos</option>
                <option value="pending">Pendientes</option>
                <option value="completed">Completados</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>
            <div className="orders-table">
              {/* Aquí iría la tabla de pedidos */}
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="users-content">
            <h2>Gestión de Usuarios</h2>
            <div className="action-bar">
              <button className="add-button">Agregar Usuario</button>
              <input type="text" placeholder="Buscar usuarios..." className="search-input" />
            </div>
            <div className="users-table">
              {/* Aquí iría la tabla de usuarios */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Productos
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Pedidos
          </button>
          <button
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Usuarios
          </button>
        </nav>
      </div>
      <div className="admin-content">
        <header className="admin-header">
          <div className="header-search">
            <input type="text" placeholder="Buscar..." />
          </div>
          <div className="header-actions">
            <button className="notification-button">
              <span className="notification-badge">3</span>
              Notificaciones
            </button>
            <div className="user-profile">
              <img src="/admin-avatar.png" alt="Admin" />
              <span>Admin</span>
            </div>
          </div>
        </header>
        <main className="admin-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel; 