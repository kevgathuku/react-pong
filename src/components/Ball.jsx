import React, { Component } from 'react';
import { Graphics } from '@inlet/react-pixi';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ball extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const {
      data: { x, y, radius },
    } = this.props;

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
}

const mapStateToProps = state => {
  const { ball, gameWidth, gameHeight } = state;
  return { data: ball, gameWidth, gameHeight };
};

export default connect(mapStateToProps)(Ball);
