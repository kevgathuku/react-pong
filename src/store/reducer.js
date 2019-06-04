import produce from 'immer';
import { ActionTypes } from './types';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 700;

const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PADDLE_OFFSET_X = 20;
const PADDLE_OFFSET_Y = 50;
const PADDLE_SPEED = 20;

const randomDirection = () => {
  let direction = Math.random();
  if (direction > 0.5) {
    return -1 * direction;
  } else {
    return direction;
  }
};

const humanPaddle = {
  controller: 'human',
  position: 'left',
  x: PADDLE_OFFSET_X,
  y: PADDLE_OFFSET_Y,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
};

const computerPaddle = {
  controller: 'computer',
  position: 'right',
  x: GAME_WIDTH - PADDLE_OFFSET_X - PADDLE_WIDTH,
  y: PADDLE_OFFSET_Y,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
};

const ball = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2,
  radius: 10,
  x_speed: 5,
  y_speed: 5,
};

const initialState = {
  boardColor: '#000000',
  mode: 'paused',
  gameWidth: GAME_WIDTH,
  gameHeight: GAME_HEIGHT,
  velocity: PADDLE_SPEED,
  players: [humanPaddle, computerPaddle],
  ball,
  keysPressed: {},
};

const reducer = (state = initialState, action) => {
  const { velocity } = state;
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.START_GAME:
      return Object.assign({}, state, { mode: 'playing' });
    case ActionTypes.KEYPRESS:
      return Object.assign({}, state, {
        keysPressed: {
          ...state.keysPressed,
          [payload]: true,
        },
      });
    case ActionTypes.KEY_UP:
      return Object.assign({}, state, {
        keysPressed: {
          ...state.keysPressed,
          [payload]: false,
        },
      });
    case ActionTypes.MOVE_PADDLE_UP:
      const { position } = payload;
      const updatedPlayers = state.players.map(player => {
        if (player.position === position) {
          // Decrease the Y value
          player.y -= velocity;
          // Top of the board
          if (player.y < 0) {
            player.y = 0;
          }
        }
        return player;
      });

      return Object.assign({}, state, { players: updatedPlayers });
    case ActionTypes.MOVE_PADDLE_DOWN:
      const updatedPaddles = state.players.map(player => {
        if (player.position === payload.position) {
          player.y += velocity;
          // Bottom of the board
          if (player.y + PADDLE_HEIGHT > GAME_HEIGHT) {
            player.y = GAME_HEIGHT - PADDLE_HEIGHT;
          }
        }
        return player;
      });
      return Object.assign({}, state, { players: updatedPaddles });
    case ActionTypes.SERVE_BALL_RANDOM:
      // Set the ball's direction and speed
      return produce(state, draftState => {
        draftState.ball.x += draftState.ball.x_speed * randomDirection();
        draftState.ball.y += draftState.ball.y_speed * randomDirection();
      });
    case ActionTypes.SET_BALL_POSITION:
      break;
    case ActionTypes.MOVE_BALL:
      return produce(state, draftState => {
        const top_y = draftState.ball.y - draftState.ball.radius;
        const right_x = draftState.ball.x + draftState.ball.radius;
        const bottom_y = draftState.ball.y + draftState.ball.radius;
				const left_x = draftState.ball.x - draftState.ball.radius;

				draftState.ball.x += draftState.ball.x_speed;
        draftState.ball.y += draftState.ball.y_speed;

        // Hitting the top boundary
        if (draftState.ball.y - draftState.ball.radius < 0) {
          draftState.ball.y = draftState.ball.radius; // Don't go beyond the boundary
          draftState.ball.y_speed = -draftState.ball.y_speed + Math.random(); // Reverse the direction
        } // Hitting the bottom boundary
        else if (draftState.ball.y + draftState.ball.radius > draftState.gameHeight) {
          draftState.ball.y = draftState.gameHeight - draftState.ball.radius; // Set the new position
          draftState.ball.y_speed = -draftState.ball.y_speed - Math.random(); // Reverse direction
        }
      });
    default:
      return state;
  }
};

export default reducer;
