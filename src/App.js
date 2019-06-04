import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { keyPress, keyUp } from './store/actions';

import './App.css';
import Paddle from './components/Paddle';
import Ball from './components/Ball';

import { serveBall, moveBall } from './store/actions';

import { Stage, Container, withPixiApp } from '@inlet/react-pixi';
const BallWithApp = withPixiApp(Ball);

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
    const { boardColor, players, gameWidth, gameHeight } = this.props;
    return (
      <Stage
        width={gameWidth}
        height={gameHeight}
        options={{ backgroundColor: 0x012b30 }}
      >
        <Container>
          <Paddle player={players[0]} />
          <Paddle player={players[1]} />
          <BallWithApp />
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
