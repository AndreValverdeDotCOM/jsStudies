const startBattleBtn = document.querySelector('#start-battle-btn')

const battleContainer = document.querySelector('.battle-container')
const heroBattleInfoDiv = document.querySelector('.hero-battle-info')
const enemyInfoDiv = document.querySelector('.enemy-info')
//const enemyImg = document.querySelector('.enemy-info #battler-img')
const battleText = document.querySelector('.battle-text')

let enemy = {}

function randomizeEnemy() {
  return new Enemy(playerHero.level)
}

// Add info and image of battler in battle-container 
function addBattlerInfoBox(targetDiv, battler) {
  let fragment = document.createDocumentFragment()
  let battlerImg = document.createElement("img")
  battlerImg.id = 'battler-img'
  battlerImg.src = battler.imgUrl
  fragment.appendChild(battlerImg)
  fragment.appendChild(createHpBar(battler))
  createNewFragment(fragment, 'hp', 'text-box', `${battler.hpLeft}/${battler.hpMax}`)
  createNewFragment(fragment, 'name', 'text-box', `${battler.name}`)
  createNewFragment(fragment, 'level', 'text-box', `level: ${battler.level}`)
  targetDiv.appendChild(fragment);
}

// Start battle
const _startBattle = () => {
  battle(playerHero, enemy);
  startBattleBtn.classList.toggle('invisible')
};
startBattleBtn.addEventListener('click', _startBattle);

let goldLoot = 0

// Actual battle/fight function recursion loop
function battle(char1, char2) {
  battleText.textContent = ''
  doAttack(char1, char2);
}

function createItemDiv(item) {
  let fragment = document.createDocumentFragment()
  lootEquipmentDiv.classList.remove('common', 'uncommon', 'rare', 'epic')
  createNewFragment(fragment, `${item.itemType}-title`, 'text-box title-box', `${item.itemType}`) // fragment, id, class, text
  createNewFragment(fragment, `${item.itemType}-name`, 'text-box title-box', `${item.name}`)
  for (const key of Object.keys(item.mods)) {
    if(key.includes('Multi')) { createNewFragment(fragment, `${item.itemType}-mod`, 'text-box', `${key}: ${item.mods[key]}%`)  }
    else { createNewFragment(fragment, `${item.itemType}-mod`, 'text-box', `${item.mods[key]} ${key}`) }
  }
  lootEquipmentDiv.appendChild(fragment)
  lootEquipmentDiv.classList.add(item.rarity, 'item-box')
}


function updateHp(hpBar, hpText, actor) {
  hpBar.style.width = `${(actor.hpLeft/actor.hpMax)*100}%`
  hpText.textContent = `HP: ${actor.hpLeft}/${actor.hpMax}`
}

function numberVaryQuarter(num) {
  return Math.floor(rndNum(num*1.25, num*0.75))
}

function doAttack(char1, char2){
  let enemyHpBar = document.querySelector('.enemy-info #hp-bar #hp-bar-fill')
  let enemyHpText = document.querySelector('.enemy-info #hp')
  let heroHpBar = document.querySelector('.hero-battle-info #hp-bar #hp-bar-fill')
  let heroHpText = document.querySelector('.hero-battle-info #hp')
  document.querySelector('.enemy-info #battler-img').classList.remove('fainted')
  // Insert check for using skill // TEST
  let dmgDone = numberVaryQuarter( 1 + Math.floor(( char1.attrTotal.dmg/2 - (char2.attrTotal.arm || 0) )))
  let vampirism = Math.floor(dmgDone*char1.attrTotal.vamp)
  let skillUsed = false
  checkStatus(char1)
  if (char1.status !== 'stun') {
    if ( char1.activeSkill ) {
      if ( char1.activeSkill.chanceToUse > rndNum(101,1) ) {
        useSkill(char1, char2, dmgDone)
        skillUsed = true
      }
    }
  }
  // check if stunned or used skill
  if (!skillUsed && char1.status !== 'stun') {
    if (!skillUsed) {
      char2.hpLeft -= dmgDone
      char1.hpLeft += vampirism || 0
      if(char1.hpLeft > playerHero.hpMax){
        char1.hpLeft = playerHero.hpMax
    }
    if(vampirism>0){
        battleText.textContent = `${char1.name} did: ${dmgDone} dmg, heal ${vampirism}`
    }
    else{
        battleText.textContent = `${char1.name} did: ${dmgDone} dmg`
    }
    }
  }
  char1.statusLeft -= 1
  if (char1.statusLeft < 1) {char1.status = ''; char1.statusLeft = 0}
  // update info of hero and enemy (losing hp etc, todo: just change hp and hpbar)
  if(char2.hpLeft < 1) { char2.hpLeft = 0 }
  // Update hp-bars
  updateHp(heroHpBar, heroHpText, playerHero)
  updateHp(enemyHpBar, enemyHpText, enemy)
  // print/show dmg etc
  if(char1.hpLeft > 0 && char2.hpLeft > 0) { 
    setTimeout(function(){
      doAttack(char2, char1);
    }, 2000); 
  } else {
    if(Number(playerHero.hpLeft) > 0) { document.querySelector('.enemy-info #battler-img').classList.add('fainted') }
    else { document.querySelector('.hero-battle-info #battler-img').classList.add('fainted') }
    battleText.textContent += `\r\n${char2.name} fainted. \r\n${char1.name} wins!`
    char1.exp += char2.givesExp
    if (char1.exp >= char1.expToLvl) {
      char1.level += 1; char1.exp = char1.exp-char1.expToLvl; char1.expToLvl *= 1.25;
      levelUp(char1);
      updateHp(heroHpBar, heroHpText, playerHero)
      battleText.textContent += `\r\n${playerHero.name} leveled up to ${playerHero.level} and healed ${playerHero.level * 5} hp`
    }
    goldLoot = numberVaryQuarter(enemy.level * 5)
    playerHero.gold += goldLoot
    battleLootBtn.classList.toggle('hide')
  }
}

function useSkill(attacker, defender) {
  let dmgDone = 0
  let healingDone = 0
  let skill = attacker.activeSkill
  
  if (skill.type === 'heal') {
    healingDone = Math.floor( (skill.power * attacker.attrTotal.int)/20 )
    battleText.textContent = `${attacker.name} healed ${healingDone} hp`
    attacker.hpLeft += healingDone
    if (attacker.hpLeft > attacker.hpMax) { attacker.hpLeft = attacker.hpMax }
  } else if (skill.type === 'dmg') {
    if (skill.dmgType === 'phys') { dmgDone = Math.floor( (skill.power * attacker.attrTotal.dmg)/20 - ((defender.armor/3) || 1 ) ) }
    if (skill.dmgType === 'fire') { dmgDone = Math.floor( (skill.power * attacker.attrTotal.int)/20 - (( defender.armor/5)  || 1) ) }
    if (skill.effect === 'stealGold') { 
      let goldStolen = numberVaryQuarter(skill.power/2)
      battleText.textContent = `${attacker.name} did ${dmgDone} ${skill.dmgType} dmg to ${defender.name} and stole ${goldStolen} gold`
      playerHero.gold += goldStolen
    } else if (skill.effect === 'stun') { 
        defender.status = skill.effect; defender.statusLeft = skill.effectDuration
        battleText.textContent = `${attacker.name} did ${dmgDone} ${skill.dmgType} dmg inflicted ${defender.status} on ${defender.name}`
    } else {
      battleText.textContent = `${attacker.name} did ${dmgDone} ${skill.dmgType} dmg to ${defender.name}` // TODO: input different dmg types
    }
    defender.hpLeft -= dmgDone;
    //attacker.hpLeft += vampirism || 0;
    //if(attacker.hpLeft > playerHero.hpMax){
   //     attacker.hpLeft = playerHero.hpMax  
   // }
  } 
}

function checkStatus(char) {
  if (char.status && char.statusLeft>0) {
    console.log('status checked on attacker (char1)')
    battleText.textContent = `${char.name} is ${char.status} for ${char.statusLeft} round`
  }
}

