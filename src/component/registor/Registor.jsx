import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { server, context } from "../../main";
import { toast } from "react-hot-toast";


function Registor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setisAuthenticated, loading, setLoading } =
    useContext(context);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(name, email, password);
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/user/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", //by default this is send by  axious
          },
          withCredentials: true,
        }
      );

      toast.success(data.messgae);
      setisAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.messgage);
      console.log(error);
      setisAuthenticated(false);
      setLoading(false);
    }
  }

  if(isAuthenticated){
    return <Navigate to={"/"} />
  }

  return (
    <>
      <div className="first">
        <section>
          <form className="second" onSubmit={handleSubmit}>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="name"
              name="name"
              required
            ></input>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="email"
              name="email"
              required
            ></input>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="password"
              name="password"
              required
            ></input>
            <button type="submit">Sign up</button>
            <h3>Or</h3>
            <Link to="/login">Login</Link>
          </form>
        </section>
      </div>
    </>
  );
}

export default Registor;
