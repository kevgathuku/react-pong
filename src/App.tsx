import React, {  Dispatch } from 'react';

import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';
import { Stage, } from '@inlet/react-pixi';

import './App.css';

import Instructions from './components/Instructions';
import PongContainer from './components/PongContainerHooks';
import { Action } from './store/actions';
import { AppState, BallProps, ButtonProps, PaddleProps } from './store/reducer';

export type Props = {
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

const mapStateToProps = (state: AppState) => {
  return state;
};

export const PongApp = (props: Props) => {
  const {
    ball,
    boardColor,
    buttons,
    dispatch,
    gameHeight,
    gameWidth,
    players,
    status,
    winner,
  } = props;

  const pongContainerProps = {
    ball,
    boardColor,
    buttons,
    dispatch,
    gameHeight,
    gameWidth,
    players,
    status,
    winner,
  };

  return (
    <div className="appContainer">
    <Stage
      width={gameWidth}
      height={gameHeight}
      options={{ autoDensity: true, backgroundColor: boardColor }}
    >
      <PongContainer {...pongContainerProps} />
    </Stage>
    <Instructions />
    </div>
  );
};

export default connect(mapStateToProps)(PongApp);
