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
      chest: [],
      hands: [],
      legs: [], 
    }
  }

  // set initial souls needed for next level with the componentDidMount() 
  // lifecycle method
  componentDidMount() {
    const { buildLevel } = this.state;
    this.setLowerSoulsLevel();
    this.calculateTotalSouls(buildLevel);

    fetch('http://localhost:1234/fetchHelmets')
        .then(response => response.json())
        .then(data => {
            this.setState({ helmets: data });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  }

  /* using the componentDidUpdate() lifecycle method, we track when there has been a change
   in the build level and we check if it is less than or equal to 12, if it is we call the 
   setLowerSoulsLevel() method. If build level is 13 or higher, we call calculateSoulsToNextLevel().
   It must be done this way because the equation used to calculate the souss needed is only 
   accurate from level 12 and up.
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.buildLevel !== this.state.buildLevel) {
      if ( this.state.buildLevel <= 12 ) {
        this.setLowerSoulsLevel();
      } else {
        this.calculateSoulsToNextLevel();
      }

      this.calculateTotalSouls(this.state.buildLevel);
    }
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

  handleCovenantChange = (e) => {
    const selectedCovenant = e.target.value;

    this.setState({buildCovenant: selectedCovenant});
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
        soulsForThisLevel = Math.round((0.02 * Math.pow((level+1), 3)) + (3.06 * Math.pow((level+1), 2)) + (105.6 * (level+1)) - 895);
      }
      return soulsForThisLevel;
    }
    
  
  render() {
    const { helmets, characterClass, characterGender, buildLevel, initVitality, vitality, 
            initAttunement, attunement, initEndurance, endurance, initStrength, strength,
            initDexterity, dexterity, initResistance, resistance, initIntelligence, intelligence,
            initFaith, faith, humanity, soulsToNextLevel, spentSouls, buildCovenant } = this.state;
    
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
            <label htmlFor="characterClass">Class:</label>
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
            <label htmlFor="characterGender">Gender:</label>
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
            <span className="levelNumber">{buildLevel}</span>
          </div>

          <div className="attributesInfo">
            <span>Attribute</span>
            <span className="init">Initial Value</span>
            <span className="current">Current</span>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Vitality:</div>
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
            <div className="attribute-name">Attunement:</div>
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
            <div className="attribute-name">Endurance:</div>
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
            <div className="attribute-name">Strength:</div>
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
            <div className="attribute-name">Dexterity:</div>
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
            <div className="attribute-name">Resistance:</div>
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
            <div className="attribute-name">Intelligence:</div>
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
            <div className="attribute-name">Faith:</div>
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
            <span>Humanity: </span>
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
        </div>

        {/* items-grid will house fields and inputs for:  */}
        <div className="items-grid">
          
          <div className="armorInfo">
            <span>Armor:</span>
          </div>

          <div className="helmetDropdown">
            <span>Head:</span>
            <select className="helmetSelect">
              {helmets.map(helmet => (
                  <option key={helmet._id} value={helmet._id}> {/* Replace _id with your unique identifier */}
                      {helmet.name} {/* Replace name with the attribute you want to display */}
                  </option>
              ))}
          </select>
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