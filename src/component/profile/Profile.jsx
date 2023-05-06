import { useContext } from "react";
import "./Profile.scss"
import { context } from "../../main";



const Profile=()=>{

    const {isAuthenticated ,setisAuthenticated,loading ,setLoading,user,setUser}=useContext(context);

    return(<>
    <div>
        <h1>{user?.name}</h1>
        <h2>{user?.email}</h2>
    </div>
    </>)
}



export default Profile;