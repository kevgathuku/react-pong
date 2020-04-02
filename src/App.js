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
  keyUp,
  pauseGame,
  resumeGame,
  movePaddleDown,
  movePaddleUp,
} from './store/actions';

const PongContainer = withPixiApp(
  class extends Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      players: PropTypes.object.isRequired,
      gameWidth: PropTypes.number.isRequired,
      gameHeight: PropTypes.number.isRequired,
      boardColor: PropTypes.number.isRequired,
      buttons: PropTypes.object.isRequired,
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
          // Move the left paddle up
          dispatch(movePaddleUp('left'));
          break;
        case 90: // Z
          // Move the left paddle down
          dispatch(movePaddleDown('left'));
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

    start = () => {
      const { dispatch } = this.props;

      dispatch(startGame());
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
      const { players, status, gameWidth, buttons, ball } = this.props;

      return (
        <Container>
          <Text
            text={players.left.score}
            anchor={0.5}
            x={gameWidth / 4}
            y={150}
            style={
              new PIXI.TextStyle({
                fontSize: 60,
                fill: '#ffffff',
                letterSpacing: 10,
              })
            }
          />
          <Text
            text={players.right.score}
            anchor={0.5}
            x={(gameWidth / 4) * 3}
            y={150}
            style={
              new PIXI.TextStyle({
                fontSize: 60,
                fill: '#ffffff',
                letterSpacing: 10,
              })
            }
          />
          <Paddle player={players.left} />
          <Paddle player={players.right} />
          {status === 'pre-start' ? (
            <>
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
              <Button data={buttons.start} action={() => this.start()} />
            </>
          ) : null}
          {status === 'paused' ? (
            <>
              <Button data={buttons.resume} action={this.resumeGame} />
              <Ball data={ball} />
            </>
          ) : null}
          {status === 'playing' ? <Ball data={ball} /> : null}
        </Container>
      );
    }
  }
);

const mapStateToProps = state => {
  return state;
};

export const PongApp = props => {
  const {
    boardColor,
    gameWidth,
    gameHeight,
    dispatch,
    players,
    buttons,
    status,
    ball,
  } = props;

  const pongContainerProps = {
    dispatch,
    players,
    gameWidth,
    gameHeight,
    boardColor,
    buttons,
    status,
    ball,
  };

  return (
    <Stage
      width={gameWidth}
      height={gameHeight}
      options={{ backgroundColor: boardColor }}
    >
      <PongContainer {...pongContainerProps} />
    </Stage>
  );
};

export default connect(mapStateToProps)(PongApp);
