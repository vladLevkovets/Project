import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import Nav from './components/Nav'
import Library from './components/Library'
import Registry from './components/Registry'
import Libro from'./components/Libro'
import Search from './components/Search.js'
import Footer from './components/Footer'
import Header from './components/Header'
export default function App() {

  return (
    <div className="App">
      
    <Router>
       <div className='Main'>
       <Header/> 
      <Nav className="nav"/>
        <Routes>
            <Route path="/" element={<Home />}/> 
            <Route path="/Library" element={<Library/>}/>
            <Route path="/Registry" element={<Registry/>}/> 
            <Route path="/Libro/:id" element={<Libro/>}/>
            <Route path="/Search/:title" element={<Search/>}/>
            
          
            
        
        
        </Routes>
        </div>
        <Footer/>
    </Router>
    
    </div>
  );
}