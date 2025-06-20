import './products.css';
import Searcher from '../../components/searcher/searcher';
import MenuCategories from '../../components/menuCategories/menuCategories';

export default function Products(){
    return(
        <div className="products-container">
            <div>
                <h1>¿Qué producto deseas encontrar?</h1>
                <Searcher />
            </div>
            <hr></hr>
            <div className="categories-container">
                <p>Elíge la categoría de tu interés</p>
                <MenuCategories />
            </div>
        </div>
    );
}