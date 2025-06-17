import logo from './logo.svg';
import './App.css';
import ButtonSmall from './components/buttonSmall/buttonSmall';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <ButtonSmall />
      </main>
    </div>
  );
}

export default App;
