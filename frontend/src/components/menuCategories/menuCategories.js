import "./menuCategories.css";

export default function MenuCategories() {
    return(
        <div className="menu-categories">
            <div className="order-categories">
                <button className="btn-categorie">Alimentos balanceados</button>
                <button className="btn-categorie">Medicamentos veterinarios</button>
            </div>
            <div className="order-categories">
                <button className="btn-categorie">Mascotas</button>
                <button className="btn-categorie">Implementos</button>
            </div>
        </div>
    );
}