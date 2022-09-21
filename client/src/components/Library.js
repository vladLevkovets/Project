import React, {useState, useEffect } from 'react'
import {Link,useNavigate} from "react-router-dom"
import Search from "./Search"
import axios from 'axios'

function Library() {
const [tit,setTit]=useState("")
const [title,setTitle]=useState("")  
const navigate = useNavigate()

const findList=()=>{
    axios 
         .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&printType=books&langRestrict=en&maxResults=40&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
         .then(otvet=>{
           console.log(otvet)
           setTitle(otvet.data.items[0].volumeInfo.title)
        //    setAutor(otvet.data.items[0].volumeInfo.authors)
        //    setDesc(otvet.data.items[0].volumeInfo.description)
        //    setCat(otvet.data.items[0].volumeInfo.categories)
        //    setImgUrl(otvet.data.items[0].volumeInfo.imageLinks.smallThumbnail)
        //    setId(otvet.data.items[0].id)
       })
       .catch(error=>{
           console.log(error)
       })
       
}

useEffect(()=>{
findList()},[]
)

let ALF=["A","B","C",'D',"E","F","G","H",'I',"G",'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
function  alfabet (){
    return ALF.map((e,i)=>{
       return <Link to="/Library/*" key={i}>{e}</Link>
    })
}
const handleChange=(e)=>{
  setTit(e.target.value)
  
}
const search=(e)=>{
    e.preventDefault()
  setTitle(tit)
  
}



return (
    
     <div>
        <div>
         <Link to="/Library"><img src="./log_logout_door_1563.png" alt="back" id="dveri"/></Link>
         
         {alfabet()}
         </div>
          <form onSubmit={search}>
           <input onChange={handleChange}/>
           <button>Search</button>
           </form>
           <Search search={title}/>
           
     </div>
     
    
    ); 
}

export default Library