import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import rec from '../pictures/imgonline-com-ua-Transparent-backgr-VSx89Zmmr9KisCk2.png'
import newest from '../pictures/imgonline-com-ua-Transparent-backgr-ohqmyHEgsiiH.png'
import rate from '../pictures/imgonline-com-ua-Transparent-backgr-p2rdNzwSm3Yodh.png'
export default function Home() {

const [page,setPage]=useState([])

const findList=(arg)=>{

    axios 
         .get(`https://www.googleapis.com/books/v1/volumes?q=orderBy=newest&langRestrict=en&printType=books&maxResults=5&filter=partial&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
         .then(otvet=>{
           console.log(otvet)
             setPage([...otvet.data.items])
        
          })
       .catch(error=>{
           console.log(error)
       })
                
}


useEffect(()=>{
findList()},[]
)

  const printList=()=>{
    return page.map((book,i)=>{
                return <div key={i}>
      <Link to={`/Libro/${book.id}`} className="toBook" >
      <div className="cellH">
         <div className="leftH">
         <p className="discr">Author:</p>  
         <p>{`${book.volumeInfo.authors}`}</p>
         <p className="discr">Title:</p>
         <p>{`${book.volumeInfo.title}`}</p>
         <p className="discr">Category:</p>
         <p>{`${book.volumeInfo.categories}`}</p>
        </div>
        <div className="rightH">
        <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="cover" className="coverH"/>
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
                <p>top5 rated</p>
                <section className="homePage">
                {printList()}
                </section>
              </div>
              <div className="recomend">
                <p>top5 relevance</p>
                <section className="homePage">
                {printList()}
                </section>
              </div>
              <div className="new">
                <p>newest 5</p>
                <section className="homePage">
                {printList()}
                </section>
              </div>
              </section>
              
    </div>
    )
      
    
  
  }