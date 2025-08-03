import "./menuCategories.css";
import { Link } from 'react-router-dom';

export default function MenuCategories() {
    return(
        <div className="menu-categories animate-menu-container">
            <div className="order-categories animate-categories-row">
                <Link className="btn-categorie-balanceados animate-category-btn" to="/alimentosBalanceados">
                    <button className="btn-categorie-balanceados btn-balanceados animate-btn-hover">
                        <span className="tittles-h1">Alimentos balanceados</span>
                    </button>
                </Link>
                <Link className="btn-categorie-mv animate-category-btn" to="/medicamentosVeterinarios">
                    <button className="btn-categorie-mv btn-mv animate-btn-hover">
                        <span className="tittles-h1">Medicamentos veterinarios</span>
                    </button>
                </Link>
            </div>
            <div className="order-categories animate-categories-row">
                <Link className="btn-categorie-mascotas animate-category-btn" to="/mascotas">
                    <button className="btn-categorie-mascotas btn-mascotas animate-btn-hover">
                        <span className="tittles-h1">Mascotas</span>
                    </button>
                </Link>
                <Link className="btn-categorie-implementos animate-category-btn" to="/implementos">
                    <button className="btn-categorie-implementos btn-implementos animate-btn-hover">
                        <span className="tittles-h1">Implementos</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}