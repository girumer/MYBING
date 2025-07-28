
import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import './Logins.css';
import Cookies from "js-cookie";
function Logins() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  console.log(BACKEND_URL);
    const navigate=useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const accessToken =localStorage.getItem('accesstoken');
    console.log("access token append login ",accessToken);
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
    //const refreshToken = Cookies.get("refreshtoken");
    
    axios.defaults.withCredentials=true;
   
    const [formData,setFormData]=useState({
       username:'',
       password:'',
    
    })
     const handleInputChange=(event)=>{
      const {name,value}=event.target;
      setFormData({
        ...formData,
        [name]:value
      })
    
     }
    useEffect(() => {
     
      if (!accessToken) {
        navigate("/");
        
      }
      else{
       
          axios.post(`${BACKEND_URL}/useracess`, {}, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(res =>{ const username=res.data.username;
            const role=res.data.role;
            console.log("role is",role);
            if(role==="admin"){
             navigate("/Dashbord",{state:{id:username}})}
             else{
               navigate("/BingoBoard",{state:{id:username}}) 
             } 
            })
          .catch(err => console.error(err));
          
       
        
      }
    }, [accessToken,navigate]);
   
        
   /*  const handleSubmit = async (e) => {
      e.preventDefault();
      const username = formData.username;
      const password = formData.password;
    
      try {
        const response = await axios.post("https://adeybingo-10.onrender.com/auth/login",
         { username, password }, {withCredentials: true}, { timeout: 10000 });
        const resData = response.data;
    
        console.log(resData);  // The token should now be available
    
        if (resData.message === "Invalid password") {
          setMessage("Invalid password. Please try again.");
        } else if (resData.message === "User does not exist") {
          setMessage("User does not exist. Please check your username.");
        } else {
          // Handle successful login
          if (resData.token) {
            localStorage.setItem('accesstoken', resData.token); // Store token in localStorage
            if (resData.Admin) {
              navigate("/Dashbord", { state: { id: formData.username } });
            } else {
              //console.log("what");
              navigate("/BingoBoard", { state: { id: username } });
            }
          }
        }
      } catch (err) {
        console.error("Error during login:", err);
        setMessage("An error occurred. Please try again later.");
      }
    }; */
    const handleSubmit = async (e) => {
      e.preventDefault();
      const username = formData.username;
      const password = formData.password;
    
      try {
        // Corrected axios.post with merged config object
        setIsLoading(true);
        const response = await axios.post(`${BACKEND_URL}/auth/login`,
          { username, password },
          {
            withCredentials: true,
            timeout: 40000, // Timeout set to 10 seconds
          }
        );
    
        const resData = response.data;
    
        console.log(resData); // Log the response data for debugging
    
        // Check if the response message indicates an error
        if (resData.message === "Invalid password") {
          setMessage("Invalid password. Please try again.");
        } else if (resData.message === "User does not exist") {
          setMessage("User does not exist. Please check your username.");
        } 
        else if (resData.message === "Insufficient balance") {
          setMessage("Insufficient balance");
        } 
        else {
          // Handle successful login and save the token
          if (resData.token) {
            localStorage.setItem('accesstoken', resData.token); // Store token in localStorage
    
            // Navigate based on the role
            console.log("role is ",resData.Admin);
             if (resData.Admin) {
              setIsLoading(false);
              navigate("/Dashbord", { state: { id: formData.username } });
            } else {
              setIsLoading(false);
              navigate("/BingoBoard", { state: { id: username } });
            }
          } else {
            // Handle case where token is not provided
            setMessage("Login failed. Please try again.");
          } 
        }
      } catch (err) {
        if (err.code === 'ECONNABORTED') {
          console.error("Request timed out");
          setMessage("The request timed out. Please try again later.");
        } else {
          console.error("Error during login:", err);
          setMessage("An error occurred. Please try again later.");
        }
    }};
    
    
  return (
    <div className="container">
      <div className='loginadd'>
   
      </div>
    <div className="login-container">
      
   
    <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" 
            value={formData.username}
            onChange={handleInputChange}
            required />
        </div>
        <div className="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" 
             value={formData.password}
             onChange={handleInputChange}
             required/>
        </div>
        {isLoading ?(
          <div className="spinner"></div>):(
        <button type="submit" className="submit-button">Login</button>
      )}
    </form>
    {message && <p>{message}</p>} {/* Display server response message */}
    <style jsx>{`
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
</div>
</div>
  );


}
export default Logins;
