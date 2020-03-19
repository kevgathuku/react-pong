import React, { Component } from 'react';

import * as PIXI from 'pixi.js';
import { Text } from '@inlet/react-pixi';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    button: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const {
      text,
      button: { x, y },
    } = this.props;

    return (
      <Text
        text={text}
        anchor={0.5}
        x={x}
        y={y}
        isSprite
        interactive
        pointerdown={() => {
          this.props.action();
        }}
        style={
          new PIXI.TextStyle({
            align: 'center',
            fontFamily: 'Arial, sans-serif',
            fontSize: 40,
            fill: '#26f7a3',
            stroke: '#ffffff',
            strokeThickness: 2,
            letterSpacing: 10,
          })
        }
      />
    );
  }
}

const mapStateToProps = state => {
  const { button } = state;
  return { button };
};

export default connect(mapStateToProps)(Button);
