import React from "react";
import{useState,useEffect} from 'react'
import axios from "axios";
import {Link,useNavigate,useParams} from "react-router-dom"
import { useRecoilState } from 'recoil'
import { titleState, authorState,idState } from '../State.js'
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
        .get(`https://www.googleapis.com/books/v1/volumes?q=${params.title}&printType=books&maxResults=32&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
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



// let ALF=["A","B","C",'D',"E","F","G","H",'I',"G",'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
// function  alfabet (){
//     return ALF.map((e,i)=>{
//        return <Link to={`/Authors/${e}`} key={i}>{e}</Link>
//     })
// }

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
                <Link to={`/Libro/${book.id}`} className="toBook" >
    <div className="cellS">
      <div className="leftS">
      <p className="discr">Author:</p>  
      <p>{`${book.volumeInfo.authors}`}</p>
      <p className="discr">Title:</p>
      <p>{`${book.volumeInfo.title}`}</p>
      <p className="discr">Category:</p>
      <p>{`${book.volumeInfo.categories}`}</p>
    </div>
      <div className="rightS">
      <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="cover" className="coverS"/>
      </div>
    </div>
    </Link>
                 </div>
              })}
              console.log(page);
      }


 return (
    <div>
        
        {/* <Link to="/Library"><img src={doorPic} alt="back" class="dveri"/></Link> */}
         {/* {alfabet()} */}
         <form onSubmit={search} id="libSerch">
         <Link to="/Library" ><img src={doorPic} alt="back" className="dveri"/></Link>
           <input onChange={handleChange}/>
           <button>Search</button>
           </form>
           
           <section className="bigPage">
            {printList()}
           </section>
           
     </div>
    )

}



       
