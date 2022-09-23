import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../config';
import {useNavigate} from 'react-router-dom'

const Register = (props) => {
    const [ form, setValues ] = useState({
		email: '',
		password: '',
		password2: '',
        nickname:''
	});
const [ message, setMessage ] = useState('');
const navigate=useNavigate()

const handleChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(password===password2)
        axios
        .post(`http://localhost:4040/users/register`, {
            email: form.email,
            password: form.password,
            nickname: form.nickname
            
        });
        setMessage(response.data.message);
        console.log(response)
        if (response.data.ok) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    } catch (error) {
        console.log(error);
    }
};

return (
    <form onSubmit={handleSubmit} onChange={handleChange} className="form_container">
        <label>Email</label>
        <input name="email" />

        <label>nickname</label>
        <input name="nickname" />

        <label>Password</label>
        <input name="password" />

        <label>Repeat password</label>
        <input name="password2" />

        <button>register</button>
        <div className="message">
            <h4>{message}</h4>
        </div>
    </form>
);


};

export default Register;   