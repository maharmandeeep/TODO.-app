import "./home.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { context, server } from "../../main";
import { toast } from "react-hot-toast";
import List from "./titleList";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, settitle] = useState("");
  const [discription, setdiscription] = useState("");
  const [mydata, setmydata] = useState([]);
  const [refresh,setrefresh]=useState(false);

  const {isAuthenticated}=useContext(context)

  const updatehandler = async(id) => {
    const {data}= await axios.put(`${server}/task/${id}`,{},{withCredentials:true,})
    toast.success(data.message);
    setrefresh(!refresh)
  };
  const deletehandler = async(id) => {
    const {data}= await axios.delete(`${server}/task/${id}`,{withCredentials:true,})
    toast.success(data.message);
    setrefresh(!refresh)
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/task/newtask`,
        {
          title,
          discription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      settitle("");
      setdiscription("");
      setrefresh(!refresh)
    } catch (error) {
      toast.error(error.response.data.messgage);
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/getmytask`, {
        withCredentials: true,
      })
      .then((res) => {
        setmydata(res.data.userdata);
      })
      .catch((error) => {
        toast.error("login first");

        console.log(error);
      });
  }, [refresh]);


  if(!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <div className="first">
      <div className="box">
        <form className="second" onSubmit={handleClick}>
          <input
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
            type="text"
            placeholder="title"
            name="email"
          ></input>
          <input
            value={discription}
            onChange={(e) => {
              setdiscription(e.target.value);
            }}
            type="text"
            placeholder="discription"
            name="password"
          ></input>
          <button type="submit">ADD task</button>
        </form>

        <div className="list">
          {mydata.map((e) => (
            <>
              <List
                title={e.title}
                discription={e.discription}
                iscompleted={e.iscompleted}
                updatehandler={updatehandler}
                deletehandler={deletehandler}
                id={e._id}
                key={e._id}
              ></List>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
