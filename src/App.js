import logo from './logo.svg';
import './App.css';
import Battleground from './components/Fights/Battleground';
import Multiverse from './components/Multiverse/Multiverse';
import { useState } from 'react';

function App() {
  const [userPage, setUserPage] = useState(1)
  return (
    <div className="App">
      {userPage && userPage === 1 && <Multiverse setUserPage={setUserPage}></Multiverse>}
      {userPage && userPage === 2 && <Battleground></Battleground>}

    </div>
  );
}

export default App;
