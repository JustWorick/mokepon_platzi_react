import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { crearInvocaciones } from '../components/invocacion.js';
import { crearHabilidades } from '../components/habilidades.js';
import { Jugador } from '../components/jugador.js';

const Intro = ({ isActive }) => {
  const { toggleComponent, skills, setSkills, invocaciones, setInvocaciones, jugador, enemigo, setEnemigo } = useContext(GlobalStateContext);

  const [showMessage, setShowMessage] = useState(false);
  const [bandera1, setBandera] = useState(false);

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
      jugador.modificarInvocacionElegida(invocaciones[0])
      jugador.invocacionElegida.habilidades.push(skills[0])
      console.log('Se Agregaron las Skills a : ' + jugador.nombre);
      console.log(jugador);

      enemigo.modificarInvocacionElegida(invocaciones[1])
      enemigo.invocacionElegida.habilidades.push(skills[1])
      console.log('Se Agregaron las Skills a : ' + enemigo.nombre);
      console.log(enemigo);

      setBandera(true)
    }
  },[skills])

    // cambiamos el caster y el objetivo de ambos y por fin a probar las skills
  useEffect(() => {
    jugador.invocacionElegida.habilidades[0].objetivo = enemigo.invocacionElegida
    jugador.invocacionElegida.habilidades[0].caster = jugador.invocacionElegida

    enemigo.invocacionElegida.habilidades[0].objetivo = jugador.invocacionElegida
    enemigo.invocacionElegida.habilidades[0].caster = enemigo.invocacionElegida
    console.log(jugador, enemigo);
  },[bandera1, setBandera])


  return (
    <div className={isActive ? 'active' : 'inactive'}>
      {showMessage && <p>Hola, gracias por probar este juego. Este proyecto se realiza con el fin de probar habilidades y el humor que se utiliza no tiene el objetivo de ofender a nadie.</p>}
    </div>
  );
};

export default Intro;
