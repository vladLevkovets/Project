import axios from 'axios'
import React ,{useState, useEffect } from 'react'
import {Link,useParams} from "react-router-dom"



function Admin() {
const[books,setBooks]=useState([])
const[users,setUsers]=useState([])
const[text,setText]=useState("answer")
const[form,setForm]=useState({email:["vl.vladisla@gmail.com","projectlibraryserver@gmail.com","kornasnorge@gmail.com"],nickname:["Vlad",'Server',"Pawel"],subject:"test letter from library",message:"there is first letter from my server"})
let params=useParams()    

const USERS = async ()=>{
   try { 
       const res= await axios.get('http://localhost:4040/users/find',form)
        console.log(res)
        // setMessage(res.message)
   }
   catch(error){
    console.log(error)
   } 
}

const HandleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
}




const BOOKS = async ()=>{
    try { 
    const res= await axios.get ()
    
       
   }
   catch(error){
       console.log(error)
   } 
}

const Add = async()=>{


}
   
const Del = async()=>{




}
const Ban =async()=>{



}

const Up = async()=>{

}

const Mail = async()=>{
   try{
     console.log("form",form)
     const res = await axios.post(`http://localhost:4040/users/mail`,form)
        setText(res.data.message)
        
        
        
    
    }catch(error) {
        console.log(error);
      }
}

return (
    <>
    <section>
     <ul>
        {/* {PrintList(users)} */}
     </ul>
    </section>
    <section>
    <div>
     <input/><p></p>    
    </div> 
    <div><button onClick={Mail}>SEND</button>
        </div> 
     <div>
        <h1>{text}</h1>
        </div>     
    </section>
     <section>
        {/* {PrintList(books)} */}
    </section>   
         
</>)


}
export default Admin       