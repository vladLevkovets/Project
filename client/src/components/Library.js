import React from 'react'


import { Link} from "react-router-dom"
function Library() {
let ALF=["A","B","C",'D',"E","F","G","H",'I',"G",'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
function  alfabet (){
    return ALF.map((e,i)=>{
       return <Link to="/Library/*" key={i}>{e}</Link>
    })
}

return (
    
     <div>
        <div>
         <Link to="/Library"><img src="./log_logout_door_1563.png" alt="back" id="dveri"/></Link>
         
         {alfabet()}
         </div>
          <form>
           <input/>
           <button>Search</button>
           </form>
           <div><h2>LIST OF BOOCKS ASCEND BY TIME (NEWEST)(mb 20 per page)</h2></div>
         
     </div>
     
    
    ); 
}

export default Library