import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container-fluid'>
        <Intro />
        <PantallaPrincipal />
        <PantallaSelect />
        <PantallaMenuJugador />
        <PantallaCombate />
      </div>
    </>
  )
}

export default App
