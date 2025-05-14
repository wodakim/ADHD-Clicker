// src/utils/gameUtils.js
/**
 * Calculate the total stats from all equipped items
 * @param {Object} equippedItems - Object containing all equipped items
 * @returns {Object} - Object with total multiplier values
 */
export const calculateTotalStats = (equippedItems) => {
  const totalStats = {
    energyMultiplier: 1, // Base multiplier
    moneyMultiplier: 1,  // Base multiplier
    insanityMultiplier: 1 // Base multiplier
  };
  
  // Iterate through all equipped items
  Object.values(equippedItems).forEach(item => {
    if (!item) return; // Skip empty slots
    
    // Add stats from the item
    if (item.stats.energy) {
      totalStats.energyMultiplier += item.stats.energy;
    }
    if (item.stats.money) {
      totalStats.moneyMultiplier += item.stats.money;
    }
    if (item.stats.insanity) {
      totalStats.insanityMultiplier += item.stats.insanity;
    }
  });
  
  return totalStats;
};

/**
 * Format a large number to a more readable format
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return Math.floor(num).toString();
};

/**
 * Calculate the experience needed for the next level using a curve
 * @param {number} currentLevel - The player's current level
 * @returns {number} - Experience points needed for next level
 */
export const calculateExpForNextLevel = (currentLevel) => {
  return Math.floor(100 * Math.pow(1.5, currentLevel - 1));
};

/**
 * Check if a quest is available based on level and completion status
 * @param {Object} quest - The quest to check
 * @param {number} playerLevel - The player's current level
 * @param {Array} completedQuests - Array of completed quest IDs
 * @param {Array} activeQuests - Array of active quests
 * @returns {boolean} - Whether the quest is available
 */
export const isQuestAvailable = (quest, playerLevel, completedQuests, activeQuests) => {
  return (
    quest.levelRequired <= playerLevel &&
    !completedQuests.includes(quest.id) &&
    !activeQuests.some(aq => aq.id === quest.id)
  );
};