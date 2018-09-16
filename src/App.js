import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './App.css';
import joint from 'jointjs'

import HelloWorld from './examples/HelloWorld'
import PaperStyle from './examples/PaperStyle'
import PaperScale from './examples/PaperScale'

class App extends Component {

  render() {
    

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <label>HelloWorld</label><HelloWorld />
        <label>PaperStyle</label><PaperStyle />
        <label>PaperScale</label><PaperScale />
      </div>
    );
  }
}

export default App;
