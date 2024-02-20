import classes from './MatchMaking.module.css'
import { useEffect, useState, useContext } from 'react'
import { MyContext } from '../../context/MyContext';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '../UI/Modal';
const MatchMaking = () => {
  const [showModal,setShowModal]=useState()
  const [modalContent,setModalContent]=useState()
  const navigate = useNavigate()
  const [ws, setWs] = useState(null);
  const [listaClientes, setListaClientes] = useState([]);
  const { userContext } = useContext(MyContext);
  let activeUser = userContext.idUsuario
  let userName = userContext.userName
  let backEndWS = userContext.backEndWS
  const closeModal= () => {
    setShowModal(false)
  }
  const acceptChallenge= () => {
    console.log('reto aceptado')
  }
  const rejectChallenge= () => {
    console.log('reto rechazado');
  }
  useEffect(() => {
    const newWs = new WebSocket(backEndWS);

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
        if (data.tipo === "challenge"){
          setModalContent(`Te ha retado ${data.userName}`)
          setShowModal(true)
        }
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
    console.log(mensaje)
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(mensaje));
    }
  };

  return (
    <div className={classes.mainContainer}>
      {showModal && <Modal styleType={"battlegroundColiseum"} onClose={ closeModal}>
        {modalContent}
        <Button value="Aceptar Reto" onClick={acceptChallenge}/>
        <Button value="Rechazar" onClick={rejectChallenge}/>
      </Modal>}
      <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { navigate('/') }}></Button>
      {/* Renderiza tu juego aquí */}
      {listaClientes && listaClientes.map((cliente) => {
        return cliente.clientId !== activeUser && <div>
          <p>{cliente.userName}</p>
          <p>{cliente.clientId}</p>
          <Button value="Challenge this MF" onClick={() => enviarMensaje({ type: "challenge", id: cliente.clientId, clientId: activeUser,userName })}></Button>
        </div>
      })}
    </div>
  );
}

export default MatchMaking