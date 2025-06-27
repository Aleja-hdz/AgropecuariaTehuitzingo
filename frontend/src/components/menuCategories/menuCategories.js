import "./menuCategories.css";
import { Link } from 'react-router-dom';

export default function MenuCategories() {
    return(
        <div className="menu-categories">
            <div className="order-categories">
                <Link className="btn-categorie" to="/alimentosBalanceados"><button className="btn-categorie">Alimentos balanceados</button></Link>
                <Link className="btn-categorie" to="/medicamentosVeterinarios"><button className="btn-categorie">Medicamentos veterinarios</button></Link>
            </div>
            <div className="order-categories">
                <Link className="btn-categorie" to="/mascotas"><button className="btn-categorie">Mascotas</button></Link>
                <Link className="btn-categorie" to="/implementos"><button className="btn-categorie">Implementos</button></Link>
            </div>
        </div>
    );
}