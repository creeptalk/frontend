// src/LandingPage.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo_creeptalk.png';
import ghostLeft from '../assets/L_ghost.png';
import ghostRight from '../assets/R_ghost.png';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/chat');
    }, 3500); //3.5초 후 자동이동동
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-container">
      <img src={ghostLeft} alt="Ghost Left" className="ghost ghost-left" />
      <img src={ghostRight} alt="Ghost Right" className="ghost ghost-right" />
      <img src={logo} alt="CreepTalk Logo" className="logo" />
    </div>
  );
}

export default LandingPage;

