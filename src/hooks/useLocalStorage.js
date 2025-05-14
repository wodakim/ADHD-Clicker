// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Custom hook to handle local storage interactions with automatic serialization/deserialization
 * @param {string} key - The local storage key
 * @param {*} initialValue - The initial value if nothing exists in storage
 * @returns {[*, Function]} - The current value and a setter function
 */
function useLocalStorage(key, initialValue) {
  // Helper to get the initial state
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      // Check if the item exists
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  };

  // State to store our value
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Update local storage when the state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;