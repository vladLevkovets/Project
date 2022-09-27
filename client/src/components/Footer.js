import React, { useEffect,useState } from 'react'
export default function Footer({isLoggedIn,setIsLoggedIn}){
    console.log("footer",isLoggedIn)
// const [type,setType]=useState(null)

// useEffect(()=>{
//     setType(isLoggedIn)
// },[])

return <div>
    {
    isLoggedIn===true
    
    ? (<div className="footerB">
    <h2 id="footH">Don't go away , try to find something interesting one more time</h2>
           <p>NOT ALL rights reserved</p> 
    </div>)
    : ( <div className="footerA">
        <h2 id="footH">Don't go away , try to find something interesting one more time</h2>
        <p>NOT ALL rights reserved</p> 
    </div>)      
    }</div>

}    