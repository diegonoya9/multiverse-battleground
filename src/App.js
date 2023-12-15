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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Dhurjati&family=Black+Ops+One&family=Orbitron&display=swap" rel="stylesheet" />
      <div className="App">
        <Home></Home>
      </div>
    </MyContextProvider>
  );
}

export default App;
