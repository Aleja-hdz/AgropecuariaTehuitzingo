import { useState } from 'react';

export default function FormMascotas() {

    const [opcProduct, setOpcProduct] = useState('');

    return (
        <>
        <br></br>
        <div className='new-product-box1'>
            <label>¿Qué es?</label>
            <div className='new-product-box2'>
                <div className='new-product-box3'>
                    <label>Alimento</label>
                    <input 
                        type='radio' 
                        name='producto' 
                        value='Alimento'
                        checked={opcProduct === 'Alimento'}
                        onChange={(e) => setOpcProduct(e.target.value)}
                    />
                </div>
                <div className='new-product-box3'>
                    <label>Accesorio</label>
                    <input 
                        type='radio' 
                        name='producto' 
                        value='Accesorio'
                        checked={opcProduct === 'Accesorio'}
                        onChange={(e) => setOpcProduct(e.target.value)}
                    />
                </div>
            </div>
        </div>
        {opcProduct === 'Alimento' && <FormAlimento />}
        {opcProduct === 'Accesorio' && <FormAccesorio />}
        </>
    );
}

const FormAlimento = () => {

    const [ingredientes, setIngredientes] = useState('');

    return (
        <>
        <div className='new-product-box2'>
            <div className='new-product-box1'>
                <label>Especie:</label>
                <select className='new-product-opc-category'>
                    <option value="">-- Selecciona --</option>
                    <option value=''>Perro</option>
                    <option value=''>Gato</option>
                    <option value=''>Hasmters</option>
                    <option value=''>Peces</option>
                </select>
            </div>
            <div className='new-product-box1'>
                <label>Edad/Etapa de vida:</label>
                <input className='new-product-opc-category' type="text" placeholder="Escribe la edad ..."></input>
            </div>
        </div>
        <div className='new-product-box2'>
            <div className='new-product-box1'>
                <label>Tamaño o raza: </label>
                <select className='new-product-opc-category'>
                    <option value="">-- Selecciona --</option>
                    <option value=''>Razas pequeñas</option>
                    <option value=''>Medianas</option>
                    <option value=''>Grandes</option>
                    <option value=''>Ninguno</option>
                </select>
            </div>
            <div className='new-product-box1'>
                <label>Presentación: </label>
                <select className='new-product-opc-category'>
                    <option value="">-- Selecciona --</option>
                    <option value=''>Croquetas</option>
                    <option value=''>Latas</option>
                    <option value=''>Sobres</option>
                    <option value=''>Snack</option>
                </select>
            </div>
        </div>
        <p className='new-product-text'>Marca o fabricante: </p>
        <input className='new-product-input1' type='text' placeholder='Minino Plus... ' />

        <div className='new-product-box1'>
            <label className='text-label'>¿Desea agregar sus ingredientes principales y composición nutrimental?</label>
            <div className='new-product-box2'>
                <div className='new-product-box3'>
                    <label>Si</label>
                    <input 
                        type='radio' 
                        name='Ingredientes-Composición' 
                        value='Si'
                        checked={ingredientes === 'Si'}
                        onChange={(e) => setIngredientes(e.target.value)}
                    />
                </div>
                <div className='new-product-box3'>
                    <label>No</label>
                    <input 
                        type='radio' 
                        name='Ingredientes-Composición' 
                        value='No'
                        checked={ingredientes === 'No'}
                        onChange={(e) => setIngredientes(e.target.value)}
                    />
                </div>
            </div>
        </div>
        {ingredientes === 'Si' && (
  <>
    <div style={styles.caja1}>
      {/* Ingredientes principales */}
      <fieldset>
        <legend style={styles.tittleCaja}>Ingredientes principales</legend>

        {/* Proteínas animales */}
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Pollo</label>
          <input type="checkbox" name="ingredientes" value="Pollo" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Salmón</label>
          <input type="checkbox" name="ingredientes" value="Salmón" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Cordero</label>
          <input type="checkbox" name="ingredientes" value="Cordero" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Res</label>
          <input type="checkbox" name="ingredientes" value="Res" style={styles.inputsCaja} />
        </div>

        {/* Carbohidratos y vegetales */}
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Arroz</label>
          <input type="checkbox" name="ingredientes" value="Arroz" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Papas</label>
          <input type="checkbox" name="ingredientes" value="Papas" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Zanahoria</label>
          <input type="checkbox" name="ingredientes" value="Zanahoria" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Maíz</label>
          <input type="checkbox" name="ingredientes" value="Maíz" style={styles.inputsCaja} />
        </div>

        {/* Otro (entrada libre) */}
        <div style={styles.caja2_other}>
          <label>Otro:</label>
          <input type="text" name="ingredientesOtros" placeholder="Especificar otro ingrediente" style={styles.input_other}/>
        </div>
      </fieldset>

      {/* Composición nutrimental */}
      <fieldset>
        <legend style={styles.tittleCaja}>Composición nutrimental (% o kcal/kg)</legend>

        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Proteína cruda (%)</label>
          <input type="number" step="0.1" min="0" name="proteinaCruda" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Grasa (%)</label>
          <input type="number" step="0.1" min="0" name="grasa" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Fibra (%)</label>
          <input type="number" step="0.1" min="0" name="fibra" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Humedad (%)</label>
          <input type="number" step="0.1" min="0" name="humedad" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Cenizas (%)</label>
          <input type="number" step="0.1" min="0" name="cenizas" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Calcio (%)</label>
          <input type="number" step="0.1" min="0" name="calcio" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Fósforo (%)</label>
          <input type="number" step="0.1" min="0" name="fosforo" style={styles.inputsCaja} />
        </div>
        <div style={styles.caja2}>
          <label style={styles.labelCaja}>Energía metabolizable (kcal/kg)</label>
          <input type="number" step="1" min="0" name="energia" style={styles.inputsCaja} />
        </div>
      </fieldset>
    </div>
  </>
)}

        </>
    );
}

const FormAccesorio = () => {
    return (
        <>
        <p style={styles.p}>Recomendaciones de uso (opcional): </p>
        <input type='text' placeholder='Recomendado para  ...' className='new-product-input1' />
        <div style={styles.divUso}></div>
        </>
    );
}

const styles = {
  containerForm: {
    width: '100%',
    marginTop: '15px',
    marginBottom: '20px',
  },

  caja1: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '10px',
    width: '100%',
  },

  caja2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    width: '100%',
  },

  caja2_other: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px',
  },

  tittleCaja: {
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#1628c4',
    fontSize: '14px',
  },

  inputsCaja: {
    height: '20px',
    width: '180px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    paddingLeft: '8px',
    fontSize: '14px',
    color: '#000',
  },

  input_other: {
    width: '180px',
    height: '30px',
    borderBottom: '1px solid #000000',
    paddingLeft: '8px',
    fontSize: '14px',
    color: '#000',
  },

  labelCaja: {
    width: '60%',
    fontSize: '14px',
  },

  checkbox: {
    width: '16px',
    height: '16px',
    marginLeft: '10px',
  },

  p: {
    marginBottom: '5px',
  },

  divUso: {
    marginBottom: '-15px',
  },
}
