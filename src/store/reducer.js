const GAME_WIDTH = 800;
const GAME_HEIGHT = 700;

const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;

const PADDLE_OFFSET_X = 20;
const PADDLE_OFFSET_Y = 50;

const paddleLeft = {
  controller: "human",
  position: "left",
  x: PADDLE_OFFSET_X,
  y: PADDLE_OFFSET_Y,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT
};

const paddleRight = {
  position: "right",
  x: GAME_WIDTH - PADDLE_OFFSET_X - PADDLE_WIDTH,
  y: PADDLE_OFFSET_Y,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT
};

const initialState = {
  boardColor: "#000000",
  mode: "paused",
  gameWidth: GAME_WIDTH,
  gameHeight: GAME_HEIGHT,
  players: [paddleLeft, paddleRight],
  ball: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_ONE_PLAYER":
      return Object.assign({}, state, { mode: "playing" });
    case "START_TWO_PLAYER":
      return Object.assign({}, state, { mode: "playing" });
    default:
      return state;
  }
};

export default reducer;
