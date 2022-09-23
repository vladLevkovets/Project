import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import Nav from './components/Nav'
import Library from './components/Library'
import Authors from './components/Authors'
import Libro from'./components/Libro'
import Search from './components/Search.js'
import Footer from './components/Footer'
import Header from './components/Header'
export default function App() {

  return (
    <div className="App">
      <Header/>
    <Router>
       <div className='Main'>
      <Nav className="nav"/>
        <Routes>
            <Route path="/" element={<Home />}/> 
            <Route path="/Library" element={<Library/>}/>
            <Route path="/Authors/:letter" element={<Authors/>}/> 
            <Route path="/Libro/:id" element={<Libro/>}/>
            <Route path="/Search/:title" element={<Search/>}/>
            
          
            
        
        
        </Routes>
        </div>
    
    </Router>
    <Footer/>
    </div>
  );
}