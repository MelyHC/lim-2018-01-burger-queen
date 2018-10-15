import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import firebase from 

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h3 className="text-left">Burger Queen
            <img src={logo} className="App-logo" alt="logo" />
          </h3>
          <form className="form-inline my-2" >
            <input type="text" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
