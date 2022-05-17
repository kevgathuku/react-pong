import React from "react";

import { Stage } from "@inlet/react-pixi";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import {
  selectWinner,
  selectPlayers,
  selectStatus,
  selectConfig,
  selectButtons,
  selectBall,
} from "./features/pong/pongSlice";
import Instructions from "./components/Instructions";
import Pong from "./features/pong/Pong";

export const PongApp = (props) => {
  const dispatch = useDispatch();

  const winner = useSelector(selectWinner);
  const players = useSelector(selectPlayers);
  const status = useSelector(selectStatus);
  const config = useSelector(selectConfig);
  const buttons = useSelector(selectButtons);
  const ball = useSelector(selectBall);

  const pongContainerProps = {
    ball,
    config,
    buttons,
    players,
    status,
    winner,
    dispatch,
  };

  return (
    <div className="appContainer">
      <Stage
        width={config.width}
        height={config.height}
        options={{ autoDensity: true, backgroundColor: config.boardColor }}
      >
        <Pong {...pongContainerProps} />
      </Stage>
      <Instructions />
    </div>
  );
};

export default PongApp;
