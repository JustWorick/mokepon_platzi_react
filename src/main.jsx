import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GlobalStateProvider } from './components/globalState.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStateProvider>
      <App /> 
    </GlobalStateProvider>
  </React.StrictMode>,
)
