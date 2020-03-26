import React from 'react';
import PropTypes from 'prop-types';
import { Graphics } from '@inlet/react-pixi';

Paddle.propTypes = {
  player: PropTypes.object.isRequired,
};

function Paddle(props) {
  const {
    player: { x, y, position, width, height },
  } = props;

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

export default Paddle;
