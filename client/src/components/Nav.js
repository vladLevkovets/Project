import { NavLink } from "react-router-dom"
import * as jose from "jose";
import { useState } from "react";

export default  function Nav ({isLoggedIn,status}) {
    
   
    

    return <div id="nav">
           
               
                <NavLink to="/">
                   <p> Home</p>
                    </NavLink>
                <NavLink to="/Library">
                   <p> Library</p>
                    </NavLink>
                <NavLink to="/Search">
                   <p> Search</p>
                    </NavLink>   
                {(status==="admin" ) &&  
                <NavLink to="/Admin">
                    <p>Admin</p>
                    </NavLink>}
                {isLoggedIn &&   
                <NavLink to="/Profile">
                    <p>Profile</p>
                    </NavLink>
                }

            
            </div>



}