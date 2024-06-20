import React, { createContext, useState } from 'react';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState('Intro');

  const toggleComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <GlobalStateContext.Provider value={{ activeComponent, setActiveComponent, toggleComponent }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };


