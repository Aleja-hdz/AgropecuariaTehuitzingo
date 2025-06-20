import React, { useState } from 'react';
import Searcher from '../../components/searcher/searcher';
import MenuCategories from '../../components/menuCategories/menuCategories';
import MenuSubCategories from '../../components/menuSubCategories/menuSubCategories';
import ViewProduct from '../../components/viewProduct/viewProduct';
import ViewProductOffer from '../../components/viewProductOffer/viewProductOffer';
import './products.css';

function AlimentosBalanceados({ onBack }) {
  // Productos de ejemplo (más productos para llenar la grilla)
  const productos = [
    { nombre: 'Nutri Cerdo', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Cerdo.png', cantidad: 10, descripcion: 'Alimento balanceado para cerdo.' },
    { nombre: 'Nutri Gallo', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Gallo.png', cantidad: 8, descripcion: 'Alimento balanceado para gallo.' },
    { nombre: 'Nutri Conejo', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Conejo.png', cantidad: 12, descripcion: 'Alimento balanceado para conejo.' },
    { nombre: 'Nutri Bovino', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Bovino.png', cantidad: 7, descripcion: 'Alimento balanceado para bovino.' },
    { nombre: 'Nutri Cerdo', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Cerdo.png', cantidad: 10, descripcion: 'Alimento balanceado para cerdo.' },
    { nombre: 'Nutri Gallo', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Gallo.png', cantidad: 8, descripcion: 'Alimento balanceado para gallo.' },
    { nombre: 'Nutri Conejo', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Conejo.png', cantidad: 12, descripcion: 'Alimento balanceado para conejo.' },
    { nombre: 'Nutri Bovino', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Bovino.png', cantidad: 7, descripcion: 'Alimento balanceado para bovino.' },
    { nombre: 'Nutri Cerdo', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Cerdo.png', cantidad: 10, descripcion: 'Alimento balanceado para cerdo.' },
    { nombre: 'Nutri Gallo', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Gallo.png', cantidad: 8, descripcion: 'Alimento balanceado para gallo.' },
    { nombre: 'Nutri Conejo', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Conejo.png', cantidad: 12, descripcion: 'Alimento balanceado para conejo.' },
    { nombre: 'Nutri Bovino', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Bovino.png', cantidad: 7, descripcion: 'Alimento balanceado para bovino.' },
  ];

  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showSpecies, setShowSpecies] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  return (
    <div>
      <h2 className="products-title">¿Qué producto deseas encontrar?</h2>
      <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '100%', margin: '0 auto 15px auto' }}>
        <div style={{ width: '100%', maxWidth: 1500 }}>
          <Searcher value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        </div>
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div className="category-header-bar" style={{gap: '18px'}}>
          <button className="back-button" onClick={onBack}>
            <span style={{fontSize: '1.3rem', verticalAlign: 'middle'}}>&#8592;</span>
          </button>
          <span className="category-title">Alimentos balanceados</span>
          <div className="filter" onClick={() => setShowSpecies(!showSpecies)}>
            <span>Por especie</span>
            <span style={{marginLeft: 4, fontSize: '1rem'}}>▼</span>
            {showSpecies && (
              <ul className="dropdown">
                <li>Perro</li>
                <li>Gato</li>
                <li>Gallina</li>
                <li>Cerdo</li>
              </ul>
            )}
          </div>
          <div className="filter" onClick={() => setShowBrands(!showBrands)}>
            <span>Por marca</span>
            <span style={{marginLeft: 4, fontSize: '1rem'}}>▼</span>
            {showBrands && (
              <ul className="dropdown">
                <li>Unión</li>
                <li>Apiaba</li>
                <li>Fasa</li>
                <li>Nutre bien</li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="products-grid">
        {productosFiltrados.map((prod, idx) => (
          <div className="product-card" key={idx}>
            <img src={prod.img} alt={prod.nombre} className="product-img" />
            <div className="product-name">{prod.nombre}</div>
            <div className="product-price">${prod.precio}</div>
            <button className="product-details-btn" onClick={() => abrirModal(prod)}>Ver detalles</button>
          </div>
        ))}
      </div>
      {modalAbierto && productoSeleccionado && (
        <ViewProductOffer
          cerrarModal={cerrarModal}
          nombre={productoSeleccionado.nombre}
          img={productoSeleccionado.img}
          precio={productoSeleccionado.precio}
          cantidad={productoSeleccionado.cantidad}
          detalles={productoSeleccionado.descripcion}
        />
      )}
    </div>
  );
}

function MedicamentosVeterinarios() {
  return <div className="category-screen">Pantalla de Medicamentos veterinarios</div>;
}
function Mascotas() {
  return <div className="category-screen">Pantalla de Mascotas</div>;
}
function Implementos() {
  return <div className="category-screen">Pantalla de Implementos</div>;
}

const Products = () => {
  const [pantalla, setPantalla] = useState('principal');
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Lista de TODOS los productos
  const todosLosProductos = [
    { id: 1, nombre: 'Nutri Cerdo', categoria: 'Alimentos', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Cerdo.png', cantidad: 10, descripcion: 'Alimento balanceado para cerdo.' },
    { id: 2, nombre: 'Nutri Gallo', categoria: 'Alimentos', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Gallo.png', cantidad: 8, descripcion: 'Alimento balanceado para gallo.' },
    { id: 3, nombre: 'Antibiótico Básico', categoria: 'Medicamentos', precio: 15, img: 'https://via.placeholder.com/110x160', cantidad: 20, descripcion: 'Medicamento veterinario de amplio espectro.'},
    { id: 4, nombre: 'Juguete para Perro', categoria: 'Mascotas', precio: 10, img: 'https://via.placeholder.com/110x160', cantidad: 30, descripcion: 'Juguete resistente para perros.'},
    { id: 5, nombre: 'Comedero de Acero', categoria: 'Implementos', precio: 12, img: 'https://via.placeholder.com/110x160', cantidad: 15, descripcion: 'Comedero de acero inoxidable.'},
    { id: 6, nombre: 'Nutri Conejo', categoria: 'Alimentos', precio: 25, img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Conejo.png', cantidad: 12, descripcion: 'Alimento balanceado para conejo.' },
    { id: 7, nombre: 'Vacuna Canina', categoria: 'Medicamentos', precio: 50, img: 'https://via.placeholder.com/110x160', cantidad: 5, descripcion: 'Vacuna anual para caninos.'},
  ];

  const productosFiltrados = todosLosProductos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  let contenido;
  if (pantalla !== 'principal') {
    if (pantalla === 'alimentos') contenido = <AlimentosBalanceados onBack={() => setPantalla('principal')} />;
    else if (pantalla === 'medicamentos') contenido = <MedicamentosVeterinarios />; // A futuro, pasarle sus productos
    else if (pantalla === 'mascotas') contenido = <Mascotas />; // A futuro, pasarle sus productos
    else if (pantalla === 'implementos') contenido = <Implementos />; // A futuro, pasarle sus productos
  } else {
    contenido = (
      <>
        <h2 className="products-title">¿Qué producto deseas encontrar?</h2>
        <Searcher value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        {busqueda ? (
          <div className="products-grid" style={{marginTop: '24px'}}>
            {productosFiltrados.map((prod) => (
              <div className="product-card" key={prod.id}>
                <img src={prod.img} alt={prod.nombre} className="product-img" />
                <div className="product-name">{prod.nombre}</div>
                <div className="product-price">${prod.precio}</div>
                <button className="product-details-btn" onClick={() => abrirModal(prod)}>Ver detalles</button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <hr className="products-divider" />
            <div className="products-subtitle">Elige la categoría de tu interés</div>
            <MenuCategories onCategoriaClick={setPantalla} />
          </>
        )}
      </>
    );
  }

  return (
    <div className="products-bg">
      <div className="products-navbar-space" />
      {contenido}
      {modalAbierto && productoSeleccionado && (
        <ViewProductOffer
          cerrarModal={cerrarModal}
          nombre={productoSeleccionado.nombre}
          img={productoSeleccionado.img}
          precio={productoSeleccionado.precio}
          cantidad={productoSeleccionado.cantidad}
          detalles={productoSeleccionado.descripcion}
        />
      )}
    </div>
  );
};

export default Products; 