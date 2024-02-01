// Interacting with the dom. General stuff

// Define general buttons
const startMenu = document.querySelector('.start-menu')
const newGameBtn = document.querySelector('#new-game-btn')
const rndHeroBtn = document.querySelector('#random-hero-btn')
const heroInfoToggleBtn = document.querySelector('#hero-info-toggle-btn')
const adventureBtn = document.querySelector('#adventure-btn')
const adventureTicker = document.querySelector('.adventure-ticker') 

const battleLootBtn = document.querySelector('#battle-loot-btn')
const heroInfoBackBtn = document.querySelector('#hero-info-back-btn')
const infoBoxWrapper = document.querySelector('.info-box-wrapper')

const innContainer = document.querySelector('.inn-container')
const innText = document.querySelector('.inn-text')
const innToHeroBtn = document.querySelector('#inn-to-hero-info-btn')

const battleContainerDiv = document.querySelector('.battle-container')
const goToHeroInfoBtn = document.querySelector('#go-to-hero-info-btn')

const lootContainer = document.querySelector('.loot-container')
const lootText = document.querySelector('.loot-text')
const lootEquipmentDiv = document.querySelector('.loot-div')
const takeEquipBtn = document.querySelector('#take-equip-btn')
const discardEquipBtn = document.querySelector('#discard-equip-btn')
const lootToHeroInfoBtn = document.querySelector('#loot-to-hero-info-btn')

const trainerContainer = document.querySelector('.trainer-container')
const trainerText = document.querySelector('.trainer-text')
const trainerToHeroInfoBtn = document.querySelector('#trainer-to-hero-info-btn')
const skillTrainerBox = document.querySelector('.skill-trainer-box')
const trainerSkillBox = document.querySelector('.skill-trainer-box')

const shopContainer = document.querySelector('.shop-container')
const shopItemBox = document.querySelector('.shop-item-box')
const shopToHeroInfoBtn = document.querySelector('#shop-to-hero-info-btn')

//Toggle .hero-info-container
/*
const _toggleHeroContainer = () => {
  heroInfoContainer.classList.toggle('hide');
};
heroInfoToggleBtn.addEventListener('click', _toggleHeroContainer); */

const _newGameClick = () => {
  startMenu.classList.toggle('hide');
  heroInfoContainer.classList.toggle('hide');
};
newGameBtn.addEventListener('click', _newGameClick);

let boughtItem, shopItem1, shopItem2, shopItem3
//Toggle .battle-container
let adventuresComplete = 0
const _toggleAdventureContainer = () => {
  adventuresComplete += 1
  adventureTicker.textContent = `Adventures completed: ${adventuresComplete}`
  let rndNumDiv = rndNum(100)
  if (rndNumDiv < 15) {
    // SHOW INN
    let hpGained = (10 + playerHero.level) * 3
    playerHero.hpLeft += hpGained
    if (playerHero.hpLeft > playerHero.hpMax) { playerHero.hpLeft = playerHero.hpMax}
    innText.textContent = `You rest and regain ${hpGained} hp!`
    heroInfoContainer.classList.toggle('hide');
    innContainer.classList.toggle('hide')
  } else if (rndNumDiv < 18) {
    // Show skilltrainer
      upgradeSkill(playerHero)
      addSkillBox(skillTrainerBox, playerHero);
      heroInfoContainer.classList.toggle('hide');
      trainerContainer.classList.toggle('hide');
  } else if (rndNumDiv < 90) {
      // SHOW BATTLE
      battleLootBtn.classList.toggle('hide') // hide loot button until battle is over/won
      heroInfoContainer.classList.toggle('hide');
      battleContainerDiv.classList.toggle('hide');
      enemy = randomizeEnemy()
      // Remove old info from past battles
      while (heroBattleInfoDiv.hasChildNodes()) heroBattleInfoDiv.lastChild.remove()
      while (enemyInfoDiv.hasChildNodes()) enemyInfoDiv.lastChild.remove()
      // Add new info
      addBattlerInfoBox(heroBattleInfoDiv, playerHero)
      addBattlerInfoBox(enemyInfoDiv, enemy)
  } else {
    // SHOW MERCHAN + BUTTONS TO BUY AND EQUIP CHOSEN GEAR
    while (shopItemBox.hasChildNodes()) shopItemBox.lastChild.remove()
    shopItem1 = {...Equipment(rndFromArray(Object.keys(equip)), 'uncommon')}
    shopItem2 = {...Equipment(rndFromArray(Object.keys(equip)), 'rare')}
    shopItem3 = {...Equipment(rndFromArray(Object.keys(equip)), 'epic')}
    createItemBox(shopItem1, shopItemBox, 'choice1');createItemBox(shopItem2, shopItemBox, 'choice2');createItemBox(shopItem3, shopItemBox, 'choice3')
    let elements = document.querySelectorAll('.shop-item-box .hero-info');
      for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function() {
          if(this.classList.contains('choice1') && (playerHero.gold >= shopItem1.value)) {
            equipLoot(shopItem1); playerHero.gold -= shopItem1.value
            shopContainer.classList.toggle('hide'); heroInfoContainer.classList.toggle('hide')
          }
          if(this.classList.contains('choice2') && (playerHero.gold >= shopItem2.value)) {
            equipLoot(shopItem2); playerHero.gold -= shopItem2.value
            shopContainer.classList.toggle('hide'); heroInfoContainer.classList.toggle('hide')
          }
          if(this.classList.contains('choice3') && (playerHero.gold >= shopItem3.value)) {
            equipLoot(shopItem3); playerHero.gold -= shopItem3.value
            shopContainer.classList.toggle('hide'); heroInfoContainer.classList.toggle('hide')
          }
          showHeroInfo()
        });
      }
    heroInfoContainer.classList.toggle('hide')
    shopContainer.classList.toggle('hide')
  }
};
adventureBtn.addEventListener('click', _toggleAdventureContainer);

function equipLoot (newLoot) {
  eq = playerHero.equipment
  if (newLoot.itemType === 'twoHand') {
    playerHero.twoHandedEquipped = true
    if ('mainHand' in eq) { delete eq['mainHand'] }
    if ('offHand' in eq) { delete eq['offHand'] }
  } else if (newLoot.itemType === 'mainHand') {
    playerHero.twoHandedEquipped = false
    if ('offHand' in eq) { delete eq['mainHand'] }
    if ('twoHand' in eq) { delete eq['twoHand'] }
  } else if (newLoot.itemType === 'offHand') {
    playerHero.twoHandedEquipped = false
    if ('offHand' in eq) { delete eq['offHand'] }
    if ('twoHand' in eq) { delete eq['twoHand'] }
  }
  playerHero.equipment[newLoot.itemType] = newLoot
  // Update attrTotal
  playerHero.calcAttrTotal()
  createHpBar(playerHero)
}

// Button from loot scren to hero info
const _lootToHeroInfoBtn = () => {
  showHeroInfo();
  lootContainer.classList.toggle('hide');
  takeEquipBtn.classList.toggle('invisible')
  discardEquipBtn.classList.toggle('invisible')
  heroInfoContainer.classList.toggle('hide');
  lootToHeroInfoBtn.classList.toggle('hide')
};
lootToHeroInfoBtn.addEventListener('click', _lootToHeroInfoBtn)

const _innToHeroInfoBtn = () => {
  showHeroInfo();
  innContainer.classList.toggle('hide')
  heroInfoContainer.classList.toggle('hide')
};
innToHeroBtn.addEventListener('click', _innToHeroInfoBtn)

// Go back from battle to loot screen
let newLoot = {}
const _battleLootBtn = () => {
  battleText.textContent = ''
  startBattleBtn.classList.toggle('invisible')
  lootContainer.classList.toggle('hide');
  battleContainerDiv.classList.toggle('hide');
  while (lootEquipmentDiv.hasChildNodes()) lootEquipmentDiv.lastChild.remove()
  newLoot = new Equipment()
  createItemDiv(newLoot)
  lootText.textContent = `${playerHero.name} got ${enemy.givesExp} exp & ${goldLoot} gold!`
};
battleLootBtn.addEventListener('click', _battleLootBtn)

// Button from skill trainer to hero info
const _trainerToHeroInfoBtn = () => {
  showHeroInfo();
  trainerContainer.classList.toggle('hide')
  heroInfoContainer.classList.toggle('hide')
  while (skillTrainerBox.hasChildNodes()) skillTrainerBox.lastChild.remove()
};
trainerToHeroInfoBtn.addEventListener('click', _trainerToHeroInfoBtn)

// Button from shop to hero info
const _shopToHeroInfoBtn = () => {
  showHeroInfo();
  shopContainer.classList.toggle('hide')
  heroInfoContainer.classList.toggle('hide')
};
shopToHeroInfoBtn.addEventListener('click', _shopToHeroInfoBtn)

// Button to take new equipment and discard old
const _takeEquipBtn = () => {
  let eq = playerHero.equipment
  equipLoot(newLoot)
  createHpBar(playerHero)
  takeEquipBtn.classList.toggle('invisible')
  discardEquipBtn.classList.toggle('invisible')
  lootToHeroInfoBtn.classList.toggle('hide')
}
takeEquipBtn.addEventListener('click', _takeEquipBtn)

// Don't take new item
const _discardEquipBtn = () => {
  takeEquipBtn.classList.toggle('invisible')
  discardEquipBtn.classList.toggle('invisible')
  lootToHeroInfoBtn.classList.toggle('hide')
}
discardEquipBtn.addEventListener('click', _discardEquipBtn)

// go back to main screen from hero info screen
const _heroInfoBackBtn = () => {
  heroInfoContainer.classList.toggle('hide');
  startMenu.classList.toggle('hide');
};
heroInfoBackBtn.addEventListener('click', _heroInfoBackBtn);

// Buying item in shop button
/*
const _shopItemChoiceBtn = () => {
  console.log(this)
};
shopItemChoice.addEventListener('click', _shopItemChoiceBtn);
*/

let playerHero = {}
// Button to get random hero
rndHeroBtn.addEventListener('click',showHeroInfo, true);

function showHeroInfo() {
  if(playerHero.hpLeft > playerHero.hpMax) { playerHero.hpLeft = playerHero.hpMax }
  adventureBtn.classList.remove('invisible')
  rndHeroBtn.classList.add('invisible');
  if (!playerHero.name) { playerHero = randomizeHero() }
  const eq = playerHero.equipment
  while(infoBoxWrapper.hasChildNodes()) infoBoxWrapper.lastChild.remove()
  addHeroInfoBox(infoBoxWrapper)
  addAttrBox(infoBoxWrapper, playerHero)
  if(playerHero.activeSkill) { addSkillBox(infoBoxWrapper, playerHero) }
  //for (const key in playerHero.equipment) {
  if (playerHero.twoHandedEquipped) { createItemBox(eq['twoHand'], infoBoxWrapper) }
  if (eq['mainHand']) { createItemBox(eq['mainHand'], infoBoxWrapper) }
  if (eq['offHand']) { createItemBox(eq['offHand'], infoBoxWrapper) }
  createItemBox(eq['armor'], infoBoxWrapper)
  createItemBox(eq['trinket'], infoBoxWrapper)

  addItemAttrsToChar(playerHero)
}
