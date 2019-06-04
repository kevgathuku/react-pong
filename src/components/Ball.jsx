import React, { Component } from 'react';
import { Graphics } from '@inlet/react-pixi';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moveBall, serveBall } from '../store/actions'

class Ball extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
	};

	componentDidMount() {
    // listen to tick events (raf)
    this.props.app.ticker.add(this.tick);
  }

  componentWillUnmount() {
    // stop listening for tick events
    this.props.app.ticker.remove(this.tick);
	}

	tick = delta => {
		const { dispatch } = this.props;
		dispatch(moveBall())
  };

  render() {
    const {
			dispatch,
      data: { x, y, radius },
    } = this.props;

    return (
      <Graphics
        draw={g => {
          // clear the graphics
          g.clear();
          // start drawing
          g.beginFill(0xffffff, 0.5);
          g.drawCircle(x, y, radius);
          g.endFill();
				}}
				interactive
				pointerdown={() => {
					console.log('click')
					dispatch(serveBall())
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
