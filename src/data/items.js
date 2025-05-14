// List of items that players can find in the game
export const items = [
  {
    id: 1,
    name: 'Ninja Socks',
    description: 'Silent but deadly. Primarily silent.',
    slotType: 'feet',
    levelRequired: 1,
    stats: {
      energy: 0.2,
      money: 0.1,
      insanity: 0
    },
    equipDialogue: 'Your feet are now undetectable. You feel oddly empowered.'
  },
  {
    id: 2,
    name: 'Zombie Dentures',
    description: 'Still has bits of previous owner attached.',
    slotType: 'accessory',
    levelRequired: 1,
    stats: {
      energy: 0,
      money: 0,
      insanity: 0.3
    },
    equipDialogue: 'They chatter when you\'re not looking. Is that normal?'
  },
  {
    id: 3,
    name: 'Tinfoil Hat',
    description: 'Blocks alien transmissions and common sense.',
    slotType: 'head',
    levelRequired: 2,
    stats: {
      energy: 0,
      money: 0,
      insanity: 0.5
    },
    equipDialogue: 'The voices are quieter now, but they sound more... coordinated?'
  },
  {
    id: 4,
    name: 'Corporate Necktie',
    description: 'A fashionable noose for the working class.',
    slotType: 'body',
    levelRequired: 2,
    stats: {
      energy: -0.1,
      money: 0.4,
      insanity: 0.2
    },
    equipDialogue: 'You feel simultaneously more respected and more dead inside.'
  },
  {
    id: 5,
    name: 'Rubber Chicken',
    description: 'The deadliest weapon known to clownkind.',
    slotType: 'weapon',
    levelRequired: 3,
    stats: {
      energy: 0.2,
      money: 0.2,
      insanity: 0.2
    },
    equipDialogue: 'It makes a sad honk when you squeeze it. Somehow, that makes you feel powerful.'
  },
  {
    id: 6,
    name: 'Expired Coffee',
    description: 'Still works, now with extra hallucinations!',
    slotType: 'accessory',
    levelRequired: 3,
    stats: {
      energy: 0.5,
      money: 0,
      insanity: 0.3
    },
    equipDialogue: 'Is it supposed to glow like that? Whatever, you feel AMAZING.'
  },
  {
    id: 7,
    name: 'Quantum Socks',
    description: 'Exist in multiple dimensions. Never match.',
    slotType: 'feet',
    levelRequired: 4,
    stats: {
      energy: 0.3,
      money: 0.3,
      insanity: 0.3
    },
    equipDialogue: 'You\'re pretty sure one of these is phasing in and out of reality.'
  },
  {
    id: 8,
    name: 'Haunted Headphones',
    description: 'They play music from the other side.',
    slotType: 'head',
    levelRequired: 4,
    stats: {
      energy: 0.2,
      money: 0.2,
      insanity: 0.5
    },
    equipDialogue: 'The ghost DJ takes requests, but only plays theremin solos.'
  },
  {
    id: 9,
    name: 'Pizza-Stained T-shirt',
    description: 'The stains form a map to ancient treasures. Or just more pizza.',
    slotType: 'body',
    levelRequired: 5,
    stats: {
      energy: 0.4,
      money: 0.2,
      insanity: 0.1
    },
    equipDialogue: 'You feel oddly comfortable. The pizza stains whisper ancient knowledge.'
  },
  {
    id: 10,
    name: 'ERROR 404: Weapon Not Found',
    description: 'The deadliest weapon is the one that doesn\'t exist.',
    slotType: 'weapon',
    levelRequired: 5,
    stats: {
      energy: 0.5,
      money: 0.5,
      insanity: 0.5
    },
    equipDialogue: 'You swing at the air. The air loses the fight.'
  }
];