import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const Registry = () => {
    const [ form, setValues ] = useState({
		email: '',
		password: '',
		password2: '',
        nickname:''
	});
const [ message, setMessage ] = useState('');

const navigate=useNavigate()

const handleChange=(e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    
        if(form.password===form.password2)
        axios
        .post(`http://localhost:4040/users/register`, {
            email: form.email,
            password: form.password,
            nickname: form.nickname}
            )
        .then (res=>{
        setMessage(res.data.message);
        console.log(res)
        if (res.data.ok) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    } )
        .catch (error=> {
        console.log(error);
    })
}


return (
     <div id="reg">
    <form onSubmit={handleSubmit} onChange={handleChange} className="form_container">
        <label>Email</label>
        <input placeholder='required' type="email" name="email" />

        <label>nickname</label>
        <input placeholder='required' name="nickname" />

        <label>Password</label>
        <input placeholder='required' type="password" name="password" />

        <label>Repeat password</label>
        <input placeholder='required' type="password" name="password2" />

        <button>register</button>
        <div className="message">
            <h4>{message}</h4>
        </div>
    </form>
    </div>
);


};

export default Registry;   