import React, { Component } from "react";
import { Rect } from "react-konva";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { movePaddleDown } from "./store/actions";

class Paddle extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    keysPressed: PropTypes.object
  };

  constructor(...props) {
    super(...props);
    this.state = {
      color: "white"
    };
  }

  render() {
    const {
      player: { x, y, position, width, height },
      keysPressed,
      dispatch
    } = this.props;
    if (!position) return null;

    if (position === "left") {
      if (keysPressed["ArrowDown"]) {
        dispatch(movePaddleDown(position, 10));
      }
    }

    return (
      <Rect x={x} y={y} width={width} height={height} fill={this.state.color} />
    );
  }
}

const mapStateToProps = state => {
  const { keysPressed } = state;
  return { keysPressed };
};

const VisiblePaddle = connect(mapStateToProps)(Paddle);

export default VisiblePaddle;
