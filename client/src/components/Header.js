import React, { useEffect, useState } from "react";
import logo from "../pictures/blue-guest.jpg";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
import axios from "axios";
import foto from "../pictures/wellcome.jfif";


export default function Header({ isLoggedIn,setIsLoggedIn }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [toLog, setToLog] = useState("closed");
  const [form, setValues] = useState({
    nickname: "",
    password: "",
  });
  console.log("header",isLoggedIn)
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(()=>{
    setToLog("closed")
  },[isLoggedIn])

  const handleChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    navigate("/Registry");
  };
  const openScroll = () => {
    setToLog("open");
  };
  const closeScroll = () => {
    setToLog("closed");
    setMessage("")
  };
  const LOGIN = (e) => {
    e.preventDefault();
    console.log(e.target);
    axios
      .post(`http://localhost:4040/users/login`, {
        nickname: form.nickname,
        password: form.password,
      })
      .then((res) => {
        setMessage(res.data.message);

        if (res.data.ok) {
          // here after login was successful we extract the email passed from the server inside the token
          let decodedToken = jose.decodeJwt(res.data.token);
          // and now we now which user is logged in in the client so we can manipulate it as we want, like fetching data for it or we can pass the user role -- admin or not -- and act accordingly, etc...
          console.log(
            "Email extracted from the JWT token after login: ",
            decodedToken.email
          );

          localStorage.setItem("token", JSON.stringify(res.data.token));
          closeScroll()
          
          setTimeout(() => {
          setMessage("") 
          setIsLoggedIn(true)            
          navigate("/")},800);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setValues({ ...form, nickname: "", password: "" })
    setToLog("closed")
    console.log(isLoggedIn)
  }, []);

  return (
    <div className="head">
      {!isLoggedIn 
      ? (
        <div id="logobord">
          <img src={logo} alt="logo" className="logo" />
        </div>
      ) 
      : (
        <div id="logobord">
          <div className="ava">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false)
                navigate("/");
              }}
            >
              LOG OUT
            </button>
          </div>
        </div>
      )}
      {!isLoggedIn 
      ? (
      <div className="move">
        <h1 id="littleH">Free library </h1>
        <div className="scroll">
          <div className={toLog}>
            <button id="b2" onClick={closeScroll}>
              X
            </button>
            <form onSubmit={LOGIN} onChange={handleChange} id="scrollIn">
              <input placeholder="nickname" name="nickname" />
              <input type="password" name="password" placeholder="password"  />
              <button id="b1">Login</button>
              <p>{message}</p>
            </form>
          </div>
        </div>
      </div>)
      :(
      <div className="move">
      <h1 id="bigH">Free library </h1>
      </div>)}

      {!isLoggedIn 
      ? (
        <div className="form">
          <div className="user">
            <p>Enter the temple of wisdom</p>
            <button onClick={openScroll}>LOG IN</button>
          </div>
          <div className="guest">
            <p>join to brotherhood</p>
            <button onClick={handleClick}>Registry</button>
          </div>
        </div>
      ) 
      : (
        <div className="foto">
          <img src={foto} />
        </div>
      )}
    </div>
  );
}
