import './App.css';
import Home from './components/Multiverse/Home.js'
import { MyContextProvider } from './context/MyContext.js';
import Headers from './components/Multiverse/Headers.js';
function App() {
  const userContextValue = {
    idUsuario: 1,
    // Otros datos relacionados con el usuario si es necesario
  };
  return (
    <MyContextProvider value={userContextValue}>
      <Headers></Headers>
      <div className="App">
        <Home></Home>
      </div>
    </MyContextProvider>
  );
}

export default App;
