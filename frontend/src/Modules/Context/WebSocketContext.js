import {
    createContext
  } from "react";
  import { io } from 'socket.io-client';

  export const socketDetails = createContext();

  const WebSocketContext = (props) =>{
    const socket = io("http://localhost:7000");
    // const socket = io(process.env.REACT_APP_PORT,{transports:['websocket']});


    return (
        <socketDetails.Provider value={{socket}}>
            {props.children}
        </socketDetails.Provider>
        )
  };

  export default WebSocketContext;
  