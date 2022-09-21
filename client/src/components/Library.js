import React, {useState, useEffect } from 'react'
import {Link,useNavigate} from "react-router-dom"
import { useRecoilState } from 'recoil'
import { titleState, authorState,idState } from '../State.js'

import axios from 'axios'

function Library() {
const [tit,setTit]=useState("")
const [title,setTitle]=useRecoilState(titleState)  
const navigate = useNavigate()
const [page,setPage]=useState([])
const [id,setId]=useRecoilState(idState)

var arr=[]
const findList=()=>{
    axios 
         .get(`https://www.googleapis.com/books/v1/volumes?q=orderBy=newest&printType=books&langRestrict=en&maxResults=40&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
         .then(otvet=>{
           console.log(otvet)
           setPage([...otvet.data.items])
          //  setTitle(otvet.data.items.volumeInfo.title)
          //  setAutor(otvet.data.items.volumeInfo.authors)
          //  setCat(otvet.data.items.volumeInfo.categories)
          //  setImgUrl(otvet.data.items.volumeInfo.imageLinks.smallThumbnail)
          
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
       return <Link to="/Library/:autors" key={i}>{e}</Link>
    })
}
const handleChange=(e)=>{
  setTit(e.target.value)
  
}
const search=(e)=>{
    e.preventDefault()
  setTitle(tit)
  findList(`intitle:${tit}`)
}

const printList=()=>{
  
  console.log(page)
 return page.map((book,i)=>{
   return <div key={i}>
   <Link to="/Libro" onClick={setId(book.id)}  id={book.id}>
    <div>
      <p> {`${book.volumeInfo.authors}  ${book.volumeInfo.title}`}</p>
      <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="cover"/>
      <p>{`${book.volumeInfo.categories}`}</p>
    </div>
    </Link>
    </div>
 })

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
           <section>
            {printList()}
           </section>
           
     </div>
     
    
    ); 
}

export default Library