import React, { Component } from "react";
import { Layer, Rect, Stage } from "react-konva";
import "./App.css";
import Paddle from "./Paddle";

class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      stageWidth: 800,
      stageHeight: 700,
      color: "#000000",
      startX: 0,
      startY: 0,
      width: 800,
      height: 700,
      mode: null,
    };
  }

  render() {
    return <div className="App">
        <div className="intro content">
          <h2>Pong</h2>
          <h3>Single Player Mode</h3>
          <p>Use keys A and Z to move the left paddle up and down</p>
          <button className="button is-primary">
            Start Single Player Mode
          </button>
          <h3>Two Player Mode</h3>
          <p>
            Player 1: Move the left paddle up and down using keys A and Z
          </p>
          <p>
            Player 2: Move the right paddle up and down using the Up and
            Down Arrows
          </p>
          <button className="button is-primary">
            Start Two Player Mode
          </button>
          <p/>
          <p>The first player to reach a score of 10 wins the game</p>
          <h3>GOOD LUCK!</h3>
        </div>
        <Stage width={this.state.stageWidth} height={this.state.stageHeight}>
          <Layer>
            <Rect x={this.state.startX} y={this.state.startY} width={this.state.width} height={this.state.height} fill={this.state.color} shadowBlur={10} />
            <Paddle position="left" startX={this.state.startX + 20} startY={this.state.startY + 50} />
            <Paddle position="right" startX={this.state.startX + this.state.width - 20 - 20} startY={this.state.startY + 50} />
          </Layer>
        </Stage>
      </div>;
  }
}

export default App;
