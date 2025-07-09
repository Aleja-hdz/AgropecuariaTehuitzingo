export default function FormMedicamentosVeterinarios() {
    return (
        <>
            <div className='new-product-category'>
                <label>¿Qué tipo de medicamento es? </label>
                <select className='new-product-opc-category'>
                    <option value="">-- Selecciona --</option>
                    <option value=''>Desparasitante</option>
                    <option value=''>Vitaminas</option>
                    <option value=''>Suplementos</option>
                    <option value=''>Vacunas</option>
                </select>
            </div>
            <div className='new-product-box2'>
                <div className='new-product-box1'>
                    <label>Especie:</label>
                    <select className='new-product-opc-category'>
                        <option value="">-- Selecciona --</option>
                        <option value=''>Perro</option>
                        <option value=''>Gato</option>
                        <option value=''>Gallos</option>
                        <option value=''>Caballo</option>
                        <option value=''>Cerdo</option>
                        <option value=''>Conejo</option>
                        <option value=''>Vacas</option>
                    </select>
                </div>
                <div className='new-product-box1'>
                    <label>Edad/Etapa de vida:</label>
                    <input className='new-product-opc-category' type="text" placeholder="Escribe la edad ..."></input>
                </div>
            </div>
            <div className='new-product-box2'>
                <div className='new-product-box1'>
                    <label>Vía de administración: </label>
                    <select className='new-product-opc-category'>
                        <option value="">-- Selecciona --</option>
                        <option value=''>Oral</option>
                        <option value=''>Inyectable</option>
                        <option value=''>Tópica</option>
                        <option value=''>Intranasal</option>
                        <option value=''>Ocular</option>
                    </select>
                </div>
                <div className='new-product-box1'>
                    <label>Presentación: </label>
                    <select className='new-product-opc-category'>
                        <option value="">-- Selecciona --</option>
                        <option value=''>Frasco</option>
                        <option value=''>Ampolleta</option>
                        <option value=''>Blister</option>
                        <option value=''>Sobres</option>
                    </select>
                </div>
            </div>
            <p className='new-product-text'>Marca o fabricante: </p>
            <input className='new-product-input1' type='text' placeholder='Bayer Animal Health ... ' />
        </>
    );
}