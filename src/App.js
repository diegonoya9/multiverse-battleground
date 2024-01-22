import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FightersPage from './pages/FightersPage';
import Multiverse, { loader as multiverseLoader } from './components/Multiverse/Multiverse';
import MissionsPage from './components/Multiverse/MissionsPage'
import MatchMaking from './components/Multiverse/MatchMaking';
import ObjectsPage from './pages/ObjectsPage'
import ShopPage from './pages/ShopPage'
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
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
          { path: '/missions', element: <MissionsPage /> },
          { path: '/pvp', element: <MatchMaking /> },
          { path: '/bag', element: <ObjectsPage /> },
          { path: '/shop', element: <ShopPage /> },
          { path: '/config', element: <SettingsPage /> },
          { path: '/users', element: <UsersPage /> },
        ]
      },
      { path: '/battle', element: <Battleground /> }
    ]
  }
])
function App() {
  return (<RouterProvider router={router} />
  );
}

export default App;
