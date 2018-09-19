import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import HelloWorld from './examples/HelloWorld'
import PaperStyle from './examples/PaperStyle'
import PaperScale from './examples/PaperScale'
import LinkLabelAndVertices from './examples/LinkLabelAndVertices'
import ElementResizeWithText from './examples/ElementResizeWithText'
import LinkConnectRect from './examples/LinkConnectRect'
import ElementOutline from './examples/ElementOutline'

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
        <label>LinkConnectRect</label><LinkConnectRect />
        <label>ElementOutline</label><ElementOutline />
        {
          // TODO 
          // on click show outline
          // link tool
          // onclick show link tool, and delete link
          // outline tool
          // group
          // port
          // drag and drop
          // select
          // export import
          
        }
      </div>
    );
  }
}

export default App;
