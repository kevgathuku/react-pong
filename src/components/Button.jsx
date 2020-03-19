import React, { Component } from 'react';

import * as PIXI from 'pixi.js';
import PropTypes from 'prop-types';
import { Text, Graphics } from '@inlet/react-pixi';

export default class Button extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const {
      data: { x, y, text },
    } = this.props;

    return (
      <>
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
              fontSize: 40,
              fill: '#26f7a3',
              // stroke: '#ffffff',
              // strokeThickness: 2,
              // letterSpacing: 10,
            })
          }
        />
        <Graphics
          preventRedraw
          interactive
          pointerdown={() => {
            this.props.action();
          }}
          draw={g => {
            // clear the graphics
            g.clear();
            // start drawing
            g.lineStyle(2, 0xfffff, 1);
            g.drawRect(x - 120, y - 50, 250, 100);
          }}
        />
      </>
    );
  }
}
