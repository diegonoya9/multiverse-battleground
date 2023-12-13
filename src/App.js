import './App.css';
import Home from './components/Multiverse/Home.js'
import { MyContextProvider } from './context/MyContext.js';
function App() {
  const userContextValue = {
    idUsuario: 1,
    // Otros datos relacionados con el usuario si es necesario
  };
  return (
    <MyContextProvider value={userContextValue}>
      <div className="App">
        <Home></Home>
      </div>
    </MyContextProvider>
  );
}

export default App;
