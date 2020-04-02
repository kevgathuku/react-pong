import React from 'react';
import PropTypes from 'prop-types';
import { Graphics } from '@inlet/react-pixi';

Ball.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function Ball(props) {
  const {
    data: { x, y, radius },
  } = props;

  return (
    <Graphics
      draw={g => {
        // clear the graphics
        g.clear();
        // start drawing
        g.beginFill(0xffffff);
        g.drawCircle(x, y, radius);
        g.endFill();
      }}
    />
  );
}
