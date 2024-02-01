function randomizeHero() {
    return new Hero('human', 'male')
  }
  
  function createNewFragment(fragment, newId, newClass, info) {
    let newDiv = document.createElement('div')
    newDiv.id = (newId || '')
    newDiv.className = (newClass || '')
    newDiv.textContent = info
    fragment.append(newDiv) // adding divs to a fragment, adding whole fragment to the dom later
  }
  
  // Take the chars totalAttributes (with traits etc) + total attributes of gear and return total
  function addItemAttrsToChar(charAttrs, charEq) {
    let attrAdd = {}, attrWithEq = {...charAttrs}, equip = charEq
    //Loop through all equip slots and items and add together attrs
    for (const key in equip) {
      let currentMod = equip[key].mods
      for (const key in currentMod) {
        if (key in attrAdd) { attrAdd[key] += currentMod[key] }
        else { attrAdd[key] = currentMod[key] }
      }
    }
    //Add attrs from gear with attrs from charTotal to new object
    for (const key in attrAdd) {
      if (key in attrWithEq) { attrWithEq[key] += attrAdd[key] }
      else { attrWithEq[key] = attrAdd[key] }
    }
    return attrWithEq
  }
  
  // Hero constructor (params as strings eg: 'orc', 'thief' etc)
  function Hero(race, gender, job, trait) {
    this.isHero = true
    this.level = 1
    this.exp = 0
    this.expToLvl = 100
    this.gold = 0
    this.race = (races[race] || rndFromObject(races)) // Random race
    this.gender = (gender || rndFromArray(Object.keys(names[this.race.name]))) // Random gender
    this.name = rndFromArray(names[this.race.name][this.gender]) // Random name
    this.job = {...(jobs[job] || rndFromObject(jobs))} // Random job
    this.imgUrl = this.job.imgUrl
    this.trait = (traits[trait] || {...rndFromObject(traits)})
    this.attr = { str: this.job.str, agi: this.job.agi, int: this.job.int, lck: this.job.lck }
    this.attrWithTrait = { str: this.attr.str * this.race.str, agi: this.attr.agi * this.race.agi, int: this.attr.int * this.race.int, lck: this.attr.lck }
    this.attrWithTrait = floorAttrObj( calcAttr(this.attrWithTrait, this.trait) ) // Apply traitbonuses to attributes and floor them
    // Create equipment object
    this.equipment = {}
    this.twoHandedEquipped = false
    if (rndNum(2,0) === 0) { this.twoHandedEquipped = false } else { this.twoHandedEquipped = true }
    if (!this.twoHandedEquipped) {
      this.equipment.mainHand = new Equipment('mainHand')
      this.equipment.offHand = new Equipment('offHand')
    } else { this.equipment.twoHand = new Equipment('twoHand') }
    this.equipment.armor = new Equipment('armor')
    this.equipment.trinket = new Equipment('trinket')
    //this.attrTotal = addItemAttrsToChar(this.attrWithTrait, this.equipment)
    this.calcAttrTotal = function() {
      this.attrTotal =  addItemAttrsToChar(this.attrWithTrait, this.equipment)
      this.attrTotal.dmg = Math.floor( (((this.attrTotal.str*2) + this.attrTotal.agi) / 3) + (this.attrTotal.dmg || 1) )
      this.attrTotal.vamp = Math.floor(this.attrTotal.lck + (this.attrTotal.int - 10) / 2)/10
      if (this.attrTotal.dmgMulti > 0) {  this.attrTotal.dmg = Math.floor( this.attrTotal.dmg * ( 1 + (this.attrTotal.dmgMulti/100)) ) }
      this.hpMax = 30 + (this.attrTotal.str * 3) // Create Base HP from str
      if (this.attrTotal.hpMax > 0) { this.hpMax += this.attrTotal.hpMax } // add hp from items 
      if (this.attrTotal.hpMulti > 0) { this.hpMax *= (this.attrTotal.hpMulti/100) +1 } // add multi
      this.hpMax = Math.floor(this.hpMax) // floor it
    }
    this.calcAttrTotal()
    
    this.hpLeft = this.hpMax
    if (this.job.activeSkill) {this.activeSkill = {...skills[this.job.activeSkill]} }
    else { this.activeSkill = null }
  }
  
  // Enemy constructor 
  function Enemy(level, race) { 
    this.level = (level || 1)
    this.race = {...(enemies[race] || rndFromObject(enemies))} // Random race
    this.imgUrl = this.race.imgUrl
    this.givesExp = floorNum(this.race.givesExp * (1+ (this.level * 0.1)))
    this.name = this.race.name
    this.attrTotal = { 
      str: floorNum(this.race.str * (1+(this.level*0.25))), 
      agi: floorNum(this.race.agi * (1+(this.level*0.25))), 
      int: floorNum(this.race.int * (1+(this.level*0.25))), 
      lck: floorNum(this.race.lck * (1+(this.level*0.25))) }
    this.hpMax = 10 + (this.attrTotal.str * 5)
    this.hpLeft = this.hpMax
    this.attrTotal.dmg = Math.floor( ((this.attrTotal.str*2) + this.attrTotal.agi) / 3 )
  }
  
  // Calculate attribute bonuses (from trait etc)
  function calcAttr(attrObj, attrModObj) {
    switch(attrModObj.mod) {
      case 'multiply': attrObj[attrModObj.attr] = attrObj[attrModObj.attr] * attrModObj.amount
        break
      case 'add': attrObj[attrModObj.attr] = attrObj[attrModObj.attr] + attrModObj.amount
        break
      case 'subtract': attrObj[attrModObj.attr] = attrObj[attrModObj.attr] - attrModObj.amount
        break
      default:
        break
    }
    return attrObj
  }
  
  // returns an equipment Object
  function Equipment(itemType, rarity) { // itemType = mainHand, offHand, twoHand, armor, trinket (keys in equip Object)
    let playerLvlMulti = ((1 + ( playerHero.level * 0.1 )) || 1 )
    if (!itemType) {itemType = rndFromObject(Object.keys(equip))}
    let item = rndFromObject(equip[itemType])
    let eqModType = ''
    if (itemType === ('twoHand' || 'mainHand') ) { eqModType = 'weapon' } else { eqModType = 'armor' }
    this.item = {...item}
    this.item.mods = {...item.mods} // to combat/fix shallow copy
    this.item.rarity = (rarity || '')
    if (!rarity) { this.item.rarity = rollRarity() }
    let numOfMods = 0
    if (this.item.rarity === 'common') { this.item.value = 10 }
    if (this.item.rarity === 'uncommon') {numOfMods = 2; this.item.value = 50 } // uncommon gets 2 mods
    if (this.item.rarity === 'rare') {numOfMods = 3; this.item.value = 150 } // rare gets 3 mods 
    if (this.item.rarity === 'epic') {numOfMods = 4; this.item.value = 400 } // epic gets 4 mods
    for (let i = 1; i <= numOfMods; i++) {
      let rndModType = rndFromArray([eqModType, 'all']) // Check if mods will choose from specific items type or the all-type
      let mods = this.item.mods
      let rndMod = rndFromObject(eqMods[rndModType])
      if (rndMod.type in this.item.mods) {mods[rndMod.type] += Math.floor(rndMod.amount * playerLvlMulti)} else { mods[rndMod.type] = Math.floor(rndMod.amount * playerLvlMulti) }
    }
    return this.item
  }
  
  // Level up
  function levelUp(char, stat1, stat2) {
    for (const key of Object.keys(char.attrTotal)) {
      let statUp = rndNum(2,0)
      char.attrTotal[key] += statUp     
    }
    playerHero.calcAttrTotal()
    playerHero.hpLeft += (playerHero.level * 5)
    if (playerHero.hpLeft > playerHero.hpMax) { playerHero.hpLeft = playerHero.hpMax }
  }
  
  // upgrade skill
  function upgradeSkill(char) {
    let skill = char.activeSkill
    skill.level += 1
    skill.power += Math.floor(skill.power * 0.1)
    skill.chanceToUse += 1
  }
  
  function rollRarity() {
    let rng = rndNum(100, 1)
    let rarity = ''
    if (rng < 70) {
      rarity = 'common'
    } else if (rng < 90) {
      rarity = 'uncommon'
      numOfMods = 2
    } else if (rng < 98) {
      rarity = 'rare'
      numOfMods = 3
    } else {
      rarity = 'epic'
      numOfMods = 4
    }
    return rarity
  }
  
  function floorAttrObj(attrObj) {
    for(const index in attrObj) { 
      attrObj[index] = Math.floor(attrObj[index])
    }
    return attrObj
  }
  
  function rndFromObject(object) {
    return object[rndFromArray(Object.keys(object))]
  }
  function rndFromArray(list) {
    return list[rndNum(list.length)]
  }
  function rndNum(max, min) {
    return Math.floor(Math.random() * max) + (min || 0);
  }
  function floorNum(num) {
    return Math.floor(num)
  }
  
  function romanize(num) {
    let lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}, roman = '', i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }