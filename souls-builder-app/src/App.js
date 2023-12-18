import './App.css'
import React, { Component } from 'react'
import NavigationBar from './components/NavigationBar'
import CharacterBuilder from './components/CharacterBuilder'

class App extends Component {
  
  // render our two components and 
  render() {
    return (
      <div className="App">
        
        <div className='navigationBar'>
          <NavigationBar />
        </div>

        <div className='characterBuilder'>
          <h2>Dark Souls Character Builder</h2>
          <CharacterBuilder />
        </div>
        
        <div className='bonfire'>
          <img src="/Dark-Souls-Character-Builder-gh-pages/images/dark-souls-bonfire.gif"
            alt="Animated Bonfire by tRoedder (@https://trmrddr.tumblr.com/)" 
            style={{ display: 'block', margin: 'auto' }} 
            width="20%"
            height="10%"/>
        </div>
        
      </div>

      
    );
  }
}

export default App
