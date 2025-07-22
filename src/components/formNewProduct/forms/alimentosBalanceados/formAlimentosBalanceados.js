import { useState } from 'react';
import FormRawMaterials from '../formRawMaterials';

export default function FormAlimentosBalanceados() {
    const [esAlimentoProduccion, setEsAlimentoProduccion] = useState('');
    const [especie, setEspecie] = useState('');
    const [marca, setMarca] = useState('');
    const [opcRawMaterials, setOpcRaewMaterials] = useState(false);

    
    // Para mostrar el formulario de materias primas si se selecciona la opción
    const renderFormRawMaterials = () => opcRawMaterials ? <FormRawMaterials /> : <></>;

    return (
        <>
            <br></br>
            <div className='new-product-box1'>
                <label>¿És alimento para producción?</label>
                <div className='new-product-box2'>
                    <div className='new-product-box3'>
                        <label>Si</label>
                        <input 
                            type='radio' 
                            name='alimentoProduccion' 
                            value='Si'
                            checked={esAlimentoProduccion === 'Si'}
                            onChange={(e) => setEsAlimentoProduccion(e.target.value)}
                        />
                    </div>
                    <div className='new-product-box3'>
                        <label>No</label>
                        <input 
                            type='radio' 
                            name='alimentoProduccion' 
                            value='No'
                            checked={esAlimentoProduccion === 'No'}
                            onChange={(e) => setEsAlimentoProduccion(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='new-product-box2'>
                <div className='new-product-box1'>
                    <label>Especie:</label>
                    <select 
                        className='new-product-opc-category'
                        value={especie}
                        onChange={(e) => setEspecie(e.target.value)}
                    >
                        <option value="">-- Selecciona --</option>
                        <option value='Bovinos'>Bovinos</option>
                        <option value='Equinos'>Equinos</option>
                        <option value='Porcinos'>Porcinos</option>
                        <option value='Caprinos'>Caprinos</option>
                        <option value='Ovinos'>Ovinos</option>
                        <option value='Aves'>Aves</option>
                        <option value='Aquacultura'>Aquacultura</option>
                    </select>
                </div>
                <div className='new-product-box1'>
                    <label>Marca:</label>
                    <select 
                        className='new-product-opc-category'
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                    >
                        <option value="">-- Selecciona --</option>
                        <option value='Unión'>Unión</option>
                        <option value='Apiaba'>Apiaba</option>
                        <option value='Fasa'>Fasa</option>
                        <option value='Nutre bien'>Nutre bien</option>
                    </select>
                </div>
            </div>
            <br></br>
            <div className='new-product-box1'>
                <label>¿Deseas añadir sus materias primas?</label>
                <div className='new-product-box2'>
                    <div className='new-product-box3'>
                        <label>Si</label>
                        <input type='radio' name='materiasPrimas' value='true' onChange={() => setOpcRaewMaterials(true)} checked={opcRawMaterials === true}/>
                    </div>
                    <div className='new-product-box3'>
                        <label>No</label>
                        <input type='radio' name='materiasPrimas' value='false' onChange={() => setOpcRaewMaterials(false)} checked={opcRawMaterials === false}/>
                    </div>
                </div>
            </div>

            <div className='new-product-forms'>
                {renderFormRawMaterials()}
            </div>
        </>
    );
}