import { configureStore } from "@reduxjs/toolkit";
import pongReducer from "../features/pong/pongSlice"
export function makeStore() {
  return configureStore({
    reducer: { pong: pongReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
