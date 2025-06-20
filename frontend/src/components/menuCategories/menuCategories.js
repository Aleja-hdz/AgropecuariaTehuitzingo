import "./menuCategories.css";

export default function MenuCategories({ onCategoriaClick }) {
    return(
        <div className="menu-categories">
            <div className="order-categories">
                <button className="btn-categorie" onClick={() => onCategoriaClick('alimentos')}>Alimentos balanceados</button>
                <button className="btn-categorie" onClick={() => onCategoriaClick('medicamentos')}>Medicamentos veterinarios</button>
            </div>
            <div className="order-categories">
                <button className="btn-categorie" onClick={() => onCategoriaClick('mascotas')}>Mascotas</button>
                <button className="btn-categorie" onClick={() => onCategoriaClick('implementos')}>Implementos</button>
            </div>
        </div>
    );
}