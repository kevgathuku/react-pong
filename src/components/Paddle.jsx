import React from 'react';
import PropTypes from 'prop-types';
import { Graphics } from '@inlet/react-pixi';
import { connect } from 'react-redux';

import { movePaddleDown, movePaddleUp } from '../store/actions';

Paddle.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  keysPressed: PropTypes.object,
};

function Paddle(props) {
  const {
    player: { x, y, position, width, height },
    keysPressed,
    dispatch,
  } = props;

  if (!position) return null;

  // TODO: Figure out if dispatch should be called in some other hook
  if (position === 'left') {
    if (keysPressed['a']) {
      dispatch(movePaddleUp(position));
    }
    if (keysPressed['z']) {
      dispatch(movePaddleDown(position));
    }
  } else if (position === 'right') {
    if (keysPressed['ArrowUp']) {
      dispatch(movePaddleUp(position));
    }
    if (keysPressed['ArrowDown']) {
      dispatch(movePaddleDown(position));
    }
  }

  return (
    <Graphics
      draw={g => {
        // clear the graphics
        g.clear();
        // start drawing
        if (position === 'left') g.beginFill(0xf977a3);
        if (position === 'right') g.beginFill(0x66ddd4);
        g.drawRect(x, y, width, height);
      }}
    />
  );
}

const mapStateToProps = state => {
  const { keysPressed } = state;
  return { keysPressed };
};

export default connect(mapStateToProps)(Paddle);
