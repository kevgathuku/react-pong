import React, { Component } from 'react';

import * as PIXI from 'pixi.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Stage, Container, Text, withPixiApp } from '@inlet/react-pixi';

import './App.css';
import Ball from './components/Ball';
import Button from './components/Button';
import Paddle from './components/Paddle';
import {
  startGame,
  moveBall,
  keyPress,
  keyUp,
  pauseGame,
  resumeGame,
} from './store/actions';

const mapStateToProps = state => {
  const {
    players,
    gameWidth,
    gameHeight,
    boardColor,
    keysPressed,
    status,
    playerMode,
    buttons,
  } = state;
  return {
    players,
    gameWidth,
    gameHeight,
    boardColor,
    keysPressed,
    status,
    playerMode,
    buttons,
  };
};

const PongContainer = withPixiApp(
  class extends Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      players: PropTypes.array.isRequired,
      gameWidth: PropTypes.number.isRequired,
      gameHeight: PropTypes.number.isRequired,
      boardColor: PropTypes.number.isRequired,
    };

    componentDidMount() {
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('keyup', this.onKeyUp);
      this.props.app.ticker.remove(this.tick);
    }

    constructor(props) {
      super(props);

      this.middleX = props.gameWidth / 2;
      this.middleY = props.gameHeight / 2;
    }

    onKeyDown = event => {
      const { dispatch } = this.props;

      switch (event.keyCode) {
        case 27:
          // ESC - Pause the game
          dispatch(pauseGame());
          this.props.app.ticker.remove(this.tick);
          break;

        case 65: // A
        case 90: // Z
        case 38: // ArrowUp
        case 40: // ArrowDown
          dispatch(keyPress(event.key));
          break;
        default:
          console.log('Key', event);
          return; // Do nothing
      }
    };

    onKeyUp = event => {
      const { dispatch } = this.props;

      dispatch(keyUp(event.key));
    };

    start = playerMode => {
      const { dispatch } = this.props;

      dispatch(startGame(playerMode));
      this.props.app.ticker.add(this.tick);
    };

    resumeGame = () => {
      const { dispatch } = this.props;
      // Resume the ticker
      this.props.app.ticker.add(this.tick);
      dispatch(resumeGame());
    };

    tick = () => {
      const { dispatch } = this.props;
      dispatch(moveBall());
    };

    render() {
      const { players, status, gameWidth, buttons } = this.props;
      return (
        <Container>
          <Text
            text="PONG!"
            anchor={0.5}
            x={gameWidth / 2}
            y={50}
            isSprite
            style={
              new PIXI.TextStyle({
                align: 'center',
                fontFamily: 'Futura, sans-serif',
                fontSize: 40,
                fill: '#ffffff',
                letterSpacing: 10,
              })
            }
          />
          <Paddle player={players[0]} />
          <Paddle player={players[1]} />
          {status === 'pre-start' ? (
            <>
              <Button
                data={buttons.one}
                action={() => this.start('1-player')}
              />
              <Button
                data={buttons.two}
                action={() => this.start('2-players')}
              />
            </>
          ) : null}
          {status === 'paused' ? (
            <>
              <Button data={buttons.resume} action={this.resumeGame} />
              <Ball />
            </>
          ) : null}
          {status === 'playing' ? <Ball /> : null}
        </Container>
      );
    }
  }
);

const ConnectedPongContainer = connect(mapStateToProps)(PongContainer);

const PongApp = props => {
  const { boardColor, gameWidth, gameHeight } = props;

  return (
    <Stage
      width={gameWidth}
      height={gameHeight}
      options={{ backgroundColor: boardColor }}
    >
      <ConnectedPongContainer />
    </Stage>
  );
};

export default connect(mapStateToProps)(PongApp);
