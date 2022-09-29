import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useRecoilState } from "recoil"

export default  function Nav () {







    return <div id="nav">
           
       
                <NavLink to="/">
                   <p> Home</p>
                    </NavLink>
                <NavLink to="/Library">
                   <p> Library</p>
                    </NavLink>
                {/* <NavLink> */}
                    <p>Categories</p>
                    {/* </NavLink> */}
                <NavLink to="/Profile">
                    <p>Profile</p>
                    </NavLink>
            </div>



}