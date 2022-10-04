import axios from 'axios'
import React ,{useState, useEffect } from 'react'
import {Link,useParams} from "react-router-dom"
import {URL} from "../config.js"


function Admin() {
const[books,setBooks]=useState([])
const[users,setUsers]=useState([])
const[list,setList]=useState([])
const[text,setText]=useState("answer")
const[form,setForm]=useState({emails:["vl.vladisla@gmail.com","projectlibraryserver@gmail.com"],nicknames:["vlad","server"],subject:"test letter from library",message:"there is personal letter from my server to each user from array ) "})

let params=useParams()    

const List = async ()=>{
   try { 
       const res= await axios.get(`${URL}/users/find`,form)
        console.log(res.data.list)
        setList(res.data.list)
   }
   catch(error){
    console.log(error)
   } 
}
useEffect(()=>{
    List()
},[])

const printList=(arr)=>{
  return  arr.map((user,i)=>{
    return <li key={i}>
          <input type="checkbox" name={user.nickname} className="choose"/>
          <div className={user.status==="admin" ?"blue": user.status==="banned"?"red":"yellow"}>
            <h4>{user.nickname}</h4>
            <p>{user.email}</p>
          </div>
         </li>
         })
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
     const res = await axios.post(`${URL}/users/mail`,form)  
     console.log(res.data.message)
     if (res.data.ok){
     setText(res.data.message)
      setTimeout(() => {
        setText(" ")
      }, 2000);  
     }    
        
    
    }catch(error) {
        console.log(error);
      }
}

return (
    <>
    <section id="spisok">
        <div><input type="checkbox"/><h3>Users</h3></div>
     <ul>
        {printList(list)}
     </ul>
    </section>
    <section id="workPlace">
    <div >
     <input type="radio"/><p>USER</p> <input/> <input type="radio"/> <p>BOOK</p><input type="radio"/><p>Category</p> 
    </div> 
    <div><button onClick={Mail}>GO</button>
        </div> 
     <div id="usersActions">
     <input type="radio" name="delete"/><p>Delete</p>
     <input type="radio" name="ban"/><p>Ban</p>
     <input type="radio" name="mail"/><p>Mail</p>
     </div>
     <div id="booksActions">
     <input type="radio" name="add"/><p>Add</p>
     <input type="radio" name="up"/><p>Update</p>
     <input type="radio" name="del"/><p>Delete</p> 
     </div>
     <div>
        <h1>{text}</h1>
        </div>     
    </section>
     <section id="data">
        <h3>Books</h3>
        <ul>
            {printList(books)}
        </ul>
        
    </section>   
         
</>)


}
export default Admin       