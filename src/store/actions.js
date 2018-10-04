export const ActionTypes = {
  START_ONE_PLAYER: "START_ONE_PLAYER",
  START_TWO_PLAYER: "START_TWO_PLAYER",
  KEYPRESS: "KEYPRESS",
  KEY_UP: "KEY_UP",
  MOVE_PADDLE_Y: "MOVE_PADDLE_Y"
};

export const keyPress = (event = null) => ({
  type: ActionTypes.KEYPRESS,
  payload: event
});

export const keyUp = (event = null) => ({
  type: ActionTypes.KEY_UP,
  payload: event
});

export const movePaddleDown = (position, velocity) => ({
  type: ActionTypes.MOVE_PADDLE_Y,
  payload: { position, velocity }
});

// Decrease the Y value
export const movePaddleUp = (position, velocity) => ({
  type: ActionTypes.MOVE_PADDLE_Y,
  payload: { position, velocity: velocity * -1 }
});
