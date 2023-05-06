import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
 


export const server="https://nodejs-todoapp-wi47.onrender.com/api/v1";


export const context=createContext({isAuthenticated:false});


const AppWrapper=()=>{

    const [isAuthenticated,setisAuthenticated] =useState(false);
    const [loading ,setLoading]=useState(false);
    const [user ,setUser]=useState({});

  return (
    <context.Provider  value={{isAuthenticated ,setisAuthenticated,loading ,setLoading,user ,setUser}}> 
      <App />
    </context.Provider>
  )

}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
