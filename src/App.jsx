import { useState, useEffect } from 'react';
import Header from './components/Header';
import ResourceDisplay from './components/ResourceDisplay';
import MainGame from './components/MainGame';
import InventoryPanel from './components/InventoryPanel';
import QuestPanel from './components/QuestPanel';
import DialogueBox from './components/DialogueBox';
import { GameProvider } from './contexts/GameContext';

function App() {
  const [activeTab, setActiveTab] = useState('main');
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    reducedAnimations: false,
    largerText: false
  });

  // Update document title
  useEffect(() => {
    document.title = "Absurd RPG Idle";
  }, []);

  // Apply accessibility settings
  useEffect(() => {
    if (accessibilitySettings.largerText) {
      document.documentElement.classList.add('text-lg');
    } else {
      document.documentElement.classList.remove('text-lg');
    }
  }, [accessibilitySettings]);

  return (
    <GameProvider>
      <div className={`min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 px-4 py-6 ${accessibilitySettings.largerText ? 'text-lg' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <Header 
            accessibilitySettings={accessibilitySettings} 
            setAccessibilitySettings={setAccessibilitySettings} 
          />
          
          <ResourceDisplay reducedAnimations={accessibilitySettings.reducedAnimations} />
          
          {/* Tab Navigation */}
          <div className="flex justify-around mt-4 mb-2 border-b border-purple-300">
            <button 
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'main' ? 'bg-pink-200' : 'bg-transparent'}`} 
              onClick={() => setActiveTab('main')}
            >
              Main
            </button>
            <button 
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'inventory' ? 'bg-pink-200' : 'bg-transparent'}`} 
              onClick={() => setActiveTab('inventory')}
            >
              Inventory
            </button>
            <button 
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'quests' ? 'bg-pink-200' : 'bg-transparent'}`} 
              onClick={() => setActiveTab('quests')}
            >
              Quests
            </button>
          </div>
          
          {/* Content Area */}
          <div className="bg-pink-50 rounded-lg p-4 min-h-[400px] shadow-lg">
            {activeTab === 'main' && <MainGame reducedAnimations={accessibilitySettings.reducedAnimations} />}
            {activeTab === 'inventory' && <InventoryPanel />}
            {activeTab === 'quests' && <QuestPanel />}
          </div>
          
          <DialogueBox />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;