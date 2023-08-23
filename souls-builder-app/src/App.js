import './App.css'
import React, { Component } from 'react'
import CharacterBuilder from './components/CharacterBuilder'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <CharacterBuilder />
      </div>
    );
  }
}

export default App
