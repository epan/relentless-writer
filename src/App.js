import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <label>
          Don't stop writing for more than 5 seconds
          <br />
          <textarea name="editor" />
        </label>
      </div>
    );
  }
}

export default App;
