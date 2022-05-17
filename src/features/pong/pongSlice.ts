import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 700;

const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PADDLE_OFFSET_X = 20;
const PADDLE_OFFSET_Y = 50;
const PADDLE_SPEED = 20;

export type ButtonProps = {
  x: number;
  y: number;
  top_x: number;
  top_y: number;
  text: string;
};

export type PaddleProps = {
  controller: string;
  position: string;
  x: number;
  y: number;
  width: number;
  height: number;
  score: number;
};

type Status = "pre-start" | "game-over" | "paused" | "playing";

export type BallProps = {
  x: number;
  y: number;
  radius: number;
  x_speed: number;
  y_speed: number;
};

export interface PongState {
  config: {
    boardColor: number;
    width: number;
    height: number;
  };
  velocity: number;
  players: {
    left: PaddleProps;
    right: PaddleProps;
    [left: string]: PaddleProps;
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
  status: Status;
  winner: PaddleProps | null;
  winningScore: number;
}

const randomDirection = () => {
  let direction = Math.random();
  if (direction > 0.5) {
    return -1 * direction;
  } else {
    return direction;
  }
};

const humanPaddle = {
  controller: "human",
  position: "left",
  x: PADDLE_OFFSET_X,
  y: PADDLE_OFFSET_Y,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  score: 0,
};

const computerPaddle = {
  controller: "computer",
  position: "right",
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
  text: "RESUME",
};

const startButton = Object.assign({}, resumeButton, {
  text: "START",
});

const restartButton = Object.assign({}, resumeButton, {
  text: "RESTART",
});

const BALL_DEFAULTS = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2,
  radius: 10,
  x_speed: 5,
  y_speed: 5,
};

const initialState: PongState = {
  config: {
    boardColor: 0x0d0c22,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
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
  status: "pre-start",
  winner: null,
  winningScore: 5,
};

export const pongSlice = createSlice({
  name: "pong",
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = "playing";
    },
    pauseGame: (state) => {
      state.status = "paused";
    },
    resumeGame: (state) => {
      state.status = "playing";
    },
    endGame: (state) => {
      state.status = "game-over";
    },
    restartGame: (state) => {
      state.status = "playing";
      state.players = initialState.players;
      state.winner = null;
    },
    keyPress: (state, action: PayloadAction<string>) => {
      state.keysPressed[action.payload] = true;
    },
    keyUp: (state, action: PayloadAction<string>) => {
      state.keysPressed[action.payload] = true;
    },
    movePaddleUp: (state, action) => {
      if (state.status === "paused") return state;

      const position = action.payload;
      const player = state.players[position];
      // Decrease the Y value
      player.y -= state.velocity;
      // Top of the board
      if (player.y < 0) {
        player.y = 0;
      }
    },
    movePaddleDown: (state, action) => {
      if (state.status === "paused") return state;

      const position = action.payload;
      const player = state.players[position];

      player.y += state.velocity;
      // Bottom of the board
      if (player.y + PADDLE_HEIGHT > GAME_HEIGHT) {
        player.y = GAME_HEIGHT - PADDLE_HEIGHT;
      }
    },
    moveBall: (state) => {
      const top_y = state.ball.y - state.ball.radius;
      const right_x = state.ball.x + state.ball.radius;
      const bottom_y = state.ball.y + state.ball.radius;
      const left_x = state.ball.x - state.ball.radius;

      const paddle1 = state.players.left;
      const paddle2 = state.players.right;

      state.ball.x += state.ball.x_speed;
      state.ball.y += state.ball.y_speed;

      // Hitting the top boundary
      if (state.ball.y - state.ball.radius < 0) {
        state.ball.y = state.ball.radius; // Don't go beyond the boundary
        state.ball.y_speed = -state.ball.y_speed; // Reverse the direction
      } // Hitting the bottom boundary
      else if (state.ball.y + state.ball.radius > state.config.height) {
        state.ball.y = state.config.height - state.ball.radius; // Set the new position
        state.ball.y_speed = -state.ball.y_speed; // Reverse direction
      }

      // If the computer has scored
      if (state.ball.x < 0) {
        state.ball.x_speed = 5; // Serve the ball to the computer
        state.ball.y_speed = 3 * randomDirection();
        state.ball.x = BALL_DEFAULTS.x;
        state.ball.y = BALL_DEFAULTS.y;

        // score_against.play(); -> Play audio
        paddle2.score += 1;

        // Game over
        if (paddle2.score === state.winningScore) {
          state.winner = paddle2;
        }
      } // The player has scored
      else if (state.ball.x > state.config.width) {
        state.ball.x_speed = -5; // Serve the ball to the player
        state.ball.y_speed = 3 * randomDirection();
        state.ball.x = BALL_DEFAULTS.x;
        state.ball.y = BALL_DEFAULTS.y;
        // score_for.play(); -> Play audio
        paddle1.score += 1;

        // Game over
        if (paddle1.score === state.winningScore) {
          state.winner = paddle1;
        }
      }

      // If the ball is in the left half of the table
      if (right_x < state.config.width / 2) {
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
          state.ball.x_speed = Math.abs(state.ball.x_speed) + Math.random();
          state.ball.y_speed += Math.random();
          state.ball.x += state.ball.x_speed;
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
          state.ball.x_speed = -Math.abs(state.ball.x_speed) - Math.random();
          state.ball.y_speed += Math.random();
          state.ball.x += state.ball.x_speed;
          // Play audio
          // contact.currentTime = 0;
          // contact.play();
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startGame,
  pauseGame,
  resumeGame,
  endGame,
  restartGame,
  keyPress,
  keyUp,
  movePaddleUp,
  movePaddleDown,
  moveBall,
} = pongSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWinner = (state: AppState) => state.pong.winner;

export const selectStatus = (state: AppState) => state.pong.status;

export const selectPlayers = (state: AppState) => state.pong.players;

export const selectConfig = (state: AppState) => state.pong.config;

export const selectButtons = (state: AppState) => state.pong.buttons;

export const selectBall = (state: AppState) => state.pong.ball;

export default pongSlice.reducer;
