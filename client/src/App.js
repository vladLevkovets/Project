import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import Nav from './components/Nav'
import Library from './components/Library'
import Autors from './components/Autors'
import Libro from'./components/Libro'
import Search from './components/Search.js'
// import Footer from './components/Footer'
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
            <Route path="/Library/*" element={<Autors/>}/> 
            <Route path="/Libro" element={<Libro/>}/>
            <Route path="/Search" element={<Search/>}/>
            
          
            
        
        
        </Routes>
        </div>
    
    </Router>
    {/* <Footer/> */}
    </div>
  );
}