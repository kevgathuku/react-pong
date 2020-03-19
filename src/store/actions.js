import { ActionTypes } from './types';

export const keyPress = (key = null) => ({
  type: ActionTypes.KEYPRESS,
  payload: key,
});

export const keyUp = (key = null) => ({
  type: ActionTypes.KEY_UP,
  payload: key,
});

export const movePaddleDown = position => ({
  type: ActionTypes.MOVE_PADDLE_DOWN,
  payload: { position },
});

export const movePaddleUp = position => ({
  type: ActionTypes.MOVE_PADDLE_UP,
  payload: { position },
});

export const serveBall = () => ({
  type: ActionTypes.START_GAME,
});

export const moveBall = () => ({ type: ActionTypes.MOVE_BALL });

export const setBallPosition = position => ({
  type: ActionTypes.SET_BALL_POSITION,
  payload: {
    x: position.x,
    y: position.y,
    x_speed: position.x_speed,
    y_speed: position.y_speed,
  },
});
