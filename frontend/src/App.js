import logo from './logo.svg';
import './App.css';
import ButtonSmall from './components/buttonSmall/buttonSmall';
import ButtonLong from './components/buttonLong/buttonLong';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ButtonSmall />
        <br />
        <ButtonLong />
      </header>
      <main>
      </main>
    </div>
  );
}

export default App;
