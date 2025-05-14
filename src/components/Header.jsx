import React, { useState } from 'react';

function Header({ accessibilitySettings, setAccessibilitySettings }) {
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <header className="text-center mb-6 relative">
      <div className="flex justify-between items-center">
        <div className="w-10"></div> {/* Spacer */}
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 animate-pulse">
          Absurd RPG Idle
        </h1>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 hover:bg-blue-200 transition-colors"
          aria-label="Accessibility settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      
      {showSettings && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 border border-purple-200">
          <h3 className="font-bold mb-2 text-gray-700">Accessibility</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={accessibilitySettings.reducedAnimations}
                onChange={() => setAccessibilitySettings({
                  ...accessibilitySettings,
                  reducedAnimations: !accessibilitySettings.reducedAnimations
                })}
                className="rounded text-purple-500"
              />
              <span>Reduce animations</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={accessibilitySettings.largerText}
                onChange={() => setAccessibilitySettings({
                  ...accessibilitySettings,
                  largerText: !accessibilitySettings.largerText
                })}
                className="rounded text-purple-500"
              />
              <span>Larger text</span>
            </label>
          </div>
        </div>
      )}
      
      <p className="text-gray-600 mt-2 italic">
        "Where absurdity meets idle clicking addiction"
      </p>
    </header>
  );
}

export default Header;