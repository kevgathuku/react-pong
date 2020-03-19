import React, { Component } from 'react';
import { Graphics } from '@inlet/react-pixi';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { movePaddleDown, movePaddleUp } from '../store/actions';

class Paddle extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    keysPressed: PropTypes.object,
  };

  constructor(...props) {
    super(...props);
    this.state = {
      color: 'white',
    };
  }

  render() {
    const {
      player: { x, y, position, width, height },
      keysPressed,
      dispatch,
    } = this.props;
    if (!position) return null;

    if (position === 'left') {
      if (keysPressed['s']) {
        dispatch(movePaddleDown(position));
      }
      if (keysPressed['w']) {
        dispatch(movePaddleUp(position));
      }
    }

    return (
      <Graphics
        draw={g => {
          // clear the graphics
          g.clear();
          // start drawing
          g.beginFill(0xff3300);
          g.lineStyle(4, 0xffd900);
          g.drawRect(x, y, width, height);
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  const { keysPressed } = state;
  return { keysPressed };
};

export default connect(mapStateToProps)(Paddle);
