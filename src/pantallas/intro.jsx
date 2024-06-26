import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { crearInvocaciones } from '../components/invocacion.js';
import { agregarHabilidades, crearHabilidades } from '../components/habilidades.js';
import { Jugador } from '../components/jugador.js';

const Intro = ({ isActive }) => {
  const { toggleComponent, skills, setSkills, invocaciones, setInvocaciones, jugador, enemigo, setEnemigo } = useContext(GlobalStateContext);

  const [showMessage, setShowMessage] = useState(false);


  const enemy = new Jugador('enemigo');

  

  
  useEffect(() => {
    let showMessageTimeout;
    let executeFunctionTimeout;

    if (isActive) {
      showMessageTimeout = setTimeout(() => {
        setShowMessage(true);
      }, 1000);

      executeFunctionTimeout = setTimeout(() => {
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

    // creamos las skills las invocaciones y el enemigo
  useEffect(() => {
    let invocacionesCreadas = crearInvocaciones(); 
    let habilidadesCreadas = crearHabilidades();
    setInvocaciones(invocacionesCreadas)
    console.log(invocaciones);
    setSkills(habilidadesCreadas)
    console.log(skills);
    
    setEnemigo(enemy)
  },[jugador])


   // le añademos la invocacion al jugador y enemigo y la skill a ambas invocaciones 
  useEffect(() => {
    if(jugador && skills && enemigo) {
      jugador.modificarInvocacionElegida(invocaciones[0]) // aqui se modifica la invocacion
      agregarHabilidades(skills,[0,1,2,3],jugador.invocacionElegida)
      //jugador.invocacionElegida.habilidades.push(skills[0,1,2,3])  // aqui se agregan las skills
      console.log('Se Agregaron las Skills a : ' + jugador.nombre);
      console.log(jugador);

      enemigo.modificarInvocacionElegida(invocaciones[1]) // aqui se modifica la invocacion
      agregarHabilidades(skills,[4,5,6,7,8],enemigo.invocacionElegida)
      //enemigo.invocacionElegida.habilidades.push(skills[4,5,6,7,8])  // aqui se agregan las skills
      console.log('Se Agregaron las Skills a : ' + enemigo.nombre);
      console.log(enemigo);

      jugador.invocacionElegida.habilidades[0].setObjetivo(enemigo.invocacionElegida)
      jugador.invocacionElegida.habilidades[0].setCaster(jugador.invocacionElegida)
    
      enemigo.invocacionElegida.habilidades[0].setObjetivo(jugador.invocacionElegida)
      enemigo.invocacionElegida.habilidades[0].setCaster(enemigo.invocacionElegida)
      console.log(jugador, enemigo);
      
    }
  },[skills])




  return (
    <div className={isActive ? 'active' : 'inactive'}>
      {showMessage && <p>Hola, gracias por probar este juego. Este proyecto se realiza con el fin de probar habilidades y el humor que se utiliza no tiene el objetivo de ofender a nadie.</p>}
    </div>
  );
};

export default Intro;
