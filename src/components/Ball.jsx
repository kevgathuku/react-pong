import React from 'react';
import { Graphics } from '@inlet/react-pixi';
import { connect } from 'react-redux';

function Ball(props) {
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

const mapStateToProps = state => {
  const { ball, gameWidth, gameHeight } = state;
  return { data: ball, gameWidth, gameHeight };
};

export default connect(mapStateToProps)(Ball);
