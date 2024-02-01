const equip = {
    mainHand: {
      sword: { name: 'sword', mainStat: 'dmg', itemType: 'mainHand', mods: { dmg: 5} },
      dagger: { name: 'dagger', mainStat: 'dmg', itemType: 'mainHand', mods: { dmg: 3 } },
      wand: { name: 'wand', mainStat: 'dmg', itemType: 'mainHand', mods: { dmg: 2 } }
    },
    twoHand: {
      greatsword: { name: 'greatsword', mainStat: 'dmg', itemType: 'twoHand', mods: { dmg: 7 } },
      bow: { name: 'bow', mainStat: 'dmg', itemType: 'twoHand', mods: { dmg: 6 } },
      staff: { name: 'staff', mainStat: 'dmg', itemType: 'twoHand', mods: { dmg: 4 } }
    },
    offHand: {
      shield: { name: 'shield', mainStat: 'armor', itemType: 'offHand', mods: { armor: 5 } },
      spellbook: { name: 'spellbook', mainStat: 'int', itemType: 'offHand', mods: { int: 2 } }
    },
    armor:   {
      heavyArmor: { name: 'plate armor', mainStat: 'armor', itemType: 'armor', mods: { armor: 10 } },
      lightArmor: { name: 'leather armor', mainStat: 'armor', itemType: 'armor', mods: { armor: 4 } },
      robes: { name: 'mage robes', mainStat: 'armor', itemType: 'armor', mods: { armor: 1 } }
    },
    trinket: {
      ring: { name: 'silver ring', mainStat: 'int', itemType: 'trinket', mods: { int: 5 } }
    }
  }
  
  const eqMods = {
    all: {
      strAdd: { type: 'str', mod: 'add', amount: 4 },
      agiAdd: { type: 'agi', mod: 'add', amount: 4 },
      intAdd: { type: 'int', mod: 'add', amount: 4 },
      lckAdd: { type: 'lck', mod: 'add', amount: 1 }
    },
    armor: {
      armorAdd: { type: 'armor', mod: 'add', amount: 5 },
      hpAdd: { type: 'hpMax', mod: 'add', amount: 10 },
      hpMulti: { type: 'hpMulti', mod: 'multiply', amount: 10 }
    },
    weapon: {
      physDmgAdd: { name: 'added dmg', type: 'dmg', mod: 'add', amount: 4 },
      physDmgMulti: { name: 'more dmg', type: 'dmgMulti', mod: 'multiply', amount: 20 }
    }
  }
  
  const consumables = {
    potion: { name: 'Potion I', type: 'heal', amount: '20', value: '25' },
    potion2: { name: 'Potion II', type: 'heal', amount: '50', value: '100' }
  }