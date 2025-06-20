import './productsSubCategories.css';
import Searcher from '../../components/searcher/searcher';
import MenuSubCategories from '../../components/menuSubCategories/menuSubCategories';
import CardProduct from '../../components/cardProduct/cardProduct';

export default function ProductsSubCategories() {
    return(
        <div className="products-container">
            <div>
                <h1>¿Qué producto deseas encontrar?</h1>
                <Searcher />
            </div>
            <hr></hr>
            <div className="categories-container">
                <MenuSubCategories />
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