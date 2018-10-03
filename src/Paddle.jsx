import React, { Component } from "react";
import { Rect } from "react-konva";
import PropTypes from "prop-types";

class Paddle extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired
  };

  constructor(...props) {
    super(...props);
    this.state = {
      color: "white"
    };
  }

  onKeyPress = event => {
    const {
      player: { position }
    } = this.props;
    console.log("event", event);

    // if (position === "left") {}
  };

  render() {
    const {
      player: { x, y, position, width, height }
    } = this.props;
    // let offsetX = position === "left" ? 20 : undefined;
    // offsetX = position === "right" ? (-20 - this.state.width) : undefined;
    if (!position) return null;

    return (
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={this.state.color}
        onKeyPress={this.onKeyPress}
      />
    );
  }
}

export default Paddle;
