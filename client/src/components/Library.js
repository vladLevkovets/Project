import React, {useState, useEffect } from 'react'
import {Link,useNavigate} from "react-router-dom"
import { useRecoilState } from 'recoil'
import { titleState,idState } from '../State.js'

import axios from 'axios'

function Library() {
const [tit,setTit]=useState("")
const [title,setTitle]=useRecoilState(titleState)  
const navigate = useNavigate()
const [page,setPage]=useState([])
const [id,setId]=useRecoilState(idState)

const findList=()=>{
  let url=`https://www.googleapis.com/books/v1/volumes?q=orderBy=newest&langRestrict=en&printType=books&maxResults=15&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`
  console.log(JSON.parse(localStorage.getItem(url)))
    let search=JSON.parse(localStorage.getItem(url))
    console.log(search)
    if (search!==null){
      setPage([...search])
    }else{
    
    axios     
         .get(url)
         .then(otvet=>{
           console.log(otvet)
           setPage([...otvet.data.items])
           localStorage.setItem(url, JSON.stringify(otvet.data.items))
          
       })
       .catch(error=>{
           console.log(error)
       })
      }
                  
}


useEffect(()=>{
findList()},[]
)


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
  
  console.log(page)
 return page.map((book,i)=>{
   return <div key={i} >
   <Link to={`/Libro/${book.id}`} className="toBook" >
    <div className="cell">
      <div className="left">
      <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="cover" className="cover"/>
      </div>
      <div className="right">
      <p className="aut">{`${book.volumeInfo.authors.join(', ')}`}</p>
      <p className="name">{`${book.volumeInfo.title}`}</p>
      <p className="zanr">{`${book.volumeInfo.categories}`}</p>
    </div>
    </div>
    </Link>
    </div>
 })

}


return (
    
     <div>
        
          <form onSubmit={search}className="libSerch" >
           <input onChange={handleChange}/>
           <button>Search</button>
           </form>
           <section className="page">
            {printList()}
           </section>
           
     </div>
     
    
    ); 
}

export default Library