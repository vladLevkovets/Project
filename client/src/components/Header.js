import React,{useState} from 'react'
import { NavLink } from "react-router-dom"
import scroll from "../pictures/imgonline-com-ua-Transparent-backgr-scroll.png"
import logo from "../pictures/blue-guest.jpg"
import {useNavigate} from 'react-router-dom'

export default function Header(){
    const navigate=useNavigate()
    const [toLog,setToLog]=useState("closed")
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
    e.prevenentDefault()
    navigate('/')
}



    return <div className="head">
        <div id="logobord">
            <img src={logo} alt="logo" className="logo"/>
        </div>
             <h1>Free library </h1>
             <div className= "scroll">
             <div className={toLog}>
             <button id="b2" onClick={closeScroll}>X</button>
                <form onSubmit={LOGIN} id="scrollIn" >
                  <input placeholder='nickname'/>
                  <input type="password" placeholder='password'/>
                  <button id="b1" >Login</button>
                  </form>
                  
             </div>
             </div>
        <div className="form">
             <div className="user" >
       
                 <div >
                    <p>Enter the temple of wisdom</p>
                    <button onClick={openScroll}>LOG IN</button>
                </div>
             </div>
             <div className="guest">
                     <p>join to brotherhood</p>
                     <button onClick={handleClick}>Registry</button>
             </div>
        </div>    
 </div >
}