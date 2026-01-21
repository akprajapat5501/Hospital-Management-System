import React,{ createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


export const Context = createContext({isAuthenticated: false});

// eslint-disable-next-line react-refresh/only-export-components
const AppWrapper = () =>{
  const[isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});

  return (
    <Context.Provider value = {{isAuthenticated, setIsAuthenticated, admin, setAdmin}} >
      <App />
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper  />
  </React.StrictMode>,
)
