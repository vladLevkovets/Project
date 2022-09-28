import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link,useNavigate, useParams} from "react-router-dom"
import {useRecoilState} from 'recoil'
import {idState} from '../State.js'
import doorPic from '../pictures/log_logout_door_1563.png'

const BookViewer = () => { 
    const [tit,setTit]=useState("")
    const [title,setTitle]=useState("")
    const [autor,setAutor]=useState("")
    const [desc,setDesc]=useState("")
    const [cat,setCat]=useState("")
    const [imgUrl,setImgUrl]=useState("")
    const [date,setDate]=useState("")
    const [size,setSize]=useState("")
    const [publ,setPubl]=useState("")
    const [num,setNum]=useState("")
    const navigate = useNavigate()
    let params=useParams()
    
    useEffect(()=>{
      console.log(`${params.id}`)
    axios 
      .get(`https://www.googleapis.com/books/v1/volumes?q="${params.id}"&printType=books&maxResults=40&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
      .then(otvet=>{
        console.log(otvet)
        setTitle(otvet.data.items[0].volumeInfo.title)
        setAutor(otvet.data.items[0].volumeInfo.authors)
        setDesc(otvet.data.items[0].volumeInfo.description)
        setCat(otvet.data.items[0].volumeInfo.categories)
        setImgUrl(otvet.data.items[0].volumeInfo.imageLinks.smallThumbnail)
        setDate(otvet.data.items[0].volumeInfo.publishedDate)
        setSize(otvet.data.items[0].volumeInfo.pageCount)
        setPubl(otvet.data.items[0].volumeInfo.publisher)
        setNum(otvet.data.items[0].volumeInfo.industryIdentifiers[0].identifier)

    })
    .catch(error=>{
        console.log(error)
    })
    },[])

    const handleChange=(e)=>{
      setTit(e.target.value)
      
    }
    const search=(e)=>{
        e.preventDefault()
      navigate(`/Search/${tit}`)
    }



    return (
    <div >
    <form onSubmit={search} id="libSerch">
         <Link to="/Library" ><img src={doorPic} alt="back" className="dveri"/></Link>
           <input onChange={handleChange}/>
           <button>Search</button>
    </form> 
    <section id="Libro">
     <div id="bigCover">
     <div id="bigFoto">       
    <img src={imgUrl} alt="cover"/>
    </div>
    <div id="dis">
    <h3>{`${autor}`}</h3> 
    <h4>{`${title}`}</h4>
    </div>      
    </div>
    <div id="fullDesc">
    <h4>Author:     <span>{autor}</span></h4>
    <h4>Title:     <span>{title}</span></h4>
    <h4>ISBN:        <span>{num}</span> </h4>
    <h4>Category:   <span>{cat}</span></h4>
    <h4>Pages:      <span>{size}</span></h4>
    <h4>Published:    <span>{date}</span></h4>
    <h4>Publisher:   <span>{publ}</span></h4>
    <h4>Description:</h4>
    <p>{desc}</p>
    </div> 
    </section>
   </div>)

    }
 export default BookViewer