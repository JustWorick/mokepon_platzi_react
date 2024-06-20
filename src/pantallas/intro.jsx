import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';

const Intro = ({ isActive }) => {
  const { toggleComponent } = useContext(GlobalStateContext);

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let showMessageTimeout;
    let executeFunctionTimeout;

    if (isActive) {
      showMessageTimeout = setTimeout(() => {
        setShowMessage(true);
      }, 1000);

      executeFunctionTimeout = setTimeout(() => {
        console.log('Función ejecutada después de 8 segundos');
        toggleComponent('PantallaPrincipal')
      }, 2000);
    } else {
      setShowMessage(false);
    }
    return () => {
      clearTimeout(showMessageTimeout);
      clearTimeout(executeFunctionTimeout);
    };
  }, [isActive]);

  return (
    <div className={isActive ? 'active' : 'inactive'}>
      {showMessage && <p>Hola, gracias por probar este juego. Este proyecto se realiza con el fin de probar habilidades y el humor que se utiliza no tiene el objetivo de ofender a nadie.</p>}
    </div>
  );
};

export default Intro;
