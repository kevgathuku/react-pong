import { ActionTypes } from './types';

export const keyPress = (key = null) => ({
	type: ActionTypes.KEYPRESS,
	payload: key,
});

export const keyUp = (key = null) => ({
	type: ActionTypes.KEY_UP,
	payload: key,
});

export const movePaddleDown = (position, velocity) => ({
	type: ActionTypes.MOVE_PADDLE_DOWN,
	payload: { position },
});

export const movePaddleUp = (position, velocity) => ({
	type: ActionTypes.MOVE_PADDLE_UP,
	payload: { position },
});
