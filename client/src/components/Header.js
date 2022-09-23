import React from 'react'
import { NavLink } from "react-router-dom"


export default function Header(){






    return <div className="head">
        <img alt="logo"/>
        <h1>free library </h1>
        <div className="form">
        <div className="user" >
        <img alt="avatar"/>
        <div >
        <p>enter the temple of wisdom</p>
        {/* <NavLink to={"/login"}> */}
            <button>LOG IN</button>
            {/* </NavLink> */}
        </div>
        </div>
        <div className="guest">
        <p>join to our brotherhood</p>
        {/* <NavLink to={"/registry"}> */}
            <button>registry</button>
            {/* </NavLink> */}
        </div>
        </div>    
        </div >
}