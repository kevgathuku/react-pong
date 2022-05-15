import React, { Dispatch, useEffect } from "react";
import * as PIXI from "pixi.js";
import {
  Container,
  Text,
  useApp,
  useTick,
} from "@inlet/react-pixi";

import Ball from "./Ball";
import Button from "./Button";
import Paddle from "./Paddle";

import {
  startGame,
  moveBall,
  keyUp,
  pauseGame,
  resumeGame,
  restartGame,
  movePaddleDown,
  movePaddleUp,
  gameOver,
  Action,
} from "../store/actions";

import { BallProps, ButtonProps, PaddleProps } from "../store/reducer";

type Props = {
  dispatch: Dispatch<Action>;
  gameWidth: number;
  gameHeight: number;
  boardColor: number;
  buttons: {
    start: ButtonProps;
    restart: ButtonProps;
    resume: ButtonProps;
  };
  players: {
    left: PaddleProps;
    right: PaddleProps;
    [left: string]: PaddleProps;
  };
  winner: PaddleProps | null;
  ball: BallProps;
  status: string;
};

export default function PongContainer({
  players,
  status,
  gameWidth,
  buttons,
  ball,
  winner,
  dispatch,
}: Props) {
  const app = useApp();

  const tick = () => {
    if (!winner) {
      dispatch(moveBall());
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    dispatch(keyUp(event.key));
  };

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "Escape":
        // ESC - Pause the game
        dispatch(pauseGame());
        app.ticker.remove(tick);
        break;

      case "KeyA": // A
        // Move the left paddle up
        dispatch(movePaddleUp("left"));
        break;
      case "KeyZ": // Z
        // Move the left paddle down
        dispatch(movePaddleDown("left"));
        break;
      case "ArrowUp": // Arrow Up Key
        // Move the left paddle up
        dispatch(movePaddleUp("right"));
        break;
      case "ArrowDown": //Arrow down key
        // Move the left paddle down
        dispatch(movePaddleDown("right"));
        break;
      default:
        console.log("Key", event);
        return; // Do nothing
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      app.ticker.remove(tick);
    }
  });

  const cResumeGame = () => {
    // Resume the ticker
    app.ticker.add(tick);
    dispatch(resumeGame());
  };

  const cRestartGame = () => {
    // Restart the ticker
    app.ticker.add(tick);
    dispatch(restartGame());
  };

  useTick((delta) => {
    if (!winner && status === "playing") {
      dispatch(moveBall());
    } else if (winner) {
      dispatch(gameOver());
      app.ticker.remove(tick);
    }
  });

  const start = () => {
    dispatch(startGame());
    app.ticker.add(tick);
  };

  return (
    <Container>
      <Text
        text={players.left.score.toString()}
        anchor={0.5}
        x={gameWidth / 4}
        y={150}
        style={
          new PIXI.TextStyle({
            fontSize: 60,
            fill: "#ffffff",
            letterSpacing: 10,
          })
        }
      />
      <Text
        text={players.right.score.toString()}
        anchor={0.5}
        x={(gameWidth / 4) * 3}
        y={150}
        style={
          new PIXI.TextStyle({
            fontSize: 60,
            fill: "#ffffff",
            letterSpacing: 10,
          })
        }
      />
      <Paddle player={players.left} />
      <Paddle player={players.right} />
      {status === "pre-start" ? (
        <>
          <Text
            text="PONG!"
            anchor={0.5}
            x={gameWidth / 2}
            y={50}
            isSprite
            style={
              new PIXI.TextStyle({
                align: "center",
                fontFamily: "Futura, sans-serif",
                fontSize: 40,
                fill: "#ffffff",
                letterSpacing: 10,
              })
            }
          />
          <Button data={buttons.start} action={() => start()} />
        </>
      ) : null}
      {status === "paused" ? (
        <>
          <Button data={buttons.resume} action={cResumeGame} />
          <Ball data={ball} />
        </>
      ) : null}
      {status === "playing" ? <Ball data={ball} /> : null}
      {status === "game-over" ? (
        <>
          <Text
            text={
              winner
                ? winner.position === "left"
                  ? "Player 1 Wins"
                  : "Player 2 Wins"
                : ""
            }
            anchor={0.5}
            x={gameWidth / 2}
            y={50}
            isSprite
            style={
              new PIXI.TextStyle({
                align: "center",
                fontFamily: "Futura, sans-serif",
                fontSize: 40,
                fill: "#ffffff",
                letterSpacing: 10,
              })
            }
          />
          <Button data={buttons.restart} action={() => cRestartGame()} />
        </>
      ) : null}
    </Container>
  );
}
