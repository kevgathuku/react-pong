import produce from 'immer';
import { Action } from './actions';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 700;

const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PADDLE_OFFSET_X = 20;
const PADDLE_OFFSET_Y = 50;
const PADDLE_SPEED = 20;

type ButtonProps = {
  x: number;
  y: number;
  top_x: number;
  top_y: number;
  text: string;
};

type paddleProps = {
  controller: string;
  position: string;
  x: number;
  y: number;
  width: number;
  height: number;
  score: number;
};

type BallProps = {
  x: number;
  y: number;
  radius: number;
  x_speed: number;
  y_speed: number;
};

type AppState = {
  boardColor: number;
  gameWidth: number;
  gameHeight: number;
  velocity: number;
  players: {
    left: paddleProps;
    right: paddleProps;
    [left: string]: paddleProps;
  };
  ball: BallProps;
  buttons: {
    restart: ButtonProps;
    start: ButtonProps;
    resume: ButtonProps;
  };
  keysPressed: {
    [key: string]: boolean;
  };
  status: string;
  winner: paddleProps | null;
  winningScore: number;
};

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

const resumeButton = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2 - 50,
  top_x: GAME_WIDTH / 2 - 120, // x - 120
  top_y: GAME_HEIGHT / 2 - 100, // y - 50
  text: 'RESUME',
};

const startButton = Object.assign({}, resumeButton, {
  text: 'START',
});

const restartButton = Object.assign({}, resumeButton, {
  text: 'RESTART',
});

const BALL_DEFAULTS = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2,
  radius: 10,
  x_speed: 5,
  y_speed: 5,
};

const initialState = {
  boardColor: 0x0d0c22,
  gameWidth: GAME_WIDTH,
  gameHeight: GAME_HEIGHT,
  velocity: PADDLE_SPEED,
  players: {
    left: humanPaddle,
    right: computerPaddle,
  },
  ball: BALL_DEFAULTS,
  buttons: {
    restart: restartButton,
    start: startButton,
    resume: resumeButton,
  },
  keysPressed: {},
  status: 'pre-start',
  winner: null,
  winningScore: 5,
};

const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case 'START_GAME':
      return produce(state, (draftState) => {
        draftState.status = 'playing';
      });
    case 'RESUME_GAME':
      return produce(state, (draftState) => {
        draftState.status = 'playing';
      });
    case 'RESTART_GAME':
      return produce(state, (draftState) => {
        draftState.status = 'playing';
        draftState.players = initialState.players;
        draftState.winner = null;
      });
    case 'PAUSE_GAME':
      return produce(state, (draftState) => {
        draftState.status = 'paused';
      });
    case 'GAME_OVER':
      return produce(state, (draftState) => {
        draftState.status = 'game-over';
      });
    case 'KEYPRESS':
      return produce(state, (draftState) => {
        draftState.keysPressed[action.payload] = true;
      });
    case 'KEY_UP':
      return produce(state, (draftState) => {
        draftState.keysPressed[action.payload] = false;
      });
    case 'MOVE_PADDLE_UP':
      if (state.status === 'paused') return state;

      return produce(state, (draftState: AppState) => {
        let { position } = action.payload;
        let player = draftState.players[position];
        // Decrease the Y value
        player.y -= draftState.velocity;
        // Top of the board
        if (player.y < 0) {
          player.y = 0;
        }
      });
    case 'MOVE_PADDLE_DOWN':
      if (state.status === 'paused') return state;

      return produce(state, (draftState: AppState) => {
        let { position } = action.payload;
        let player = draftState.players[position];

        player.y += draftState.velocity;
        // Bottom of the board
        if (player.y + PADDLE_HEIGHT > GAME_HEIGHT) {
          player.y = GAME_HEIGHT - PADDLE_HEIGHT;
        }
      });
    case 'SET_BALL_POSITION':
      return state;
    case 'INCREMENT_SCORE':
      return state;

    case 'MOVE_BALL':
      return produce(state, (draftState) => {
        const top_y = draftState.ball.y - draftState.ball.radius;
        const right_x = draftState.ball.x + draftState.ball.radius;
        const bottom_y = draftState.ball.y + draftState.ball.radius;
        const left_x = draftState.ball.x - draftState.ball.radius;

        const paddle1 = draftState.players.left;
        const paddle2 = draftState.players.right;

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
          paddle2.score += 1;

          // Game over
          if (paddle2.score === draftState.winningScore) {
            draftState.winner = paddle2;
          }
        } // The player has scored
        else if (draftState.ball.x > draftState.gameWidth) {
          draftState.ball.x_speed = -5; // Serve the ball to the player
          draftState.ball.y_speed = 3 * randomDirection();
          draftState.ball.x = BALL_DEFAULTS.x;
          draftState.ball.y = BALL_DEFAULTS.y;
          // score_for.play(); -> Play audio
          paddle1.score += 1;

          // Game over
          if (paddle1.score === draftState.winningScore) {
            draftState.winner = paddle1;
          }
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

export type RootState = ReturnType<typeof reducer>;

export default reducer;
