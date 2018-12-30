import React, { Component } from "react";
import debounce from "lodash.debounce";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
    this.clearText = this.clearText.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearText = debounce(this.clearText.bind(this), 5000);
  }

  handleInput(e) {
    const text = e.target.value;
    this.setState({ text });
    this.clearText();
  }

  clearText() {
    this.setState({ text: "" });
  }

  render() {
    return (
      <div className="App">
        <label>
          Don't stop writing for more than 5 seconds
          <br />
          <br />
          <textarea
            name="editor"
            value={this.state.text}
            onChange={this.handleInput}
          />
        </label>
      </div>
    );
  }
}

export default App;
