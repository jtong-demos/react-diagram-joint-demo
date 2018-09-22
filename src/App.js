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
import ElementClickedShowOutline from './examples/ElementClickedShowOutline'
import ElementLinkTool from './examples/ElementLinkTool'
import Group from './examples/Group'
import ElementHTMLOutlineTool from './examples/ElementHTMLOutlineTool'

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
        <label>ElementClickedShowOutline</label><ElementClickedShowOutline />
        <label>ElementLinkTool</label><ElementLinkTool />
        <label>Group</label><Group />
        <label>ElementHTMLOutlineTool</label><ElementHTMLOutlineTool />

        {
          // TODO 
          // [v] on click show outline
          // [v] link tool
          // [v] onclick show link tool, and delete link
          // outline tool
          // [v] group
          // drag and drop
          // click to edit
          // select
          // export import

        }
      </div>
    );
  }
}

export default App;
