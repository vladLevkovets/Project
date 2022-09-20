import {useEffect} from 'react'
import axios from 'axios'
export default function Home() {
 
useEffect(()=>{
    
    
    axios 
  .get(`https://www.googleapis.com/books/v1/volumes?q=Rambo&key=AIzaSyC7KC4znmh7O8E5SSSXjgdbpLynsAG7Fqg`)
  .then(otvet=>{
    console.log(otvet)
})
.catch(error=>{
    console.log(error)
})
},[])
  


    return( <div className="PAGE">
              <section  className= "tops" >
              <div><p>top5 rated</p></div>
              <div><p>top5 recomended</p></div>
              <div><p>newest 5</p></div>
              </section>
            
        
       
      </div>)
      
    
  
  }