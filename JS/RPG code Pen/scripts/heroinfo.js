// hero info
const heroInfoContainer = document.querySelector('.hero-info-container');
const heroInfoDiv = document.querySelector('.hero-info')

function addHeroInfoBox(targetDiv) {
  let newDiv = document.createElement('div')
  newDiv.className = 'hero-info info-main'
  let fragment = document.createDocumentFragment()
  let jobImg = document.createElement("img")
  jobImg.src = playerHero.job.imgUrl
  fragment.appendChild(jobImg)
  fragment.appendChild(createHpBar(playerHero))
  fragment.appendChild(createExpBar(playerHero))
  createNewFragment(fragment, 'hp', 'text-box', `HP: ${playerHero.hpLeft}/${playerHero.hpMax}`)
  createNewFragment(fragment, 'name', 'text-box', `name: ${playerHero.name}`)
  createNewFragment(fragment, 'trait', 'text-box', `trait: ${playerHero.trait.name}`)
  createNewFragment(fragment, 'level', 'text-box', `level: ${playerHero.level}`)
  createNewFragment(fragment, 'gold', 'text-box', `gold: ${playerHero.gold}`)
  createNewFragment(fragment, 'gender', 'text-box', `gender: ${playerHero.gender}`)
  createNewFragment(fragment, 'race', 'text-box', `race: ${playerHero.race.name}`)
  createNewFragment(fragment, 'job', 'text-box', `job: ${playerHero.job.name}`)
  newDiv.appendChild(fragment)
  targetDiv.appendChild(newDiv);
}

function addSkillBox(targetDiv, char) {
  const skill = char.activeSkill
  const newDiv = document.createElement('div')
  newDiv.className = `hero-info info-skill`
  let fragment = document.createDocumentFragment()
  createNewFragment(fragment, `skill-title`, 'text-box title-box', `skill`)
  createNewFragment(fragment, `skill-name`, 'text-box', `${skill.name} ${romanize(skill.level)}`)
  createNewFragment(fragment, `skill-power`, 'text-box', `${skill.power} power`)
  createNewFragment(fragment, `skill-chance`, 'text-box', `${skill.chanceToUse}% to use`)
  newDiv.appendChild(fragment)
  targetDiv.appendChild(newDiv)
}

function createHpBar(actor) {
  let hpBar = document.createElement('div')
  hpBar.id = 'hp-bar'
  let hpBarFill = document.createElement('div')
  hpBarFill.id = 'hp-bar-fill'
  hpBarFill.style.height = '5px'; hpBarFill.style.width = `${(actor.hpLeft/actor.hpMax)*100}%`; hpBarFill.style.backgroundColor = 'green';
  
  hpBar.appendChild(hpBarFill)
  return hpBar
}

function createExpBar(actor) {
  let expBar = document.createElement('div')
  expBar.id = 'exp-bar'
  let expBarFill = document.createElement('div')
  expBarFill.id = 'exp-bar-fill'
  expBarFill.style.height = '5px'; expBarFill.style.width = `${(actor.exp/actor.expToLvl)*100}%`; expBarFill.style.backgroundColor = 'yellow';
  
  expBar.appendChild(expBarFill)
  return expBar
}

// Creates a new div, with fragments and appends to targetDiv
function addAttrBox(targetDiv, char) {
  const attributeList = Object.keys(char.attrTotal)
  const newDiv = document.createElement('div')
  newDiv.className = 'hero-info info-attr'
  let fragment = document.createDocumentFragment()
  attributeList.forEach(function(index){
    if (index === 'hpMax' || index === 'hpMulti') { return } // dont show the hp as attr, it is already shown in main info box
    createNewFragment(fragment, `${index}`, 'text-box', `${index}: ${char.attrTotal[index]}`)
  });
  newDiv.appendChild(fragment)
  targetDiv.appendChild(newDiv);
}

// Creates a new div, with fragments and appends to targetDiv
function createItemBox(item, targetDiv, extraClass) {
  if (!extraClass) { extraClass = ''} else { extraClass = ' ' + extraClass}
  const slot = item.itemType
  const mods = item.mods
  const newDiv = document.createElement('div')
  newDiv.className = `hero-info info-equip-${item.itemType} ${item.rarity}${extraClass}`
  let fragment = document.createDocumentFragment()
  createNewFragment(fragment, `${slot}-title`, `text-box title-box`, `${slot}`)
  createNewFragment(fragment, `${slot}-name`, 'text-box', `${item.name}`)
  for (const key of Object.keys(mods)) {
    if(key.includes('Multi')) { createNewFragment(fragment, `${slot}-mod`, 'text-box', `${key}: ${mods[key]}%`)  }
    else { createNewFragment(fragment, `${slot}-mod`, 'text-box', `${mods[key]} ${key}`) }
  }
  createNewFragment(fragment, `${slot}-name`, 'text-box', `(${item.value} gold)`)
  newDiv.appendChild(fragment)
  targetDiv.appendChild(newDiv)
}












