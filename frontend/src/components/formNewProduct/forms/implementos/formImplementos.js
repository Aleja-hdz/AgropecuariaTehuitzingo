export default function FormImplementos() {
    return (
        <>
        <p style={styles.p}>Recomendaciones de uso (opcional): </p>
        <input type='text' placeholder='Recomendado para  ...' className='new-product-input1' />
        <div style={styles.divUso}></div>
        </>
    );
}

const styles = {
    p: {
    marginBottom: '5px',
  },

  divUso: {
    marginBottom: '-15px',
  },
}