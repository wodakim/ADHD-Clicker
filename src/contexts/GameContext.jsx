import React, { createContext, useContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useGameLoop from '../hooks/useGameLoop';
import { items } from '../data/items';
import { quests as initialQuests } from '../data/quests';
import { dialogue as dialogueData } from '../data/dialogue';

// Initial game state
const initialState = {
  resources: {
    energy: 10,
    money: 0,
    insanity: 0
  },
  level: 1,
  experience: 0,
  experienceToNextLevel: 100,
  multipliers: {
    energy: 1,
    money: 1,
    insanity: 1
  },
  inventory: [],
  equippedItems: {
    head: null,
    body: null,
    feet: null,
    accessory: null,
    weapon: null
  },
  quests: initialQuests,
  activeQuests: [],
  completedQuests: [],
  boostActive: false,
  boostTimeRemaining: 0,
  boostCooldown: 0,
  currentDialogue: null,
  heroSprite: 'hero.png',
  currentEnemy: {
    name: 'Astral Panda',
    sprite: 'panda.png',
    health: 50,
    maxHealth: 50
  },
  lastSaved: Date.now()
};

// Game context
const GameContext = createContext();

// Actions
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'TICK':
      const { deltaTime } = action.payload;
      let newState = { ...state };
      
      // Handle resource generation (per second)
      const resourceGain = {
        energy: 0.5 * state.multipliers.energy,
        money: 0.2 * state.multipliers.money,
        insanity: 0.1 * state.multipliers.insanity
      };
      
      // Apply boost if active
      if (state.boostActive) {
        const boostMultiplier = 2;
        Object.keys(resourceGain).forEach(key => {
          resourceGain[key] *= boostMultiplier;
        });
        
        // Update boost time
        newState.boostTimeRemaining -= deltaTime;
        if (newState.boostTimeRemaining <= 0) {
          newState.boostActive = false;
          newState.boostTimeRemaining = 0;
          newState.boostCooldown = 20; // 20 second cooldown
          
          // Show cooldown dialogue
          newState.currentDialogue = {
            speaker: 'Brain',
            text: 'Boost worn off. Time to recharge those neurotransmitters...'
          };
        }
      }
      
      // Update cooldown time if needed
      if (!state.boostActive && state.boostCooldown > 0) {
        newState.boostCooldown -= deltaTime;
        if (newState.boostCooldown < 0) {
          newState.boostCooldown = 0;
          
          // Show boost ready dialogue
          newState.currentDialogue = {
            speaker: 'Brain',
            text: 'TDAH Boost ready! Click it for that sweet dopamine rush!'
          };
        }
      }
      
      // Update quests progress
      if (newState.activeQuests.length > 0) {
        newState.activeQuests = newState.activeQuests.map(quest => {
          // Increase progress based on quest type
          const progressIncrement = deltaTime * 0.05; // Base progress per second
          return {
            ...quest,
            progress: Math.min(1, quest.progress + progressIncrement)
          };
        });
      }
      
      // Apply resource gains
      Object.keys(resourceGain).forEach(key => {
        newState.resources[key] += resourceGain[key] * deltaTime;
      });
      
      // Randomly trigger an NPC dialogue (1% chance per second)
      if (Math.random() < 0.01 * deltaTime && !state.currentDialogue) {
        const randomIndex = Math.floor(Math.random() * dialogueData.random.length);
        newState.currentDialogue = dialogueData.random[randomIndex];
      }
      
      // Return updated state
      return {
        ...newState,
        lastSaved: Date.now()
      };
      
    case 'MANUAL_CLICK':
      const clickMultiplier = state.boostActive ? 2 : 1;
      return {
        ...state,
        resources: {
          energy: state.resources.energy + (1 * state.multipliers.energy * clickMultiplier),
          money: state.resources.money + (0.5 * state.multipliers.money * clickMultiplier),
          insanity: state.resources.insanity + (0.2 * state.multipliers.insanity * clickMultiplier)
        },
        experience: state.experience + 1,
      };
      
    case 'CHECK_LEVEL_UP':
      if (state.experience >= state.experienceToNextLevel) {
        const newLevel = state.level + 1;
        const newExperienceToNextLevel = state.experienceToNextLevel * 1.5;
        
        // Show level up dialogue
        return {
          ...state,
          level: newLevel,
          experience: state.experience - state.experienceToNextLevel,
          experienceToNextLevel: newExperienceToNextLevel,
          currentDialogue: {
            speaker: 'System',
            text: `Congratulations! You reached level ${newLevel}! New quests and items are now available.`
          }
        };
      }
      return state;
      
    case 'ACTIVATE_BOOST':
      if (!state.boostActive && state.boostCooldown <= 0) {
        return {
          ...state,
          boostActive: true,
          boostTimeRemaining: 10, // 10 seconds boost
          currentDialogue: {
            speaker: 'Brain',
            text: 'HYPERFOCUS ACTIVATED! Double resources and animations for 10 seconds!'
          }
        };
      }
      return state;
      
    case 'START_QUEST':
      const { questId } = action.payload;
      const quest = state.quests.find(q => q.id === questId);
      
      if (!quest) return state;
      
      return {
        ...state,
        activeQuests: [...state.activeQuests, { ...quest, progress: 0 }],
        currentDialogue: {
          speaker: quest.giver || 'System',
          text: quest.startDialogue || `Quest started: ${quest.name}`
        }
      };
      
    case 'ABANDON_QUEST':
      return {
        ...state,
        activeQuests: state.activeQuests.filter(q => q.id !== action.payload.questId)
      };
      
    case 'COMPLETE_QUEST':
      const completedQuest = state.activeQuests.find(q => q.id === action.payload.questId);
      
      if (!completedQuest || completedQuest.progress < 1) return state;
      
      // Process rewards
      let newResources = { ...state.resources };
      let newInventory = [...state.inventory];
      let expGain = 0;
      
      completedQuest.rewards.forEach(reward => {
        switch (reward.type) {
          case 'energy':
          case 'money':
          case 'insanity':
            newResources[reward.type] += reward.amount;
            break;
          case 'experience':
            expGain += reward.amount;
            break;
          case 'item':
            const itemToAdd = items.find(i => i.id === reward.itemId);
            if (itemToAdd) {
              newInventory.push(itemToAdd);
            }
            break;
          default:
            break;
        }
      });
      
      // Update state with rewards and completion
      return {
        ...state,
        resources: newResources,
        inventory: newInventory,
        experience: state.experience + expGain,
        activeQuests: state.activeQuests.filter(q => q.id !== action.payload.questId),
        completedQuests: [...state.completedQuests, action.payload.questId],
        currentDialogue: {
          speaker: completedQuest.giver || 'System',
          text: completedQuest.completionDialogue || `Quest completed: ${completedQuest.name}! Rewards claimed.`
        }
      };
      
    case 'EQUIP_ITEM':
      const { itemId } = action.payload;
      const itemToEquip = state.inventory.find(i => i.id === itemId);
      
      if (!itemToEquip) return state;
      
      // If something is already equipped in the slot, add it back to inventory
      let updatedInventory = state.inventory.filter(i => i.id !== itemId);
      const currentlyEquipped = state.equippedItems[itemToEquip.slotType];
      
      if (currentlyEquipped) {
        updatedInventory.push(currentlyEquipped);
      }
      
      // Update multipliers
      const newMultipliers = { ...state.multipliers };
      if (currentlyEquipped) {
        // Remove stats from currently equipped item
        Object.entries(currentlyEquipped.stats).forEach(([stat, value]) => {
          if (newMultipliers[stat]) {
            newMultipliers[stat] -= value;
          }
        });
      }
      
      // Add stats from newly equipped item
      Object.entries(itemToEquip.stats).forEach(([stat, value]) => {
        if (newMultipliers[stat]) {
          newMultipliers[stat] += value;
        }
      });
      
      return {
        ...state,
        inventory: updatedInventory,
        equippedItems: {
          ...state.equippedItems,
          [itemToEquip.slotType]: itemToEquip
        },
        multipliers: newMultipliers,
        currentDialogue: {
          speaker: 'Brain',
          text: `Equipped ${itemToEquip.name}. ${itemToEquip.equipDialogue || ''}`
        }
      };
      
    case 'UNEQUIP_ITEM':
      const { itemId: unequipId, slot } = action.payload;
      const itemToUnequip = state.equippedItems[slot];
      
      if (!itemToUnequip || itemToUnequip.id !== unequipId) return state;
      
      // Update multipliers when unequipping
      const updatedMultipliers = { ...state.multipliers };
      Object.entries(itemToUnequip.stats).forEach(([stat, value]) => {
        if (updatedMultipliers[stat]) {
          updatedMultipliers[stat] -= value;
        }
      });
      
      return {
        ...state,
        inventory: [...state.inventory, itemToUnequip],
        equippedItems: {
          ...state.equippedItems,
          [slot]: null
        },
        multipliers: updatedMultipliers
      };
      
    case 'CLOSE_DIALOGUE':
      return {
        ...state,
        currentDialogue: null
      };
      
    default:
      return state;
  }
};

// Provider component
function GameProvider({ children }) {
  const [savedState, setSavedState] = useLocalStorage('absurdRpgSave', initialState);
  const [state, dispatch] = useReducer(gameReducer, savedState);
  
  // Set up the game loop
  useGameLoop(dispatch);
  
  // Check for level up on each resource update
  useEffect(() => {
    if (state.experience >= state.experienceToNextLevel) {
      dispatch({ type: 'CHECK_LEVEL_UP' });
    }
  }, [state.experience, state.experienceToNextLevel]);
  
  // Save game state after major changes
  useEffect(() => {
    setSavedState(state);
  }, [state.resources, state.level, state.inventory, state.equippedItems, state.completedQuests, setSavedState]);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use the game context
function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export { GameProvider, useGame };