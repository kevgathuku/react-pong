import React, { Component, Dispatch } from 'react';

import * as PIXI from 'pixi.js';
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
  restartGame,
  movePaddleDown,
  movePaddleUp,
  gameOver,
} from './store/actions';
import { Action } from './store/actions';
import { AppState, BallProps, ButtonProps, PaddleProps } from './store/reducer';

type Props = {
  app: PIXI.Application;
  dispatch: Dispatch<Action>;
  gameWidth: number;
  gameHeight: number;
  boardColor: number;
  buttons: {
    start: ButtonProps;
    restart: ButtonProps;
    resume: ButtonProps;
  };
  players: {
    left: PaddleProps;
    right: PaddleProps;
    [left: string]: PaddleProps;
  };
  winner: PaddleProps | null;
  ball: BallProps;
  status: string;
};

const PongContainer = withPixiApp(
  class extends Component<Props> {
    // static propTypes = {
    //   dispatch: PropTypes.func.isRequired,
    //   players: PropTypes.object.isRequired,
    //   gameWidth: PropTypes.number.isRequired,
    //   gameHeight: PropTypes.number.isRequired,
    //   boardColor: PropTypes.number.isRequired,
    //   buttons: PropTypes.object.isRequired,
    // };

    componentDidMount() {
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
    }

    componentDidUpdate(prevProps: Props) {
      const { dispatch } = this.props;
      if (this.props.winner !== prevProps.winner) {
        // If the winner prop was previously empty, i.e. game in progress
        if (prevProps.winner === null) {
          dispatch(gameOver());
          this.props.app.ticker.remove(this.tick);
        }
      }
    }

    componentWillUnmount() {
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('keyup', this.onKeyUp);
      this.props.app.ticker.remove(this.tick);
    }

    onKeyDown = (event: KeyboardEvent) => {
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
        case 38: // Arrow Up Key
          // Move the left paddle up
          dispatch(movePaddleUp('right'));
          break;
        case 40: //Arrow down key
          // Move the left paddle down
          dispatch(movePaddleDown('right'));
          break;
        default:
          console.log('Key', event);
          return; // Do nothing
      }
    };

    onKeyUp = (event: KeyboardEvent) => {
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

    restartGame = () => {
      const { dispatch } = this.props;
      // Restart the ticker
      this.props.app.ticker.add(this.tick);
      dispatch(restartGame());
    };

    tick = () => {
      const { dispatch } = this.props;
      if (!this.props.winner) {
        dispatch(moveBall());
      }
    };

    render() {
      const { players, status, gameWidth, buttons, ball, winner } = this.props;

      return (
        <Container>
          <Text
            text={players.left.score.toString()}
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
            text={players.right.score.toString()}
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
          {status === 'game-over' ? (
            <>
              <Text
                text={
                  winner
                    ? winner.position === 'left'
                      ? 'Player 1 Wins'
                      : 'Player 2 Wins'
                    : ''
                }
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
              <Button
                data={buttons.restart}
                action={() => this.restartGame()}
              />
            </>
          ) : null}
        </Container>
      );
    }
  }
);

const mapStateToProps = (state: AppState) => {
  return state;
};

export const PongApp = (props: Props) => {
  const {
    boardColor,
    gameWidth,
    gameHeight,
    dispatch,
    players,
    buttons,
    status,
    ball,
    winner,
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
    winner,
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
