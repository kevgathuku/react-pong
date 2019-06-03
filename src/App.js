import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { keyPress, keyUp } from './store/actions';

import './App.css';
import Paddle from './components/Paddle';
import Ball from './components/Ball';
import RotatingBunny from './components/RotatingBunny';

import { serveBall, moveBall } from './store/actions';

import { Stage, Container, withPixiApp } from '@inlet/react-pixi';
const BunnyWithApp = withPixiApp(RotatingBunny);

class PongApp extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
    gameWidth: PropTypes.number.isRequired,
    gameHeight: PropTypes.number.isRequired,
    boardColor: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  constructor(props) {
    super(props);

    this.middleX = props.gameWidth / 2;
    this.middleY = props.gameHeight / 2;
  }

  onKeyDown = event => {
    const { dispatch } = this.props;

    switch (event.keyCode) {
      case 87: // W
      case 83: // S
        console.log('Key', event);
        dispatch(keyPress(event.key));
        break;
      default:
        return; // Do nothing
    }
  };

  onKeyUp = event => {
    const { dispatch } = this.props;

    dispatch(keyUp(event.key));
  };

  startGame = () => {
    const { dispatch } = this.props;

    dispatch(serveBall());
  };

  update() {
    const { dispatch } = this.props;
    dispatch(moveBall());
  }

  render() {
    return (
      <Stage width={500} height={500} options={{ backgroundColor: 0x012b30 }}>
        <Container x={250} y={250}>
          <BunnyWithApp />
        </Container>
      </Stage>
    );
  }
}

const mapStateToProps = state => {
  const { players, gameWidth, gameHeight, boardColor, keysPressed } = state;
  return { players, gameWidth, gameHeight, boardColor, keysPressed };
};

export default connect(mapStateToProps)(PongApp);
