import React, { Component } from 'react';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    // Set the initial state with the default active page
    this.state = {
      activePage: 'build', // Default to 'build', assuming 'build' is the initial page
    };
  }

  // Function to update the active page
  setActivePage = (page) => {
    this.setState({ activePage: page });
  }

  render() {
    const { activePage } = this.state;

    return (
      <div className="navbar">
        <div className="navbar-center">
          <a href="#" className={activePage === 'build' ? 'active' : ''} onClick={() => this.setActivePage('build')}>
            Build
          </a>
          <a href="#" className={activePage === 'create account' ? 'active' : ''} onClick={() => this.setActivePage('build')}>
            Create Account
          </a>
          <a href="#" className={activePage === 'login' ? 'active' : ''} onClick={() => this.setActivePage('build')}>
            Login
          </a>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
