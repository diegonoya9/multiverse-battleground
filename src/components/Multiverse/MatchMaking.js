import classes from './MatchMaking.module.css'
import { useEffect ,useState,useContext} from 'react'
import { MyContext } from '../../context/MyContext';
import Button from '../UI/Button';
const MatchMaking = ({changeMultiverseActivePage}) => {
    const [ws, setWs] = useState(null);
    const [listaClientes, setListaClientes] = useState([]);
    const { userContext } = useContext(MyContext);
    let activeUser = userContext.idUsuario
    let userName = userContext.userName
    useEffect(() => {
        const newWs = new WebSocket('ws://localhost:3020');

        newWs.addEventListener('open', () => {
          console.log('Conexión establecida');
    
          // Envia el clientId al servidor en el momento de la conexión
          const clientId = activeUser;
          newWs.send(JSON.stringify({ tipo: 'conexion', clientId, userName }));
        });
    
        newWs.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);      
            if (data.tipo === 'listaClientes' && data.listaClientes) {
              // Actualiza la lista de clientes conectados en el estado del componente
              setListaClientes(data.listaClientes);
              console.log(data.listaClientes)
            } else {
              console.log(`Mensaje recibido del servidor: ${event.data}`);
              // Puedes manejar otros tipos de mensajes aquí
            }
          });
    
        setWs(newWs);
    
        return () => {
          newWs.close();
        };
    }, []);
  
    const enviarMensaje = (mensaje) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(mensaje));
      }
    };
  
    return (
      <div>
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        {/* Renderiza tu juego aquí */}
        <button onClick={() => enviarMensaje({ tipo: 'cambio_turno', turno: 'jugador2' })}>
          Cambiar Turno
        </button>
        {listaClientes && listaClientes.map((cliente) => {
            return cliente.clientId !== activeUser &&<div>
                <p>{cliente.userName}</p>
                <p>{cliente.clientId}</p>
                <Button value="Challenge this MF" onClick={() => enviarMensaje({type:"challenge",id:cliente.clientId,clientId:activeUser})}></Button>
            </div>
        })}
      </div>
    );
}

export default MatchMaking