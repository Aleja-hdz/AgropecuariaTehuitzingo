import './implementos.css';
import Searcher from '../../../components/searcher/searcher';
import MenuImplementos from '../../../components/menuSubCategories/Implementos/menuImplementos';
import CardProduct from '../../../components/cardProduct/cardProduct';

export default function Implementos() {
    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1>¿Qué producto deseas encontrar?</h1>
                <Searcher />
            </div>
            <hr></hr>
            <div className="categories-container">
                <MenuImplementos />
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