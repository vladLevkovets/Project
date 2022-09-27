import React,{useEffect, useState} from 'react'
import logo from "../pictures/blue-guest.jpg"
import {useNavigate} from 'react-router-dom'
import * as jose from 'jose'
import axios from "axios";
import foto from "../pictures/wellcome.jfif"
import ava from "../pictures/openblue.jfif"


export default function Header({isLoggedIn}){
    console.log({isLoggedIn})
    const [ message, setMessage ] = useState('')
    const navigate=useNavigate()
    const [toLog,setToLog]=useState("closed")
    const [form, setValues] = useState({
        nickname: "",
        password: "",
      })

    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));


const handleChange=(e=>{
    setValues({ ...form, [e.target.name]: e.target.value });
})

const handleClick=(e=>{
    navigate("/Registry")
})
const openScroll=()=>{
    setToLog("open")
}
const closeScroll=()=>{
    setToLog("closed")
}
const LOGIN=(e)=>{
    e.preventDefault();
    console.log(form)
   axios
   .post(`http://localhost:4040/users/login`, {
    nickname: form.nickname,
    password: form.password}
   )
   .then (res=>{
    setMessage(res.data.message)
  
     if (res.data.ok) {
    // here after login was successful we extract the email passed from the server inside the token 
    let decodedToken = jose.decodeJwt(res.data.token)
    // and now we now which user is logged in in the client so we can manipulate it as we want, like fetching data for it or we can pass the user role -- admin or not -- and act accordingly, etc...
    console.log("Email extracted from the JWT token after login: ", decodedToken.userEmail)
    
    localStorage.setItem("token", JSON.stringify(res.data.token));
    // setIsLoggedIn(true);;
       
      navigate("/");
    
   }
}
)
   .catch (error=> {
  console.log(error);
  })
}




return <div className="head">
        {isLoggedIn===false?
        <div id="logobord">
            <img src={logo} alt="logo" className="logo"/>
        </div>
        :<div id="logobord">
            <div className="ava">
            <button onClick={() => {
					localStorage.removeItem("token");
					navigate('/')
				}} >LOG OUT</button>
            </div>
        </div>
        }
            <div className="move">
                <h1>Free library </h1>
                <div className= "scroll">
                  <div className={toLog}>
                     <button id="b2" onClick={closeScroll}>X</button>
                     <form onSubmit={LOGIN} onChange={handleChange} id="scrollIn" >
                       <input placeholder='nickname' name="nickname" />
                       <input type="password" name="password" placeholder='password'/>
                       <button id="b1">Login</button>
                       <p>{message}</p>
                     </form>
                  </div>    
                </div>
            </div>
         { isLoggedIn===false ? 
        <div className="form">
             <div className="user" >
                   <p>Enter the temple of wisdom</p>
                    <button onClick={openScroll}>LOG IN</button>               
             </div>
             <div className="guest">
                     <p>join to brotherhood</p>
                     <button onClick={handleClick}>Registry</button>
             </div>
        </div>
        :<div className="foto">
          <img src={foto} />
        </div>
        }   
 </div >
}