import React, { Component } from "react";
import { Rect } from "react-konva";

class Paddle extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      color: "white",
      width: 20,
      height: 100,
      offsetY: 50
    };
  }

  render() {
    const { startX, startY, position } = this.props;
    let offsetX = position === "left" ? 20 : (-20 - this.state.width);

    return (
      <Rect
        x={startX + offsetX}
        y={startY + this.state.offsetY}
        width={this.state.width}
        height={this.state.height}
        fill={this.state.color}
        shadowBlur={10}
      />
    );
  }
}

export default Paddle;
