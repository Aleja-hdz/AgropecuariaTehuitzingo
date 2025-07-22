import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Página no encontrada</h1>
      <p style={styles.text}>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" style={styles.link}>Volver al inicio</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    padding: '20px',
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  link: {
    fontSize: '16px',
    textDecoration: 'none',
    color: '#007bff',
  },
};

export default NotFound;
