// src/hooks/useGameLoop.js
import { useEffect, useRef } from 'react';

/**
 * Custom hook that sets up the main game loop
 * @param {Function} dispatch - The dispatch function from the game reducer
 */
function useGameLoop(dispatch) {
  const lastTickRef = useRef(Date.now());
  
  useEffect(() => {
    // Set up the game loop
    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = (now - lastTickRef.current) / 1000; // Convert to seconds
      lastTickRef.current = now;
      
      // Cap the delta time to prevent huge jumps after tab inactivity
      const cappedDeltaTime = Math.min(deltaTime, 1);
      
      // Dispatch a tick action with the time delta
      dispatch({ type: 'TICK', payload: { deltaTime: cappedDeltaTime } });
      
      // Schedule the next frame
      requestAnimationFrame(gameLoop);
    };
    
    // Start the game loop
    const animationFrameId = requestAnimationFrame(gameLoop);
    
    // Clean up function
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dispatch]);
}

export default useGameLoop;