import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'


class CharacterBuilder extends Component {

  


  constructor(props) {
    super(props)

    // Define a mapping of character classes to their initial levels
    this.classLevelMapping = {
      warrior: 4,
      knight: 8,
      wanderer: 6,
      thief: 11,
      bandit: 7,
      hunter: 4,
      sorcerer: 14,
      pyromancer: 4,
      cleric: 8,
      deprived: 8,
    }

    this.classAttributeMapping = {
      warrior: {vitality: 11, attunement: 8, endurance: 12, strength: 13, dexterity: 13, resistance: 11, intelligence: 9, faith: 9},
      knight: {vitality: 14, attunement: 10, endurance: 10, strength: 11, dexterity: 11, resistance: 10, intelligence: 9, faith: 11},
      wanderer: {vitality: 10, attunement: 11, endurance: 10, strength: 10, dexterity: 14, resistance: 12, intelligence: 11, faith: 8},
      thief: {vitality: 9, attunement: 11, endurance: 9, strength: 9, dexterity: 15, resistance: 10, intelligence: 12, faith: 11},
      bandit: {vitality: 12, attunement: 8, endurance: 14, strength: 14, dexterity: 9, resistance: 11, intelligence: 8, faith: 10},
      hunter: {vitality: 11, attunement: 9, endurance: 11, strength: 12, dexterity: 14, resistance: 11, intelligence: 9, faith: 9},
      sorcerer: {vitality: 8, attunement: 15, endurance: 8, strength: 9, dexterity: 11, resistance: 8, intelligence: 15, faith: 8},
      pyromancer: {vitality: 10, attunement: 12, endurance: 11, strength: 12, dexterity: 9, resistance: 12, intelligence: 10, faith: 8},
      cleric: {vitality: 11, attunement: 11, endurance: 9, strength: 12, dexterity: 8, resistance: 11, intelligence: 8, faith: 14},
      deprived: {vitality: 11, attunement: 11, endurance: 11, strength: 11, dexterity: 11, resistance: 11, intelligence: 11, faith: 11},

    }

    this.state = {
      buildId: uuidv4(),
      characterClass: '', 
      characterGender: '', 
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
      humanity: 0
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
    window.open('https://brandonbjs.github.io/Dark-Souls-Character-Builder-gh-pages/', '_blank')
  }

  handleResetClick = () => {
    // Refresh the current page
    window.location.reload()
  }

  // DECREMENT VITALITY FUNCTION
  handleDecrementVitality = () => {
    // decrement vitality if level is greater than 0
    if ( this.state.buildLevel > 0 && this.state.vitality > this.state.initVitality ) {
      this.setState((prevState) => ({
        buildLevel: prevState.buildLevel - 1,
        vitality: prevState.vitality - 1,
      }))
    }
  }

  // INCREMENT VITALITY FUNCTION
  handleIncrementVitality = () => {
    // increment vitality state
    this.setState((prevState) => ({
      buildLevel: prevState.buildLevel + 1,
      vitality: prevState.vitality + 1,
    }))
  }

  // DECREMENT ATTUNEMENT FUNCTION
  handleDecrementAttunement = () => {
    // decrement attunement if level is greater than 0
    if ( this.state.buildLevel > 0 && this.state.attunement > this.state.initAttunement ) {
      this.setState((prevState) => ({
        buildLevel: prevState.buildLevel - 1,
        attunement: prevState.attunement - 1,
      }))
    }
  }

  // INCREMENT ATTUNEMENT FUNCTION
  handleIncrementAttunement = () => {
    // increment attunement state
    this.setState((prevState) => ({
      buildLevel: prevState.buildLevel + 1,
      attunement: prevState.attunement + 1,
    }))
  }

    // DECREMENT ENDURANCE FUNCTION
    handleDecrementEndurance = () => {
      // decrement endurance if level is greater than 0
      if ( this.state.buildLevel > 0 && this.state.endurance > this.state.initEndurance ) {
        this.setState((prevState) => ({
          buildLevel: prevState.buildLevel - 1,
          endurance: prevState.endurance - 1,
        }))
      }
    }
  
    // INCREMENT ENDURANCE FUNCTION
    handleIncrementEndurance = () => {
      // increment endurance state
      this.setState((prevState) => ({
        buildLevel: prevState.buildLevel + 1,
        endurance: prevState.endurance + 1,
      }))
    }

    // DECREMENT STRENGTH FUNCTION
    handleDecrementStrength = () => {
      // decrement strength if level is greater than 0
      if ( this.state.buildLevel > 0 && this.state.strength > this.state.initStrength ) {
        this.setState((prevState) => ({
          buildLevel: prevState.buildLevel - 1,
          strength: prevState.strength - 1,
        }))
      }
    }
  
    // INCREMENT STRENGTH FUNCTION
    handleIncrementStrength = () => {
      // increment strength state
      this.setState((prevState) => ({
        buildLevel: prevState.buildLevel + 1,
        strength: prevState.strength + 1,
      }))
    }

    // DECREMENT DEXTERITY FUNCTION
    handleDecrementDexterity = () => {
      // decrement dexterity if level is greater than 0
      if ( this.state.buildLevel > 0 && this.state.dexterity > this.state.initDexterity ) {
        this.setState((prevState) => ({
          buildLevel: prevState.buildLevel - 1,
          dexterity: prevState.dexterity - 1,
        }))
      }
    }
  
    // INCREMENT DEXTERITY FUNCTION
    handleIncrementDexterity = () => {
      // increment dexterity state
      this.setState((prevState) => ({
        buildLevel: prevState.buildLevel + 1,
        dexterity: prevState.dexterity + 1,
      }))
    }

    // DECREMENT RESISTANCE FUNCTION
    handleDecrementResistance = () => {
      // decrement resistance if level is greater than 0
      if ( this.state.buildLevel > 0 && this.state.resistance > this.state.initResistance ) {
        this.setState((prevState) => ({
          buildLevel: prevState.buildLevel - 1,
          resistance: prevState.resistance - 1,
        }))
      }
    }
  
    // INCREMENT RESISTANCE FUNCTION
    handleIncrementResistance = () => {
      // increment resistance state
      this.setState((prevState) => ({
        buildLevel: prevState.buildLevel + 1,
        resistance: prevState.resistance + 1,
      }))
    }

      // DECREMENT INTELLIGENCE FUNCTION
    handleDecrementIntelligence = () => {
      // decrement intelligence if level is greater than 0
      if ( this.state.buildLevel > 0 && this.state.intelligence > this.state.initIntelligence ) {
        this.setState((prevState) => ({
          buildLevel: prevState.buildLevel - 1,
          intelligence: prevState.intelligence - 1,
        }))
      }
    }
  
    // INCREMENT INTELLIGENCE FUNCTION
    handleIncrementIntelligence = () => {
      // increment intelligence state
      this.setState((prevState) => ({
        buildLevel: prevState.buildLevel + 1,
        intelligence: prevState.intelligence + 1,
      }))
    }
  
    // DECREMENT FAITH FUNCTION
    handleDecrementFaith = () => {
      // decrement faith if level is greater than 0
      if ( this.state.buildLevel > 0 && this.state.faith > this.state.initFaith ) {
        this.setState((prevState) => ({
          buildLevel: prevState.buildLevel - 1,
          faith: prevState.faith - 1,
        }))
      }
    }
  
    // INCREMENT FAITH FUNCTION
    handleIncrementFaith = () => {
      // increment faith state
      this.setState((prevState) => ({
        buildLevel: prevState.buildLevel + 1,
        faith: prevState.faith + 1,
      }))
    }
  
      // DECREMENT HUMANITY FUNCTION
      handleDecrementHumanity = () => {
        // decrement humanity if level is greater than 0
        if ( this.state.humanity > 0 ) {
          this.setState((prevState) => ({
            humanity: prevState.humanity - 1,
          }))
        }
      }
    
      // INCREMENT HUMANITY FUNCTION
      handleIncrementHumanity = () => {
        // increment humanity state
        this.setState((prevState) => ({
          humanity: prevState.humanity + 1,
        }))
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
            <select id="characterClass" className='characterClass'
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

            <button type="button" className='newBuildButton' 
                    onClick={this.handleNewBuildClick}>
                New Build
            </button>

          </div>

          <div className="genderDropdown">
            <label htmlFor="characterGender">Gender</label>
            <select id="characterGender" className='characterGender'
             value={this.state.characterGender}
             onChange={(e) => this.setState({ characterGender: e.target.value })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button type="button" className='resetButton' 
                    onClick={this.handleResetClick}>
              Reset
            </button>
          </div>

          <div className='buildLevel'>
            <span>Level: </span>
            <span className='levelNumber'>{this.state.buildLevel}</span>
          </div>

          <div className='attributesInfo'>
            <span>Attribute</span>
            <span className='init'>Initial Value</span>
            <span className='current'>Current</span>
          </div>

          <div className="attribute-row">
            <div className="attribute-name">Vitality:</div>
            <div className="attribute-values">
              <span className="initial-vitality">{this.state.initVitality}</span>
              <span className="current-value">{this.state.vitality}</span>
            </div>
            <div className='button-row'>
            <button type="button" className='attributeButton' 
                    onClick={this.handleDecrementVitality}>
              -
            </button>
            <button type="button" className='attributeButton' 
                    onClick={this.handleIncrementVitality}>
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
            <div className='button-row'>
            <button type="button" className='attributeButton' 
                    onClick={this.handleDecrementAttunement}>
              -
            </button>
            <button type="button" className='attributeButton' 
                    onClick={this.handleIncrementAttunement}>
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
            <div className='button-row'>
            <button type="button" className='attributeButton' 
                    onClick={this.handleDecrementEndurance}>
              -
            </button>
            <button type="button" className='attributeButton' 
                    onClick={this.handleIncrementEndurance}>
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
            <div className='button-row'>
            <button type="button" className='attributeButton' 
                    onClick={this.handleDecrementStrength}>
              -
            </button>
            <button type="button" className='attributeButton' 
                    onClick={this.handleIncrementStrength}>
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
            <div className='button-row'>
            <button type="button" className='attributeButton' 
                    onClick={this.handleDecrementDexterity}>
              -
            </button>
            <button type="button" className='attributeButton' 
                    onClick={this.handleIncrementDexterity}>
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
            <div className='button-row'>
            <button type="button" className='attributeButton' 
                    onClick={this.handleDecrementResistance}>
              -
            </button>
            <button type="button" className='attributeButton' 
                    onClick={this.handleIncrementResistance}>
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
            <div className='button-row'>
            <button type="button" className='attributeButton' 
                    onClick={this.handleDecrementIntelligence}>
              -
            </button>
            <button type="button" className='attributeButton' 
                    onClick={this.handleIncrementIntelligence}>
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
            <div className='button-row'>
            <button type="button" className='attributeButton' 
                    onClick={this.handleDecrementFaith}>
              -
            </button>
            <button type="button" className='attributeButton' 
                    onClick={this.handleIncrementFaith}>
              +
            </button>
            </div>
          </div>

          <div className='buildLevel'>
            <span>Humanity: </span>
            <span className='humanityNumber'>{this.state.humanity}</span>
            <button type="button" className='attributeButton' 
                    onClick={this.handleDecrementHumanity}>
              -
            </button>
            <button type="button" className='attributeButton' 
                    onClick={this.handleIncrementHumanity}>
              +
            </button>
          </div>

          

          


    

        </div>

        <div className="items-grid">
          {/* Items components go here */}
        </div>

        <div className="stats-grid">
          {/* stats components go here */}
        </div>
      </div>
    )
  }
}

export default CharacterBuilder