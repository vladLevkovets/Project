import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
export default function Home() {

  


    return( 
    <div className="PAGE">
              <section  className= "tops" >
              <div><p>top5 rated</p></div>
              <div><p>top5 recomended</p></div>
              <div><p>newest 5</p></div>
              </section>
              
    </div>
    )
      
    
  
  }