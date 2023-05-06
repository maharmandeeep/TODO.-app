import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import './App.scss'
import Header from "./component/header/Header"


import Home from './component/home/Home'
import Profile from './component/profile/Profile'
import Login from './component/Login/Login'
import Registor from './component/registor/Registor'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect,useContext } from 'react'
import { server ,context} from './main'
import axios from 'axios'




function App() {

       const {loding,user,setUser,setisAuthenticated}=useContext(context);
   useEffect(
    ()=>{
       axios.get(`${server}/user/me`,{
        withCredentials:true
       }).then((res)=>{
         setUser(res.data.user);
         setisAuthenticated(true)
       }).catch((error)=>{
         
             setUser({});
             setisAuthenticated(false);  
       })

       

    }
    ,[])

  

  return (
  
  
    
    <Router>
   
    <Header ></Header>

    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registor' element={<Registor/>}/>
      
        
    </Routes>
    <Toaster />


    </Router>

    
  )
}

export default App
