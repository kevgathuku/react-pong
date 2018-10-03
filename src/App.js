import React, { Component } from "react";
import { Layer, Rect, Stage } from "react-konva";
import "./App.css";
import Paddle from "./Paddle";

class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      stageWidth: 1200,
      stageHeight: 800,
      color: "#000000",
      startX: 400,
      startY: 50,
      width: 700,
      height: 700
    };
  }

  render() {
    return (
      <div className="App">
        <Stage width={this.state.stageWidth} height={this.state.stageHeight}>
          <Layer>
            <Rect
              x={this.state.startX}
              y={this.state.startY}
              width={this.state.width}
              height={this.state.height}
              fill={this.state.color}
              shadowBlur={10}
            />
            <Paddle
              position="left"
              startX={this.state.startX}
              startY={this.state.startY}
            />
            <Paddle
              position="right"
              startX={this.state.startX + this.state.width}
              startY={this.state.startY}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App;
