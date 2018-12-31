import React, { Component } from "react";
import debounce from "lodash.debounce";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      completed: false,
      startedTyping: false
    };
    this.MINIMUM_TYPING_PAUSE = 5000;
    this.TARGET_TYPING_DURATION = 1000 * 10;
    this.timeoutId = null;

    this.startWritingCountdown = this.startWritingCountdown.bind(this);
    this.clearText = this.clearText.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearText = debounce(
      this.clearText.bind(this),
      this.MINIMUM_TYPING_PAUSE
    );
  }

  handleInput(e) {
    // update user inputted text
    const text = e.target.value;
    this.setState({ text });

    // start the debounced clearText timer
    this.clearText();

    // start the total writing time target countdown once user starts typing
    if (this.state.startedTyping === false) {
      this.setState({ startedTyping: true });
      this.startWritingCountdown();
    }
  }

  clearText() {
    // clear all the user inputted text and reset the writing time target
    if (this.state.completed === false) {
      this.setState({ text: "", startedTyping: false });
      clearTimeout(this.timeoutId);
    }
  }

  startWritingCountdown() {
    // start the writing countdown to prevent text from getting cleared
    this.timeoutId = setTimeout(() => {
      this.setState({ completed: true });
    }, this.TARGET_TYPING_DURATION);
  }

  render() {
    return (
      <div className="App">
        <label>
          {this.state.completed ? (
            <p>You did it! Your text will not disappear.</p>
          ) : (
            <p>Don't stop writing for more than 5 seconds</p>
          )}
          <textarea
            data-testid="editor"
            name="editor"
            value={this.state.text}
            onChange={this.handleInput}
            rows="20"
            cols="40"
          />
        </label>
      </div>
    );
  }
}

export default App;
