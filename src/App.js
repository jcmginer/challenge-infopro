import logo from './logo.svg';
import './App.css';
import Usuarios from './Components/Usuarios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Usuarios />
      </header>
    </div>
  );
}

export default App;
