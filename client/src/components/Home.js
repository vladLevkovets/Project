import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
export default function Home() {

const [page,setPage]=useState([])

const findList=()=>{
  let url=`https://www.googleapis.com/books/v1/volumes?q=orderBy=newest&printType=books&maxResults=5&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`
  console.log(JSON.parse(localStorage.getItem(url)))
    let search=JSON.parse(localStorage.getItem(url))
    console.log(search)
    if (search!==null){
      setPage([...search])
    }else{
    axios 
         .get(`https://www.googleapis.com/books/v1/volumes?q=orderBy=newest&printType=books&maxResults=5&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
         .then(otvet=>{
           console.log(otvet)
             setPage([...otvet.data.items])
            
          })
       .catch(error=>{
           console.log(error)
       })
      }            
}


useEffect(()=>{
findList()},[]
)

  const printList=( )=>{
    return page.map((book,i)=>{
                return <div key={i}>
      <Link to={`/Libro/${book.id}`} className="toBook" >
      <div className="cellH">
        <div className="leftH">
        <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="cover" className="coverH"/>
        </div>
         <div className="rightH">
         
         <p id="author">{`${book.volumeInfo.authors}`}</p>
      
         <p id="title">{`${book.volumeInfo.title}`}</p>
        </div>
      </div>
    </Link>
                 </div>
    })
  }
              
        


    return( 
    <div className="PAGE">
              <section  className= "tops" >
              <div className="rate">
                <p className="title">TOP RATED</p>
                <section className="homePage">
                {printList()}
                </section>
              </div>
              <div className="recomend">
                <p className="title">TOP RELEVANCE</p>
                <section className="homePage">
                {printList()}
                </section>
              </div>
              <div className="new">
                <p className="title">FIVE NEWEST </p>
                <section className="homePage">
                {printList()}
                </section>
              </div>
              </section>
              
    </div>
    )
      
    
  
  }