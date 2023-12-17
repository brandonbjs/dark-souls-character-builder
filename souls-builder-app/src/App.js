import './App.css'
import React, { Component } from 'react'
import NavigationBar from './components/NavigationBar'
import CharacterBuilder from './components/CharacterBuilder'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <CharacterBuilder />
      </div>
    );
  }
}

export default App
