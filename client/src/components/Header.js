import React from 'react'
import { NavLink } from "react-router-dom"
import ava from "../pictures/young-people-icon-23.jpg"
import logo from "../pictures/blue-guest.jpg"

export default function Header(){






    return <div className="head">
        <div id="logobord">
        <img src={logo} alt="logo" className="logo"/>
        </div>
        <h1>free library </h1>
        <div className="form">
        <div className="user" >
        {/* <img src={ava} alt="avatar"/> */}
        <div >
        <p>Enter the temple of wisdom</p>
        {/* <NavLink to={"/login"}> */}
            <button>LOG IN</button>
            {/* </NavLink> */}
        </div>
        </div>
        <div className="guest">
        <p>join to brotherhood</p>
        {/* <NavLink to={"/registry"}> */}
            <button>registry</button>
            {/* </NavLink> */}
        </div>
        </div>    
        </div >
}