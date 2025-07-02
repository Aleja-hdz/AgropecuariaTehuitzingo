import "./menuCategories.css";
import { Link } from 'react-router-dom';

export default function MenuCategories() {
    return(
        <div className="menu-categories">
            <div className="order-categories">
                <Link className="btn-categorie-balanceados" to="/alimentosBalanceados"><button className="btn-categorie-balanceados btn-balanceados"><span className="tittles-h1">Alimentos balanceados</span></button></Link>
                <Link className="btn-categorie-mv" to="/medicamentosVeterinarios"><button className="btn-categorie-mv btn-mv"><span className="tittles-h1">Medicamentos veterinarios</span></button></Link>
            </div>
            <div className="order-categories">
                <Link className="btn-categorie-mascotas" to="/mascotas"><button className="btn-categorie-mascotas btn-mascotas"><span className="tittles-h1">Mascotas</span></button></Link>
                <Link className="btn-categorie-implementos" to="/implementos"><button className="btn-categorie-implementos btn-implementos"><span className="tittles-h1">Implementos</span></button></Link>
            </div>
        </div>
    );
}