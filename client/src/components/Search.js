import React from "react";
import{useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom"

export default function List({search}){
    const [title,setTitle]=useState([])
    const [autor,setAutor]=useState([])
    const [imgUrl,setImgUrl]=useState([])
    const [id,setId]=useState("")

useEffect(() => {
   const searchFunc = () => {
    if(search) {
        axios 
        .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&printType=books&langRestrict=en&maxResults=40&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
        .then(otvet=>{
            console.log(otvet)
            otvet.data.items.map(book => {
                setTitle([...title,book.volumeInfo.title])
                setAutor([...autor,book.volumeInfo.authors])
                setImgUrl([...imgUrl,book.volumeInfo.imageLinks.smallThumbnail])
                setId([...id,book.id]) 
             });
            
            })
        .catch(error=>{
                console.log(error)
            })
    }
   } 
   searchFunc()
  
}, [search])


 const page =()=>{
     title.map((el,i)=>{
    return    <Link to="/Libro/:title">
        <div>
    <p>`{autor}</p>
    <img src={imgUrl} alt="cover"/>
    <h2>{title}</h2>
    </div></Link>
     })

 }
 





    return (
               <section>
                 {page()}

               </section>


    )

}



       
