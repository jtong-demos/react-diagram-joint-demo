import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import HelloWorld from './examples/HelloWorld'
import PaperStyle from './examples/PaperStyle'
import PaperScale from './examples/PaperScale'
import LinkLabelAndVertices from './examples/LinkLabelAndVertices'
import ElementResizeWithText from './examples/ElementResizeWithText'

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
        <label>LinkLabel And Vertices</label><LinkLabelAndVertices />
        <label>ElementResizeWithText</label><ElementResizeWithText />
      </div>
    );
  }
}

export default App;
