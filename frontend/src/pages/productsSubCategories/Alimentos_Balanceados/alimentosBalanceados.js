import './alimentosBalanceados.css';
import Searcher from '../../../components/searcher/searcher';
import MenuAlimentosBalanceados from '../../../components/menuSubCategories/Alimentos_Balanceados/menuAlimentosBalanceados';
import CardProduct from '../../../components/cardProduct/cardProduct';

export default function AlimentosBalanceados() {
    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1>¿Qué producto deseas encontrar?</h1>
                <Searcher />
            </div>
            <hr></hr>
            <div className="categories-container">
                <MenuAlimentosBalanceados />
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