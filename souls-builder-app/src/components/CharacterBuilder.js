import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'


class CharacterBuilder extends Component {

  


  constructor(props) {
    super(props);

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
    };

    this.state = {
      buildId: uuidv4(),
      characterClass: '', // Initial state for character class
      characterGender: '', // Initial state for character gender
      buildLevel: 4,
    };
  }

  handleClassChange = (e) => {
    const selectedClass = e.target.value;

    // Update the buildLevel based on the selected character class
    this.setState({
      characterClass: selectedClass,
      buildLevel: this.classLevelMapping[selectedClass] || 1,
    });
  };

  handleNewBuildClick = () => {
    // Open a new page in another tab
    window.open('https://brandonbjs.github.io/Dark-Souls-Character-Builder-gh-pages/', '_blank');
  };

  handleResetClick = () => {
    // Refresh the current page
    window.location.reload();
  };

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
            <p>Level: {this.state.buildLevel}</p>
          </div>

        </div>

        <div className="items-grid">
          {/* Items components go here */}
        </div>

        <div className="stats-grid">
          {/* stats components go here */}
        </div>
      </div>
    );
  }
}

export default CharacterBuilder