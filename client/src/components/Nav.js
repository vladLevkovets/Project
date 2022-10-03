import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useRecoilState } from "recoil"

export default  function Nav ({isLoggedIn}) {







    return <div id="nav">
           
               
                <NavLink to="/">
                   <p> Home</p>
                    </NavLink>
                <NavLink to="/Library">
                   <p> Library</p>
                    </NavLink>
                <NavLink to="/Admin">
                    <p>Admin</p>
                    </NavLink>
                {isLoggedIn &&   
                <NavLink to="/Profile">
                    <p>Profile</p>
                    </NavLink>
                }

            
            </div>



}