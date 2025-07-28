import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './CartelaSelction.css';
import {useLocation, useNavigate} from 'react-router-dom';

function CartelaSelction() {
    const location=useLocation();
    const history=useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
   const [isOpen, setIsOpen] = useState(false);
   const [opengame,setopengame]=useState(false);
    const options = [2,  4,  7,  10];
    const [selectedpercent, setSelectedpercent] = useState(() => {
        // Get saved value from localStorage or use default (0.2)
        if (typeof window !== 'undefined') {
          const savedPercent = localStorage.getItem('selectedPercent');
          return savedPercent ? parseFloat(savedPercent) : 0.2;
        }
        return 0.2;
      });
      const percentoptions = [
        { label: "15%", value: 0.15 },
        { label: "20%", value: 0.2 },
        { label: "25%", value: 0.25 },
        { label: "30%", value: 0.30 }
      ];
      const handlePercentSelect = (value) => {
        setSelectedpercent(value);
        if (typeof window !== 'undefined') {
          localStorage.setItem('selectedPercent', value.toString());
        }
        setIsOpen(false);
      };
    const gametype = [
        { label: "one cheak", value: 1},
        { label: "two cheak", value: 2},
        
       
    ];
    const [selectegametype, setSelectgametype] = useState(1);
    //let flagp = parseInt(localStorage.getItem('flagp')) || 0;
  //console.log("flagp now is ",flagp); 
    //localStorage.setItem('language',location.state.language);
   // let  language= localStorage.getItem('language');
    const [selectedStake, setSelectedStake] =useState(() => {
            const selectedStake = localStorage.getItem('stake');
            return selectedStake ? parseInt(selectedStake) : 20;
            
        });
   
       // console.log(language);
    const handleStakeChange = (event) => {
        let stake=parseInt(event.target.value);
        setSelectedStake(parseInt(stake));
        localStorage.setItem('stake', stake);
        
    };
     
    const [numbers, setNumbers] = useState(() => {
        const storedNumbers = localStorage.getItem("selectedNumbers");
        // Check if storedNumbers exists and is a valid JSON array
        try {
            const parsedNumbers = storedNumbers ? JSON.parse(storedNumbers) : [];
            return Array.isArray(parsedNumbers) ? parsedNumbers : []; // Ensure it's an array
        } catch (error) {
            console.error("Error parsing stored numbers:", error);
            return []; // Default to empty array on parse error
        }
    });
  //  console.log("the value of flagp is ",flagp);
    useEffect(() => {
        const flagpFromState = location.state?.flagp ?? 0;
        localStorage.setItem('flagp', flagpFromState);
    
        if (flagpFromState === 1) {
          localStorage.removeItem("selectedNumbers");
          setNumbers([]);
          console.log("selectedNumbers removed now", numbers);
        }
      }, [location.state]); 
    useEffect(() => {
        localStorage.setItem("selectedNumbers", JSON.stringify(numbers));
    }, [numbers]);
    const startGame = () => {
        
        
        // Delay navigation slightly to allow "game started" to finish
        setTimeout(() => {
            history("/BingoBoard", { state: { cartelas: numbers,selectegametype:selectegametype,stake: selectedStake, selectedpercent:selectedpercent} });
          //  localStorage.removeItem("selectedNumbers");
        }, 1000); // 1-second delay
    };
    const getGameStartedAudio = () => {
        const audio= new Audio('/gamestatus/game_ready_tostart.mp3');
        audio.preload = "auto"; // Preload to reduce delay
        return audio;
    };
   
    const handleButtonClick = (num) => {
        setNumbers((prevNumbers) => {
            // Ensure prevNumbers is an array
            if (Array.isArray(prevNumbers)) {
                if (prevNumbers.includes(num)) {
                    return prevNumbers.filter((number) => number !== num);
                } else {
                    return [...prevNumbers, num];
                }
            }
            return [num]; // Fallback if prevNumbers is not an array
        });
    };

    return (
        <React.Fragment>
            <Navbar />
            <div className="Cartelacontainer">
                {[...Array(100).keys()].map((index) => {
                    const num = index + 1;
                    return (
                        <button 
                            key={num} 
                            onClick={() => handleButtonClick(num)} 
                            className="cartela" 
                            style={{ background: numbers.includes(num) ? 'red' : '#eeeeee',color:numbers.includes(num) ?'yellow':'black' }}
                        >
                            {num}
                        </button>
                    );
                })}
               
            </div>
            
            <div className='cartelacomand_bord'>
                <div className='Play'>
                <button className="game_start" disabled={numbers.length <= 1} onClick={startGame }>START</button>

              </div>
              <div className="percentoption">
    {/* Dropdown toggle button */}
    <button className="dropdown-toggle" onClick={() => setopengame(!opengame)}>
        {/* Display selected game type label or default text */}
        {gametype.find((option) => option.value === selectegametype)?.label || "Select gametype"}
        <span className={`arrow ${opengame ? "open" : ""}`}>▼</span>
    </button>

    {/* Dropdown menu */}
    {opengame && (
        <ul className="dropdown-menu">
            {gametype.map((option) => (
                <li key={option.value}>
                    <button
                        className="dropdown-item"
                        onClick={() => {
                            setSelectgametype(option.value); // Update selected game type
                            setopengame(false); // Close dropdown
                        }}
                    >
                        {option.label}
                    </button>
                </li>
            ))}
        </ul>
    )}
</div>
<div className="percentoption">
  <button 
    className="dropdown-toggle" 
    onClick={() => setIsOpen(!isOpen)}
  >
    {percentoptions.find(option => option.value === selectedpercent)?.label || "Select percent"}
    <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
  </button>

  {isOpen && (
    <ul className="dropdown-menu">
      {percentoptions.map((option) => (
        <li key={option.value}>
          <button
            className="dropdown-item"
            onClick={() => handlePercentSelect(option.value)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  )}
</div>
    

                <div className='Stakeplace'>
            <h2>Select a Stake</h2>
            <div className='stakevalue'>
                <label>
                    <input
                        type="radio"
                        value="10"
                        checked={selectedStake === 10}
                        onChange={handleStakeChange}
                    />
                    10
                </label>
                <label>
                    <input
                        type="radio"
                        value="20"
                        checked={selectedStake === 20}
                        onChange={handleStakeChange}
                    />
                    20
                </label>
                <label>
                    <input
                        type="radio"
                        value="30"
                        checked={selectedStake === 30}
                        onChange={handleStakeChange}
                    />
                    30
                </label>
               
                <label>
                    <input
                        type="radio"
                        value="50"
                        checked={selectedStake === 50}
                        onChange={handleStakeChange}
                    />
                    50
                </label>
                <label>
                    <input
                        type="radio"
                        value="100"
                        checked={selectedStake === 100}
                        onChange={handleStakeChange}
                    />
                    100
                </label>
                <label>
                    <input
                        type="radio"
                        value="200"
                        checked={selectedStake === 200}
                        onChange={handleStakeChange}
                    />
                    200
                </label>
                <label>
                    <input
                        type="radio"
                        value="500"
                        checked={selectedStake === 500}
                        onChange={handleStakeChange}
                    />
                    500
                </label>
                <label>
                    <input
                        type="radio"
                        value="1000"
                        checked={selectedStake === 1000}
                        onChange={handleStakeChange}
                    />
                    1000
                </label>
            </div>
           
        </div>
               </div>
            
        </React.Fragment>
    );
}

export default CartelaSelction;
