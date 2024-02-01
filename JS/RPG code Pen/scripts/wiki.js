const races = {
    human: { name: 'human', str: 0.9, agi: 0.9, int: 1.2 },
    orc: { name: 'orc', str: 1.2, agi: 1, int: 0.8 },
    elf: { name: 'elf', str: 0.8, agi: 1.2, int: 1 },
    dwarf: { name: 'elf', str: 0.8, agi: 1.2, int: 1 }
  }
  
  const names = {
    human: {
      male: ['Quincy', 'Josh', 'Ywan', 'Castor', 'Seabrook', 'Valerianus', 'Theron', 'Alphonso', 'Valentiniano', 'Adison', 'Webster', 'Blaisdell', 'Baruch', 'Fielding', 'Glenn', 'Onno', 'Dillan', 'Thane', 'Wernher', 'Urija'],
      female: ['Leander', 'Clarissa', 'Udella', 'Orva', 'Afrodille', 'Reilly', 'Merlyn', 'India', 'Alana', 'Ulita', 'Cassandra', 'Rolanda', 'Vera', 'Ollie', 'Benedetta', 'Darcel', 'Ella', 'Jasmina', 'Camryn', 'Gwendolyn']
    },
    orc: {
      male: ['Ogdenge', 'Mur', 'Cavnold', 'Arugg', 'Thriknezesh', 'Briduz', 'Trurgaz', 'Brolni', 'Kruhlnorn', 'Kavnan', "Krokzu'gak", 'Hozhorurn', 'Cinok', 'Uloch', 'Ogzon', 'Covzast', 'Mash', 'Kevnar', 'Armornuld'],
      female: ['Shase', 'Ogaldre', 'Shargas', 'Kemza', 'Fuza', 'Omze', 'Grumu', 'Kihgo', 'Shenulit', 'Shonza', 'Kutze', 'Enzy', 'Tisdezdes', 'Fuzdragym', 'Ady', 'Mohleli', 'Getzi', 'Rohlas', "Oz'rordy", 'Uldigg']
    },
    elf: {
      female: ['Shane', 'Nanni', 'Fioya', 'Shiariel','Mina', 'Mewyn', 'Nesiahari', 'Athelle', 'Shaewen', 'Arilora', 'Shane', 'Nanni', 'Fioya', 'Oranaril', 'Velva', 'Risa', 'Valylwyn', 'Marrill', 'Lall', 'Rirana', 'Fiolanna', 'Dill', 'Kalva'],
      male: ['Alrian', 'Thelan', 'Ferand', 'Tamlasan', 'Felassan', 'Deygan', 'Lemrion', 'Sethorn', 'Varmet', 'Pithorn', 'Lemnarel', 'Atdor', 'Yevcen', 'Felvel', 'Lemthorn', 'Hathorn', 'Alarian', 'Garis', 'Samnarel', 'Deydor']
    }
  }
  
  const jobs = {
    warrior: { name: 'warrior', str: 14, agi: 10, int: 6, lck: 0, activeSkill: 'bash', imgUrl: 'img/jobs/warrior.gif' },
    thief: { name: 'thief', str: 8, agi: 14, int: 8, lck: 0, activeSkill: 'mug', imgUrl: 'img/jobs/thief.gif' },
    mage: { name: 'mage', str: 6, agi: 8, int: 16, lck: 0, activeSkill: 'fire', imgUrl: 'img/jobs/mage.gif' },
    priest: { name: 'priest', str: 8, agi: 6, int: 16, lck: 0, activeSkill: 'heal', imgUrl: 'img/jobs/priest.gif' }
  }
  
  const traits = {
    strong: { name: 'the Strong', attr: 'str', mod: 'multiply', amount: 1.2 },
    cunning: { name: 'the Cunning', attr: 'int', mod: 'multiply', amount: 1.2 },
    quick: { name: 'the Quick', attr: 'agi', mod: 'multiply', amount: 1.2 },
    lucky: { name: 'the Lucky', attr: 'lck', mod: 'add', amount: 1 }
  }
  
  const enemies = {
    bat: { name: 'Bat', givesExp: 40, str: 3, agi: 5, int: 1, lck: 0, arm: 3, imgUrl: 'img/monsters/bat.gif' },
    bee: { name: 'Bee', givesExp: 40, str: 3, agi: 5, int: 1, lck: 0, arm: 3, imgUrl: 'img/monsters/bee.gif' },
    blob: { name: 'Blob', givesExp: 40, str: 3, agi: 5, int: 1, lck: 0, arm: 3, imgUrl: 'img/monsters/blob.gif' }
  }
  
  const skills = {
    bash: { name: 'Bash', level: 1, type: 'dmg', dmgType: 'phys', power: 10, effect: 'stun', effectDuration: 1, chanceToUse: 15},// Dmg 20 = same as normal dmg
    mug: { name: 'Mug', level: 1, type: 'dmg', dmgType: 'phys', power: 10, effect: 'stealGold', effectDuration: 0, chanceToUse: 20},// Dmg 20 = same as normal dmg
    fire: { name: 'Fire', level: 1, type: 'dmg', dmgType: 'fire', power: 12, effect: 'none', effectDuration: 0, chanceToUse: 25}, // dmg 20 = same as int
    heal: { name: 'Heal', level: 1, type: 'heal', dmgType: null, power: 12, effect: 'none', effectDuration: 0, chanceToUse: 20}
  }
  
  