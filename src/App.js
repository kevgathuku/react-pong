import React, { Component } from "react";
import { Layer, Rect, Stage } from "react-konva";
import "./App.css";

const Konva = require("konva");

class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      color: "green"
    };
  }

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };

  render() {
    return (
      <div className="App">
        <Stage width={700} height={700}>
          <Layer>
            <Rect
              x={10}
              y={10}
              width={500}
              height={500}
              fill={this.state.color}
              shadowBlur={10}
              onClick={this.handleClick}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App;
