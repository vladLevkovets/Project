import React from 'react'
export default function footer({isLoggedIn}){

return <div className={isLoggedIn?"footerB":"footerA"}>
        
           
           <h2>Don't go away , try to find something interesting one more time</h2>
           <p>NOT ALL rights reserved</p> 
           
           
       </div>

}