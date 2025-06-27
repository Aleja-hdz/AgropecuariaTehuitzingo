import './medicamentosVeterinarios.css';
import Searcher from '../../../components/searcher/searcher';
import MenuMedicamentosVeterinarios from '../../../components/menuSubCategories/Medicamentos_Veterinarios/menuMedicamentosVeterinarios';
import CardProduct from '../../../components/cardProduct/cardProduct';

export default function MedicamentosVeterinarios() {
    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1>¿Qué producto deseas encontrar?</h1>
                <Searcher />
            </div>
            <hr></hr>
            <div className="categories-container">
                <MenuMedicamentosVeterinarios />
                <div className="container-card-products">
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                </div>
            </div>
        </div>
    );
}