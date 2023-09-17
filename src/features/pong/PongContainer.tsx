import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  selectWinner,
  selectPlayers,
  selectStatus,
  selectConfig,
  selectButtons,
  selectBall,
} from "./pongSlice";
import Pong from "./Pong";

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
      {/* <Stage
        width={config.width}
        height={config.height}
        options={{ autoDensity: true, backgroundColor: config.boardColor }}
      >
      <Pong {...pongContainerProps} />        
      </Stage> */}
      <svg
        viewBox={`0 0 ${config.width} ${config.height}`}
        width={`${config.width}`}
        height={`${config.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect
          x="0"
          y="0"
          width={`${config.width}`}
          height={`${config.height}`}
        />
        <text
          x={`${config.width / 2 - 100}`}
          y="50"
          fill="white"
          style={{
            fontFamily: "Futura, sans-serif",
            fontSize: "40px",
            letterSpacing: "10",
          }}
        >
          PONG!
        </text>
        <g>
          <rect
            x={`${config.width / 2 - 150}`}
            y={`${config.height / 2 - 100}`}
            width="250"
            height="100"
            stroke="#0fffff"
            strokeWidth={2}
          />
          <text
            x="325"
            y="310"
            font-family="Arial, sans-serif"
            font-size="35"
            fill="#26f7a3"
          >
            START
          </text>
        </g>
      </svg>
    </div>
  );
};

export default PongApp;
