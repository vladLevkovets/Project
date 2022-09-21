import { NavLink } from "react-router-dom"


export default function Header(){






    return <div className="head">
        <img alt="logo"/>
        <h1>free library </h1>
        <img alt="avatar"/>
        <p>enter the temple of wisdom</p>
        {/* <NavLink to={"/login"}> */}
            <button>LOG IN</button>
            {/* </NavLink> */}
        <p>join our brotherhood</p>
        {/* <NavLink to={"/registry"}> */}
            <button>registry</button>
            {/* </NavLink> */}
        </div >
}