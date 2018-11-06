import React, { Component } from "react";
import { Rect } from "react-konva";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { movePaddleDown, movePaddleUp } from "../store/actions";

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
      if (keysPressed["s"]) {
        dispatch(movePaddleDown(position));
      }
      if (keysPressed["w"]) {
        dispatch(movePaddleUp(position));
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

export default connect(mapStateToProps)(Paddle);
