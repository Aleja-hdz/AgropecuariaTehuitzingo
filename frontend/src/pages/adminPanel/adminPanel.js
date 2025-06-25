import './adminPanel.css'
import CurrentInformation from "../../components/currentInformation/currentInformation";
import TableMain from "../../components/tableMain/tableMain";
import ButtonLong from '../../components/buttonLong/buttonLong';
import TableProducts from '../../components/tableProducts/tableProducts';
import TableOffers from '../../components/tableOffers/tableOffers';

export default function AdminPanel() {
    return (
        <div className="admin-container">
            <div className='admin-content'>
                <div className='admin-head'>
                    <div className='admin-box1-head'>
                        <h1>Panel de gestión</h1>
                        <hr className='admin-line'></hr>
                    </div>
                    <div className='admin-box2-head'>
                        <CurrentInformation />
                    </div>
                </div>
                <div className="admin-first-table">
                    <p>Últimas creaciones</p>
                    <TableMain />
                </div>
                <div className='admin-others-tables'>
                    <div className='admin-table-products'>
                        <ButtonLong text={"Nuevo producto"}/>
                        <p>Productos registrados</p>
                        <TableProducts />
                    </div>
                    <div className='admin-table-offers'>
                        <ButtonLong text={"Nueva oferta"}/>
                        <p>Ofertas registradas</p>
                        <TableOffers />
                    </div>
                </div>
            </div>
        </div>
    );
}