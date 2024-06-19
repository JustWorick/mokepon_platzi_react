import React, { createContext, useState } from 'react';

// Crea el contexto
export const GlobalStateContext = createContext();

// Proveedor del contexto
export const GlobalStateProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

