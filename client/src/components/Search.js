import React from "react";
import{useState,useEffect} from 'react'
import axios from "axios";
import {Link,useNavigate,useParams} from "react-router-dom"
import { useRecoilState } from 'recoil'
import { titleState, authorState,idState } from '../State.js'
// import dveri from '../public/log_logout_door_1563.png'
import doorPic from '../pictures/log_logout_door_1563.png'
export default function List(){
    const [tit,setTit]=useState("")
const [title,setTitle]=useRecoilState(titleState)  
const navigate = useNavigate()
const [page,setPage]=useState([])
const [id,setId]=useRecoilState(idState)
let params=useParams()



   const searchFunc = () => {
     axios 
        .get(`https://www.googleapis.com/books/v1/volumes?q=${params.title}&printType=books&langRestrict=en&maxResults=40&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
        .then(otvet=>{
            console.log(otvet)
            setPage([...otvet.data.items])
            
            })
        .catch(error=>{
                console.log(error)
            })
    } 
   
useEffect(() => {
    searchFunc()
},[params])



let ALF=["A","B","C",'D',"E","F","G","H",'I',"G",'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
function  alfabet (){
    return ALF.map((e,i)=>{
       return <Link to={`/Authors/${e}`} key={i}>{e}</Link>
    })
}

const handleChange=(e)=>{
    setTit(e.target.value)
    
  }

  const search=(e)=>{
    e.preventDefault()
  setTitle(tit)
  navigate(`/Search/${tit}`)
} 
const printList=()=>{
    if (page.length > 0) {return page.map((book,i)=>{
                return <div key={i}>
                <Link to={`/Libro/${book.id}`} >
                 <div>
                   <p> {`${book.volumeInfo.authors}  ${book.volumeInfo.title}`}</p>
                   <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="cover"/>
                   <p>{`${book.volumeInfo.categories}`}</p>
                 </div>
                 </Link>
                 </div>
              })}
              console.log(page);
      }


 return (
    <div>
        <div>
        
        <Link to="/Library"><img src={doorPic} alt="back" class="dveri"/></Link>
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
    )

}



       
