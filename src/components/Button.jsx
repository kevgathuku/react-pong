import React from 'react';
import * as PIXI from 'pixi.js';
import { Text, Graphics, Container } from '@inlet/react-pixi';
import PropTypes from 'prop-types';

Button.propTypes = {
  action: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default function Button(props) {
  const {
    data: { x, y, top_x, top_y, text },
  } = props;

  return (
    <Container
      interactive
      pointerdown={() => {
        props.action();
      }}
    >
      <Text
        text={text}
        anchor={0.5}
        x={x}
        y={y}
        isSprite
        style={
          new PIXI.TextStyle({
            align: 'center',
            fontFamily: 'Arial, sans-serif',
            fontSize: 35,
            fill: '#26f7a3',
            // stroke: '#ffffff',
            // strokeThickness: 2,
            // letterSpacing: 10,
          })
        }
      />
      <Graphics
        preventRedraw
        draw={g => {
          g.lineStyle(2, 0xfffff, 1);
          g.drawRect(top_x, top_y, 250, 100);
        }}
      />
    </Container>
  );
}
