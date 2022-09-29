import { Link,useNavigate } from "react-router-dom";
import {useState} from 'react'
import doorPic from '../pictures/log_logout_door_1563.png'

export default function EmptySearch () {
    const [tit,setTit]=useState("")
    const navigate=useNavigate()

    const handleChange=(e)=>{
        setTit(e.target.value)
        
      }
      const search=(e)=>{
          e.preventDefault()
        navigate(`/Search/${tit}`)
      }

return <div>
        
<form onSubmit={search} className="libSerch" >
<Link to="/Library" ><img src={doorPic} alt="back" className="dveri"/></Link>   
 <input onChange={handleChange}/>
 <button>Search</button>
 </form>
 <section className="emptyPage">
 <div id="nothing">  
 <h3>NOTHING </h3>
 </div> 
 <div id="repeat">
 <h3> please enter a new request - author's name or book title</h3>
 </div>
 </section>
 
</div>


}