import axios from "axios";
import book from "../pictures/transp-profile-book.png"
import fresh from "../pictures/icons8-refresh-16.png"
import * as jose from "jose";
import { useState,useEffect } from "react";

export default function Profile () {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token"))) 
    const [tokenData,setTokenData]=useState({})
    const [showName,setShowName]=useState("")
    const [showMail,setShowMail]=useState("")
    const [showCountry,setShowCountry]=useState("")
    const [showCity,setShowCity]=useState("")
    const [showDate,setShowDate]=useState("")
    const [showSlogan,setShowSlogan]=useState("")
    const [ form, setForm ] = useState({
		email: '',
		password: '',
		nickname: '',
        country:'',
        city:'',
        Bdate:'',
        slogan:''
	});

const myData = ()=>{
    console.log(token)
    let data= jose.decodeJwt(token)
    console.log(data)
    setTokenData(data)
    console.log(tokenData)  
}

useEffect(()=>{
    myData()
},[])


const Show =(e) =>{
    if(e.target.name==="nickname"){ 
        setShowName(!showName)
        }
    if(e.target.name==="email"){ 
        setShowMail(!showMail)
        }
    if(e.target.name==="country"){ 
        setShowCountry(!showCountry)
        }
    if(e.target.name==="city"){ 
        setShowCity(!showCity)
        }
    if(e.target.name==="Bdate"){ 
        setShowDate(!showDate)
        }
    if(e.target.name==="slogan"){ 
        setShowSlogan(!showSlogan)
        }  
}


const handleChange =()=> {
    setValues({ ...form, [e.target.name]: e.target.value });
}

const handleSub = async(e)=>{
    e.preventDefault();
		try {	
            const response = await axios.post(`${URL}/users/register`,form);
        
        //console.log(response)
        if (response.data.ok) {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    } catch (error) {
        console.log(error);
    }

}


return<div id="profile">

<div id="entireBook">
<img src={book} id="update"/>


<div id="now">
<h4>Nickname:<span>{tokenData.nickname}<span><button className="fresh" onClick={Show}><img src={fresh} name="nickname" /></button></span></span></h4>
<h4>Email:<span>{tokenData.email}<span><button className="fresh" onClick={Show}><img src={fresh} name="email"/></button></span></span></h4>
<h4>Country:<span>{tokenData.country}<span><button className="fresh" onClick={Show}><img src={fresh} name="country"/></button></span></span></h4>
<h4>City:<span>{tokenData.city}<span><button className="fresh" onClick={Show} ><img src={fresh} name="city"/></button></span></span></h4>
<h4>Birthday date:<span>{tokenData.Bdate}<span><button className="fresh" onClick={Show}><img src={fresh} name="Bdate"/></button></span></span></h4>
<h4>Slogan:<span>{tokenData.slogan}<span><button className="fresh" onClick={Show}><img src={fresh} name="slogan"/></button></span></span></h4>
<div id="pass\del">
    <button id="newpass">change password</button>
    <button id="delete">DELETE account</button>
</div>
</div>

<form id="then" onSubmit={handleSub}>
<input name="nickname" placeholder="new nickname" onChange={handleChange} className={showName ? "nickVis" :"Hidden"}/>
<input name="email" placeholder="new email" onChange={handleChange} className={showMail ? "mailVis" :"Hidden"}/>
<input name="country" placeholder="new country" onChange={handleChange} className={showCountry ? "contrVis" :"Hidden"}/>
<input name="city" placeholder="new city" onChange={handleChange} className={showCity ? "cityVis" :"Hidden"}/>
<input name="Bdate" placeholder="new date" onChange={handleChange} className={showDate ? "dateVis" :"Hidden"}/>
<input name="slogan" placeholder="new slogan" onChange={handleChange} className={showSlogan ? "slogVis" :"Hidden"}/>
<button className={showName || showMail || showCountry || showCity || showDate || showSlogan ? "butVis" :"Hidden"}>update</button>
</form>

</div>


</div>

}