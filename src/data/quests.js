// List of quests that players can complete in the game
export const quests = [
  {
    id: 'q1',
    name: 'Catch the Ghost Cat',
    description: 'There\'s a spectral feline haunting the abandoned kitchen. It keeps knocking over ghost cups. Catch it.',
    levelRequired: 1,
    giver: 'Tired Exorcist',
    startDialogue: 'Listen, I\'m too exhausted to deal with another haunting. Could you catch that ghost cat? It keeps walking through my legs at 3 AM.',
    completionDialogue: 'You... put it in a cardboard box? And it STAYED? I\'ve wasted my entire career.',
    rewards: [
      { type: 'energy', amount: 5 },
      { type: 'insanity', amount: 10 },
      { type: 'experience', amount: 25 },
      { type: 'item', itemId: 2 } // Zombie Dentures
    ]
  },
  {
    id: 'q2',
    name: 'Survive the Meeting',
    description: 'Sit through a 30-second corporate meeting without falling asleep or losing your mind.',
    levelRequired: 1,
    giver: 'Middle Manager',
    startDialogue: 'We need to sync up about the deliverables for the Q4 strategic initiatives vis-à-vis our core competencies and... are you still awake?',
    completionDialogue: 'I can\'t believe you made it through that without screaming even once. You\'re management material.',
    rewards: [
      { type: 'money', amount: 15 },
      { type: 'experience', amount: 20 },
      { type: 'item', itemId: 4 } // Corporate Necktie
    ]
  },
  {
    id: 'q3',
    name: 'Untangle the Cosmic Headphones',
    description: 'The universe\'s headphones are tangled. Fix them before reality crashes.',
    levelRequired: 2,
    giver: 'Anxious Deity',
    startDialogue: 'I put the cosmic headphones in my pocket for ONE eternal second and now they\'re more tangled than the timelines I messed up last week.',
    completionDialogue: 'How did you... I spent eons trying to... You know what, keep them. They\'re haunted anyway.',
    rewards: [
      { type: 'energy', amount: 10 },
      { type: 'insanity', amount: 15 },
      { type: 'experience', amount: 30 },
      { type: 'item', itemId: 8 } // Haunted Headphones
    ]
  },
  {
    id: 'q4',
    name: 'Debug the Void',
    description: 'The void has a null pointer exception. Fix it without looking directly at it.',
    levelRequired: 2,
    giver: 'IT Support Spirit',
    startDialogue: 'Have you tried turning the existential void off and on again? No? Fine, I\'ll open a ticket. Your soul warranty might be voided though.',
    completionDialogue: 'You fixed it by inserting a semicolon? Unbelievable. The void has been running without one since the big bang.',
    rewards: [
      { type: 'money', amount: 20 },
      { type: 'insanity', amount: 20 },
      { type: 'experience', amount: 35 },
      { type: 'item', itemId: 3 } // Tinfoil Hat
    ]
  },
  {
    id: 'q5',
    name: 'Find Your Missing Sock',
    description: 'Journey to the interdimensional dryer where all lost socks go.',
    levelRequired: 3,
    giver: 'Barefoot Wizard',
    startDialogue: 'One does not simply walk into the Laundromat of Eternity. Your sock awaits, but beware the static cling of doom.',
    completionDialogue: 'You found quantum socks instead? Even better! They\'ll both simultaneously match and not match with everything.',
    rewards: [
      { type: 'energy', amount: 15 },
      { type: 'experience', amount: 40 },
      { type: 'item', itemId: 7 } // Quantum Socks
    ]
  },
  {
    id: 'q6',
    name: 'Defeat the Vending Machine',
    description: 'It ate your money and refuses to give you a snack. Time for revenge.',
    levelRequired: 3,
    giver: 'Hangry Coworker',
    startDialogue: 'That vending machine is pure evil. It just sits there... judging us... eating our coins... MOCKING OUR HUNGER.',
    completionDialogue: 'You tipped it over?! I was thinking more like a refund, but I respect the direct approach.',
    rewards: [
      { type: 'money', amount: 25 },
      { type: 'energy', amount: 15 },
      { type: 'experience', amount: 45 },
      { type: 'item', itemId: 5 } // Rubber Chicken
    ]
  },
  {
    id: 'q7',
    name: 'Recover Lost Time',
    description: 'Your procrastination caused a time debt. Recover at least 1 hour from the void.',
    levelRequired: 4,
    giver: 'Future You',
    startDialogue: 'Hey, it\'s you from next week. We\'re STILL behind on everything. Could you please stop scrolling and fix this time paradox?',
    completionDialogue: 'Thanks for the temporal bailout. I\'d tell you what happens tomorrow, but that would just create another paradox.',
    rewards: [
      { type: 'energy', amount: 30 },
      { type: 'insanity', amount: 15 },
      { type: 'experience', amount: 50 },
      { type: 'item', itemId: 6 } // Expired Coffee
    ]
  },
  {
    id: 'q8',
    name: 'Interpret Cat Demands',
    description: 'The neighborhood cat is staging a protest. Figure out what it wants.',
    levelRequired: 4,
    giver: 'Confused Pet Owner',
    startDialogue: 'My cat has been sitting in that spot meowing for three days straight. Is he broken? What does he WANT from me?!',
    completionDialogue: 'World domination? That\'s it? I thought it would be something complicated. At least he\'s purring now.',
    rewards: [
      { type: 'money', amount: 30 },
      { type: 'energy', amount: 15 },
      { type: 'experience', amount: 55 }
    ]
  },
  {
    id: 'q9',
    name: 'Find the Pizza of Destiny',
    description: 'Legends speak of a pizza so perfect, one slice grants eternal satisfaction. Or heartburn.',
    levelRequired: 5,
    giver: 'Oracle Foodie',
    startDialogue: 'I have foreseen your quest in the bottom of my coffee cup. Seek the Pizza of Destiny, with pineapple and... no wait, that\'s just wrong.',
    completionDialogue: 'The prophecy is fulfilled! The t-shirt stains DO match the ancient pizza map! Wear it with pride, chosen one.',
    rewards: [
      { type: 'energy', amount: 40 },
      { type: 'money', amount: 30 },
      { type: 'experience', amount: 60 },
      { type: 'item', itemId: 9 } // Pizza-Stained T-shirt
    ]
  },
  {
    id: 'q10',
    name: 'Confront Your Browser History',
    description: 'Your browser history has gained sentience and is judging you. Clear it... if you can.',
    levelRequired: 5,
    giver: 'Digital Therapist',
    startDialogue: 'Your search history is projecting negative energy. It\'s become a digital manifestation of your 3AM curiosity. Very concerning.',
    completionDialogue: 'You defeated it with incognito mode? That\'s just suppressing the problem, but I\'ll count it as progress.',
    rewards: [
      { type: 'insanity', amount: 30 },
      { type: 'money', amount: 35 },
      { type: 'experience', amount: 70 },
      { type: 'item', itemId: 10 } // ERROR 404: Weapon Not Found
    ]
  }
];