export default function FormRawMaterials() {
  return (
    <div style={styles.containerForm}>
        <div style={styles.caja1}>
            {/* Fuentes de proteína animal */}
            <fieldset>
                <legend style={styles.tittleCaja}>Fuentes de proteína animal</legend>
                <div style={styles.caja2}><label style={styles.labelCaja}>Harina de carne</label><input type="checkbox" name="proteinaAnimal" value="Harina de carne" style={styles.inputsCaja}/></div>
                <div style={styles.caja2}><label style={styles.labelCaja}>Harina de pollo</label><input type="checkbox" name="proteinaAnimal" value="Harina de pollo" style={styles.inputsCaja} /></div>
                <div style={styles.caja2}><label style={styles.labelCaja}>Harina de pescado</label><input type="checkbox" name="proteinaAnimal" value="Harina de pescado" style={styles.inputsCaja} /></div>
                <div style={styles.caja2}><label style={styles.labelCaja}>Harina de sangre</label><input type="checkbox" name="proteinaAnimal" value="Harina de sangre" style={styles.inputsCaja} /></div>
                <div style={styles.caja2}><label style={styles.labelCaja}>Harina de hueso</label><input type="checkbox" name="proteinaAnimal" value="Harina de hueso" style={styles.inputsCaja} /></div>
                <div style={styles.caja2}><label style={styles.labelCaja}>Vísceras animales</label><input type="checkbox" name="proteinaAnimal" value="Vísceras animales" style={styles.inputsCaja} /></div>
            </fieldset>

            {/* Fuentes de proteína vegetal */}
            <fieldset>
                <legend style={styles.tittleCaja}>Fuentes de proteína vegetal</legend>
                <div style={styles.caja2}><label style={styles.labelCaja}>Harina de soya</label><input type="checkbox" name="proteinaVegetal" value="Harina de soya" style={styles.inputsCaja} /> </div>
                <div style={styles.caja2}><label style={styles.labelCaja}>Torta de soya</label><input type="checkbox" name="proteinaVegetal" value="Torta de soya" style={styles.inputsCaja} /> </div>
                <div style={styles.caja2}><label style={styles.labelCaja}>Gluten de maíz</label><input type="checkbox" name="proteinaVegetal" value="Gluten de maíz" style={styles.inputsCaja} /> </div>
                <div style={styles.caja2}><label style={styles.labelCaja}>Harina de alfalfa</label><input type="checkbox" name="proteinaVegetal" value="Harina de alfalfa" style={styles.inputsCaja}/></div>
                <div style={styles.caja2}><label style={styles.labelCaja}>Harina de canola</label><input type="checkbox" name="proteinaVegetal" value="Harina de canola" style={styles.inputsCaja} /> </div>
                <div style={styles.caja2}><label style={styles.labelCaja}>Semilla de algodón</label><input type="checkbox" name="proteinaVegetal" value="Semilla de algodón" style={styles.inputsCaja} /></div>
            </fieldset>
        </div>

        <div style={styles.caja1}>
            {/* Grasas y aceites */}
            <fieldset style={{ width: '100%', marginTop: '15px' }}>
                <legend style={styles.tittleCaja}>Grasas y aceites</legend>
                <div style={styles.caja2}>
                <label style={styles.labelCaja}>Grasa animal</label>
                <input type="checkbox" name="grasas" value="Grasa animal" style={styles.inputsCaja} />
                </div>
                <div style={styles.caja2}>
                <label style={styles.labelCaja}>Aceite de pescado</label>
                <input type="checkbox" name="grasas" value="Aceite de pescado" style={styles.inputsCaja} />
                </div>
                <div style={styles.caja2}>
                <label style={styles.labelCaja}>Aceite vegetal</label>
                <input type="checkbox" name="grasas" value="Aceite vegetal" style={styles.inputsCaja} />
                </div>
                <div style={styles.caja2}>
                <label style={styles.labelCaja}>Sebo</label>
                <input type="checkbox" name="grasas" value="Sebo" style={styles.inputsCaja} />
                </div>
            </fieldset>

            {/* Fibra */}
            <fieldset style={{ width: '100%', marginTop: '15px' }}>
                <legend style={styles.tittleCaja}>Fibra</legend>
                <div style={styles.caja2}>
                <label style={styles.labelCaja}>Cáscara de soya</label>
                <input type="checkbox" name="fibra" value="Cáscara de soya" style={styles.inputsCaja} />
                </div>
                <div style={styles.caja2}>
                <label style={styles.labelCaja}>Cascarilla de arroz</label>
                <input type="checkbox" name="fibra" value="Cascarilla de arroz" style={styles.inputsCaja} />
                </div>
                <div style={styles.caja2}>
                <label style={styles.labelCaja}>Celulosa</label>
                <input type="checkbox" name="fibra" value="Celulosa" style={styles.inputsCaja} />
                </div>
                <div style={styles.caja2}>
                <label style={styles.labelCaja}>Salvado de trigo</label>
                <input type="checkbox" name="fibra" value="Salvado de trigo" style={styles.inputsCaja} />
                </div>
            </fieldset>
        </div>

        <div style={styles.caja1}>

            {/* Aditivos y suplementos */}
            <fieldset style={{ width: '100%', marginTop: '15px' }}>
            <legend style={styles.tittleCaja}>Aditivos y suplementos</legend>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Premix vitamínico-mineral</label>
                <input type="checkbox" name="aditivos" value="Premix vitamínico-mineral" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Fosfato bicálcico</label>
                <input type="checkbox" name="aditivos" value="Fosfato bicálcico" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Carbonato de calcio</label>
                <input type="checkbox" name="aditivos" value="Carbonato de calcio" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Cloruro de sodio</label>
                <input type="checkbox" name="aditivos" value="Cloruro de sodio" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Lisina</label>
                <input type="checkbox" name="aditivos" value="Lisina" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Metionina</label>
                <input type="checkbox" name="aditivos" value="Metionina" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Enzimas digestivas</label>
                <input type="checkbox" name="aditivos" value="Enzimas digestivas" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Prebióticos</label>
                <input type="checkbox" name="aditivos" value="Prebióticos" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Probióticos</label>
                <input type="checkbox" name="aditivos" value="Probióticos" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Antioxidantes</label>
                <input type="checkbox" name="aditivos" value="Antioxidantes" style={styles.inputsCaja} />
            </div>
            </fieldset>

            {/* Fuentes de energía / carbohidratos */}
            <fieldset style={{ width: '100%', marginTop: '15px' }}>
            <legend style={styles.tittleCaja}>Fuentes de energía / carbohidratos</legend>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Maíz</label>
                <input type="checkbox" name="carbohidratos" value="Maíz" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Sorgo</label>
                <input type="checkbox" name="carbohidratos" value="Sorgo" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Trigo</label>
                <input type="checkbox" name="carbohidratos" value="Trigo" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Avena</label>
                <input type="checkbox" name="carbohidratos" value="Avena" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Arroz</label>
                <input type="checkbox" name="carbohidratos" value="Arroz" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Cebada</label>
                <input type="checkbox" name="carbohidratos" value="Cebada" style={styles.inputsCaja} />
            </div>
            <div style={styles.caja2}>
                <label style={styles.labelCaja}>Pulpa de remolacha</label>
                <input type="checkbox" name="carbohidratos" value="Pulpa de remolacha" style={styles.inputsCaja} />
            </div>
            </fieldset>
        </div>
    </div> 
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
        marginBottom: '0px',
    },

    caja2: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },

    tittleCaja: {
        marginBottom: '10px',
        fontWeight: 'bold',
        color: '#1628c4',
    },

    inputsCaja: {
        margin: '0px',
        marginRight: '-35px',
        marginLeft: '-40px',
        marginTop: '3px',
        height: '15px',
    },

    labelCaja: {
        width: '200px',   
    },
}