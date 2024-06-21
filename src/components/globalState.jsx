import React, { createContext, useState } from 'react';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState('Intro');
  const [jugador, setJugador] = useState(null);
  const [invocaciones, setInvocaciones] = useState([]);

  const toggleComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <GlobalStateContext.Provider value={{ 
      activeComponent,
      setActiveComponent, 
      toggleComponent, 
      jugador,
      setJugador,
      invocaciones,
      setInvocaciones, 
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };


