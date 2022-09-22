import axios from 'axios'
import React ,{useState, useEffect } from 'react'
import {Link,useParams} from "react-router-dom"
import dveri from "../pictures/log_logout_door_1563.png"
import { useRecoilState } from 'recoil'
import {authorsState}from '../State.js'

function Autors() {
let params=useParams()    
let ALF=["A","B","C",'D',"E","F","G","H",'I',"G",'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const [quantity,setQuantity]=useState("")
const [authors,setAuthors]=useRecoilState(authorsState)
var ALL=[]

function  alfabet (){
    return ALF.map((e,i)=>{
       return <Link to={`/Authors/${e}`} key={i}>{e}</Link>
    })
}

const DB =()=>{
axios 
 .get (`https://www.googleapis.com/books/v1/volumes?q=b+inauthor:"a"&printType=books&langRestrict=en&maxResults=40&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
 .then (res=>{
    setQuantity(res.data.totalItems)
    .catch(error=>{
        console.log(error)
    })  
 }) 
}


useEffect(()=>{
    
DB()
},[])

useEffect(()=>{
    var ALL=[]
for (let i=0;i<=quantity;i+=40){
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=b+inauthor:"a"&printType=books&langRestrict=en&startIndex=${i}&maxResults=40&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
    .then(res=>{
        debugger
        console.log(res.data.items)
        res.data.items.map(book =>{
             console.log(book)
            if(book.volumeInfo.printType=="BOOK" ){
                console.log(book.volumeInfo.authors)
                book.volumeInfo.authors.map(man=>{
                    ALL.push(man)
                })
            }
        }) 
    })
    .catch(error=>{
        console.log(error)
    })
    
}
console.log(ALL)
setAuthors([...ALL])
},[quantity])







return (
    
    
        <div>
         <Link to="/Library"><img src={dveri} alt="back" className="dveri"/></Link>
         {alfabet()}
         </div>)
         
}
export default Autors       