import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {URL} from "../config.js"

const Registry = ({setIsLoggedIn}) => {
  const [form, setValues] = useState({
    email: "",
    password: "",
    password2: "",
    nickname: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
    if (form.password === form.password2) {
      axios
        .post(`${URL}/users/add`, {
          email: form.email,
          password: form.password,
          nickname: form.nickname,
        })
        .then((res) => {
          setMessage(res.data.message);
          console.log(res);
          if (res.data.ok) {
            localStorage.setItem("token", JSON.stringify(res.data.token));
            
            setTimeout(() => {
              setIsLoggedIn(true)
              navigate("/");
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div id="reg">
      <div id="message">
        <p>{message}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="form_container"
      >
        <label>Email</label>
        <input placeholder="required" type="email" name="email" />

        <label>nickname</label>
        <input placeholder="required" name="nickname" />

        <label>Password</label>
        <input placeholder="required" type="password" name="password" />

        <label>Repeat password</label>
        <input placeholder="required" type="password" name="password2" />

        <button>register</button>
        <div className="message"></div>
      </form>
    </div>
  );
};

export default Registry;
