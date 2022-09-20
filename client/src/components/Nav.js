import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useRecoilState } from "recoil"

export default  function Nav () {







    return <div>
                <NavLink to="/">
                   <p> Home</p>
                    </NavLink>
                <NavLink to="/Library">
                   <p> Library</p>
                    </NavLink>
                {/* <NavLink> */}
                    <p>Categories</p>
                    {/* </NavLink> */}
                {/* <NavLink> */}
                    <p>Comments</p>
                    {/* </NavLink> */}
            </div>



}