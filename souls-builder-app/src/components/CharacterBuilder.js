import React, { Component } from "react"
import { v4 as uuidv4 } from "uuid"


class CharacterBuilder extends Component {

  constructor(props) {
    super(props)

    // Define a mapping of initial level values for each class
    this.classLevelMapping = {
      warrior: 4,
      knight: 5,
      wanderer: 3,
      thief: 5,
      bandit: 4,
      hunter: 4,
      sorcerer: 3,
      pyromancer: 1,
      cleric: 2,
      deprived: 6,
    }

    // Define a mapping of  initial defense values for each class
    this.classDefenseMapping = {
      warrior: {physical: 21, magic: 18, fire: 22, lightning: 19,
          bleed: 48, poison: 36, curse: 30},
      knight: {physical: 20, magic: 22, fire: 20, lightning: 19,
        bleed: 40, poison: 30, curse: 30},
      wanderer: {physical: 22, magic: 16, fire: 24, lightning: 19,
        bleed: 40, poison: 42, curse: 30},
      thief: {physical: 20, magic: 22, fire: 20, lightning: 19,
        bleed: 37, poison: 30, curse: 30},
      bandit: {physical: 21, magic: 20, fire: 22, lightning: 19,
        bleed: 56, poison: 36, curse: 30},
      hunter: {physical: 21, magic: 18, fire: 22, lightning: 19,
        bleed: 44, poison: 36, curse: 30},
      sorcerer: {physical: 12, magic: 11, fire: 11, lightning: 13,
        bleed: 33, poison: 26, curse: 30},
      pyromancer: {physical: 20, magic: 13, fire: 21, lightning: 16,
        bleed: 44, poison: 42, curse: 30},
      cleric: {physical: 18, magic: 25, fire: 19, lightning: 16,
        bleed: 37, poison: 36, curse: 30},
      deprived: {physical: 24, magic: 25, fire: 25, lightning: 22,
        bleed: 44, poison: 36, curse: 30},
    }

    // Define the sequence of defense stat increases
    this.defenseStatSequence = [
      [1, 1, 1, 2], [2, 1, 2, 1], [1, 2, 1, 2], [1, 1, 1, 1],
      [2, 1, 1, 2],[1, 2, 2, 1],[1, 1, 1, 1],[2, 1, 1, 2],
      [1, 1, 1, 1],[1, 2, 2, 2],[2, 1, 1, 1],[1, 1, 1, 2],
      [1, 1, 1, 1],[2, 2, 2, 2],[1, 1, 1, 1],[1, 1, 1, 2],
      [2, 1, 1, 1],[1, 2, 2, 2],[1, 1, 1, 1],[2, 1, 1, 2],
      [1, 1, 1, 1],[1, 2, 2, 2],[2, 1, 1, 1],[1, 1, 1, 1],
      [1, 1, 1, 2],[1, 2, 1, 1],[2, 1, 2, 2],[1, 1, 1, 1],
      [1, 1, 1, 2],[2, 1, 1, 1],[1, 2, 2, 1],[1, 1, 1, 2],
      [2, 1, 1, 2],[1, 2, 1, 1],[1, 1, 2, 1],[2, 1, 1, 2],
      [1, 1, 1, 1],[1, 1, 1, 2],[1, 2, 1, 1],[2, 1, 2, 1],
      [1, 1, 1, 2],[1, 1, 1, 1],[1, 1, 1, 2],[2, 2, 1, 1],
      [1, 1, 2, 1],[1, 1, 1, 2],[1, 1, 1, 1],[2, 1, 1, 1],
      [1, 2, 1, 2],[1, 1, 1, 1],[1, 1, 2, 1],[1, 1, 1, 2],
      [2, 1, 1, 1],[1, 1, 1, 1],[1, 1, 1, 2],[1, 2, 1, 1],
      [1, 1, 1, 1],[2, 1, 2, 2],[1, 1, 1, 1],[1, 1, 1, 1],
      [1, 1, 1, 1],[1, 1, 1, 2],[1, 2, 1, 1],[2, 1, 1, 1],
      [1, 1, 1, 1],[1, 1, 1, 1],[1, 1, 2, 2],[1, 1, 1, 1],
      [1, 1, 1, 1],[1, 1, 1, 1],[1, 1, 1, 1],[1, 1, 1, 1],
      [2, 2, 1, 1],[1, 1, 1, 1],[1, 1, 1, 1],[1, 1, 1, 1],
      [1, 1, 1, 0],[1, 1, 1, 1],[0, 1, 1, 1],[1, 1, 1, 0],
      [1, 1, 1, 1],[0, 1, 1, 0],[1, 1, 0, 1],[1, 1, 1, 1],
      [1, 0, 1, 0],[0, 1, 0, 1],[1, 1, 1, 0],[0, 1, 1, 1],
      [1, 0, 1, 0],[0, 1, 0, 1],[1, 0, 1, 1],[1, 1, 0, 0],
      [0, 0, 1, 1],[1, 1, 0, 0],[0, 0, 1, 1],[1, 1, 0, 0],
      [0, 0, 1, 1],[1, 1, 0, 1],[0, 0, 1, 0],[1, 1, 0, 1],
      [0, 0, 1, 0],[1, 1, 0, 1],[0, 0, 1, 0],[1, 1, 0, 1],
      [0, 0, 1, 1],[1, 1, 0, 0],[0, 0, 1, 1],[1, 1, 0, 0],
      [1, 0, 1, 1],[1, 1, 0, 0],[0, 0, 1, 1],[0, 1, 1, 1],
      [1, 0, 0, 0],[0, 1, 0, 1],[1, 0, 1, 1],[0, 1, 0, 0],
      [1, 0, 1, 1],[0, 1, 0, 0],[1, 0, 1, 1],[0, 1, 0, 0],
      [1, 0, 1, 1],[0, 1, 0, 0],[1, 0, 1, 1],[0, 1, 0, 0],
      [1, 0, 1, 1],[0, 1, 0, 0],[1, 0, 1, 1],[0, 1, 0, 0],
      [1, 0, 1, 1],[0, 1, 0, 0],[1, 0, 0, 1],[0, 0, 1, 0],
      [1, 1, 0, 1],[0, 0, 1, 0],[1, 1, 0, 1],[0, 0, 1, 0],
      [0, 1, 0, 1],[1, 0, 1, 0],[0, 1, 0, 1],[1, 0, 1, 0],
      [0, 1, 0, 1],[1, 0, 0, 0],[0, 0, 1, 1],[1, 1, 0, 0],
      [0, 0, 1, 1],[1, 1, 0, 0],[0, 0, 1, 1],[0, 1, 0, 0],
      [1, 0, 0, 0],[0, 1, 1, 1],[1, 0, 0, 0],[0, 0, 1, 1],
      [1, 1, 0, 0],[0, 0, 1, 1],[1, 1, 0, 0],[0, 0, 1, 1],
      [0, 0, 0, 0],[0, 1, 1, 1],[1, 0, 0, 0],[0, 0, 1, 1],
      [1, 1, 0, 0],[0, 0, 1, 0],[0, 1, 0, 1],[1, 0, 0, 0],
      [0, 0, 1, 1],[1, 1, 0, 0],[0, 0, 1, 1],[0, 1, 0, 0],
      [1, 0, 0, 0],[0, 0, 1, 0],[1, 1, 0, 1],[0, 0, 1, 0],
      [0, 1, 0, 0],[1, 0, 0, 0],[0, 0, 1, 0],[1, 1, 0, 0],
      [0, 0, 0, 0],[0, 1, 1, 0],[1, 0, 0, 0],[0, 0, 1, 0],
      [0, 1, 0, 0],[1, 0, 0, 1],[0, 0, 1, 0],[0, 1, 0, 0],
      [1, 0, 0, 0],[0, 1, 1, 0],[0, 0, 0, 0],[0, 0, 0, 0],
      [1, 1, 1, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 1, 1, 0],
      [0, 0, 0, 0],[0, 0, 0, 0],[0, 1, 0, 0],[0, 0, 1, 0],
      [0, 0, 0, 0],[0, 0, 0, 0],[0, 1, 1, 0],[0, 0, 0, 1],
      [0, 0, 0, 0],[1, 0, 0, 0],[0, 0, 0, 0],[0, 1, 0, 0],
      [0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],
      [0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 1, 0],
      [0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 1, 0, 0],
      [0, 0, 0, 0],[0, 0, 0, 1],[0, 0, 0, 0],[0, 0, 0, 0],
      [1, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],
      [0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],
      [0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],
      [0, 0, 0, 0],[0, 0, 1, 0],[0, 0, 0, 0],[0, 0, 0, 1],
      [0, 1, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],
      [1, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],
      [0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],
      [0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],
      [0, 0, 0, 0],[0, 0, 0, 1],
    ];

    // Define a mapping of  initial attribute values for each class
    this.classAttributeMapping = {
      warrior: {vitality: 11, attunement: 8, endurance: 12, strength: 13,
         dexterity: 13, resistance: 11, intelligence: 9, faith: 9},
      knight: {vitality: 14, attunement: 10, endurance: 10, strength: 11, 
        dexterity: 11, resistance: 10, intelligence: 9, faith: 11},
      wanderer: {vitality: 10, attunement: 11, endurance: 10, strength: 10, 
        dexterity: 14, resistance: 12, intelligence: 11, faith: 8},
      thief: {vitality: 9, attunement: 11, endurance: 9, strength: 9, 
        dexterity: 15, resistance: 10, intelligence: 12, faith: 11},
      bandit: {vitality: 12, attunement: 8, endurance: 14, strength: 14, 
        dexterity: 9, resistance: 11, intelligence: 8, faith: 10},
      hunter: {vitality: 11, attunement: 9, endurance: 11, strength: 12, 
        dexterity: 14, resistance: 11, intelligence: 9, faith: 9},
      sorcerer: {vitality: 8, attunement: 15, endurance: 8, strength: 9, 
        dexterity: 11, resistance: 8, intelligence: 15, faith: 8},
      pyromancer: {vitality: 10, attunement: 12, endurance: 11, strength: 12, 
        dexterity: 9, resistance: 12, intelligence: 10, faith: 8},
      cleric: {vitality: 11, attunement: 11, endurance: 9, strength: 12, 
        dexterity: 8, resistance: 11, intelligence: 8, faith: 14},
      deprived: {vitality: 11, attunement: 11, endurance: 11, strength: 11, 
        dexterity: 11, resistance: 11, intelligence: 11, faith: 11},
    }

    // define mapping for HP depending on vitality stat. **STAT GAIN IS NOT LINEAR**
    this.vitalityToHP = {
      1: 400, 2: 415, 3: 433, 4: 451, 5: 471, 6: 490, 7: 511, 8: 530, 9: 552, 10: 572,
      11: 594, 12: 616, 13: 638, 14: 658, 15: 682, 16: 698, 17: 718, 18: 742, 19: 766, 20: 792,
      21: 821, 22: 849, 23: 878, 24: 908, 25: 938, 26: 970, 27: 1001, 28: 1034, 29: 1066, 30: 1100,
      31: 1123, 32: 1147, 33: 1170, 34: 1193, 35: 1216, 36: 1239, 37: 1261, 38: 1283, 39: 1304, 40: 1325,
      41: 1346, 42: 1366, 43: 1386, 44: 1405, 45: 1424, 46: 1442, 47: 1458, 48: 1474, 49: 1489, 50: 1500,
      51: 1508, 52: 1517, 53: 1526, 54: 1535, 55: 1544, 56: 1553, 57: 1562, 58: 1571, 59: 1580, 60: 1588,
      61: 1597, 62: 1606, 63: 1615, 64: 1623, 65: 1632, 66: 1641, 67: 1649, 68: 1658, 69: 1666, 70: 1675,
      71: 1683, 72: 1692, 73: 1700, 74: 1709, 75: 1717, 76: 1725, 77: 1734, 78: 1742, 79: 1750, 80: 1758,
      81: 1767, 82: 1775, 83: 1783, 84: 1791, 85: 1799, 86: 1807, 87: 1814, 88: 1822, 89: 1830, 90: 1837,
      91: 1845, 92: 1852, 93: 1860, 94: 1867, 95: 1874, 96: 1881, 97: 1888, 98: 1894, 99: 1900,
    }

    // define mapping for HP depending on vitality stat. **STAT GAIN IS NOT LINEAR**
    this.enduranceToStamina = {
      8: 89, 9: 90, 10: 91, 11: 93, 12: 95, 13: 97, 14: 98, 15: 100, 16: 102, 17: 104,
      18: 106, 19: 108, 20: 110, 21: 112, 22: 115, 23: 117, 24: 119, 25: 121, 26: 124, 27: 126,
      28: 129, 29: 131, 30: 133, 31: 136, 32: 139, 33: 141, 34: 144, 35: 146, 36: 149, 37: 152,
      38: 154, 39: 157, 40: 160, 41: 160, 42: 160, 43: 160, 44: 160, 45: 160, 46: 160, 47: 160, 
      48: 160, 49: 160, 50: 160, 51: 160, 52: 160, 53: 160, 54: 160, 55: 160, 56: 160, 57: 160, 
      58: 160, 59: 160, 60: 160, 61: 160, 62: 160, 63: 160, 64: 160, 65: 160, 66: 160, 67: 160, 
      68: 160, 69: 160, 70: 160, 71: 160, 72: 160, 73: 160, 74: 160, 75: 160, 76: 160, 77: 160, 
      78: 160, 79: 160, 80: 160, 81: 160, 82: 160, 83: 160, 84: 160, 85: 160, 86: 160, 87: 160, 
      88: 160, 89: 160, 90: 160, 91: 160, 92: 160, 93: 160, 94: 160, 95: 160, 96: 160, 97: 160, 
      98: 160, 99: 160,
    }

    // define mapping for humanity to item discovery values 
    this.humanityToItemDiscovery = {
      0: 100, 1: 150, 2: 158, 3: 165, 4: 173, 5: 180, 6: 186, 7: 192, 8: 198, 9: 204,
      10: 210, 11: 210, 12: 210, 13: 210, 14: 210, 15: 210, 16: 210, 17: 210, 18: 210,
      19: 210, 20: 210, 21: 210, 22: 210, 23: 210, 24: 210, 25: 210, 26: 210, 27: 210,
      28: 210, 29: 210, 30: 210, 31: 210, 32: 210, 33: 210, 34: 210, 35: 210, 36: 210,
      37: 210, 38: 210, 39: 210, 40: 210, 41: 210, 42: 210, 43: 210, 44: 210, 45: 210, 
      46: 210, 47: 210, 48: 210, 49: 210, 50: 210, 51: 210, 52: 210, 53: 210, 54: 210, 
      55: 210, 56: 210, 57: 210, 58: 210, 59: 210, 60: 210, 61: 210, 62: 210, 63: 210, 
      64: 210, 65: 210, 66: 210, 67: 210, 68: 210, 69: 210, 70: 210, 71: 210, 72: 210, 
      73: 210, 74: 210, 75: 210, 76: 210, 77: 210, 78: 210, 79: 210, 80: 210, 81: 210, 
      82: 210, 83: 210, 84: 210, 85: 210, 86: 210, 87: 210, 88: 210, 89: 210, 90: 210, 
      91: 210, 92: 210, 93: 210, 94: 210, 95: 210, 96: 210, 97: 210, 98: 210, 99: 210,
    }

    this.attributeGroups = ['atk', 'def', 'effects', 'req', 'scale', 'weightDurability', ]

    this.state = {
      buildId: uuidv4(),
      characterClass: "warrior", 
      characterGender: "Male", 
      buildLevel: 4,
      buildCovenant: "No Covenant",
      initVitality: 11,
      initAttunement: 8,
      initEndurance: 12,
      initStrength: 13,
      initDexterity: 13,
      initResistance: 11,
      initIntelligence: 9,
      initFaith: 9,
      vitality: 11,
      attunement: 8,
      endurance: 12,
      strength: 13,
      dexterity: 13,
      resistance: 11,
      intelligence: 9,
      faith: 9,
      humanity: 0,
      spentSouls: 0,
      soulsToNextLevel: 0,
      helmets: [],
      chests: [],
      hands: [],
      legs: [], 
      weapons: [],
      rings: [],
      buildHead: [],
      buildHeadName: "No Head 1",
      buildChest: [],
      buildChestName: "No Chest",
      buildHands: [],
      buildHandsName: "No Hands",
      buildLegs: [],
      buildLegsName: "No Legs",
      buildLeftHand1: null,
      buildRightHand1: null,
      buildLeftHand2: null,
      buildRightHand2: null,
      buildLeftHand1Name: "No LH1",
      buildRightHand1Name: "No RH1",
      buildLeftHand2Name: "No LH2",
      buildRightHand2Name: "No RH2",
      buildRing1Name: "No Ring 1",
      buildRing2Name: "No Ring 2",
      buildRing1: [],
      buildRing2: [],
      currentGroupIndex1: 0,
      currentGroupIndex2: 0,
      currentGroupIndex3: 0,
      currentGroupIndex4: 0,
      spellSlots: 0,
      usedSpellSlots: 0,
      spells: [],
      buildSpellName1: "No Spell",
      buildSpellName2: "No Spell",
      buildSpellName3: "No Spell",
      buildSpellName4: "No Spell",
      buildSpellName5: "No Spell",
      buildSpellName6: "No Spell",
      buildSpellName7: "No Spell",
      buildSpellName8: "No Spell",
      buildSpellName9: "No Spell",
      buildSpellName10: "No Spell",
      buildHP: 0,
      buildStamina: 0,
      buildEquipLoad: 0,
      buildTotalEquipLoad: 0,
      buildEncumbrance: 0,
      buildRollType: "Fast",
      buildStaminaRecovery: 45,
      isCloranthyRingApplied: false,
      isMaskOfChildApplied: false,
      is20PercentPenaltyApplied: false,
      is30PercentPenaltyApplied: false,
      buildPoise: 0,
      isWolfRingApplied: false,
      buildItemDiscovery: 100,
      isCovetousGoldSerpentRingApplied: false,
      isSymbolOfAvariceApplied: false,
      buildItemName1: "No Item",
      buildItemName2: "No Item",
      buildItemName3: "No Item",
      buildItemName4: "No Item",
      buildItemName5: "No Item",
      items: [],
      buildPhysicalDef: 21,
      buildMagicDef: 18,
      buildFireDef: 22,
      buildLightningDef: 19,
      buildBleedDef: 48,
      buildPoisonDef: 36,
      buildCurseDef: 30,
      buildArrow1: "No Arrow",
      buildArrow2: "No Arrow",
      buildBolt1: "No Bolt",
      buildBolt2: "No Bolt",
    }
  }

  // set initial souls needed for next level with the componentDidMount() 
  // lifecycle method
  componentDidMount() {
    const { buildLevel } = this.state
    this.setLowerSoulsLevel()
    this.calculateTotalSouls(buildLevel)

    // initial fetch method to populate the helmets array with helmets from
    // my MongoDB database.
    fetch('http://localhost:1234/fetchHelmets')
        .then(response => response.json())
        .then(data => {
            this.setState({ helmets: data })
        })
        .catch(error => {
            console.error('Error fetching helmets (in CharacterBuilder.js):', error)
        })
    
    // initial fetch method to populate the chests array with chests from
    // my MongoDB database.
    fetch('http://localhost:1234/fetchChests')
    .then(response => response.json())
    .then(data => {
        this.setState({ chests: data })
    })
    .catch(error => {
        console.error('Error fetching chests (in CharacterBuilder.js):', error)
    })

    // initial fetch method to populate the hands array with hands from
    // my MongoDB database.
    fetch('http://localhost:1234/fetchHands')
        .then(response => response.json())
        .then(data => {
            this.setState({ hands: data })
        })
        .catch(error => {
            console.error('Error fetching hands (in CharacterBuilder.js):', error)
        })
    
    // initial fetch method to populate the legs array with chests from
    // my MongoDB database.
    fetch('http://localhost:1234/fetchLegs')
    .then(response => response.json())
    .then(data => {
        this.setState({ legs: data })
    })
    .catch(error => {
        console.error('Error fetching legs (in CharacterBuilder.js):', error)
    })

    // initial fetch method to populate the legs array with chests from
    // my MongoDB database.
    fetch('http://localhost:1234/fetchWeapons')
    .then(response => response.json())
    .then(data => {
        this.setState({ weapons: data })
    })
    .catch(error => {
        console.error('Error fetching weapons (in CharacterBuilder.js):', error)
    })

    // initial fetch method to populate the rings array with rings from
    // my MongoDB database rings collection.
    fetch('http://localhost:1234/fetchRings')
    .then(response => response.json())
    .then(data => {
        this.setState({ rings: data })
    })
    .catch(error => {
        console.error('Error fetching rings (in CharacterBuilder.js):', error)
    })

    // initial fetch method to populate the spells array with spells from
    // my MongoDB database spells collection.
    fetch('http://localhost:1234/fetchSpells')
    .then(response => response.json())
    .then(data => {
        this.setState({ spells: data })
    })
    .catch(error => {
        console.error('Error fetching spells (in CharacterBuilder.js):', error)
    })

    // initial fetch method to populate the items array with items from
    // my MongoDB database items collection.
    fetch('http://localhost:1234/fetchItems')
    .then(response => response.json())
    .then(data => {
        this.setState({ items: data })
    })
    .catch(error => {
        console.error('Error fetching items (in CharacterBuilder.js):', error)
    })

    this.calculateSpellSlots()

    this.calculateHP(this.state.vitality)

    this.calculateStamina(this.state.endurance)

    this.calculateTotalEquipLoad(this.state.endurance)
    
    this.calculateEquipLoad()

    this.calculateEncumbrance()

  }

  /* using the componentDidUpdate() lifecycle method, we track when there has been a change
   in the build level and we check if it is less than or equal to 12, if it is we call the 
   setLowerSoulsLevel() method. If build level is 13 or higher, we call calculateSoulsToNextLevel().
   It must be done this way because the equation used to calculate the souss needed is only 
   accurate from level 12 and up.
   */
  componentDidUpdate(prevProps, prevState) {
    // if the buildLevel changes due to an attribute change, calculate SoulsToNextLevel and TotalSouls.
    if (prevState.buildLevel !== this.state.buildLevel) {
      if ( this.state.buildLevel <= 12 ) {
        this.setLowerSoulsLevel()
      } else {
        this.calculateSoulsToNextLevel()
      }

      this.calculateTotalSouls(this.state.buildLevel)
      
    }
    
    // if the character class changes  calculate new spell slots
    if (prevState.characterClass !== this.state.characterClass) {
      this.calculateSpellSlots();
      this.calculateDefenseStats();
    }

    // if the character vitality INCREASES calculate new HP
    if (prevState.vitality < this.state.vitality) {
      this.calculateHP(this.state.vitality)
      this.levelUpDef('vitality');
    }

    // if the character vitality DECREASES calculate new HP
    if (prevState.vitality > this.state.vitality) {
      this.calculateHP(this.state.vitality)
      this.levelDownDef('vitality');
    }

    // if the character attunement INCREASES  calculate new spell slots
    if (prevState.attunement < this.state.attunement) {
      this.calculateSpellSlots()
      this.levelUpDef('attunement');
    }

    // if the character attunement DECREASES  calculate new spell slots
    if (prevState.attunement > this.state.attunement) {
      this.calculateSpellSlots()
      this.levelDownDef('attunement');
    }

    // if the character endurance INCREASES calculate new stamina
    if (prevState.endurance < this.state.endurance) {
      this.calculateStamina(this.state.endurance)
      this.calculateTotalEquipLoad(this.state.endurance)
      this.calculateEncumbrance()
      this.levelUpDef('endurance');
    }

    // if the character endurance DECREASES calculate new stamina
    if (prevState.endurance > this.state.endurance) {
      this.calculateStamina(this.state.endurance)
      this.calculateTotalEquipLoad(this.state.endurance)
      this.calculateEncumbrance()
      this.levelDownDef('endurance');
    }

    // if the character strength INCREASES 
    if (prevState.strength < this.state.strength) {
      this.levelUpDef('strength');
    }

    // if the character strength DECREASES 
    if (prevState.strength > this.state.strength) {
      this.levelDownDef('strength');
    }

    // if the character dexterity INCREASES 
    if (prevState.dexterity < this.state.dexterity) {
      this.levelUpDef('dexterity');
    }
    
    // if the character dexterity DECREASES 
    if (prevState.dexterity > this.state.dexterity) {
      this.levelDownDef('dexterity');
    }

    // if the character resistance INCREASES 
    if (prevState.resistance < this.state.resistance) {
      this.levelUpDef('resistance');
    }

    // if the character resistance DECREASES 
    if (prevState.resistance > this.state.resistance) {
      this.levelDownDef('resistance');
    }

    // if the character intelligence INCREASES 
    if (prevState.intelligence < this.state.intelligence) {
      this.levelUpDef('intelligence');
    }

    // if the character intelligence DECREASES 
    if (prevState.intelligence > this.state.intelligence) {
      this.levelDownDef('intelligence');
    }

    // if the character faith INCREASES 
    if (prevState.faith < this.state.faith) {
      this.levelUpDef('faith');
    }

    // if the character faith DECREASES 
    if (prevState.faith > this.state.faith) {
      this.levelDownDef('faith');
    }

    // if the character humanity INCREASES 
    if (prevState.humanity < this.state.humanity) {
      this.humanityUp();
    }

    // if the character humanity DECREASES 
    if (prevState.humanity > this.state.humanity) {
      this.humanityDown();
    }

    // if the character humanity changes calculate new item discovery
    if (prevState.humanity !== this.state.humanity) {
      this.calculateItemDiscovery(this.state.humanity);
    }

    // if the character ring 1 changes calculate new stamina
    if (prevState.buildRing1Name !== this.state.buildRing1Name) {
      this.calculateStamina(this.state.endurance)
      this.calculateHP(this.state.vitality)
      this.calculateStaminaRecovery(this.state.buildEncumbrance)
      this.calculateTotalEquipLoad(this.state.endurance)
      this.calculatePoise()
      this.calculateItemDiscovery(this.state.humanity);
      this.calculateSpellSlots();
      this.calculateDefenseStats();
    }

    // if the character ring 2 changes calculate new stamina
    if (prevState.buildRing2Name !== this.state.buildRing2Name) {
      this.calculateStamina(this.state.endurance)
      this.calculateHP(this.state.vitality)
      this.calculateStaminaRecovery(this.state.buildEncumbrance)
      this.calculateTotalEquipLoad(this.state.endurance)
      this.calculatePoise()
      this.calculateItemDiscovery(this.state.humanity);
      this.calculateSpellSlots();
      this.calculateDefenseStats();
    }

    // if the character head changes calculate new related stats
    if (prevState.buildHeadName !== this.state.buildHeadName) {
      this.calculateHP(this.state.vitality)
      this.calculateTotalEquipLoad(this.state.endurance)
      this.calculateEquipLoad()
      this.calculateEncumbrance()
      this.calculateStaminaRecovery(this.state.buildEncumbrance)
      this.calculatePoise()
      this.calculateItemDiscovery(this.state.humanity);
      this.calculateDefenseStats();
    }

    // if the character chest changes calculate new equip load
    if (prevState.buildChestName !== this.state.buildChestName) {
      this.calculateEquipLoad()
      this.calculateEncumbrance()
      this.calculateStaminaRecovery(this.state.buildEncumbrance)
      this.calculatePoise()
      this.calculateDefenseStats();
    }

    // if the character hands changes calculate new equip load
    if (prevState.buildHandsName !== this.state.buildHandsName) {
      this.calculateEquipLoad()
      this.calculateEncumbrance()
      this.calculateStaminaRecovery(this.state.buildEncumbrance)
      this.calculatePoise()
      this.calculateDefenseStats();
    }

    // if the character legs changes calculate new equip load
    if (prevState.buildLegsName !== this.state.buildLegsName) {
      this.calculateEquipLoad()
      this.calculateEncumbrance()
      this.calculateStaminaRecovery(this.state.buildEncumbrance)
      this.calculatePoise()
      this.calculateDefenseStats();
    }

    // if the character left hand 1 weapon changes calculate new equip load
    if (prevState.buildLeftHand1Name !== this.state.buildLeftHand1Name) {
      this.calculateEquipLoad()
      this.calculateEncumbrance()
      this.calculateStaminaRecovery(this.state.buildEncumbrance)
      this.calculateDefenseStats();
    }

    // if the character left hand 2 weapon changes calculate new equip load
    if (prevState.buildLeftHand2Name !== this.state.buildLeftHand2Name) {
      this.calculateEquipLoad()
      this.calculateEncumbrance()
      this.calculateStaminaRecovery(this.state.buildEncumbrance)
      this.calculateDefenseStats();
    }

    // if the character right hand 1 weapon changes calculate new equip load
    if (prevState.buildRightHand1Name !== this.state.buildRightHand1Name) {
      this.calculateEquipLoad()
      this.calculateEncumbrance()
      this.calculateStaminaRecovery(this.state.buildEncumbrance)
      this.calculateDefenseStats();
    }

    // if the character right hand 2 weapon changes calculate new equip load
    if (prevState.buildRightHand2Name !== this.state.buildRightHand2Name) {
      this.calculateEquipLoad()
      this.calculateEncumbrance()
      this.calculateStaminaRecovery(this.state.buildEncumbrance)
      this.calculateDefenseStats();
    }

    // if the buildEquipLoad changes (BECAUSE ANOTHER ITEM WAS ADDED) then
    // we need to recalculate the encumbrance
    if (prevState.buildEquipLoad !== this.state.buildEquipLoad) {
      this.calculateEncumbrance()
    }

    
  }

  calculateSpellSlots = () => {
    let spellAttunements = 0

    // Add spell slots based on attunement level of build
    const attunement = this.state.attunement
    if (attunement >= 10 && attunement <= 11) spellAttunements = 1
    else if (attunement >= 12 && attunement <= 13) spellAttunements = 2
    else if (attunement >= 14 && attunement <= 15) spellAttunements = 3
    else if (attunement >= 16 && attunement <= 18) spellAttunements = 4
    else if (attunement >= 19 && attunement <= 22) spellAttunements = 5
    else if (attunement >= 23 && attunement <= 27) spellAttunements = 6
    else if (attunement >= 28 && attunement <= 33) spellAttunements = 7
    else if (attunement >= 34 && attunement <= 40) spellAttunements = 8
    else if (attunement >= 41 && attunement <= 49) spellAttunements = 9
    else if (attunement >= 50 && attunement <= 99) spellAttunements = 10

    // Check for additional slots due to rings
    if (this.state.buildRing1Name === "White Seance Ring" || this.state.buildRing2Name === "White Seance Ring") {
      spellAttunements += 1
    }

    // Check for additional slots due to rings
    if (this.state.buildRing1Name === "Darkmoon Seance Ring" || this.state.buildRing2Name === "Darkmoon Seance Ring") {
      spellAttunements += 1
    }

    this.setState({spellSlots: spellAttunements})
 }

 // method to calculate the total HP of the build from the vitality stat and other items
  calculateHP = (vitality) => {
    let buildHealth = this.vitalityToHP[vitality]

    // Check for "Mask of the Mother" and apply a 10% increase
    if (this.state.buildHeadName === "Mask of the Mother") {
      buildHealth *= 1.10 // Increase by 10%
    }

    // Check for "Ring of Favor and Protection" in either ring slot and apply a 20% increase
    if (this.state.buildRing1Name === "Ring of Favor and Protection" || this.state.buildRing2Name === "Ring of Favor and Protection") {
      buildHealth *= 1.20 // Increase by 20%
    }

    // Check for "Tiny Being's Ring" in either ring slot and apply a 5% increase
    if (this.state.buildRing1Name === "Tiny Being's Ring" || this.state.buildRing2Name === "Tiny Being's Ring") {
      buildHealth *= 1.05 // Increase by 5%
    }

    // Check for "Dusk Crown Ring" in either ring slot and apply a 50% decrease
    if (this.state.buildRing1Name === "Dusk Crown Ring" || this.state.buildRing2Name === "Dusk Crown Ring") {
      buildHealth = buildHealth/2;
    }

    buildHealth = Math.round(buildHealth)

    this.setState({ buildHP: buildHealth })
  }

  // method to calculate the total stamina of the build from the endurance stat and other items
  calculateStamina = (endurance) => {
    let buildStam = this.enduranceToStamina[endurance]

    // Check for "Ring of Favor and Protection" in either ring slot and apply a 20% increase
    if (this.state.buildRing1Name === "Ring of Favor and Protection" || this.state.buildRing2Name === "Ring of Favor and Protection") {
      buildStam *= 1.20 // Increase by 20%
    }

    buildStam = Math.round(buildStam)

    this.setState({ buildStamina: buildStam })
  }

  // method to calculate the total equip load of the build from the endurance stat and other items
  calculateTotalEquipLoad = (endurance) => {
    let totalEquipLoad = 0.0
  
    if (endurance >= 8 && endurance < 99) {
      totalEquipLoad = 40.0 + endurance // Starts from 48 at endurance 8 and increases linearly
    }
  
    if (endurance === 99) {
      totalEquipLoad = 149.0 // Caps at 149 for endurance values over 99
    }
  
    // Existing checks for rings and other modifiers
    if (this.state.buildRing1Name === "Ring of Favor and Protection" || this.state.buildRing2Name === "Ring of Favor and Protection") {
      totalEquipLoad *= 1.20 // Increase by 20%
    }
  
    if (this.state.buildRing1Name === "Havel's Ring" || this.state.buildRing2Name === "Havel's Ring") {
      totalEquipLoad *= 1.50 // Increase by 50%
    }
  
    if (this.state.buildHeadName === "Mask of the Father" || this.state.buildHeadName === "Mask of the Father") {
      totalEquipLoad *= 1.05 // Increase by 5%
    }
  
    this.setState({ buildTotalEquipLoad: totalEquipLoad })
  }
  

  // method to calculate the equip load of the build from the weight of items
  calculateEquipLoad = () => {
    const { buildHead, buildChest, buildHands, buildLegs, 
            buildLeftHand1, buildLeftHand2, 
            buildRightHand1, buildRightHand2 } = this.state
  
    let equipLoad = 0
  
    const addWeight = item => {
      // Check if item is not null and has a valid numeric weight
      if (item && !isNaN(item.weight)) {
        equipLoad += Number(item.weight)
      }
    }
  
    addWeight(buildHead)
    addWeight(buildChest)
    addWeight(buildHands)
    addWeight(buildLegs)
    addWeight(buildLeftHand1)
    addWeight(buildLeftHand2)
    addWeight(buildRightHand1)
    addWeight(buildRightHand2)

    // Rounding to one decimal place
    equipLoad = parseFloat(equipLoad.toFixed(1)) 
  
    this.setState({ buildEquipLoad: equipLoad })
  }

  calculateEncumbrance = () => {
    const { buildEquipLoad, buildTotalEquipLoad } = this.state
  
    let encumbrance = 0
    let tempBuildRollType = ""
  
    if (buildEquipLoad !== 0 ) {
      encumbrance = (buildEquipLoad / buildTotalEquipLoad) * 100
      encumbrance = parseFloat(encumbrance.toFixed(1)) 
    } else {
      encumbrance = 0
    }

    if (encumbrance >= 0 && encumbrance <= 24.9) tempBuildRollType = "Fast"
    else if (encumbrance >= 25.0 && encumbrance <= 49.9) tempBuildRollType = "Medium"
    else if (encumbrance >= 50.0 ) tempBuildRollType = "Fat"
  
    this.setState({ buildRollType: tempBuildRollType })
    this.setState({ buildEncumbrance: encumbrance })
  }

  calculateStaminaRecovery = (currentBuildEncumbrance) => {
    const { buildRing1Name, buildRing2Name, buildHeadName, buildStaminaRecovery, 
      buildLeftHand1Name, buildLeftHand2Name, buildRightHand1Name, 
      buildRightHand2Name, isCloranthyRingApplied, isMaskOfChildApplied,
      is30PercentPenaltyApplied, is20PercentPenaltyApplied } = this.state

    let newBuildStaminaRecovery = buildStaminaRecovery

    // Handle Cloranthy Ring logic
    if (buildRing1Name === "Cloranthy Ring" || buildRing2Name === "Cloranthy Ring") {
    if (!isCloranthyRingApplied) {
      newBuildStaminaRecovery += 20 // Apply bonus
      this.setState({ isCloranthyRingApplied: true })
    }
    } else {
    if (isCloranthyRingApplied) {
      newBuildStaminaRecovery -= 20 // Remove bonus
      this.setState({ isCloranthyRingApplied: false })
    }
    }

    // Handle Mask of the Child logic
    if (buildHeadName === "Mask of the Child") {
    if (!isMaskOfChildApplied) {
      newBuildStaminaRecovery += 10 // Apply bonus
      this.setState({ isMaskOfChildApplied: true })
    }
    } else {
    if (isMaskOfChildApplied) {
      newBuildStaminaRecovery -= 10 // Remove bonus
      this.setState({ isMaskOfChildApplied: false })
    }
    }
  
    // Count the number of Grass Crest Shields equipped 
    let grassCrestShieldCount = 0;
    [buildLeftHand1Name, buildLeftHand2Name, buildRightHand1Name, buildRightHand2Name].forEach(name => {
      if (name === "Grass Crest Shield") {
        grassCrestShieldCount++
      }
    })
  
    // Apply increase for Grass Crest Shield, capped at +20
    if (grassCrestShieldCount < 3 && grassCrestShieldCount !== 0) {
      newBuildStaminaRecovery += 10
    }

   // Encumbrance-based stamina recovery penalty
   if (currentBuildEncumbrance >= 50 && currentBuildEncumbrance < 100 && !is20PercentPenaltyApplied) {
    newBuildStaminaRecovery *= 0.80 // Reduce by 20%
    this.setState({ is20PercentPenaltyApplied: true, is30PercentPenaltyApplied: false })
  } else if (currentBuildEncumbrance >= 100 && !is30PercentPenaltyApplied) {
    newBuildStaminaRecovery *= 0.70 // Reduce by 30%
    this.setState({ is30PercentPenaltyApplied: true, is20PercentPenaltyApplied: false })
  } else if (currentBuildEncumbrance < 50) {
    // Reset to original stamina recovery if penalties were applied
    if (is20PercentPenaltyApplied || is30PercentPenaltyApplied) {
      newBuildStaminaRecovery = 45
    }
    this.setState({ is20PercentPenaltyApplied: false, is30PercentPenaltyApplied: false })
  }

  newBuildStaminaRecovery = parseFloat(newBuildStaminaRecovery.toFixed(1))

  this.setState({ buildStaminaRecovery: newBuildStaminaRecovery })
  }

  // calculate the poise for the build based on the total of all the armor poise stats
  calculatePoise = () => {
    const { buildHead, buildChest, buildHands, buildLegs, 
            buildRing1Name, buildRing2Name, isWolfRingApplied } = this.state

    // Using the || operator to default to 0 if the value is null or 0
    let totalPoise = (buildHead.poise || 0) + (buildChest.poise || 0) + (buildHands.poise || 0) + (buildLegs.poise || 0)

    if (buildRing1Name === "Wolf Ring" || buildRing2Name === "Wolf Ring") {
      if (!isWolfRingApplied) {
        totalPoise += 40 // Apply bonus
        this.setState({ isWolfRingApplied: true })
      }} else if (buildRing1Name !== "Wolf Ring" || buildRing2Name !== "Wolf Ring") {
        this.setState({ isWolfRingApplied: false })
      }

    this.setState({ buildPoise: totalPoise })
  }

  // calculate the total item discovery based on humanity and a special ring or helmet
  calculateItemDiscovery = (humanity) => {
    const { buildRing1Name, buildRing2Name, buildHeadName } = this.state;
  
    // Calculate base item discovery based on humanity
    let totalItemDiscovery = this.humanityToItemDiscovery[humanity];
  
    // Check for special items and apply/remove bonus
    const hasCovetousGoldSerpentRing = buildRing1Name === "Covetous Gold Serpent Ring" || buildRing2Name === "Covetous Gold Serpent Ring";
    const hasSymbolOfAvarice = buildHeadName === "Symbol of Avarice";
  
    // Apply the bonus if any of the special items is equipped
    if (hasCovetousGoldSerpentRing || hasSymbolOfAvarice) {
      totalItemDiscovery = Math.min(totalItemDiscovery + 200, 410);
    }
  
    // Update state with the calculated values
    this.setState({ 
      buildItemDiscovery: totalItemDiscovery,
      isCovetousGoldSerpentRingApplied: hasCovetousGoldSerpentRing,
      isSymbolOfAvariceApplied: hasSymbolOfAvarice
    });
  }

  // calculate the defense stats from ARMOR 
  calculateDefenseStats = () => {
    const { characterClass, buildHead, buildChest, buildHands, 
            buildLegs, buildRing1Name, buildRing2Name } = this.state;
  
    let totalPhysicalDef = this.classDefenseMapping[characterClass].physical;
    let totalMagicDef = this.classDefenseMapping[characterClass].magic;
    let totalFireDef = this.classDefenseMapping[characterClass].fire;
    let totalLightningDef = this.classDefenseMapping[characterClass].lightning;
    let totalBleedDef = this.classDefenseMapping[characterClass].bleed;
    let totalPoisonDef = this.classDefenseMapping[characterClass].poison;
    let totalCurseDef = this.classDefenseMapping[characterClass].curse;
  
    const addArmorDefenseStats = (armor) => {
      if (armor) {
        totalPhysicalDef += armor.physical || 0;
        totalMagicDef += armor.magic || 0;
        totalFireDef += armor.fire || 0;
        totalLightningDef += armor.lightning || 0;
        totalBleedDef += armor.bleed || 0;
        totalPoisonDef += armor.poison || 0;
        totalCurseDef += armor.curse || 0;
      }
    };
  
    [buildHead, buildChest, buildHands, buildLegs].forEach(addArmorDefenseStats);

    // special defense stat increases from RINGS are handled below
    // each ring gets a special IF statement because multiple rings can be worn, need to check both
    if (buildRing1Name === "Ring of Steel Protection" || buildRing2Name === "Ring of Steel Protection") {
      totalPhysicalDef += 50;
    }

    if (buildRing1Name === "Flame Stoneplate Ring" || buildRing2Name === "Flame Stoneplate Ring") {
      totalFireDef += 50;
    }

    if (buildRing1Name === "Spell Stoneplate Ring" || buildRing2Name === "Spell Stoneplate Ring") {
      totalMagicDef += 50;
    }

    if (buildRing1Name === "Thunder Stoneplate Ring" || buildRing2Name === "Thunder Stoneplate Ring") {
      totalLightningDef += 50;
    }

    if (buildRing1Name === "Speckled Stoneplate Ring" || buildRing2Name === "Speckled Stoneplate Ring") {
      totalFireDef += 25;
      totalMagicDef += 25;
      totalLightningDef += 25;
    }

    if (buildRing1Name === "Bloodbite Ring" || buildRing2Name === "Bloodbite Ring") {
      totalBleedDef *= 5;
    }

    if (buildRing1Name === "Poisonbite Ring" || buildRing2Name === "Poisonbite Ring") {
      totalPoisonDef *= 5;
    }

    if (buildRing1Name === "Cursebite Ring" || buildRing2Name === "Cursebite Ring") {
      totalCurseDef *= 5;
    }
   
    this.setState({
      buildPhysicalDef: totalPhysicalDef,
      buildMagicDef: totalMagicDef,
      buildFireDef: totalFireDef,
      buildLightningDef: totalLightningDef,
      buildBleedDef: totalBleedDef,
      buildPoisonDef: totalPoisonDef,
      buildCurseDef: totalCurseDef
      });
  }

  // method is used to handle specific defense stat INCREASES based 
  // on the attribute passed
  levelUpDef = (attribute) => {
     const softCap = 225;
     if (this.state.buildLevel >= softCap) {
      this.handlePostSoftCapIncrease();
     } else {
      this.handlePreSoftCapIncrease();
     }
         // Special handling for endurance affecting bleed stat
    if (attribute === 'endurance') {
      this.increaseBleedStat();
    }
    if (attribute === 'resistance') {
      this.increaseResistanceStats();
    }
  }

  // method is used to handle specific defense stat DECREASES based 
  // on the attribute passed
  levelDownDef = (attribute) => {
    const softCap = 225;
    if (this.state.buildLevel >= softCap) {
     this.handlePostSoftCapDecrease();
    } else {
     this.handlePreSoftCapDecrease();
    }
        // Special handling for endurance affecting bleed stat
   if (attribute === 'endurance') {
     this.decreaseBleedStat();
   }
   if (attribute === 'resistance') {
     this.decreaseResistanceStats();
   }
 }

  // this method is used to INCREMENT pre soft cap defense stats
  handlePreSoftCapIncrease = () => {
    // Calculate the index in the sequence based on the current level
    const sequenceIndex = (this.state.buildLevel + 1) % this.defenseStatSequence.length;
    const statIncreases = this.defenseStatSequence[sequenceIndex];

    // Update defense stats
    this.setState(prevState => ({
      buildPhysicalDef: prevState.buildPhysicalDef + statIncreases[0],
      buildMagicDef: prevState.buildMagicDef + statIncreases[1],
      buildFireDef: prevState.buildFireDef + statIncreases[2],
      buildLightningDef: prevState.buildLightningDef + statIncreases[3],
    }));
  }

  // this method is used to DECREMENT pre soft cap defense stats
  handlePreSoftCapDecrease = () => {
    // Calculate the index in the sequence based on the current level
    const sequenceIndex = (this.state.buildLevel - 1) % this.defenseStatSequence.length;
    const statIncreases = this.defenseStatSequence[sequenceIndex];

    // Update defense stats
    this.setState(prevState => ({
      buildPhysicalDef: prevState.buildPhysicalDef - statIncreases[0],
      buildMagicDef: prevState.buildMagicDef - statIncreases[1],
      buildFireDef: prevState.buildFireDef - statIncreases[2],
      buildLightningDef: prevState.buildLightningDef - statIncreases[3],
    }));
  }

  // this method is used to INCREMENT post soft cap defense stats
  handlePostSoftCapIncrease = () => {
    const levelBeyondSoftCap = this.state.buildLevel - 225;
    const cycleLength = 4 * 2 + 12; // 4 stats with 2 level wait each + 12 levels wait
    const cyclePosition = levelBeyondSoftCap % cycleLength;

    // Determine which stat to increment
    let increment = [0, 0, 0, 0]; // [physical, magic, fire, lightning]
    if (cyclePosition === 0 || cyclePosition === 2 || cyclePosition === 4 || cyclePosition === 6) {
      increment[cyclePosition / 2] = 1;
    }

    // Update defense stats
    this.setState(prevState => ({
      buildPhysicalDef: prevState.buildPhysicalDef + increment[0],
      buildMagicDef: prevState.buildMagicDef + increment[1],
      buildFireDef: prevState.buildFireDef + increment[2],
      buildLightningDef: prevState.buildLightningDef + increment[3],
    }));
  }

    // this method is used to DECREMENT post soft cap defense stats
    handlePostSoftCapDecrease = () => {
      const levelBeyondSoftCap = this.state.buildLevel - 225;
      const cycleLength = 4 * 2 + 12; // 4 stats with 2 level wait each + 12 levels wait
      const cyclePosition = levelBeyondSoftCap % cycleLength;
  
      // Determine which stat to increment
      let increment = [0, 0, 0, 0]; // [physical, magic, fire, lightning]
      if (cyclePosition === 0 || cyclePosition === 2 || cyclePosition === 4 || cyclePosition === 6) {
        increment[cyclePosition / 2] = 1;
      }
  
      // Update defense stats
      this.setState(prevState => ({
        buildPhysicalDef: prevState.buildPhysicalDef - increment[0],
        buildMagicDef: prevState.buildMagicDef - increment[1],
        buildFireDef: prevState.buildFireDef - increment[2],
        buildLightningDef: prevState.buildLightningDef - increment[3],
      }));
    }

  increaseBleedStat = () => {
    const enduranceLevel = this.state.endurance;
    let bleedIncrement = enduranceLevel < 15 ? 4 : enduranceLevel < 30 ? 3 : 1;

    this.setState(prevState => ({
      buildBleedDef: prevState.buildBleedDef + bleedIncrement
    }));
  }

  decreaseBleedStat = () => {
    const enduranceLevel = this.state.endurance;
    let bleedIncrement = enduranceLevel < 15 ? 4 : enduranceLevel < 30 ? 3 : 1;

    this.setState(prevState => ({
      buildBleedDef: prevState.buildBleedDef - bleedIncrement
    }));
  }

  increaseResistanceStats = () => {
    const resistanceLevel = this.state.resistance;
    let physicalIncrement = 0;
    let fireIncrement = 0;
    let magicIncrement = 0;
    let lightningIncrement = 0;
    let poisonIncrement = 0;

    // Determine the increments based on resistance level
    if (resistanceLevel < 50) {
      physicalIncrement = 3;
      fireIncrement = 3;
      magicIncrement = 1;
      lightningIncrement = 1;
      poisonIncrement = resistanceLevel < 30 ? 6 : 3;
    } else {
      physicalIncrement = 1;
      fireIncrement = 1;
      magicIncrement = 1;
      lightningIncrement = 1;
      poisonIncrement = 1;
    }

    // Update the defense stats
    this.setState(prevState => ({
      buildPhysicalDef: prevState.buildPhysicalDef + physicalIncrement,
      buildFireDef: prevState.buildFireDef + fireIncrement,
      buildMagicDef: prevState.buildMagicDef + magicIncrement,
      buildLightningDef: prevState.buildLightningDef + lightningIncrement,
      buildPoisonDef: prevState.buildPoisonDef + poisonIncrement
    }));
  }

  decreaseResistanceStats = () => {
    const resistanceLevel = this.state.resistance;
    let physicalIncrement = 0;
    let fireIncrement = 0;
    let magicIncrement = 0;
    let lightningIncrement = 0;
    let poisonIncrement = 0;

    // Determine the increments based on resistance level
    if (resistanceLevel < 50) {
      physicalIncrement = 3;
      fireIncrement = 3;
      magicIncrement = 1;
      lightningIncrement = 1;
      poisonIncrement = resistanceLevel < 30 ? 6 : 3;
    } else {
      physicalIncrement = 1;
      fireIncrement = 1;
      magicIncrement = 1;
      lightningIncrement = 1;
      poisonIncrement = 1;
    }

    // Update the defense stats
    this.setState(prevState => ({
      buildPhysicalDef: prevState.buildPhysicalDef - physicalIncrement,
      buildFireDef: prevState.buildFireDef - fireIncrement,
      buildMagicDef: prevState.buildMagicDef - magicIncrement,
      buildLightningDef: prevState.buildLightningDef - lightningIncrement,
      buildPoisonDef: prevState.buildPoisonDef - poisonIncrement
    }));
  }

  humanityUp = () => {
    const { buildLevel, humanity } = this.state
    let curseIncrement = 0;
    let incrementPhysical = 0;
    let incrementMagic = 0;
    let incrementFire = 0;
    let incrementLightning = 0;
    
    if (buildLevel < 90) {
      // Calculate the index in the sequence based on the current level
      const sequenceIndex = (buildLevel - 1) % this.defenseStatSequence.length;
      const statIncreases = this.defenseStatSequence[sequenceIndex];

      // Update defense stats
      this.setState(prevState => ({
        buildPhysicalDef: prevState.buildPhysicalDef + statIncreases[0],
        buildMagicDef: prevState.buildMagicDef + statIncreases[1],
        buildFireDef: prevState.buildFireDef + statIncreases[2],
        buildLightningDef: prevState.buildLightningDef + statIncreases[3],
      }));
    } else if (buildLevel >= 90 && buildLevel <= 125) {
      // Determine the pattern based on the build level
      const patternIndex = (buildLevel - 91) % 7;
      switch (patternIndex) {
        case 0: incrementPhysical = 1; break;
        case 1: incrementMagic = 1; incrementFire = 1; incrementLightning = 1; break;
        case 2: incrementPhysical = 0; incrementMagic = 0; incrementFire = 0; incrementLightning = 0; break;
        case 3: incrementMagic = 1; break;
        case 4: incrementPhysical = 1; incrementFire = 1; incrementLightning = 1; break;
        case 5: incrementPhysical = 0; incrementMagic = 0; incrementFire = 0; incrementLightning = 0; break;
        case 6: incrementFire = 1; break;
        default: break;
      }
      // Update the defense stats
      this.setState(prevState => ({
        buildPhysicalDef: prevState.buildPhysicalDef + incrementPhysical,
        buildMagicDef: prevState.buildMagicDef + incrementMagic,
        buildFireDef: prevState.buildFireDef + incrementFire,
        buildLightningDef: prevState.buildLightningDef + incrementLightning
      }));
    } else if (buildLevel > 125) {
      // Increments every 5 levels past 125
      const cycleLength = 20; // 4 stats with 5 level wait each
      const cyclePosition = (buildLevel - 126) % cycleLength;
      if (cyclePosition % 5 === 0) {
        switch (cyclePosition / 5) {
          case 0: incrementPhysical = 1; break;
          case 1: incrementMagic = 1; break;
          case 2: incrementFire = 1; break;
          case 3: incrementLightning = 1; break;
          default: break;
        }
      }
      // Update the defense stats
      this.setState(prevState => ({
        buildPhysicalDef: prevState.buildPhysicalDef + incrementPhysical,
        buildMagicDef: prevState.buildMagicDef + incrementMagic,
        buildFireDef: prevState.buildFireDef + incrementFire,
        buildLightningDef: prevState.buildLightningDef + incrementLightning
      }));
    }

    if (humanity > 0 && humanity <= 5) {
      curseIncrement += 10;
    } else if (humanity > 5 && humanity <= 10) {
      curseIncrement += 8;
    } else if (humanity > 10 && humanity <= 30) {
      if (humanity % 2 === 0) {
        curseIncrement += 1;
      } else {
        curseIncrement += 2;
      }
    }
    

    // Update the defense stats
    this.setState(prevState => ({
      buildCurseDef: prevState.buildCurseDef + curseIncrement
    }));
  }

  humanityDown = () => {
    const { buildLevel, humanity } = this.state
    let curseDecrement = 0;
    let incrementPhysical = 0;
    let incrementMagic = 0;
    let incrementFire = 0;
    let incrementLightning = 0;
    
    if (buildLevel < 90) {
      // Calculate the index in the sequence based on the current level
      const sequenceIndex = (buildLevel - 1) % this.defenseStatSequence.length;
      const statDecreases = this.defenseStatSequence[sequenceIndex];

      // Update defense stats
      this.setState(prevState => ({
        buildPhysicalDef: prevState.buildPhysicalDef - statDecreases[0],
        buildMagicDef: prevState.buildMagicDef - statDecreases[1],
        buildFireDef: prevState.buildFireDef - statDecreases[2],
        buildLightningDef: prevState.buildLightningDef - statDecreases[3],
      }));
    } else if (buildLevel >= 90 && buildLevel <= 125) {
      // Determine the pattern based on the build level
      const patternIndex = (buildLevel - 91) % 7;
      switch (patternIndex) {
        case 0: incrementPhysical = 1; break;
        case 1: incrementMagic = 1; incrementFire = 1; incrementLightning = 1; break;
        case 2: incrementPhysical = 0; incrementMagic = 0; incrementFire = 0; incrementLightning = 0; break;
        case 3: incrementMagic = 1; break;
        case 4: incrementPhysical = 1; incrementFire = 1; incrementLightning = 1; break;
        case 5: incrementPhysical = 0; incrementMagic = 0; incrementFire = 0; incrementLightning = 0; break;
        case 6: incrementFire = 1; break;
        default: break;
      }
      // Update the defense stats
      this.setState(prevState => ({
        buildPhysicalDef: prevState.buildPhysicalDef - incrementPhysical,
        buildMagicDef: prevState.buildMagicDef - incrementMagic,
        buildFireDef: prevState.buildFireDef - incrementFire,
        buildLightningDef: prevState.buildLightningDef - incrementLightning
      }));
    } else if (buildLevel > 125) {
      // Increments every 5 levels past 125
      const cycleLength = 20; // 4 stats with 5 level wait each
      const cyclePosition = (buildLevel - 126) % cycleLength;
      if (cyclePosition % 5 === 0) {
        switch (cyclePosition / 5) {
          case 0: incrementPhysical = 1; break;
          case 1: incrementMagic = 1; break;
          case 2: incrementFire = 1; break;
          case 3: incrementLightning = 1; break;
          default: break;
        }
      }
      // Update the defense stats
      this.setState(prevState => ({
        buildPhysicalDef: prevState.buildPhysicalDef - incrementPhysical,
        buildMagicDef: prevState.buildMagicDef - incrementMagic,
        buildFireDef: prevState.buildFireDef - incrementFire,
        buildLightningDef: prevState.buildLightningDef - incrementLightning
      }));
    }
    
    
    
    if (humanity >= 0 && humanity <= 5) {
      curseDecrement += 10;
    } else if (humanity > 5 && humanity <= 10) {
      curseDecrement += 8;
    } else if (humanity > 10 && humanity <= 30) {
      if (humanity % 2 === 0) {
        curseDecrement += 1;
      } else {
        curseDecrement += 2;
      }
    }
  
    // Update the defense stats
    this.setState(prevState => ({
      buildCurseDef: prevState.buildCurseDef - curseDecrement
    }));
  }
  
  handleClassChange = (e) => {
    const selectedClass = e.target.value
    const attributes = this.classAttributeMapping[selectedClass]
    const defenseStats = this.classDefenseMapping[selectedClass];

    // Update the buildLevel and attributes based on the selected character class
    this.setState({
      characterClass: selectedClass,
      buildLevel: this.classLevelMapping[selectedClass] || 1,
      initVitality: attributes.vitality,
      vitality: attributes.vitality,
      initAttunement: attributes.attunement,
      attunement: attributes.attunement,
      initEndurance: attributes.endurance,
      endurance: attributes.endurance,
      initStrength: attributes.strength,
      strength: attributes.strength,
      initDexterity: attributes.dexterity,
      dexterity: attributes.dexterity,
      initResistance: attributes.resistance,
      resistance: attributes.resistance,
      initIntelligence: attributes.intelligence,
      intelligence: attributes.intelligence,
      initFaith: attributes.faith,
      faith: attributes.faith,
      buildPhysicalDef: defenseStats.physical,
      buildMagicDef: defenseStats.magic,
      buildFireDef: defenseStats.fire,
      buildLightningDef: defenseStats.lightning,
      buildBleedDef: defenseStats.bleed,
      buildPoisonDef: defenseStats.poison,
      buildCurseDef: defenseStats.curse
    })
  }

  // handler for when the user changes the select option for Covenant
  handleCovenantChange = (e) => {
    const selectedCovenant = e.target.value

    this.setState({buildCovenant: selectedCovenant})
  }

  handleSpellChange = (index, event) => {
    const selectedSpellName = event.target.value
    const selectedSpell = this.state.spells.find(spell => spell.name === selectedSpellName)
  
    if (selectedSpell) {
        const { intelligenceRequirement, faithRequirement, slots, spellType } = selectedSpell
        const { intelligence, faith, spellSlots, usedSpellSlots } = this.state
    
        // Calculate new used slots if this spell is selected
        const newUsedSpellSlots = usedSpellSlots - (this.state[`buildSpellName${index + 1}`] !== "No Spell" ? this.state.spells.find(spell => spell.name === this.state[`buildSpellName${index + 1}`]).slots : 0) + slots

        // Check if selecting this spell exceeds the spell slot limit
        if (newUsedSpellSlots > spellSlots) {
            alert(`Selecting this spell will exceed your available spell slots.`)
            return
        }
    
        // Check for sorcery or miracle and their requirements
        if ((spellType === 'sorcery' && intelligence < intelligenceRequirement) || 
            (spellType === 'miracle' && faith < faithRequirement)) {
            alert(`You do not meet the intelligence or faith requirements for this spell.`)
            return
        }
    
        // Update the spell and usedSpellSlots
        this.setState({ 
            [`buildSpellName${index + 1}`]: selectedSpellName,
            usedSpellSlots: newUsedSpellSlots
        })
    }
  }

  
  handleAttributeDiv1Click = () => {
    this.setState(prevState => ({
      currentGroupIndex1: (prevState.currentGroupIndex1 + 1) % this.attributeGroups.length
    }))
  }

  handleAttributeDiv2Click = () => {
    this.setState(prevState => ({
      currentGroupIndex2: (prevState.currentGroupIndex2 + 1) % this.attributeGroups.length
    }))
  }

    handleAttributeDiv3Click = () => {
    this.setState(prevState => ({
      currentGroupIndex3: (prevState.currentGroupIndex3 + 1) % this.attributeGroups.length
    }))
  }

  handleAttributeDiv4Click = () => {
    this.setState(prevState => ({
      currentGroupIndex4: (prevState.currentGroupIndex4 + 1) % this.attributeGroups.length
    }))
  }

  renderAttributes = (weapon, group) => {

    // Capitalize the first letter of the group name for display
    const groupName = group.charAt(0).toUpperCase() + group.slice(1)

    if (group === 'weightDurability') {
      return (
        <>
          <p>Weight: {weapon.weight}</p>
          <p>Durability: {weapon.durability}</p>
        </>
      )
    } else {
      return (
        <>
        <p className="groupNameP">{groupName}</p>
        {Object.entries(weapon[group]).map(([key, value]) => (
          <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</p>
        ))}
      </>
      )
    }
  }

  handleHeadChange = (e) => {
    const selectedHead = e.target.value

    this.setState({buildHeadName: selectedHead})
    this.handleHelmetSelection(selectedHead)
  }

  getHelmetByName = (helmetName) => {
    return this.state.helmets.find(helmet => helmet.name === helmetName)
  }
  
  handleHelmetSelection = (helmetName) => {
    const selectedHelmet = this.getHelmetByName(helmetName)
    if (selectedHelmet) {
      this.setState({ buildHead: selectedHelmet })
    } else {
      // Handle the case where the helmet is not found
      console.log("Helmet not found")
    }
  }

  handleChestChange = (e) => {
    const selectedChest = e.target.value

    this.setState({buildChestName: selectedChest})
    this.handleChestSelection(selectedChest)
  }

  getChestByName = (chestName) => {
    return this.state.chests.find(chest => chest.name === chestName)
  }
  
  handleChestSelection = (chestName) => {
    const selectedChest = this.getChestByName(chestName)
    if (selectedChest) {
      this.setState({ buildChest: selectedChest })
    } else {
      // Handle the case where the chest is not found
      console.log("Chest not found")
    }
  }

  handleHandsChange = (e) => {
    const selectedHands = e.target.value

    this.setState({buildHandsName: selectedHands})
    this.handleHandSelection(selectedHands)
  }

  getHandsByName = (handName) => {
    return this.state.hands.find(hand => hand.name === handName)
  }
  
  handleHandSelection = (handName) => {
    const selectedHand = this.getHandsByName(handName)
    if (selectedHand) {
      this.setState({ buildHands: selectedHand })
    } else {
      // Handle the case where the hands is not found
      console.log("Hands not found")
    }
  }

  handleLegsChange = (e) => {
    const selectedLegs = e.target.value

    this.setState({buildLegsName: selectedLegs})
    this.handleLegsSelection(selectedLegs)
  }

  getLegsByName = (legName) => {
    return this.state.legs.find(leg => leg.name === legName)
  }
  
  handleLegsSelection = (legName) => {
    const selectedLegs = this.getLegsByName(legName)
    if (selectedLegs) {
      this.setState({ buildLegs: selectedLegs })
    } else {
      // Handle the case where the legs is not found
      console.log("Legs not found")
    }
  }

  handleRing1Change = (e) => {
    const selectedRing1 = e.target.value

    // Check if the selected ring is already selected as the second ring
    if (selectedRing1 === "No Ring") {
      this.setState({ buildRing1Name: selectedRing1 })
    } else if (selectedRing1 === this.state.buildRing2Name) {
      alert("This ring is already selected in the other slot.")
    } else {
      this.setState({ buildRing1Name: selectedRing1 })
      this.handleRingSelection1(selectedRing1)

    }
}

  handleRing2Change = (e) => {
  const selectedRing2 = e.target.value

  // Check if the selected ring is already selected as the second ring
  if (selectedRing2 === "No Ring") {
    this.setState({ buildRing2Name: selectedRing2 })
    } else if (selectedRing2 === this.state.buildRing1Name) {
      alert("This ring is already selected in the other slot.")
    } else {
      this.setState({ buildRing2Name: selectedRing2 })
      this.handleRingSelection2(selectedRing2)
  }
  }

  getRingByName = (ringName) => {
    return this.state.rings.find(ring => ring.name === ringName)
  }

  handleRingSelection1 = (ringName) => {
    const selectedRing = this.getRingByName(ringName)
    if (selectedRing) {
      this.setState({ buildRing1: selectedRing })
    } else {
      // Handle the case where the weapon is not found
      console.log("Ring not found")
    }
  }

  handleRingSelection2 = (ringName) => {
    const selectedRing = this.getRingByName(ringName)
    if (selectedRing) {
      this.setState({ buildRing2: selectedRing })
    } else {
      // Handle the case where the weapon is not found
      console.log("Ring not found")
    }
  }

  getWeaponByName = (weaponName) => {
    return this.state.weapons.find(weapon => weapon.name === weaponName)
  }

  handleLeftHandOneChange = (e) => {
    const selectedLeftHand1 = e.target.value
    this.setState({buildLeftHand1Name: selectedLeftHand1})
    this.handleWeaponSelection1(selectedLeftHand1)
    
  }

  handleWeaponSelection1 = (weaponName) => {
    const selectedWeapon = this.getWeaponByName(weaponName)
    if (selectedWeapon) {
      this.setState({ buildLeftHand1: selectedWeapon })
    } else {
      // Handle the case where the weapon is not found
      console.log("Weapon not found")
    }
  }

  handleRightHandOneChange = (e) => {
    const selectedRightHand1 = e.target.value
    this.setState({buildRightHand1Name: selectedRightHand1})
    this.handleWeaponSelection2(selectedRightHand1)
  }

  handleWeaponSelection2 = (weaponName) => {
    const selectedWeapon = this.getWeaponByName(weaponName)
    if (selectedWeapon) {
      this.setState({ buildRightHand1: selectedWeapon })
    } else {
      // Handle the case where the weapon is not found
      console.log("Weapon not found")
    }
  }

  handleLeftHandTwoChange = (e) => {
    const selectedLeftHand2 = e.target.value
    this.setState({buildLeftHand2Name: selectedLeftHand2})
    this.handleWeaponSelection3(selectedLeftHand2)
  }

  handleWeaponSelection3 = (weaponName) => {
    const selectedWeapon = this.getWeaponByName(weaponName)
    if (selectedWeapon) {
      this.setState({ buildLeftHand2: selectedWeapon })
    } else {
      // Handle the case where the weapon is not found
      console.log("Weapon not found")
    }
  }

  handleRightHandTwoChange = (e) => {
    const selectedRightHand2 = e.target.value
    this.setState({buildRightHand2Name: selectedRightHand2})
    this.handleWeaponSelection4(selectedRightHand2)
  }

  handleWeaponSelection4 = (weaponName) => {
    const selectedWeapon = this.getWeaponByName(weaponName)
    if (selectedWeapon) {
      this.setState({ buildRightHand2: selectedWeapon })
    } else {
      // Handle the case where the weapon is not found
      console.log("Weapon not found")
    }
  }


  handleItemChange1 = (e) => {
    const selectedItem1 = e.target.value
    this.setState({buildItemName1: selectedItem1})
  }

  handleItemChange2 = (e) => {
    const selectedItem2 = e.target.value
    this.setState({buildItemName2: selectedItem2})
  }

  handleItemChange3 = (e) => {
    const selectedItem3 = e.target.value
    this.setState({buildItemName3: selectedItem3})
  }

  handleItemChange4 = (e) => {
    const selectedItem4 = e.target.value
    this.setState({buildItemName4: selectedItem4})
  }

  handleItemChange5 = (e) => {
    const selectedItem5 = e.target.value
    this.setState({buildItemName5: selectedItem5})
  }

  // handle arrow/bolt changes
  handleArrowChange1 = (e) => {
    const selectedArrow1 = e.target.value
    this.setState({buildArrow1: selectedArrow1})
  }

  handleArrowChange2 = (e) => {
    const selectedArrow2 = e.target.value
    this.setState({buildArrow2: selectedArrow2})
  }

  handleBoltChange1 = (e) => {
    const selectedBolt1 = e.target.value
    this.setState({buildBolt1: selectedBolt1})
  }

  handleBoltChange2 = (e) => {
    const selectedBolt2 = e.target.value
    this.setState({buildBolt2: selectedBolt2})
  }

  handleNewBuildClick = () => {
    // Open a new page in another tab
    window.open("https://brandonbjs.github.io/Dark-Souls-Character-Builder-gh-pages/", "_blank")
  }

  handleResetClick = () => {
    // Refresh the current page
    window.location.reload()
  }

  // Generic method to increment an attribute to a MAX of 99
  handleIncrement = (attribute) => {
    if (attribute === "humanity" && this.state.humanity < 99) {
      this.setState((prevState) => ({
        humanity: prevState.humanity + 1,
      }))
    } else {
      if (this.state[attribute] < 99) {
        this.setState((prevState) => ({
          buildLevel: prevState.buildLevel + 1,
          [attribute]: prevState[attribute] + 1,
        }))
      }
    }
  }

    // Generic method to decrement an attribute
    handleDecrement = (attribute) => {
      if (attribute === "humanity" && this.state.humanity > 0) {
        this.setState((prevState) => ({
          humanity: prevState.humanity - 1,
        }))
      } else {
        const initKey = `init${attribute.charAt(0).toUpperCase() + attribute.slice(1)}`
        if (this.state.buildLevel > 0 && this.state[attribute] > this.state[initKey]) {
          this.setState((prevState) => ({
            buildLevel: prevState.buildLevel - 1,
            [attribute]: prevState[attribute] - 1,
          }))
        }
      }
      
    }

    // method to set the souls for LOWER levels (1-12)
    setLowerSoulsLevel = () => {
      const { buildLevel } = this.state
      let souls

      // use a switch to deal with levels 1-11 because the equation to calculate
      // souls for next level is only accurate for level 12 and up.
      const lowerLevels = {
        1: 673,
        2: 689,
        3: 706,
        4: 723,
        5: 740,
        6: 757,
        7: 775,
        8: 793,
        9: 811,
        10: 829,
        11: 847,
        12: 1038,
      }
      souls = lowerLevels[buildLevel]
      this.setState({ soulsToNextLevel: souls })
    }

    // method to calculate the souls needed for next level (levels greater than 12)
    calculateSoulsToNextLevel = () => {
      const { buildLevel } = this.state
      const calcSouls = Math.round((0.02 * Math.pow((buildLevel+1), 3)) + (3.06 * Math.pow((buildLevel+1), 2)) + (105.6 * (buildLevel+1)) - 895) 
      this.setState({ soulsToNextLevel: calcSouls })
    }

    calculateTotalSouls = (targetLevel) => {
      const { characterClass } = this.state
      const baseLevel = this.classLevelMapping[characterClass]
      let totalSouls = 0
    
      // Iterate from the base level to the target level
      for (let level = baseLevel; level < targetLevel; level++) {
        // Add souls required for each level to totalSouls
        // You need to implement getSoulsForLevel(level) which returns souls required for a given level
        totalSouls += this.getSoulsForLevel(level)
      }
    
      // Update the state with the calculated total souls
      this.setState({ spentSouls: totalSouls })
    }
    
    getSoulsForLevel = (level) => {
      
      let soulsForThisLevel
      if (level <= 12) {
        const lowerLevels = {
          1: 673,
          2: 689,
          3: 706,
          4: 723,
          5: 740,
          6: 757,
          7: 775,
          8: 793,
          9: 811,
          10: 829,
          11: 847,
          12: 1038,
        }
        soulsForThisLevel = lowerLevels[level]
      } else {
        soulsForThisLevel = Math.round((0.02 * Math.pow((level+1), 3)) + 
        (3.06 * Math.pow((level+1), 2)) + (105.6 * (level+1)) - 895)
      }
      return soulsForThisLevel
    }
    
  
  render() {
    const { helmets, chests, hands, legs, characterClass, characterGender, 
            buildLevel, initVitality, vitality, initAttunement, attunement, 
            initEndurance, endurance, initStrength, strength, initDexterity, 
            dexterity, initResistance, resistance, initIntelligence, intelligence,
            initFaith, faith, humanity, soulsToNextLevel, spentSouls, 
            buildCovenant, weapons, buildLeftHand1, buildRightHand1, buildLeftHand2,
            buildRightHand2, buildLeftHand1Name, buildRightHand1Name, 
            buildLeftHand2Name, buildRightHand2Name, buildRing1, 
            buildRing2, rings, buildRing1Name, buildRing2Name,
            buildHeadName, buildChestName, buildHandsName, buildLegsName,
            spells, spellSlots, buildHP, buildStamina, buildTotalEquipLoad,
            buildEquipLoad, buildEncumbrance, buildRollType, 
            buildStaminaRecovery, buildPoise, buildItemDiscovery,
            buildItemName1, buildItemName2, buildItemName3, buildItemName4,
            buildItemName5, items, buildPhysicalDef, buildMagicDef,
            buildFireDef, buildLightningDef, buildBleedDef, 
            buildPoisonDef, buildCurseDef, buildArrow1, buildArrow2,
            buildBolt1, buildBolt2 } = this.state
    
    const leftHandGroup1 = this.attributeGroups[this.state.currentGroupIndex1]
    const rightHandGroup1 = this.attributeGroups[this.state.currentGroupIndex2]
    const leftHandGroup2 = this.attributeGroups[this.state.currentGroupIndex3]
    const rightHandGroup2 = this.attributeGroups[this.state.currentGroupIndex4]

    const initialLevel = this.classLevelMapping[characterClass]

    let colorClass

    if (buildEncumbrance < 25) {
      colorClass = 'green-text'
    } else if (buildEncumbrance >= 25 && buildEncumbrance < 50) {
      colorClass = 'blue-text'
    } else if (buildEncumbrance >= 50) {
      colorClass = 'red-text'
    }

    
    return (
    /* character-builder div encompasses our three columns (attributes-grid,
       items-grid, and stats-grid) and their resprective grids/fields
         
         attributes-grid will house fields and inputs for: class, gender, level, 
         and all attribute points (based on what class is chosen): all starting classes 
         in Dark Souls begin with varying levels ***which affects the amount of attributes 
         they start with*** */
      <div className="character-builder">
        
        <div className="attributes-grid">
          <div className="dropdown">
            <label htmlFor="characterClass">Class</label>
            <select id="characterClass" className="characterClass"
             value={characterClass}
             onChange={this.handleClassChange}>
              <option value="warrior">Warrior</option>
              <option value="knight">Knight</option>
              <option value="wanderer">Wanderer</option>
              <option value="thief">Thief</option>
              <option value="bandit">Bandit</option>
              <option value="hunter">Hunter</option>
              <option value="sorcerer">Sorcerer</option>
              <option value="pyromancer">Pyromancer</option>
              <option value="cleric">Cleric</option>
              <option value="deprived">Deprived</option>
            </select>

            <button type="button" className="newBuildButton" 
                    onClick={this.handleNewBuildClick}>
                New Build
            </button>

          </div>

          <div className="genderDropdown">
            <label htmlFor="characterGender">Gender</label>
            <select id="characterGender" className="characterGender"
             value={characterGender}
             onChange={(e) => this.setState({ characterGender: e.target.value })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button type="button" className="resetButton" 
                    onClick={this.handleResetClick}>
              Reset
            </button>
          </div>

          <div className="buildLevel">
            <span>Level: </span>
            <span className="initialLevelNumber">{initialLevel}</span>
            <span className="levelNumber">{buildLevel}</span>
          </div>

          <div className="attributesInfo">
            <span>Attribute</span>
            <span className="init">Initial Value</span>
            <span className="current">Current</span>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Vitality</div>
            <div className="attribute-values">
              <span className="initial-vitality">{initVitality}</span>
              <span className="current-value">{vitality}</span>

            </div>
            <div className="button-row">
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleDecrement("vitality")}>
              -
            </button>
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleIncrement("vitality")}>
              +
            </button>
            </div>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Attunement</div>
            <div className="attribute-values">
              <span className="initial-attunement">{initAttunement}</span>
              <span className="current-value">{attunement}</span>
            </div>
            <div className="button-row">
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleDecrement("attunement")}>
              -
            </button>
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleIncrement("attunement")}>
              +
            </button>
            </div>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Endurance</div>
            <div className="attribute-values">
              <span className="initial-vitality">{initEndurance}</span>
              <span className="current-value">{endurance}</span>
            </div>
            <div className="button-row">
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleDecrement("endurance")}>
              -
            </button>
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleIncrement("endurance")}>
              +
            </button>
            </div>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Strength</div>
            <div className="attribute-values">
              <span className="initial-vitality">{initStrength}</span>
              <span className="current-value">{strength}</span>
            </div>
            <div className="button-row">
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleDecrement("strength")}>
              -
            </button>
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleIncrement("strength")}>
              +
            </button>
            </div>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Dexterity</div>
            <div className="attribute-values">
              <span className="initial-vitality">{initDexterity}</span>
              <span className="current-value">{dexterity}</span>
            </div>
            <div className="button-row">
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleDecrement("dexterity")}>
              -
            </button>
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleIncrement("dexterity")}>
              +
            </button>
            </div>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Resistance</div>
            <div className="attribute-values">
              <span className="initial-vitality">{initResistance}</span>
              <span className="current-value">{resistance}</span>
            </div>
            <div className="button-row">
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleDecrement("resistance")}>
              -
            </button>
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleIncrement("resistance")}>
              +
            </button>
            </div>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Intelligence</div>
            <div className="attribute-values">
              <span className="initial-vitality">{initIntelligence}</span>
              <span className="current-value">{intelligence}</span>
            </div>
            <div className="button-row">
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleDecrement("intelligence")}>
              -
            </button>
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleIncrement("intelligence")}>
              +
            </button>
            </div>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Faith</div>
            <div className="attribute-values">
              <span className="initial-vitality">{initFaith}</span>
              <span className="current-value">{faith}</span>
            </div>
            <div className="button-row">
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleDecrement("faith")}>
              -
            </button>
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleIncrement("faith")}>
              +
            </button>
            </div>
          </div>

          <div className="buildLevel">
            <span>Humanity</span>
            <span className="humanityNumber">{humanity}</span>
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleDecrement("humanity")}>
              -
            </button>
            <button type="button" className="attributeButton" 
                    onClick={() => this.handleIncrement("humanity")}>
              +
            </button>
          </div>

          <div className="soulsCounter">
            <div className="soulsToNextLevel">
              <span>Souls to Next Level: </span>
              <span className="soulsToNextLevelNumber">{soulsToNextLevel}</span>
            </div>

            <div className="minSoulsReq">
              <span>Minimum Souls Required: </span>
              <span className="spentSoulsNumber">{spentSouls}</span>
            </div>
          </div>
          
          <div className="covenantDropdown">
            <label htmlFor="characterConvenant">Covenant:</label>
            <select id="characterCovenant" className="characterCovenant"
             value={buildCovenant}
             onChange={this.handleCovenantChange}>
              <option value="No Covenant">No Covenant</option>
              <option value="darkmoon">Blade of the Darkmoon</option>
              <option value="chaos">Chaos Servant</option>
              <option value="darkwraith">Darkwraith</option>
              <option value="hunter">Forest Hunter</option>
              <option value="gravelord">Gravelord Servant</option>
              <option value="dragon">Path of the Dragon</option>
              <option value="guard">Princess's Guard</option>
              <option value="sunbro">Warrior of Sunlight</option>
              <option value="white">Way of White</option>
            </select>
          </div>

          <div className="spellsAndInfoContainer">
            <span className="effectsSpan">Spells</span>
            <div className="spellSlotsContainer">
                {Array.from({ length: spellSlots }).map((_, index) => (
                    <div key={index}>
                        <select className="spellsDropdown"
                         value={this.state[`buildSpellName${index + 1}`]}
                         onChange={(event) => this.handleSpellChange(index, event)}>
                            <option value="No Spell">No Spell</option>
                            {spells.map(spell => (
                                <option key={spell.id} value={spell.name}>
                                {spell.spellType === 'sorcery' ? 
                                    `${spell.name} (Int: ${spell.intelligenceRequirement}, Slots: ${spell.slots})` :
                                spell.spellType === 'miracle' ? 
                                    `${spell.name} (Faith: ${spell.faithRequirement}, Slots: ${spell.slots})` :
                                    `${spell.name} (Slots: ${spell.slots})`}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
          </div>
          
        
        </div>

        {/* items-grid will house selects and dropdowns for armor, weapons, spells
        and rings.  */}
        <div className="items-grid">
          
          <div className="armorInfo">
            <span>Armor</span>
          </div>

          <div className="armorDropdown">
            <span className="dropdownLabel">Head</span>
            <select className="itemSelect"
            value={buildHeadName}
            onChange={this.handleHeadChange}>
              {helmets.map(helmet => (
                  <option key={helmet._id} value={helmet.name}>
                      {helmet.name} 
                  </option>
              ))}
            </select>
          </div>

          <div className="armorDropdown">
            <span className="dropdownLabel">Chest</span>
            <select className="itemSelect"
            value={buildChestName}
            onChange={this.handleChestChange}>
              {chests.map(chest => (
                  <option key={chest._id} value={chest.name}>
                      {chest.name} 
                  </option>
              ))}
          </select>
          </div>

          <div className="armorDropdown">
            <span className="dropdownLabel">Hands</span>
            <select className="itemSelect"
            value={buildHandsName}
            onChange={this.handleHandsChange}>
              {hands.map(hand => (
                  <option key={hand._id} value={hand.name}>
                      {hand.name} 
                  </option>
              ))}
          </select>
          </div>

          <div className="armorDropdown">
            <span className="dropdownLabel">Legs</span>
            <select className="itemSelect"
            value={buildLegsName}
            onChange={this.handleLegsChange}>
              {legs.map(leg => (
                  <option key={leg._id} value={leg.name}>
                      {leg.name} 
                  </option>
              ))}
          </select>
          </div>

          <div className="armorDropdown">
            <span className="dropdownLabel">Ring 1</span>
            <select className="itemSelect"
              value={buildRing1Name}
              onChange={this.handleRing1Change}>
                <option value="No Ring">No Ring</option>
                {rings.map(ring => (
                  <option key={ring._id} value={ring.name}>
                      {ring.name} 
                  </option>
                ))}
            </select>
          </div>

          <div className="armorDropdown">
            <span className="dropdownLabel">Ring 2</span>
            <select className="itemSelect"
              value={buildRing2Name}
              onChange={this.handleRing2Change}>
                <option value="No Ring">No Ring</option>
                {rings.map(ring => (
                  <option key={ring._id} value={ring.name}>
                      {ring.name} 
                  </option>
                ))}
            </select>
          </div>

          
          <div className="weaponInfo">
            <span className="leftHand">Left hand</span>
            <span className="rightHand">Right hand</span>
          </div>
          
          <div className="weaponsContainer">
            <div className="leftHandWeapon">
              <select className="weaponSelect" 
               value={buildLeftHand1Name} 
               onChange={this.handleLeftHandOneChange}>
                  {weapons.map(weapon => (
                      <option key={weapon._id} value={weapon.name}>
                          {weapon.name} 
                      </option>
                  ))}
              </select>
              
              <div>
                {buildLeftHand1 && (
                  <div class="weaponAttributes" id="leftWeaponAttributes"
                   onClick={this.handleAttributeDiv1Click}>
                    {this.renderAttributes(buildLeftHand1, leftHandGroup1)}
                  </div>
                )}
              </div>

            </div>

            <div className="rightHandWeapon">
              <select className="weaponSelect"
                value={buildRightHand1Name}
                onChange={this.handleRightHandOneChange}>
                  {weapons.map(weapon => (
                      <option key={weapon._id} value={weapon.name}>
                          {weapon.name} 
                      </option>
                  ))}
              </select>
              
              <div>
                {buildRightHand1 && (
                  <div class="weaponAttributes" id="leftWeaponAttributes"
                   onClick={this.handleAttributeDiv2Click}>
                    {this.renderAttributes(buildRightHand1, rightHandGroup1)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="weaponsContainer">
            <div className="leftHandWeapon">
              <select className="weaponSelect" 
               value={buildLeftHand2Name} 
               onChange={this.handleLeftHandTwoChange}>
                  {weapons.map(weapon => (
                      <option key={weapon._id} value={weapon.name}>
                          {weapon.name} 
                      </option>
                  ))}
              </select>
              
              <div>
                {buildLeftHand2 && (
                  <div class="weaponAttributes" id="leftWeaponAttributes"
                   onClick={this.handleAttributeDiv3Click}>
                    {this.renderAttributes(buildLeftHand2, leftHandGroup2)}
                  </div>
                )}
              </div>

            </div>

            <div className="rightHandWeapon">
              <select className="weaponSelect"
                value={buildRightHand2Name}
                onChange={this.handleRightHandTwoChange}>
                  {weapons.map(weapon => (
                      <option key={weapon._id} value={weapon.name}>
                          {weapon.name} 
                      </option>
                  ))}
              </select>
              
              <div>
                {buildRightHand2 && (
                  <div class="weaponAttributes" id="leftWeaponAttributes"
                   onClick={this.handleAttributeDiv4Click}>
                    {this.renderAttributes(buildRightHand2, rightHandGroup2)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="effectsContainer">
            <div className="effectsDiv">
              <span className="effectsSpan">Effects</span>
              {(buildRing1 && buildRing1Name !== "No Ring") && (
                <div className="effect">
                  <p>{buildRing1.name} {buildRing1.effect}</p>
                </div>
              )}
              {(buildRing2 && buildRing2Name !== "No Ring") && (
                <div className="effect">
                  <p>{buildRing2.name} {buildRing2.effect}</p>
                </div>
              )}
              {buildHeadName === "Crown of Dusk" && (
                <div className="effect">
                  <p>Crown of Dusk: Boosts Sorceries, Miracles and Pyromancies damage by 20%, but reduces Magic defence by 30%.</p>
                </div>
              )}
              {buildHeadName === "Mask of the Mother" && (
                <div className="effect">
                  <p>Mask of the Mother: One of the three masks of the Pinwheel, the necromancer who stole the power of the Gravelord, 
                    and reigns over the Catacombs. This mask, belonging to the kindly mother, slightly raises HP.</p>
                </div>
              )}
              {buildHeadName === "Mask of the Father" && (
                <div className="effect">
                  <p>Mask of the Father: One of the three masks of the Pinwheel, the necromancer who stole the power of the Gravelord, 
                    and reigns over the Catacombs. This mask, belonging to the valiant father, slightly raises equipment load.</p>
                </div>
              )}
              {buildHeadName === "Mask of the Child" && (
                <div className="effect">
                  <p>One of the three masks of the Pinwheel, the necromancer who stole the power of the Gravelord, and 
                    reigns over the Catacombs. This mask, belonging to the naive child, slightly raises stamina recovery speed.</p>
                </div>
              )}
              {(
                buildLeftHand1Name === "Grass Crest Shield" ||
                buildLeftHand2Name === "Grass Crest Shield" ||
                buildRightHand1Name === "Grass Crest Shield" ||
                buildRightHand2Name === "Grass Crest Shield"
              ) && (
                <div className="effect">
                  <p>Grass Crest Shield: Old medium metal shield of unknown origin. The grass crest is lightly imbued with magic, which slightly speeds stamina recovery.</p>
                </div>
              )}

            </div>
          </div>

        </div>

        <div className="stats-grid">
          
          <div className="char-stats">
            <div className="stat-row">
              <div className="stat-name">HP</div>
              <div className="stat-value">{buildHP}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Stamina</div>
              <div className="stat-value">{buildStamina}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Stamina Regen</div>
              <div className="stat-value">{buildStaminaRecovery}/sec</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Equip Load</div>
              
              <div className={`weight-value ${colorClass}`}>{buildEquipLoad} / {buildTotalEquipLoad} - {buildEncumbrance}%</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Roll Type</div>
              <div className={`weight-value ${colorClass}`}>{buildRollType}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Poise</div>
              <div className="stat-value">{buildPoise}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Item Discovery</div>
              <div className="stat-value">{buildItemDiscovery}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Attunement Slots</div>
              <div className="stat-value">{spellSlots}</div>
            </div>
          </div>

          <div className="char-defense">
            <div className="armorInfo">
              <span>Defense</span>
            </div>

            <div className="stat-row">
              <div className="stat-name">Physical</div>
              <div className="stat-value">{buildPhysicalDef}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Magic</div>
              <div className="stat-value">{buildMagicDef}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Fire</div>
              <div className="stat-value">{buildFireDef}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Lightning</div>
              
              <div className="stat-value">{buildLightningDef}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Bleed</div>
              <div className="stat-value">{buildBleedDef}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Poison</div>
              <div className="stat-value">{buildPoisonDef}</div>
            </div>

            <div className="stat-row">
              <div className="stat-name">Curse</div>
              <div className="stat-value">{buildCurseDef}</div>
            </div>

          </div>

          <div className="char-items">

            <div className="itemInfo">
              <span>Items</span>
            </div>
            
            <div className="itemDropdown">
              <select className="itemSelect"
              value={buildItemName1}
              onChange={this.handleItemChange1}>
                <option value="No Item">No Item</option>
                {items.map(item => (
                    <option key={item._id} value={item.name}>
                        {item.name} 
                    </option>
                ))}
              </select>
            </div>

            <div className="itemDropdown">
              <select className="itemSelect"
              value={buildItemName2}
              onChange={this.handleItemChange2}>
                <option value="No Item">No Item</option>
                {items.map(item => (
                    <option key={item._id} value={item.name}>
                        {item.name} 
                    </option>
                ))}
              </select>
            </div>

            <div className="itemDropdown">
              <select className="itemSelect"
              value={buildItemName3}
              onChange={this.handleItemChange3}>
                <option value="No Item">No Item</option>
                {items.map(item => (
                    <option key={item._id} value={item.name}>
                        {item.name} 
                    </option>
                ))}
              </select>
            </div>

            <div className="itemDropdown">
              <select className="itemSelect"
              value={buildItemName4}
              onChange={this.handleItemChange4}>
                <option value="No Item">No Item</option>
                {items.map(item => (
                    <option key={item._id} value={item.name}>
                        {item.name} 
                    </option>
                ))}
              </select>
            </div>

            <div className="itemDropdown">
              <select className="itemSelect"
              value={buildItemName5}
              onChange={this.handleItemChange5}>
                <option value="No Item">No Item</option>
                {items.map(item => (
                    <option key={item._id} value={item.name}>
                        {item.name} 
                    </option>
                ))}
              </select>
            </div>

            <div className="itemInfo">
              <span>Arrows</span>
            </div>

            <div className="itemDropdown">
              <select className="itemSelect"
              value={buildArrow1}
              onChange={this.handleArrowChange1}>
                <option value="No Arrow">No Arrow</option>
                <option value="feather">Feather Arrow</option>
                <option value="fire">Fire Arrow</option>
                <option value="large">Large Arrow</option>
                <option value="moonlight">Moonlight Arrow</option>
                <option value="poison">Poison Arrow</option>
                <option value="standard">Standard Arrow</option>
                <option value="wooden">Wooden Arrow</option>
                <option value="dragonslayer">Dragonslayer Arrow</option>
                <option value="gough's">Gough's Great Arrow</option>
              </select>
            </div>

            <div className="itemDropdown">
              <select className="itemSelect"
              value={buildArrow2}
              onChange={this.handleArrowChange2}>
                <option value="No Arrow">No Arrow</option>
                <option value="feather">Feather Arrow</option>
                <option value="fire">Fire Arrow</option>
                <option value="large">Large Arrow</option>
                <option value="moonlight">Moonlight Arrow</option>
                <option value="poison">Poison Arrow</option>
                <option value="standard">Standard Arrow</option>
                <option value="wooden">Wooden Arrow</option>
                <option value="dragonslayer">Dragonslayer Arrow</option>
                <option value="gough's">Gough's Great Arrow</option>
              </select>
            </div>

            <div className="itemInfo">
              <span>Bolts</span>
            </div>

            <div className="itemDropdown">
              <select className="itemSelect"
              value={buildBolt1}
              onChange={this.handleBoltChange1}>
                <option value="No Bolt">No Bolt</option>
                <option value="heavy">Heavy Bolt</option>
                <option value="lightning">Lightning Bolt</option>
                <option value="sniper">Sniper Bolt</option>
                <option value="standard">Standard Bolt</option>
                <option value="wood">Wood Bolt</option>
              </select>
            </div>

            <div className="itemDropdown">
              <select className="itemSelect"
              value={buildBolt2}
              onChange={this.handleArrowChange2}>
                <option value="No Bolt">No Bolt</option>
                <option value="heavy">Heavy Bolt</option>
                <option value="lightning">Lightning Bolt</option>
                <option value="sniper">Sniper Bolt</option>
                <option value="standard">Standard Bolt</option>
                <option value="wood">Wood Bolt</option>
              </select>
            </div>
            
          </div>


        </div>
      </div>
    )
  }
}

export default CharacterBuilder