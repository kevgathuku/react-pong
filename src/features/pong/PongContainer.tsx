import React from "react";
import { Stage } from "@inlet/react-pixi";
import { useSelector } from "react-redux";

import Pong from "./Pong";

import { selectConfig } from "./pongSlice";

export default function PongContainer() {
  const config = useSelector(selectConfig);

  return (
    <Stage
      width={config.width}
      height={config.height}
      options={{ autoDensity: true, backgroundColor: config.boardColor }}
    >
      <Pong />
    </Stage>
  );
}
