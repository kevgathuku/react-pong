import React from 'react';
import { action } from '@storybook/addon-actions';
import { PongApp } from '../App';

export default {
  title: 'Pong',
  component: PongApp,
};

const defaultProps = {
  players: [
    {
      controller: 'human',
      position: 'left',
      x: 20,
      y: 50,
      width: 20,
      height: 100,
      score: 0,
    },
    {
      controller: 'computer',
      position: 'right',
      x: 760,
      y: 50,
      width: 20,
      height: 100,
      score: 0,
    },
  ],
  gameWidth: 800,
  gameHeight: 700,
  boardColor: 855074,
  keysPressed: {},
  status: 'pre-start',
  playerMode: '2-players',
  buttons: {
    one: { x: 200, y: 300, top_x: 80, top_y: 250, text: '1 PLAYER' },
    two: { x: 600, y: 300, top_x: 480, top_y: 250, text: '2 PLAYERS' },
    resume: { x: 400, y: 300, top_x: 280, top_y: 250, text: 'RESUME' },
  },
  dispatch: action('dispatch clicked'),
  ball: {
    x: 800 / 2,
    y: 700 / 2,
    radius: 10,
    x_speed: 5,
    y_speed: 5,
  },
};

const pausedProps = Object.assign({}, defaultProps, {
  status: 'paused',
});

export const DefaultApp = () => <PongApp {...defaultProps} />;

export const PausedApp = () => <PongApp {...pausedProps} />;
