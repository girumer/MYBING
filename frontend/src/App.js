// import './App.css'
import React from 'react';
import { useState,useEffect } from 'react';

import Mainmenu from "./components/Mainmenu";
import GameHistory from "./components/Gamehistory";
import Helpdesk from "./components/Helpdesk";
import BingoBoard from "./components/BingoBoard";
import CartelaSelction from "./components/CartelaSelction";
import Signups from "./components/Signups";
import Logins from "./components/Logins";
import Dashbord from "./components/Dashboard";
import Report from './components/Report';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPasswordReset from './components/AdminPasswordReset';
import AdminSignup from "./components/AdminSignup";
import ProtectedRoute from './components/ProtectedRoute';
import axios from "axios"
function App() {
  

  
   
    const token = localStorage.getItem('accesstoken');
     

  return (
    <div className="App">
   
      <Router>
        <Routes>
        
          <Route path="/" element={<Logins/>}/>
         
          <Route path="/qazxsw" element={<AdminSignup/>}/>
           <Route path="/AdminPasswordReset" element={<AdminPasswordReset/>}/>
          
          <Route path="/Logins"  element={<Logins/>}/>
          <Route path="/signups" element={<Signups /> }/>
          {/* protected toutes*/ }
          <Route element={<ProtectedRoute/>}>
          <Route path="/Dashbord" element={<Dashbord/>}/>
          <Route path="/Report" element={<Report />} />
          <Route path="/mainmenu" element={<Mainmenu/>}/>
           <Route path="/GameHistory" element={<GameHistory/>}/>
          
           <Route path="/CartelaSelction" element={<CartelaSelction/>}/>
          
          <Route path="/BingoBoard" element={<BingoBoard/>}/>
          
         
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;