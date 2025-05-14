import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';

function QuestPanel() {
  const { state, dispatch } = useGame();
  const { quests, activeQuests, completedQuests } = state;
  const [selectedQuest, setSelectedQuest] = useState(null);

  const handleStartQuest = (questId) => {
    dispatch({ type: 'START_QUEST', payload: { questId } });
  };

  const handleAbandonQuest = (questId) => {
    dispatch({ type: 'ABANDON_QUEST', payload: { questId } });
  };

  const handleCompleteQuest = (questId) => {
    dispatch({ type: 'COMPLETE_QUEST', payload: { questId } });
    setSelectedQuest(null);
  };

  // Filter available quests by level requirements
  const availableQuests = quests.filter(quest => 
    !activeQuests.some(aq => aq.id === quest.id) && 
    !completedQuests.includes(quest.id) &&
    quest.levelRequired <= state.level
  );

  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-4">Quests</h2>
      
      {/* Active Quests */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Active Quests</h3>
        {activeQuests.length === 0 ? (
          <div className="text-center py-4 text-gray-500 italic">
            No active quests. Start one below!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {activeQuests.map(quest => (
              <div key={quest.id} className="bg-green-100 p-3 rounded-lg">
                <div className="flex justify-between">
                  <h4 className="font-medium">{quest.name}</h4>
                  <div className="text-sm">Progress: {Math.floor(quest.progress * 100)}%</div>
                </div>
                <div className="text-sm mt-1">{quest.description}</div>
                <div className="mt-2 flex space-x-2">
                  {quest.progress >= 1 && (
                    <button 
                      onClick={() => handleCompleteQuest(quest.id)}
                      className="bg-green-300 hover:bg-green-400 px-3 py-1 rounded text-sm"
                    >
                      Complete
                    </button>
                  )}
                  <button 
                    onClick={() => handleAbandonQuest(quest.id)}
                    className="bg-red-200 hover:bg-red-300 px-3 py-1 rounded text-sm"
                  >
                    Abandon
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Quests */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Available Quests</h3>
        {availableQuests.length === 0 ? (
          <div className="text-center py-4 text-gray-500 italic">
            No quests available. Level up to unlock more!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {availableQuests.map(quest => (
              <div key={quest.id} className="bg-blue-100 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{quest.name}</h4>
                    <div className="text-xs text-gray-600">Level: {quest.levelRequired}</div>
                    <div className="text-sm mt-1">{quest.description}</div>
                  </div>
                  <button 
                    onClick={() => handleStartQuest(quest.id)}
                    className="bg-blue-300 hover:bg-blue-400 px-3 py-1 rounded text-sm"
                  >
                    Start
                  </button>
                </div>
                <div className="mt-2 text-xs">
                  <span className="font-semibold">Rewards:</span> {quest.rewards.map(reward => 
                    `${reward.type}: ${reward.amount}`
                  ).join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Quests */}
      {completedQuests.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Completed Quests</h3>
          <div className="text-sm text-gray-600">
            {completedQuests.length} quest(s) completed
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestPanel;