import { Link } from "react-router-dom";
import "./header.scss";
import { useContext } from "react";
import { context, server } from "../../main";
import axios from "axios";
import { toast } from "react-hot-toast";

function Header() {

  const {isAuthenticated ,setisAuthenticated,loading ,setLoading}=useContext(context);


  const logouthandler=async()=>{
    setLoading(true);
    try {

      const {data}= await axios.get(`${server}/user/Logout`,{
        withCredentials :true,
      })

      toast.success(data.message)
      setisAuthenticated(false);
      setLoading(false);
      

      
    } catch (error) {

      toast.error(error.response.data.messgage);
      console.log(error);
      setisAuthenticated(true);
      setLoading(false);

      
    }
  }
  
  return (
    <div className="container">
      <div className="wrapper">


        <div className="right">
          <h2>Todo App.</h2>
        </div>

        <div className="left">
          <Link to={"/"}>Home</Link>
          <Link to={"/profile" }>Profile</Link>
          {
            isAuthenticated?<button onClick={logouthandler} disabled={loading}>Logout</button>:<Link to={"/Login" }>Login</Link>
          }

          
        </div>
      </div>
    </div>
  );
}

export default Header;
