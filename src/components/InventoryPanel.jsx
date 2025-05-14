import React from 'react';
import { useGame } from '../contexts/GameContext';
import { calculateTotalStats } from '../utils/gameUtils';

function InventoryPanel() {
  const { state, dispatch } = useGame();
  const { inventory, equippedItems } = state;
  const totalStats = calculateTotalStats(equippedItems);

  const handleEquipItem = (itemId) => {
    dispatch({ type: 'EQUIP_ITEM', payload: { itemId } });
  };

  const handleUnequipItem = (itemId, slot) => {
    dispatch({ type: 'UNEQUIP_ITEM', payload: { itemId, slot } });
  };

  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-4">Inventory</h2>
      
      {/* Stats Section */}
      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Current Stats</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-100 p-2 rounded text-center">
            <div className="text-sm text-gray-600">Energy Mult</div>
            <div className="font-bold">x{totalStats.energyMultiplier.toFixed(2)}</div>
          </div>
          <div className="bg-blue-100 p-2 rounded text-center">
            <div className="text-sm text-gray-600">Money Mult</div>
            <div className="font-bold">x{totalStats.moneyMultiplier.toFixed(2)}</div>
          </div>
          <div className="bg-blue-100 p-2 rounded text-center">
            <div className="text-sm text-gray-600">Insanity Mult</div>
            <div className="font-bold">x{totalStats.insanityMultiplier.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Equipped Items */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Equipped</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(equippedItems).map(([slot, item]) => (
            <div key={slot} className="bg-pink-100 p-2 rounded-lg">
              <div className="text-sm text-gray-600 capitalize">{slot}</div>
              {item ? (
                <div className="flex justify-between items-center">
                  <div>{item.name}</div>
                  <button 
                    onClick={() => handleUnequipItem(item.id, slot)}
                    className="text-xs bg-pink-300 hover:bg-pink-400 px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="text-gray-500 italic">Empty</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Items */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Available Items</h3>
        {inventory.length === 0 ? (
          <div className="text-center py-4 text-gray-500 italic">
            You have no items yet. Complete quests to find absurd equipment!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
            {inventory.map(item => (
              <div key={item.id} className="bg-purple-100 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-600">
                    {item.slotType} • {Object.entries(item.stats).map(([stat, value]) => (
                      `${stat.charAt(0).toUpperCase() + stat.slice(1)}: +${value}`
                    )).join(', ')}
                  </div>
                  <div className="text-xs italic mt-1">{item.description}</div>
                </div>
                <button 
                  onClick={() => handleEquipItem(item.id)}
                  className="ml-2 bg-purple-300 hover:bg-purple-400 px-3 py-1 rounded text-sm"
                >
                  Equip
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryPanel;