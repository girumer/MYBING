import React, { useEffect, useRef, useState } from 'react';
import './Spinner.css'; // Make sure CSS is in this file or adjust accordingly
import axios from 'axios';
const Spinner = ({ trigger, onResult }) => {
  const prizes = [50, 75, 100, 150, 200];
  const [angle, setAngle] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [username, setUser] = useState(null);
  const spinnerRef = useRef(null);
   const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
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
  if (trigger && username) {
    const index = Math.floor(Math.random() * prizes.length);
    const spinAngle = 360 * 5 + index * (360 / prizes.length);
    setAngle(spinAngle);
    setSelectedIndex(index);
    const selectedPrize = prizes[index];
playBonusAudio(selectedPrize);
    setTimeout(() => {
      console.log("Calling updatePrizeAfterSpin with:", { username, selectedPrize });
      updatePrizeAfterSpin(username, selectedPrize);
      
      onResult(selectedPrize);
    }, 10000);
  } else if (trigger && !username) {
    console.warn("Username not loaded yet. Skipping prize update.");
  }
}, [trigger, username]);
const playBonusAudio = (value) => {
  const audio = new Audio(`/bonus/${value}.m4a`);
  audio.play().catch((err) => {
    console.error(`Audio play for ${value} failed:`, err);
  });
};

const updatePrizeAfterSpin = async (username, prizeWon) => {
  console.log("Backend URL:", BACKEND_URL);
  console.log("Sending to backend:", { username, prize: prizeWon });
  try {
    const response = await axios.post(`${BACKEND_URL}/prize`, {
      username,
      prize: prizeWon
    });
    console.log(response.data.message); // Success or failure
  } catch (error) {
    console.error("Prize update failed:", error.response?.data || error.message);
  }
};
  return (
    <div className="spinner-wrapper">
      <div
        ref={spinnerRef}
        className="spinner-wheel"
        style={{
          transform: `rotate(${angle}deg)`,
          transition: 'transform 3s ease-out'
        }}
      >
      
        {prizes.map((val, i) => (
          <div
            key={i}
            className={`segment ${i === selectedIndex ? 'winner' : ''}`}
            style={{
              transform: `rotate(${i * (360 / prizes.length)}deg)`,
            }}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="center-circle"><div className="center-bonus">bonus</div>🎯</div>
    </div>
  );
};

export default Spinner;
