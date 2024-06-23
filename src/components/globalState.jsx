import React, { createContext, useState } from 'react';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState('Intro');
  const [jugador, setJugador] = useState(null);
  const [enemigo, setEnemigo] = useState(null);
  const [invocaciones, setInvocaciones] = useState([]);
  const [skills, setSkills] = useState(null);

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
      enemigo,
      setEnemigo,
      skills,
      setSkills, 
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };


