import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import { useRecoilState } from 'recoil'
import { titleState, authorState,idState } from '../State.js'

const BookViewer = () => { 
    const [title,setTitle]=useRecoilState(titleState)
    const [id,setId]=useRecoilState(idState)
    const [autor,setAutor]=useState("")
    const [desc,setDesc]=useState("")
    const [cat,setCat]=useState("")
    const [imgUrl,setImgUrl]=useState("")
    
    
    useEffect(()=>{
    axios 
      .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${id}&printType=books&langRestrict=en&maxResults=40&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
      .then(otvet=>{
        console.log(otvet)
        setTitle(otvet.data.items[0].volumeInfo.title)
        setAutor(otvet.data.items[0].volumeInfo.authors)
        setDesc(otvet.data.items[0].volumeInfo.description)
        setCat(otvet.data.items[0].volumeInfo.categories)
        setImgUrl(otvet.data.items[0].volumeInfo.imageLinks.smallThumbnail)
        setId(otvet.data.items[0].id)
    })
    .catch(error=>{
        console.log(error)
    })
    },[])

    return (
    <div>
    <p>`{autor}</p>
    <h2>{title}</h2>
    <img src={imgUrl} alt="cover"/>
    <p>{cat}</p>
    <p>{desc}</p>
     <iframe src='https://play.google.com/books/reader?id=XGgheRQ4GP0C&pg=GBS.PP1&hl=uk'/>

   </div>)

    }
 export default BookViewer