import { ActionTypes } from './types';

export type Action =
  | {
      type: 'KEYPRESS';
      payload: string;
    }
  | {
      type: 'KEY_UP';
      payload: string;
    }
  | {
      type: 'MOVE_PADDLE_DOWN';
      payload: {
        position: string;
      };
    }
  | {
      type: 'MOVE_PADDLE_UP';
      payload: {
        position: string;
      };
    }
  | {
      type: 'START_GAME';
    }
  | {
      type: 'PAUSE_GAME';
    }
  | {
      type: 'GAME_OVER';
    }
  | {
      type: 'RESUME_GAME';
    }
  | {
      type: 'RESTART_GAME';
    }
  | {
      type: 'MOVE_BALL';
    }
  | {
      type: 'INCREMENT_SCORE';
    }
  | {
      type: 'SET_BALL_POSITION';
      payload: {
        x: number;
        y: number;
        x_speed: number;
        y_speed: number;
      };
    };

export const keyPress = (key = null) => ({
  type: ActionTypes.KEYPRESS,
  payload: key,
});

export const keyUp = (key = null) => ({
  type: ActionTypes.KEY_UP,
  payload: key,
});

export const movePaddleDown = (position: string) => ({
  type: ActionTypes.MOVE_PADDLE_DOWN,
  payload: { position },
});

export const movePaddleUp = (position: string) => ({
  type: ActionTypes.MOVE_PADDLE_UP,
  payload: { position },
});

export const startGame = () => ({
  type: ActionTypes.START_GAME,
});

export const pauseGame = () => ({
  type: ActionTypes.PAUSE_GAME,
});

export const gameOver = () => ({
  type: ActionTypes.GAME_OVER,
});

export const resumeGame = () => ({
  type: ActionTypes.RESUME_GAME,
});

export const restartGame = () => ({
  type: ActionTypes.RESTART_GAME,
});

export const moveBall = () => ({ type: ActionTypes.MOVE_BALL });

export const setBallPosition = (position: {
  x: number;
  y: number;
  x_speed: number;
  y_speed: number;
}) => ({
  type: ActionTypes.SET_BALL_POSITION,
  payload: {
    x: position.x,
    y: position.y,
    x_speed: position.x_speed,
    y_speed: position.y_speed,
  },
});
