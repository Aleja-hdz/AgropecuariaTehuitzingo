import logo from './logo.svg';
import './App.css';
import ButtonSmall from './components/buttonSmall/buttonSmall';
import ButtonLong from './components/buttonLong/buttonLong';
import CardProduct from './components/cardProduct/cardProduct';
import CardProductOffer from './components/cardProductOffer/cardProductOffer';
import CurrentInformation from './components/currentInformation/currentInformation';
import FormContactUs from './components/formContactUs/formContactUs';
import OptionsTable from './components/optionsTable/optionsTable';
import Navbar from './components/navbar/navbar';
import MenuCategories from './components/menuCategories/menuCategories';
import MenuSubCategories from './components/menuSubCategories/menuSubCategories';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ButtonSmall />
        <br />
        <ButtonLong />
        <br />
        <CardProduct />
        <br />
        <CardProductOffer />
        <br />
        <CurrentInformation />
        <br />
        <FormContactUs />
        <br />
        <OptionsTable />
        <br />
        <Navbar />
        <br />
        <MenuCategories />
        <br />
        <MenuSubCategories />
        <br />
      </header>
      <main>
      </main>
    </div>
  );
}

export default App;
