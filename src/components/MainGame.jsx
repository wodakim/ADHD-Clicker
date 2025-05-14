import React, { useEffect, useState } from 'react';
import { useGame } from '../contexts/GameContext';
import BoostButton from './BoostButton';

function MainGame({ reducedAnimations }) {
  const { state, dispatch } = useGame();
  const [clickIntensity, setClickIntensity] = useState(0);
  const { heroSprite, currentEnemy, resources } = state;
  
  // Handle manual click for resources
  const handleClick = () => {
    dispatch({ type: 'MANUAL_CLICK' });
    setClickIntensity(prev => Math.min(prev + 0.2, 1));
    
    // Reset the intensity after a short delay
    setTimeout(() => {
      setClickIntensity(prev => Math.max(prev - 0.2, 0));
    }, 200);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-64 bg-lavender-100 rounded-lg overflow-hidden mb-4">
        {/* Game Scene */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center">
          {/* Hero Character */}
          <div className={`relative mx-8 ${reducedAnimations ? '' : 'hover:scale-105 transition-transform'}`}>
            <div className="w-16 h-16 bg-pink-200 rounded-full overflow-hidden relative">
              <img 
                src="/assets/images/hero.png" 
                alt="Hero"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23ffc0cb'/%3E%3Cpath d='M32 16 C 24 24, 24 40, 32 48 C 40 40, 40 24, 32 16' fill='%23ff79a8'/%3E%3Ccircle cx='24' cy='28' r='4' fill='%23333'/%3E%3Ccircle cx='40' cy='28' r='4' fill='%23333'/%3E%3Cpath d='M28 40 C 30 42, 34 42, 36 40' stroke='%23333' stroke-width='2' fill='none'/%3E%3Crect x='28' y='10' width='8' height='4' fill='%23ff0'/%3E%3C/svg%3E";
                }} 
              />
            </div>
            <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-300"></div> {/* Headband */}
          </div>

          {/* Enemy Character */}
          {currentEnemy && (
            <div 
              className={`relative mx-8 ${
                reducedAnimations ? '' : 'animate-bounce'
              }`}
              style={{ animationDuration: '3s' }}
            >
              <div className="w-16 h-16 bg-purple-200 rounded-full overflow-hidden">
                <img 
                  src={`/assets/images/${currentEnemy.sprite}`}
                  alt={currentEnemy.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23c8a2c8'/%3E%3Cpath d='M20 20 L28 16 L36 16 L44 20 L48 28 L48 36 L44 44 L36 48 L28 48 L20 44 L16 36 L16 28 Z' fill='%239370db'/%3E%3Ccircle cx='24' cy='28' r='4' fill='%23ff0'/%3E%3Ccircle cx='40' cy='28' r='4' fill='%23ff0'/%3E%3Cpath d='M28 40 C 30 44, 34 44, 36 40' stroke='%23000' stroke-width='2' fill='none'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="mt-1 text-center text-xs font-bold">{currentEnemy.name}</div>
            </div>
          )}
        </div>
      </div>

      {/* Click Area */}
      <button
        onClick={handleClick}
        className={`mt-4 w-40 h-40 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 shadow-lg flex items-center justify-center text-2xl font-bold transition-all ${
          reducedAnimations ? '' : 'hover:scale-105'
        }`}
        style={{ 
          transform: `scale(${1 + clickIntensity * 0.1})`,
          boxShadow: `0 0 ${clickIntensity * 20}px ${clickIntensity * 10}px rgba(236, 72, 153, 0.5)`
        }}
      >
        CLICK ME
      </button>

      <div className="mt-4 text-sm text-gray-600 text-center">
        Each click gives you resources!<br />
        <span className="text-xs italic">Auto-clicking happens every second</span>
      </div>

      {/* Mobile boost button - only visible on small screens */}
      <div className="md:hidden mt-6">
        <BoostButton reducedAnimations={reducedAnimations} />
      </div>
    </div>
  );
}

export default MainGame;