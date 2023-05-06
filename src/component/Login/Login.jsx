import { Link, Navigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { server, context } from "../../main";
import { toast } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setisAuthenticated, loading, setLoading } =
    useContext(context);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/user/Login`,
        {
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

      <Navigate to={"/"} />;
    } catch (error) {
      toast.error(error.response.data.messgage);
      console.error(error);
      setisAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="first">
        <section>
          <form className="second" onSubmit={handleClick}>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="email"
              name="email"
            ></input>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="password"
              name="password"
            ></input>
            <button disabled={loading} type="submit">
              Login
            </button>
            <h3>Or</h3>
            <Link to="/registor">Sign Up</Link>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;
