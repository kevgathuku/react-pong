import React, { Component } from "react";
import * as PIXI from "pixi.js";
import { Container, Text, withPixiApp } from "@inlet/react-pixi";

import Ball from "./Ball";
import Button from "./Button";
import Paddle from "./Paddle";

import { Props } from "../App";

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
} from "../store/actions";

const PongContainer = withPixiApp(
  class extends Component<Props> {
    componentDidMount() {
      window.addEventListener("keydown", this.onKeyDown);
      window.addEventListener("keyup", this.onKeyUp);
    }

    componentDidUpdate(prevProps: Props) {
      const { dispatch } = this.props;
      if (this.props.winner !== prevProps.winner) {
        // If the winner prop was previously empty, i.e. game in progress
        if (prevProps.winner === null) {
          dispatch(gameOver());
          this.props.app.ticker.remove(this.tick);
        }
      }
    }

    componentWillUnmount() {
      window.removeEventListener("keydown", this.onKeyDown);
      window.removeEventListener("keyup", this.onKeyUp);
      this.props.app.ticker.remove(this.tick);
    }

    onKeyDown = (event: KeyboardEvent) => {
      const { dispatch } = this.props;

      switch (event.keyCode) {
        case 27:
          // ESC - Pause the game
          dispatch(pauseGame());
          this.props.app.ticker.remove(this.tick);
          break;

        case 65: // A
          // Move the left paddle up
          dispatch(movePaddleUp("left"));
          break;
        case 90: // Z
          // Move the left paddle down
          dispatch(movePaddleDown("left"));
          break;
        case 38: // Arrow Up Key
          // Move the left paddle up
          dispatch(movePaddleUp("right"));
          break;
        case 40: //Arrow down key
          // Move the left paddle down
          dispatch(movePaddleDown("right"));
          break;
        default:
          console.log("Key", event);
          return; // Do nothing
      }
    };

    onKeyUp = (event: KeyboardEvent) => {
      const { dispatch } = this.props;

      dispatch(keyUp(event.key));
    };

    start = () => {
      const { dispatch } = this.props;

      dispatch(startGame());
      this.props.app.ticker.add(this.tick);
    };

    resumeGame = () => {
      const { dispatch } = this.props;
      // Resume the ticker
      this.props.app.ticker.add(this.tick);
      dispatch(resumeGame());
    };

    restartGame = () => {
      const { dispatch } = this.props;
      // Restart the ticker
      this.props.app.ticker.add(this.tick);
      dispatch(restartGame());
    };

    tick = () => {
      const { dispatch } = this.props;
      if (!this.props.winner) {
        dispatch(moveBall());
      }
    };

    render() {
      const { players, status, gameWidth, buttons, ball, winner } = this.props;

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
              <Button data={buttons.start} action={() => this.start()} />
            </>
          ) : null}
          {status === "paused" ? (
            <>
              <Button data={buttons.resume} action={this.resumeGame} />
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
              <Button
                data={buttons.restart}
                action={() => this.restartGame()}
              />
            </>
          ) : null}
        </Container>
      );
    }
  }
);

export default PongContainer;