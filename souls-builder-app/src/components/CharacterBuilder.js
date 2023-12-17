import React, { Component } from 'react'

class CharacterBuilder extends Component {
  render() {
    return (
      <div className="character-builder">
        <div className="attributes-grid">
          {/* attributes components go here */}
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