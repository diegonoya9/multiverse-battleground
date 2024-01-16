import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FightersPage from './components/Multiverse/FightersPage';
import Multiverse, { loader as multiverseLoader } from './components/Multiverse/Multiverse';
import Battleground from './components/Fights/Battleground';
import Home from './components/Multiverse/Home.js'
import RootLayuout from './pages/Root';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayuout />,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        children: [
          { index: true, element: <Multiverse /> },
          { path: '/fighters', element: <FightersPage /> },
          { path: '/battle', element: <Battleground /> },
        ]
      }
    ]
  }
])
function App() {
  return (<RouterProvider router={router} />
  );
}

export default App;
