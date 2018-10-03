import React, { Component } from "react";
import { Rect } from "react-konva";
import PropTypes from "prop-types";

class Paddle extends Component {
  static propTypes = {
    position: PropTypes.string.isRequired
  };

  constructor(...props) {
    super(...props);
    this.state = {
      color: "white",
      width: 20,
      height: 100
    };
  }

  onKeyPress = event => {
    const { position } = this.props;
    console.log("event", event);

    // if (position === "left") {}
  };

  render() {
    const { startX, startY, position } = this.props;
    // let offsetX = position === "left" ? 20 : undefined;
    // offsetX = position === "right" ? (-20 - this.state.width) : undefined;
    if (!position) return null;

    return (
      <Rect
        x={startX}
        y={startY}
        width={this.state.width}
        height={this.state.height}
        fill={this.state.color}
        shadowBlur={10}
        onKeyPress={this.onKeyPress}
      />
    );
  }
}

export default Paddle;
