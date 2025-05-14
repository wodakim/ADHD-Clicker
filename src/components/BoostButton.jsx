import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';

function BoostButton({ reducedAnimations }) {
  const { state, dispatch } = useGame();
  const { boostActive, boostCooldown } = state;
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  useEffect(() => {
    let interval;
    if (boostActive || boostCooldown > 0) {
      interval = setInterval(() => {
        if (boostActive) {
          setTimeRemaining(Math.max(0, state.boostTimeRemaining));
        } else if (boostCooldown > 0) {
          setTimeRemaining(Math.max(0, state.boostCooldown));
        }
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [boostActive, boostCooldown, state.boostTimeRemaining, state.boostCooldown]);
  
  const handleActivateBoost = () => {
    if (!boostActive && boostCooldown <= 0) {
      dispatch({ type: 'ACTIVATE_BOOST' });
    }
  };
  
  // Determine button classes based on state
  const buttonBaseClasses = "px-4 py-2 rounded-lg font-bold text-white transition-all duration-300";
  const buttonActiveClasses = boostActive 
    ? "bg-gradient-to-r from-red-500 to-yellow-500 shadow-red-500/50 shadow-lg"
    : boostCooldown > 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600";
  
  const pulseClass = boostActive && !reducedAnimations ? "animate-pulse" : "";
  
  return (
    <button
      onClick={handleActivateBoost}
      disabled={boostActive || boostCooldown > 0}
      className={`${buttonBaseClasses} ${buttonActiveClasses} ${pulseClass}`}
      style={{
        transform: boostActive && !reducedAnimations ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {boostActive ? (
        <>TDAH BOOST: {timeRemaining.toFixed(1)}s!</>
      ) : boostCooldown > 0 ? (
        <>Cooldown: {timeRemaining.toFixed(1)}s</>
      ) : (
        <>TDAH BOOST!</>
      )}
    </button>
  );
}

export default BoostButton;