import axios from "axios";
import book from "../pictures/transp-profile-book.png"
import fresh from "../pictures/icons8-refresh-16.png"
import * as jose from "jose";
import { useState,useEffect } from "react";

export default function Profile () {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token"))) 
    const [tokenData,setTokenData]=useState({})
    const [showName,setShowName]=useState(false)
    const [showMail,setShowMail]=useState(false)
    const [showCountry,setShowCountry]=useState(false)
    const [showCity,setShowCity]=useState(false)
    const [showDate,setShowDate]=useState(false)
    const [showSlogan,setShowSlogan]=useState(false)
    const [showPass,setShowPass]=useState(false)
    const [showNewPass,setShowNewPass]=useState(false)
    const [showNow,setShowNow]=useState(true)
    const [rotate,setRotate]=useState(false)
    const [textMail,setTextMail]=useState("")
    const [textName,setTextName]=useState("")
    const [textContry,setTextCountry]=useState("")
    const [textCity,setTextCity]=useState("")
    const [textDate,setTextDate]=useState("")
    const [textSlogan,setTextSlogan]=useState("")
    const [textPass,setTextPass]=useState("")
    const [textPass1,setTextPass1]=useState("")
    const [textPass2,setTextPass2]=useState("")
    const [ form, setForm ] = useState({
		email: tokenData.email,
		password: '',
		nickname: tokenData.nickname,
        country:tokenData.country,
        city:tokenData.city,
        Bdate:tokenData.Bdate,
        slogan:tokenData.slogan
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

useEffect(()=>{
    setForm({...form,
		email: tokenData.email,
		password: '',
		nickname: tokenData.nickname,
        country:tokenData.country,
        city:tokenData.city,
        Bdate:tokenData.Bdate,
        slogan:tokenData.slogan
})
},[tokenData])

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


const handleChange =(e)=> {
    
    setForm({ ...form, [e.target.name]: e.target.value });
    e.target.name==="nickname" && setTextMail(e.target.value)
    e.target.name==="email" && setTextName(e.target.value)
    e.target.name==="country" && setTextCountry(e.target.value)
    e.target.name==="city" && setTextCity(e.target.value)
    e.target.name==="Bdate" && setTextDate(e.target.value)
    e.target.name==="slogan" && setTextSlogan(e.target.value)
    e.target.name==="password" && setTextPass(e.target.value)
    e.target.name==="newPassword1" && setTextPass1(e.target.value)
    e.target.name==="newPassword2" && setTextPass2(e.target.value)
}

const leaf = ()=>{
  
       setRotate(true)
       console.log(rotate)
       setTimeout(()=>{
        setShowName(false)
        setShowMail(false)
        setShowCountry(false)
        setShowCity(false)
        setShowDate(false)
        setShowSlogan(false)
        },250)
        setTimeout(()=>{
            setShowNow(false)  
        },300) 
        setTimeout(()=>{
            setShowPass(!showPass)
        },400)
        setTimeout(() => {
            setRotate(false) 
            setTextName("") 
            setTextMail("")
            setTextCountry("") 
            setTextCity("") 
            setTextDate("") 
            setTextSlogan("") 
        }, 500);
    }

const leafMore = async()=>{
  

        setRotate(true)
        console.log(rotate)
         setTimeout(()=>{
             setShowNow(true)  
         },250) 
         setTimeout(()=>{
             setShowPass(!showPass)
         },300)
         setTimeout(() => {
             setRotate(false)  
         }, 500);
         console.log(form)
         let localToken=JSON.parse(localStorage.getItem("token"))
         console.log(localToken)
         let tokenObj=(jose.decodeJwt(localToken))
         console.log(tokenObj)
         let _id=tokenObj._id
         try {
   
            const res = await axios.post(`http://localhost:4040/users/update`, {...form,_id});
            console.log({...form,_id})
            if (res.data.ok) {
              // here after login was successful we extract the email passed from the server inside the token 
              let decodedToken = jose.decodeJwt(res.data.token)
              // and now we now which user is logged in in the client so we can manipulate it as we want, like fetching data for it or we can pass the user role -- admin or not -- and act accordingly, etc...
              console.log("Email extracted from the JWT token after login: ", decodedToken.userEmail)
              
                localStorage.setItem("token", JSON.stringify(res.data.token))
                let data= jose.decodeJwt(res.data.token)
                console.log(data)
                setTokenData(data)
                setTextPass("")
                setTextPass1("")
                setTextPass2("")
              setTimeout(() => {
                
              
              }, 2000);
            }
          } catch (error) {
            console.log(error);
          }
     }   

useEffect(()=>{
    
},[rotate])

return<div id="profile">

<div id="entireBook">
<section id={showNow?"nowVis":"nowHid"}>
<h4>Nickname:<span>{tokenData.nickname}<span><button className="fresh" onClick={Show}><img src={fresh} name="nickname" /></button></span></span></h4>
<h4>Email:<span>{tokenData.email}<span><button className="fresh" onClick={Show}><img src={fresh} name="email"/></button></span></span></h4>
<h4>Country:<span>{tokenData.country}<span><button className="fresh" onClick={Show}><img src={fresh} name="country"/></button></span></span></h4>
<h4>City:<span>{tokenData.city}<span><button className="fresh" onClick={Show}><img src={fresh} name="city"/></button></span></span></h4>
<h4>Birthday date:<span>{tokenData.Bdate}<span><button className="fresh" onClick={Show}><img src={fresh} name="Bdate"/></button></span></span></h4>
<h4>Slogan:<span>{tokenData.slogan}<span><button className="fresh" onClick={Show}><img src={fresh} name="slogan"/></button></span></span></h4>
<div id="pass\del">
    <button id="newpass">change password</button>
    <button id="delete">DELETE account</button>
</div>
</section>

<section  id={rotate?"then":"future"} >
<input name="nickname" placeholder="new nickname"  onChange={handleChange} value={textName} className={showName ? "nickVis" :"Hidden"}/>
<input name="email" type="email" placeholder="new email"  onChange={handleChange} value={textMail} className={showMail ? "mailVis" :"Hidden"}/>
<input name="country" placeholder="new country"  onChange={handleChange} value={textContry} className={showCountry ? "contrVis" :"Hidden"}/>
<input name="city" placeholder="new city"   onChange={handleChange} value={textCity} className={showCity ? "cityVis" :"Hidden"}/>
<input name="Bdate" type="date" placeholder="new date" onChange={handleChange} value={textDate} className={showDate ? "dateVis" :"Hidden"}/>
<input name="slogan" placeholder="new slogan" onChange={handleChange} value={textSlogan} className={showSlogan ? "slogVis" :"Hidden"}/>
<button onClick={leaf} className={showName || showMail || showCountry || showCity || showDate || showSlogan ? "butVis" :"Hidden"}>update</button>
</section>


<section id="parole">
    <input type="password" placeholder="load new password" name="newPassword1" onChange={handleChange} value={textPass1} className={showNewPass ? "newPassVis" :"Hidden"}/>
    <input type="Password" placeholder="confirm new password" name="newPassword2" onChange={handleChange} value={textPass2} className={showNewPass ? "newPassVis" :"Hidden"} />
    <input type="Password" placeholder="load password" name="password" onChange={handleChange} value={textPass} className={showPass ? "passVis" :"Hidden"}/>
    <button className={showPass ? "confVis" :"Hidden"} onClick={leafMore}>confirm</button>
</section>

</div>


</div>

}