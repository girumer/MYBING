import React, { useState,useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import '../components/Maninmenu.css';
import Navbar from '../components/Navbar';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
//import './Maninmenu.css'

function Mainmenu() {
    const location=useLocation();
    const history=useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const [deposit,setDeposit]=useState(false);
const [checkdepositup,setCheckdepositup]=useState(false);
const [cheakcoin,setCheakcoin]=useState(false);
const [redeposit,setRedeposit]=useState(false);
const [curentBalance,setCurentBalance] =useState(0);
const [currentCoin,setcurrentCoin]=useState(0)
const [username, setUser] = useState(null);
const [isupdateuser,setIsupdateuser]=useState(false);
const [amount,setAmount]=useState(0);


const [wallet,setWallet]=useState(0);
useEffect(() => {
  const token = localStorage.getItem('accesstoken');
  
  if (!token) {
    alert("User not found");
  } else {
    axios.post(`${BACKEND_URL}/useracess`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      const username = res.data.username;
      setUser(username);
    })
    .catch(err => {
      console.error("Error:", err);
      alert("Failed to verify user");
    });
  }
}, []);
useEffect(() => {
  if (username) {
    checkpoint();
  }
}, [username]);
 



async function checkpoint(){
    
    try{

        await axios.post(`${BACKEND_URL}/api/depositcheckB`,{
            username
        })
        .then(res=>{
            
          setWallet(res.data.balance);
            //setcurrentCoin(res.data);
        })
        .catch(e=>{
            alert("wrong details")
            console.log(e);
        })

    }
    catch(e){
        console.log(e);

    }
}

 

  return (
    <React.Fragment>
    <Navbar />
    <div className="play-page">
        <div className="welcome-text">
          <h1>Welcome to Adeye Bingo Game</h1>
          <p>Enjoy playing thank you for selecting Us</p>
          <p>Here is your remaining package </p>
        </div>
        <button className="play-btn">
          <FontAwesomeIcon icon={faPlay} className="play-icon" />
          <span > {wallet}</span>
        </button>
      </div>
  </React.Fragment>
  )
}

export default Mainmenu