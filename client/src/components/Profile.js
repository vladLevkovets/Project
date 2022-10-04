import axios from "axios";
import fresh from "../pictures/icons8-refresh-16.png"
import * as jose from "jose";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {URL} from "./config.js"

export default function Profile ({setIsLoggedIn}) {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token"))) 
    const [tokenData,setTokenData]=useState({})
    const [showName,setShowName]=useState(false)
    const [showNameP,setShowNameP]=useState(false)
    const [showMail,setShowMail]=useState(false)
    const [showMailP,setShowMailP]=useState(false)
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
    const [text,setText]=useState("")
    const [warning,setWarning]=useState(false)
    const [deleted,setDeleted]=useState(false)
    const [ form, setForm ] = useState({
		email: tokenData.email,
		password: '',
		nickname: tokenData.nickname,
        country:tokenData.country,
        city:tokenData.city,
        Bdate:tokenData.Bdate,
        slogan:tokenData.slogan

	});
    const navigate = useNavigate();

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
    e.target.name==="nickname" && setTextName(e.target.value)
    e.target.name==="email" && setTextMail(e.target.value)
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
            setShowPass(true)
        },400)
        setTimeout(() => {
            setRotate(false) 
            
        }, 500);
    }

const leafMore = async()=>{

        
        //  console.log(form)
        //  let localToken=JSON.parse(localStorage.getItem("token"))
        //  console.log(localToken)
        //  let tokenObj=(jose.decodeJwt(localToken))
        //  console.log(tokenObj)
         let _id=tokenData._id
         try {
            console.log({...form,_id})
            const res = await axios.post(`${URL}/users/update`, {...form,_id});
            console.log(res)
            if (res.data.ok===true) {

                setRotate(true)
                console.log(rotate)
                 setTimeout(()=>{
                     setShowNow(true)  
                 },250) 
                 setTimeout(()=>{
                     setShowPass(!showPass)
                     setTextPass("")
                     setText("")
                 },250)
                 setTimeout(() => {
                     setRotate(false)  
                 }, 500);
              
                localStorage.setItem("token", JSON.stringify(res.data.token))
                let data= jose.decodeJwt(res.data.token)
                console.log(data)
                setTokenData(data)
                
                setTextPass1("")
                setTextPass2("")
                setTextName("") 
                setTextMail("")
                setTextCountry("") 
                setTextCity("") 
                setTextDate("") 
                setTextSlogan("") 
                setShowNameP(false)
                setShowMailP(false)
                setShowName(false)
                setShowMail(false)
              
            }else if( res.data.ok===false && res.data.type==="nick"){

                setShowName(true)
                setShowNameP(true)
                setTextPass("")
            }else if( res.data.ok===false && res.data.type==="email"){
                setShowMail(true)
                setShowMailP(true)
                setTextPass("")
            }else if( res.data.ok===false ){
               setText(res.data.message)
               
            }
        
          } catch (error) {
            console.log(error);
          }
     }   

const toPasswords= async()=>{

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
         setShowPass(true)
         setShowNewPass(true)
     },400)
     setTimeout(() => {
         setRotate(false) 
         
     }, 500);    

}

const PassChange = async()=>{

    let _id=tokenData._id
    
    try {
       console.log({form})
       const res = await axios.post(`http://localhost:4040/users/passwords`, {...form,_id});
       console.log(res)
       if (res.data.ok) {
        setText(res.data.message)
           setTimeout(() => {
            setRotate(true)
           }, 2000);
           console.log(rotate)
            setTimeout(()=>{
                setShowNow(true)
                setShowPass(false)
                setShowNewPass(false)
                setText("")
                setTextPass("")
                setTextPass1("")
                setTextPass2("")
            },2300) 
           
            setTimeout(() => {
                setRotate(false)
                
            }, 2500);
           
           setTextPass1("")
           setTextPass2("")
           setTextName("") 
           setTextMail("")
           setTextCountry("") 
           setTextCity("") 
           setTextDate("") 
           setTextSlogan("") 
           setShowNameP(false)
           setShowMailP(false)
           setShowName(false)
           setShowMail(false)
        
         
       }else{
           setText(res.data.message)
       }
    }   
       catch (error) {
           console.log(error);
         }
}


const reverse=()=>{

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
        setShowPass(false)
        setShowNewPass(false)
                setText("")
                setTextPass("")
                setTextPass1("")
                setTextPass2("") 
                setTextPass1("")
                setTextPass2("")
                setTextName("") 
                setTextMail("")
                setTextCountry("") 
                setTextCity("") 
                setTextDate("") 
                setTextSlogan("") 
                setShowNameP(false)
                setShowMailP(false)
                setShowName(false)
                setShowMail(false)
     },300) 
     setTimeout(()=>{
        setShowNow(true)
         
     },400)
     setTimeout(() => {
         setRotate(false) 
         
     }, 500);    
}

const toWarning=()=>{
    setWarning(true)
}

const toRoutine=()=>{
    setWarning(false)
    setTextPass1("")
    setTextPass2("")
    setText("")
}

const TotalA=async()=>{
    console.log(textPass1,textPass2)
 if(textPass1!==textPass2) {
    setText("PASSWORDS DOESN'T MATCHED ")
 }  
if(textPass1===textPass2){

    let _id=tokenData._id
    try {
       const res = await axios.post(`http://localhost:4040/users/delete`, {...form,_id});
       if (res.data.ok===true) {
            setDeleted(true)
          setTimeout(() => {
            localStorage.removeItem("token");
                setIsLoggedIn(false)
                navigate("/")
          }, 3000);
         
       }else {
   console.log()
       setText(res.data.message)
       }
   
     } catch (error) {
       console.log(error);
     }


}

}

useEffect(()=>{
    
},[rotate])

return<div id="profile">

{warning &&<section id="warning">
   <div id="warnText">
   {deleted
    ?<div id="bye">
      <p>{`Goodbye, ${form.nickname}!`}</p>
      <p> We'll remember you!</p>
    </div>
    :<>
    <p>"ARE YOU SURE ?</p>
    <p> THiS ACTION WILL BE IRREVERSIBLE !!!</p>
    <p>{text}</p>
    </>
    }
   </div>
   <div id="warnPass">
    <input type="password" name="newPassword1" placeholder="type password" onChange={handleChange} className="totalPass"/>
    <input type="password" name="newPassword2" placeholder="repeat password"onChange={handleChange}  className="totalPass"/>
   </div>
   <div id="warnButns">
    <button onClick={TotalA} id="totala">DELETE</button>
    <button onClick={toRoutine} id="save">ABORT</button>
   </div>
</section>}

<div id="entireBook">
<section id={showNow?"nowVis":"nowHid"}>
<h4>Nickname:<span>{tokenData.nickname}<span><button className="fresh" onClick={Show}><img src={fresh} name="nickname" /></button></span></span></h4>
<h4>Email:<span>{tokenData.email}<span><button className="fresh" onClick={Show}><img src={fresh} name="email"/></button></span></span></h4>
<h4>Country:<span>{tokenData.country}<span><button className="fresh" onClick={Show}><img src={fresh} name="country"/></button></span></span></h4>
<h4>City:<span>{tokenData.city}<span><button className="fresh" onClick={Show}><img src={fresh} name="city"/></button></span></span></h4>
<h4>Birthday date:<span>{tokenData.Bdate}<span><button className="fresh" onClick={Show}><img src={fresh} name="Bdate"/></button></span></span></h4>
<h4>Slogan:<span>{tokenData.slogan}<span><button className="fresh" onClick={Show}><img src={fresh} name="slogan"/></button></span></span></h4>
<div id="pass\del">
    <button id="newpass" onClick={toPasswords}>change password</button>
    <button id="delete" onClick={toWarning}>DELETE account</button>
</div>
</section>
 
<section  id={rotate?"then":"future"} >
{ showNameP
?<div className="change">
<input name="nickname" placeholder="new nickname"  onChange={handleChange} value={textName} className={showName ? "nickVis" :"Hidden"}/>
<p className={showNameP?"namePVis":"Hidden"}>allready in use </p>
</div>
:<input name="nickname" placeholder="new nickname"  onChange={handleChange} value={textName} className={showName ? "nickVis" :"Hidden"}/>
}
{showMailP
?<div className="change">
<input name="email" type="email" placeholder="new email"  onChange={handleChange} value={textMail} className={showMail ? "mailVis" :"Hidden"}/>
<p className={showMailP?"mailPVis":"Hidden"}>allready in use </p>
</div>
:<input name="email" type="password" placeholder="new email"  onChange={handleChange} value={textMail} className={showMail ? "mailVis" :"Hidden"}/>
}
<input name="country" placeholder="new country"  onChange={handleChange} value={textContry} className={showCountry ? "contrVis" :"Hidden"}/>
<input name="city" placeholder="new city"   onChange={handleChange} value={textCity} className={showCity ? "cityVis" :"Hidden"}/>
<input name="Bdate" type="date" placeholder="new date" onChange={handleChange} value={textDate} className={showDate ? "dateVis" :"Hidden"}/>
<input name="slogan" placeholder="new slogan" onChange={handleChange} value={textSlogan} className={showSlogan ? "slogVis" :"Hidden"}/>
<button onClick={leaf} className={(showName || showMail || showCountry || showCity || showDate || showSlogan)&&(!showNameP && !showMailP) ? "butVis" :"Hidden"}>update</button>
</section>


<section id="parole">
    <h4>{text}</h4>
    <input type="password" placeholder="load new password" name="newPassword1" onChange={handleChange} value={textPass1} className={showNewPass ? "newPassVis" :"Hidden"}/>
    <input type="Password" placeholder="confirm new password" name="newPassword2" onChange={handleChange} value={textPass2} className={showNewPass ? "newPassVis" :"Hidden"} />
    <input type="Password" placeholder="load password" name="password" onChange={handleChange} value={textPass} className={showPass ? "passVis" :"Hidden"}/>
    {!showNewPass
    ?<>
    <button className={showPass ? "confVis" :"Hidden"} onClick={leafMore}>confirm</button>
     <button onClick={reverse} className={showPass ? "cancelVis" :"Hidden"}>cancel</button>
     </>
    :<>
    <button className={showPass ? "confVis" :"Hidden"} onClick={PassChange}>confirm</button>
    <button onClick={reverse} className={showPass ? "cancelVis" :"Hidden"}>cancel</button>
     </>
    }
</section>

</div>


</div>

}

