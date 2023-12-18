import React, { Component } from 'react'

class CharacterBuilder extends Component {

  handleNewBuildClick = () => {
    // Open a new page in another tab
    window.open('http://localhost:3000/', '_blank');
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
            <select id="characterClass" className='characterClass'>
              <option value="knight">Warrior</option>
              <option value="mage">Knight</option>
              <option value="mage">Wanderer</option>
              <option value="mage">Thief</option>
              <option value="mage">Bandit</option>
              <option value="mage">Hunter</option>
              <option value="mage">Sorcerer</option>
              <option value="mage">Pyromancer</option>
              <option value="mage">Cleric</option>
              <option value="mage">Deprived</option>
            </select>

            <button type="button" className='newBuildButton' 
                    onClick={this.handleNewBuildClick}>
                New Build
            </button>

          </div>

          <div className="dropdown">
            <label htmlFor="characterGender">Gender</label>
            <select id="characterGender" className='characterGender'>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button type="button" className='resetButton' 
                    onClick={this.handleResetClick}>
              Reset
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
    );
  }
}

export default CharacterBuilder