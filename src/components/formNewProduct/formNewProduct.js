import './formNewProduct.css';
import { useState, useEffect } from 'react';
import FormAlimentosBalanceados from './forms/alimentosBalanceados/formAlimentosBalanceados';
import FormMedicamentosVeterinarios from './forms/medicamentosVeterinarios/formMedicamentosVeterinarios';
import FormMascotas from './forms/mascotas/formMascotas';
import FormImplementos from './forms/implementos/formImplementos';

export default function FormNewProduct({ onClose, isEdit, onSave }) {
    const [opcCategory, setOpcCategory] = useState("");

    const renderForm = () => {
        switch (opcCategory){
            case 'Alimentos balanceados':
                return(
                    <FormAlimentosBalanceados onSave={onSave} onClose={onClose} />
                );
            case 'Medicamentos veterinarios':
                return(
                    <FormMedicamentosVeterinarios onSave={onSave} onClose={onClose} />
                );
            case 'Mascotas':
                return(
                    <FormMascotas onSave={onSave} onClose={onClose} />
                );
            case 'Implementos':
                return(
                    <FormImplementos onSave={onSave} onClose={onClose} />
                );
            default:
                return(' ');
        }
    }

    // Prevenir scroll del body cuando el modal está abierto
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        // Ocultar el navbar cuando se abre el modal
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.add('hidden');
        }
        
        return () => {
            document.body.style.overflow = 'unset';
            
            // Mostrar el navbar cuando se cierra el modal
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.remove('hidden');
            }
        };
    }, []);

    const handleClose = () => {
        onClose();
    };

    const handleOverlayClick = (e) => {
        // Cerrar modal solo si se hace clic en el overlay, no en el contenido
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className='container-general' onClick={handleOverlayClick}>
            <div className='new-product-container'>
                <div className='new-product-exit'>
                    <button className='new-product-btn-exit' onClick={handleClose}>X</button>
                </div>
                <h1>{isEdit ? 'Editar oferta' : 'Nuevo producto'}</h1>

                {/* Solo mostrar el selector si la categoría NO es Mascotas ni Implementos */}
                {opcCategory !== 'Mascotas' && opcCategory !== 'Implementos' && (
                  <div className='new-product-category'>
                      <label>Categoría del producto: </label>
                      <select className='new-product-opc-category' value={opcCategory} onChange={(e) => setOpcCategory(e.target.value)}>
                          <option value="">-- Selecciona --</option>
                          <option value='Alimentos balanceados'>Alimentos balanceados</option>
                          <option value='Medicamentos veterinarios'>Medicamentos veterinarios</option>
                          <option value='Mascotas'>Mascotas</option>
                          <option value='Implementos'>Implementos</option>
                      </select>
                  </div>
                )}
                <div className='new-product-forms'>
                    {renderForm()}
                </div>
            </div>
        </div>
    );
}