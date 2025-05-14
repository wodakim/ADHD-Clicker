import React, { useEffect, useState } from 'react';
import { useGame } from '../contexts/GameContext';

function DialogueBox() {
  const { state, dispatch } = useGame();
  const { currentDialogue } = state;
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [typingSpeed] = useState(30); // ms per character

  // Handle dialogue appearance/disappearance
  useEffect(() => {
    if (currentDialogue) {
      setVisible(true);
      setTypedText('');
      setTextIndex(0);
    } else {
      setVisible(false);
    }
  }, [currentDialogue]);

  // Typing effect
  useEffect(() => {
    if (!currentDialogue || !visible) return;

    if (textIndex < currentDialogue.text.length) {
      const timer = setTimeout(() => {
        setTypedText(prev => prev + currentDialogue.text.charAt(textIndex));
        setTextIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    }
  }, [currentDialogue, textIndex, visible, typingSpeed]);

  const handleCloseDialogue = () => {
    // If text is still being typed, complete it immediately
    if (currentDialogue && textIndex < currentDialogue.text.length) {
      setTypedText(currentDialogue.text);
      setTextIndex(currentDialogue.text.length);
    } else {
      // Otherwise, close the dialogue
      dispatch({ type: 'CLOSE_DIALOGUE' });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 px-4 pb-4 z-10">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-100 to-blue-100 rounded-t-lg p-4 shadow-lg border border-purple-200">
        <div className="flex justify-between items-start mb-2">
          <div className="font-bold text-lg">{currentDialogue?.speaker || 'Unknown'}</div>
          <button 
            onClick={handleCloseDialogue}
            className="text-gray-500 hover:text-gray-700"
          >
            {textIndex < currentDialogue?.text.length ? 'Skip' : 'Close'}
          </button>
        </div>
        
        <div className="min-h-[60px] text-gray-800">
          {typedText}
          {textIndex < currentDialogue?.text.length && <span className="animate-pulse">|</span>}
        </div>
      </div>
    </div>
  );
}

export default DialogueBox;