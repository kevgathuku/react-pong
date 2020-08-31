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

export const keyPress = (key: string): Action => ({
  type: 'KEYPRESS',
  payload: key,
});

export const keyUp = (key: string): Action => ({
  type: 'KEY_UP',
  payload: key,
});

export const movePaddleDown = (position: string): Action => ({
  type: 'MOVE_PADDLE_DOWN',
  payload: { position },
});

export const movePaddleUp = (position: string): Action => ({
  type: 'MOVE_PADDLE_UP',
  payload: { position },
});

export const startGame = (): Action => ({
  type: 'START_GAME',
});

export const pauseGame = (): Action => ({
  type: 'PAUSE_GAME',
});

export const gameOver = (): Action => ({
  type: 'GAME_OVER',
});

export const resumeGame = (): Action => ({
  type: 'RESUME_GAME',
});

export const restartGame = (): Action => ({
  type: 'RESTART_GAME',
});

export const moveBall = (): Action => ({ type: 'MOVE_BALL' });

export const setBallPosition = (position: {
  x: number;
  y: number;
  x_speed: number;
  y_speed: number;
}) => ({
  type: 'SET_BALL_POSITION',
  payload: {
    x: position.x,
    y: position.y,
    x_speed: position.x_speed,
    y_speed: position.y_speed,
  },
});
