import React, { useState,useEffect } from 'react'
import {Button, Form} from 'react-bootstrap';
import Navbar from '../components/Navbar';
import './Signups.css'
import axios from 'axios';
import Cookies from "js-cookie";

import { useLocation, useNavigate } from 'react-router-dom';
function Signups() {
  axios.defaults.withCredentials=true;
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const navigate=useNavigate();
const [user,setUser]=useState(null);
axios.defaults.withCredentials=true;
const [formData,setFormData]=useState({
   username:'',
   password:'',
   amount:0,
   role:'',

})
 const handleInputChange=(event)=>{
  const {name,value}=event.target;
  setFormData({
    ...formData,
    [name]:value
  })

 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  const username=formData.username;
  const password=formData.password;
  const role=formData.role;
  const amount =formData.amount;
  //console.log(role);
    axios.post(`${BACKEND_URL}/auth/register`, {username,password,role,amount},{withCredentials: true})
    .then(res=>{
      navigate("/Logins")
    })
    .catch(err=>console.log(err));
    
 }
  return (
    <React.Fragment>
      <Navbar />
<div className="signup-container">
        <h2>Sign Up page is now </h2>
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" 
                value={formData.username}
                onChange={handleInputChange}
                required />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required
                 value={formData.password}
                 onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label for="amount">intial amount</label>
                <input type="number"
               name="amount"
               value={formData.amount}
                 onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select 
                        id="role" 
                        name="role" 
                        value={formData.role} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="client">Client</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            <button type="submit" className="submit-button" onClick={handleSubmit }>Create Account</button>
        </form>
    </div>
   
    </React.Fragment>
  )
}

export default Signups