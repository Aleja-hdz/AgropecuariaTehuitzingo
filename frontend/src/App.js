import './App.css'
import Navbar from './components/navbar/navbar';
import Offers from './pages/offers/offers';
import Login from './pages/login/login';
import Products from './pages/productsCategories/products';
import ProductsSubCategories from './pages/productsSubCategories/productsSubCategories'
import Register from './pages/register/register';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Offers />
        <Login />
        <Products />
        <ProductsSubCategories />
        <Register />
      </main>
    </div>
  );
}

export default App;
