import React from 'react';
import { useGame } from '../contexts/GameContext';
import BoostButton from './BoostButton';

function ResourceDisplay({ reducedAnimations }) {
  const { state } = useGame();
  const { resources, level, boostActive } = state;
  
  const getResourceAnimation = (resourceName) => {
    if (reducedAnimations) return '';
    
    switch (resourceName) {
      case 'energy':
        return 'animate-pulse';
      case 'money':
        return 'animate-bounce';
      case 'insanity':
        return 'animate-spin';
      default:
        return '';
    }
  };

  const getResourceEmoji = (resourceName) => {
    switch (resourceName) {
      case 'energy': return '⚡';
      case 'money': return '💰';
      case 'insanity': return '🌀';
      default: return '';
    }
  };

  const getResourceColor = (resourceName) => {
    switch (resourceName) {
      case 'energy': return 'from-yellow-200 to-yellow-400';
      case 'money': return 'from-green-200 to-green-400';
      case 'insanity': return 'from-purple-200 to-purple-400';
      default: return '';
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-100 px-4 py-2 rounded-full">
          <span className="font-bold">Level: {level}</span>
        </div>
        <BoostButton reducedAnimations={reducedAnimations} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(resources).map(([key, value]) => (
          <div 
            key={key}
            className={`bg-gradient-to-r ${getResourceColor(key)} p-4 rounded-lg shadow-md flex flex-col items-center justify-center ${boostActive ? 'ring-2 ring-red-400' : ''} ${getResourceAnimation(key)}`}
          >
            <div className="text-2xl mb-1">{getResourceEmoji(key)}</div>
            <div className="text-lg font-bold capitalize">{key}</div>
            <div className="text-xl">{Math.floor(value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceDisplay;