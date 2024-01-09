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
      characterClass: "", 
      characterGender: "", 
      buildLevel: 4,
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
    }
  }

  // set initial souls needed for next level with the componentDidMount() 
  // lifecycle method
  componentDidMount() {
    this.setLowerSoulsLevel();
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

  handleNewBuildClick = () => {
    // Open a new page in another tab
    window.open("https://brandonbjs.github.io/Dark-Souls-Character-Builder-gh-pages/", "_blank")
  }

  handleResetClick = () => {
    // Refresh the current page
    window.location.reload()
  }

  // Generic method to increment an attribute
  handleIncrement = (attribute) => {
    if (attribute === "humanity") {
      this.setState((prevState) => ({
        humanity: prevState.humanity + 1,
      }))
    } else {
      this.setState((prevState) => ({
        buildLevel: prevState.buildLevel + 1,
        [attribute]: prevState[attribute] + 1,
      }))
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
  
  render() {
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
             value={this.state.characterClass}
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
             value={this.state.characterGender}
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
            <span className="levelNumber">{this.state.buildLevel}</span>
          </div>

          <div className="attributesInfo">
            <span>Attribute</span>
            <span className="init">Initial Value</span>
            <span className="current">Current</span>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Vitality:</div>
            <div className="attribute-values">
              <span className="initial-vitality">{this.state.initVitality}</span>
              <span className="current-value">{this.state.vitality}</span>
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
              <span className="initial-attunement">{this.state.initAttunement}</span>
              <span className="current-value">{this.state.attunement}</span>
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
              <span className="initial-vitality">{this.state.initEndurance}</span>
              <span className="current-value">{this.state.endurance}</span>
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
              <span className="initial-vitality">{this.state.initStrength}</span>
              <span className="current-value">{this.state.strength}</span>
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
              <span className="initial-vitality">{this.state.initDexterity}</span>
              <span className="current-value">{this.state.dexterity}</span>
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
              <span className="initial-vitality">{this.state.initResistance}</span>
              <span className="current-value">{this.state.resistance}</span>
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
              <span className="initial-vitality">{this.state.initIntelligence}</span>
              <span className="current-value">{this.state.intelligence}</span>
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
              <span className="initial-vitality">{this.state.initFaith}</span>
              <span className="current-value">{this.state.faith}</span>
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
            <span className="humanityNumber">{this.state.humanity}</span>
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
              <span className="soulsToNextLevelNumber">{this.state.soulsToNextLevel}</span>
            </div>

            <div className="minSoulsReq">
              <span>Minimum Souls Required: </span>
              <span className="spentSoulsNumber">{this.state.spentSouls}</span>
            </div>
          </div>
        </div>

        {/* items-grid will house fields and inputs for:  */}
        <div className="items-grid">

        </div>

        <div className="stats-grid">
          {/* stats components go here */}
        </div>
      </div>
    )
  }
}

export default CharacterBuilder