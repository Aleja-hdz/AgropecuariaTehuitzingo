import './mascotas.css';
import Searcher from '../../../components/searcher/searcher';
import MenuMascotas from '../../../components/menuSubCategories/Mascotas/menuMascotas';
import CardProduct from '../../../components/cardProduct/cardProduct';

export default function Mascotas() {
    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1>¿Qué producto deseas encontrar?</h1>
                <Searcher />
            </div>
            <hr></hr>
            <div className="categories-container">
                <MenuMascotas />
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