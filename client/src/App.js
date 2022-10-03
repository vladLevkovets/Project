import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import Nav from './components/Nav'
import Library from './components/Library'
import Registry from './components/Registry'
import Libro from'./components/Libro'
import EmptySearch from './components/EmptySearch.js'
import Search from './components/Search.js'
import Footer from './components/Footer'
import Header from './components/Header'
import Profile from './components/Profile'
import Admin from './components/Admin'

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  useEffect(
    () => {
      
      const verify_token = async () => {
  
        try {
          if (!token) {
            setIsLoggedIn(false)
          }else {
          axios.defaults.headers.common['Authorization'] = token;
          const response = await axios.post(`http://localhost:4040/users/verify_token`);
          console.log(response)
          return response.data.ok ? login(token) : logout();
          }
        } catch (error) {
          console.log(error);
        }
      };
      verify_token();
    },
    [token]
    )
const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };






  return (
    <div className="App">
      
    <Router>
       <div className='Main'>
       <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> 
      <Nav className="nav" isLoggedIn={isLoggedIn}/>
        <Routes>
            <Route path="/" element={<Home />}/> 
            <Route path="/Library" element={<Library/>}/>
            <Route path="/Registry" element={<Registry setIsLoggedIn={setIsLoggedIn}/>}/> 
            <Route path="/Libro/:id" element={<Libro isLoggedIn={isLoggedIn}/>}/>
            <Route path="/Search/" element={<EmptySearch/>}/>
            <Route path="/Search/:title" element={<Search/>}/>
            <Route path="/Profile" element={<Profile setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/Admin" element={<Admin/>}/>
        
        
        </Routes>
        <Footer isLoggedIn={isLoggedIn}/>
        </div>
        
    </Router>
    
    </div>
  );
}