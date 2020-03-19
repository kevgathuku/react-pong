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
  score: 0,
};

const computerPaddle = {
  controller: 'computer',
  position: 'right',
  x: GAME_WIDTH - PADDLE_OFFSET_X - PADDLE_WIDTH,
  y: PADDLE_OFFSET_Y,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  score: 0,
};

const startButton = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2 - 50,
  text: 'START',
};

const BALL_DEFAULTS = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2,
  radius: 10,
  x_speed: 5,
  y_speed: 5,
};

const initialState = {
  boardColor: 0x0d0c22,
  mode: 'pre-start',
  gameWidth: GAME_WIDTH,
  gameHeight: GAME_HEIGHT,
  velocity: PADDLE_SPEED,
  players: [humanPaddle, computerPaddle],
  ball: BALL_DEFAULTS,
  button: startButton,
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
    case ActionTypes.SET_BALL_POSITION:
      break;
    case ActionTypes.INCREMENT_SCORE:
      break;
    case ActionTypes.MOVE_BALL:
      return produce(state, draftState => {
        const top_y = draftState.ball.y - draftState.ball.radius;
        const right_x = draftState.ball.x + draftState.ball.radius;
        const bottom_y = draftState.ball.y + draftState.ball.radius;
        const left_x = draftState.ball.x - draftState.ball.radius;

        const paddle1 = draftState.players.find(
          player => player.position === 'left'
        );
        const paddle2 = draftState.players.find(
          player => player.position === 'right'
        );

        draftState.ball.x += draftState.ball.x_speed;
        draftState.ball.y += draftState.ball.y_speed;

        // Hitting the top boundary
        if (draftState.ball.y - draftState.ball.radius < 0) {
          draftState.ball.y = draftState.ball.radius; // Don't go beyond the boundary
          draftState.ball.y_speed = -draftState.ball.y_speed; // Reverse the direction
        } // Hitting the bottom boundary
        else if (
          draftState.ball.y + draftState.ball.radius >
          draftState.gameHeight
        ) {
          draftState.ball.y = draftState.gameHeight - draftState.ball.radius; // Set the new position
          draftState.ball.y_speed = -draftState.ball.y_speed; // Reverse direction
        }

        // If the computer has scored
        if (draftState.ball.x < 0) {
          draftState.ball.x_speed = 5; // Serve the ball to the computer
          draftState.ball.y_speed = 3 * randomDirection();
          draftState.ball.x = BALL_DEFAULTS.x;
          draftState.ball.y = BALL_DEFAULTS.y;

          // score_against.play(); -> Play audio
          // paddle2.updateScore();
        } // The player has scored
        else if (draftState.ball.x > draftState.gameWidth) {
          draftState.ball.x_speed = -5; // Serve the ball to the player
          draftState.ball.y_speed = 3 * randomDirection();
          draftState.ball.x = BALL_DEFAULTS.x;
          draftState.ball.y = BALL_DEFAULTS.y;
          // score_for.play(); -> Play audio
          // paddle1.updateScore();
        }

        // If the ball is in the left half of the table
        if (right_x < draftState.gameWidth / 2) {
          // The ball has not yet passed the paddle
          // The ball has made contact with the paddle
          // The topmost side of the ball is in the range of the paddle
          // The bottom side of the ball is in the range of the paddle
          if (
            right_x > paddle1.x &&
            left_x < paddle1.x + paddle1.width &&
            top_y < paddle1.y + paddle1.height &&
            bottom_y > paddle1.y
          ) {
            draftState.ball.x_speed =
              Math.abs(draftState.ball.x_speed) + Math.random();
            draftState.ball.y_speed += Math.random();
            draftState.ball.x += draftState.ball.x_speed;
            // Play audio
            // contact.currentTime = 0;
            // contact.play();
          }
        } else {
          // The ball is in the right half of the table
          if (
            right_x > paddle2.x &&
            left_x < paddle2.x + paddle2.width &&
            top_y < paddle2.y + paddle2.height &&
            bottom_y > paddle2.y
          ) {
            draftState.ball.x_speed =
              -Math.abs(draftState.ball.x_speed) - Math.random();
            draftState.ball.y_speed += Math.random();
            draftState.ball.x += draftState.ball.x_speed;
            // Play audio
            // contact.currentTime = 0;
            // contact.play();
          }
        }
      });
    default:
      return state;
  }
};

export default reducer;
