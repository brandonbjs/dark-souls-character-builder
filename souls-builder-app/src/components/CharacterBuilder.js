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

    this.attributeGroups = ['atk', 'def', 'effects', 'req', 'scale', 'weightDurability'];

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
      buildHeadName: "",
      buildChest: [],
      buildChestName: "",
      buildHands: [],
      buildHandsName: "",
      buildLegs: [],
      buildLegsName: "",
      buildLeftHand1: null,
      buildRightHand1: null,
      buildLeftHand2: null,
      buildRightHand2: null,
      buildLeftHand1Name: null,
      buildRightHand1Name: null,
      buildLeftHand2Name: null,
      buildRightHand2Name: null,
      buildRing1Name: "No Ring 1",
      buildRing2Name: "No Ring 2",
      buildRing1: [],
      buildRing2: [],
      currentGroupIndex1: 0,
      currentGroupIndex2: 0,
      currentGroupIndex3: 0,
      currentGroupIndex4: 0,
      spellSlots: 0,
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
    }
  }

  // set initial souls needed for next level with the componentDidMount() 
  // lifecycle method
  componentDidMount() {
    const { buildLevel } = this.state;
    this.setLowerSoulsLevel();
    this.calculateTotalSouls(buildLevel);

    // initial fetch method to populate the helmets array with helmets from
    // my MongoDB database.
    fetch('http://localhost:1234/fetchHelmets')
        .then(response => response.json())
        .then(data => {
            this.setState({ helmets: data });
        })
        .catch(error => {
            console.error('Error fetching helmets (in CharacterBuilder.js):', error);
        });
    
    // initial fetch method to populate the chests array with chests from
    // my MongoDB database.
    fetch('http://localhost:1234/fetchChests')
    .then(response => response.json())
    .then(data => {
        this.setState({ chests: data });
    })
    .catch(error => {
        console.error('Error fetching chests (in CharacterBuilder.js):', error);
    });

    // initial fetch method to populate the hands array with hands from
    // my MongoDB database.
    fetch('http://localhost:1234/fetchHands')
        .then(response => response.json())
        .then(data => {
            this.setState({ hands: data });
        })
        .catch(error => {
            console.error('Error fetching hands (in CharacterBuilder.js):', error);
        });
    
    // initial fetch method to populate the legs array with chests from
    // my MongoDB database.
    fetch('http://localhost:1234/fetchLegs')
    .then(response => response.json())
    .then(data => {
        this.setState({ legs: data });
    })
    .catch(error => {
        console.error('Error fetching legs (in CharacterBuilder.js):', error);
    });

    // initial fetch method to populate the legs array with chests from
    // my MongoDB database.
    fetch('http://localhost:1234/fetchWeapons')
    .then(response => response.json())
    .then(data => {
        this.setState({ weapons: data });
    })
    .catch(error => {
        console.error('Error fetching weapons (in CharacterBuilder.js):', error);
    });

    // initial fetch method to populate the rings array with rings from
    // my MongoDB database rings collection.
    fetch('http://localhost:1234/fetchRings')
    .then(response => response.json())
    .then(data => {
        this.setState({ rings: data });
    })
    .catch(error => {
        console.error('Error fetching rings (in CharacterBuilder.js):', error);
    });

      // initial fetch method to populate the spells array with spells from
    // my MongoDB database spells collection.
    fetch('http://localhost:1234/fetchSpells')
    .then(response => response.json())
    .then(data => {
        this.setState({ spells: data });
    })
    .catch(error => {
        console.error('Error fetching spells (in CharacterBuilder.js):', error);
    });
    this.calculateSpellSlots();
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
        this.setLowerSoulsLevel();
      } else {
        this.calculateSoulsToNextLevel();
      }

      this.calculateTotalSouls(this.state.buildLevel);
    }
    
    // if the character class changes  calculate new spell slots
    if (prevState.characterClass !== this.state.characterClass) {
      this.calculateSpellSlots();
    }

    // if the character attunement changes  calculate new spell slots
    if (prevState.attunement !== this.state.attunement) {
      this.calculateSpellSlots();
    }
  }

  calculateSpellSlots = () => {
    let spellAttunements = 0;

    // Add spell slots based on attunement level of build
    const attunement = this.state.attunement;
    if (attunement >= 10 && attunement <= 11) spellAttunements = 1;
    else if (attunement >= 12 && attunement <= 13) spellAttunements = 2;
    else if (attunement >= 14 && attunement <= 15) spellAttunements = 3;
    else if (attunement >= 16 && attunement <= 18) spellAttunements = 4;
    else if (attunement >= 19 && attunement <= 22) spellAttunements = 5;
    else if (attunement >= 23 && attunement <= 27) spellAttunements = 6;
    else if (attunement >= 28 && attunement <= 33) spellAttunements = 7;
    else if (attunement >= 34 && attunement <= 40) spellAttunements = 8;
    else if (attunement >= 41 && attunement <= 49) spellAttunements = 9;
    else if (attunement >= 50 && attunement <= 99) spellAttunements = 10;

    // Check for additional slots due to rings
    if (this.state.buildRing1Name === "White Seance Ring" || this.state.buildRing2Name === "White Seance Ring") {
      spellAttunements += 1;
    }

    this.setState({spellSlots: spellAttunements});
 }

  handleClassChange = (e) => {
    const selectedClass = e.target.value;
    const attributes = this.classAttributeMapping[selectedClass];

    // Update the buildLevel based on the selected character class
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
    })
  }

  // handler for when the user changes the select option for Covenant
  handleCovenantChange = (e) => {
    const selectedCovenant = e.target.value;

    this.setState({buildCovenant: selectedCovenant});
  }

  handleSpellChange = (index, event) => {
    const selectedSpellName = event.target.value;
    const selectedSpell = this.state.spells.find(spell => spell.name === selectedSpellName);

    if (selectedSpell) {
        const { intelligenceRequirement, faithRequirement } = selectedSpell;
        const { intelligence, faith } = this.state;

        if ((intelligenceRequirement && intelligence >= intelligenceRequirement) || 
            (faithRequirement && faith >= faithRequirement)) {
            this.setState({ [`buildSpellName${index + 1}`]: selectedSpellName });
        } else {
            alert(`You do not meet the intelligence or faith requirements for this spell.`);
        }
    }
  }

  handleAttributeDiv1Click = () => {
    this.setState(prevState => ({
      currentGroupIndex1: (prevState.currentGroupIndex1 + 1) % this.attributeGroups.length
    }));
  }

  handleAttributeDiv2Click = () => {
    this.setState(prevState => ({
      currentGroupIndex2: (prevState.currentGroupIndex2 + 1) % this.attributeGroups.length
    }));
  }

    handleAttributeDiv3Click = () => {
    this.setState(prevState => ({
      currentGroupIndex3: (prevState.currentGroupIndex3 + 1) % this.attributeGroups.length
    }));
  }

  handleAttributeDiv4Click = () => {
    this.setState(prevState => ({
      currentGroupIndex4: (prevState.currentGroupIndex4 + 1) % this.attributeGroups.length
    }));
  }

  renderAttributes = (weapon, group) => {

    // Capitalize the first letter of the group name for display
    const groupName = group.charAt(0).toUpperCase() + group.slice(1);

    if (group === 'weightDurability') {
      return (
        <>
          <p>Weight: {weapon.weight}</p>
          <p>Durability: {weapon.durability}</p>
        </>
      );
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
    const selectedHead = e.target.value;

    this.setState({buildHeadName: selectedHead});
    this.handleHelmetSelection(selectedHead);
  }

  getHelmetByName = (helmetName) => {
    return this.state.helmets.find(helmet => helmet.name === helmetName);
  }
  
  handleHelmetSelection = (helmetName) => {
    const selectedHelmet = this.getHelmetByName(helmetName);
    if (selectedHelmet) {
      this.setState({ buildHead: selectedHelmet });
    } else {
      // Handle the case where the helmet is not found
      console.log("Helmet not found");
    }
  };

  handleChestChange = (e) => {
    const selectedChest = e.target.value;

    this.setState({buildChestName: selectedChest});
  }

  getChestByName = (chestName) => {
    return this.state.chests.find(chest => chest.name === chestName);
  }
  
  handleChestSelection = (chestName) => {
    const selectedChest = this.getChestByName(chestName);
    if (selectedChest) {
      this.setState({ buildChest: selectedChest });
    } else {
      // Handle the case where the chest is not found
      console.log("Chest not found");
    }
  };

  handleHandsChange = (e) => {
    const selectedHands = e.target.value;

    this.setState({buildHandsName: selectedHands});
  }

  getHandsByName = (handName) => {
    return this.state.hands.find(hand => hand.name === handName);
  }
  
  handleHandSelection = (handName) => {
    const selectedHand = this.getHandsByName(handName);
    if (selectedHand) {
      this.setState({ buildHands: selectedHand });
    } else {
      // Handle the case where the hands is not found
      console.log("Hands not found");
    }
  }

  handleLegsChange = (e) => {
    const selectedLegs = e.target.value;

    this.setState({buildLegsName: selectedLegs});
  }

  getLegsByName = (legName) => {
    return this.state.legs.find(leg => leg.name === legName);
  }
  
  handleLegsSelection = (legName) => {
    const selectedLegs = this.getLegsByName(legName);
    if (selectedLegs) {
      this.setState({ buildLegs: selectedLegs });
    } else {
      // Handle the case where the legs is not found
      console.log("Legs not found");
    }
  }

  handleRing1Change = (e) => {
    const selectedRing1 = e.target.value;

    // Check if the selected ring is already selected as the second ring
    if (selectedRing1 === "No Ring") {
      this.setState({ buildRing1Name: selectedRing1 });
    } else if (selectedRing1 === this.state.buildRing2Name) {
      alert("This ring is already selected in the other slot.");
    } else {
      this.setState({ buildRing1Name: selectedRing1 });
      this.handleRingSelection1(selectedRing1);

    }
}

  handleRing2Change = (e) => {
  const selectedRing2 = e.target.value;

  // Check if the selected ring is already selected as the second ring
  if (selectedRing2 === "No Ring") {
    this.setState({ buildRing2Name: selectedRing2 });
  } else if (selectedRing2 === this.state.buildRing1Name) {
    alert("This ring is already selected in the other slot.");
  } else {
    this.setState({ buildRing2Name: selectedRing2 });
    this.handleRingSelection2(selectedRing2);
  }
}

getRingByName = (ringName) => {
  return this.state.rings.find(ring => ring.name === ringName);
}

handleRingSelection1 = (ringName) => {
  const selectedRing = this.getRingByName(ringName);
  if (selectedRing) {
    this.setState({ buildRing1: selectedRing });
  } else {
    // Handle the case where the weapon is not found
    console.log("Ring not found");
    // Optionally set buildLeftHand1 to null or a default value
    // this.setState({ buildLeftHand1: null });
  }
};

handleRingSelection2 = (ringName) => {
  const selectedRing = this.getRingByName(ringName);
  if (selectedRing) {
    this.setState({ buildRing2: selectedRing });
  } else {
    // Handle the case where the weapon is not found
    console.log("Ring not found");
    // Optionally set buildLeftHand1 to null or a default value
    // this.setState({ buildLeftHand1: null });
  }
};

  handleLeftHandOneChange = (e) => {
    const selectedLeftHand1 = e.target.value;
    this.setState({buildLeftHand1Name: selectedLeftHand1});
    this.handleWeaponSelection1(selectedLeftHand1);
    
  }

  getWeaponByName = (weaponName) => {
    return this.state.weapons.find(weapon => weapon.name === weaponName);
  }

  handleWeaponSelection1 = (weaponName) => {
    const selectedWeapon = this.getWeaponByName(weaponName);
    if (selectedWeapon) {
      this.setState({ buildLeftHand1: selectedWeapon });
    } else {
      // Handle the case where the weapon is not found
      console.log("Weapon not found");
      // Optionally set buildLeftHand1 to null or a default value
      // this.setState({ buildLeftHand1: null });
    }
  };

  handleRightHandOneChange = (e) => {
    const selectedRightHand1 = e.target.value;
    this.setState({buildRightHand1Name: selectedRightHand1});
    this.handleWeaponSelection2(selectedRightHand1);
  }

  handleWeaponSelection2 = (weaponName) => {
    const selectedWeapon = this.getWeaponByName(weaponName);
    if (selectedWeapon) {
      this.setState({ buildRightHand1: selectedWeapon });
    } else {
      // Handle the case where the weapon is not found
      console.log("Weapon not found");
      // Optionally set buildLeftHand1 to null or a default value
      // this.setState({ buildLeftHand1: null });
    }
  };

  handleLeftHandTwoChange = (e) => {
    const selectedLeftHand2 = e.target.value;
    this.setState({buildLeftHand2Name: selectedLeftHand2});
    this.handleWeaponSelection3(selectedLeftHand2);
  }

  handleWeaponSelection3 = (weaponName) => {
    const selectedWeapon = this.getWeaponByName(weaponName);
    if (selectedWeapon) {
      this.setState({ buildLeftHand2: selectedWeapon });
    } else {
      // Handle the case where the weapon is not found
      console.log("Weapon not found");
      // Optionally set buildLeftHand1 to null or a default value
      // this.setState({ buildLeftHand1: null });
    }
  };

  handleRightHandTwoChange = (e) => {
    const selectedRightHand2 = e.target.value;
    this.setState({buildRightHand2Name: selectedRightHand2});
    this.handleWeaponSelection4(selectedRightHand2);
  }

  handleWeaponSelection4 = (weaponName) => {
    const selectedWeapon = this.getWeaponByName(weaponName);
    if (selectedWeapon) {
      this.setState({ buildRightHand2: selectedWeapon });
    } else {
      // Handle the case where the weapon is not found
      console.log("Weapon not found");
      // Optionally set buildLeftHand1 to null or a default value
      // this.setState({ buildLeftHand1: null });
    }
  };

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
    if (attribute === "humanity") {
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
        const initKey = `init${attribute.charAt(0).toUpperCase() + attribute.slice(1)}`;
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
      const { buildLevel } = this.state;
      let souls;

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
      souls = lowerLevels[buildLevel];
      this.setState({ soulsToNextLevel: souls });
    }

    // method to calculate the souls needed for next level (levels greater than 12)
    calculateSoulsToNextLevel = () => {
      const { buildLevel } = this.state;
      const calcSouls = Math.round((0.02 * Math.pow((buildLevel+1), 3)) + (3.06 * Math.pow((buildLevel+1), 2)) + (105.6 * (buildLevel+1)) - 895); 
      this.setState({ soulsToNextLevel: calcSouls });
    }

    calculateTotalSouls = (targetLevel) => {
      const { characterClass } = this.state;
      const baseLevel = this.classLevelMapping[characterClass];
      let totalSouls = 0;
    
      // Iterate from the base level to the target level
      for (let level = baseLevel; level < targetLevel; level++) {
        // Add souls required for each level to totalSouls
        // You need to implement getSoulsForLevel(level) which returns souls required for a given level
        totalSouls += this.getSoulsForLevel(level);
      }
    
      // Update the state with the calculated total souls
      this.setState({ spentSouls: totalSouls });
    }
    
    getSoulsForLevel = (level) => {
      // Implement the logic based on your game's rules
      // Use the existing logic in setLowerSoulsLevel and calculateSoulsToNextLevel as a reference
      let soulsForThisLevel;
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
        soulsForThisLevel = lowerLevels[level];
      } else {
        soulsForThisLevel = Math.round((0.02 * Math.pow((level+1), 3)) + 
        (3.06 * Math.pow((level+1), 2)) + (105.6 * (level+1)) - 895);
      }
      return soulsForThisLevel;
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
            spells, spellSlots } = this.state;
    
    const leftHandGroup1 = this.attributeGroups[this.state.currentGroupIndex1];
    const rightHandGroup1 = this.attributeGroups[this.state.currentGroupIndex2];
    const leftHandGroup2 = this.attributeGroups[this.state.currentGroupIndex3];
    const rightHandGroup2 = this.attributeGroups[this.state.currentGroupIndex4];

    const initialLevel = this.classLevelMapping[characterClass];

    
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
                                        `${spell.name} (Int: ${spell.intelligenceRequirement})` :
                                    spell.spellType === 'miracle' ? 
                                        `${spell.name} (Faith: ${spell.faithRequirement})` :
                                        spell.name}
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
              {buildRing1 && (
                <div className="effect">
                  <p>{buildRing1.effect}</p>
                </div>
              )}
              {buildRing2 && (
                <div className="effect">
                  <p>{buildRing2.effect}</p>
                </div>
              )}
              {buildHeadName === "Crown of Dusk" && (
                <div className="effect">
                  <p>Boosts Sorceries, Miracles and Pyromancies damage by 20%, but reduces Magic defence by 30%.</p>
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="stats-grid">
          {/* stats components go here */}
        </div>
      </div>
    )
  }
}

export default CharacterBuilder