import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Stage } from "react-konva";
import { connect } from "react-redux";

import { keyPress, keyUp } from "./store/actions";

import "./App.css";
import Paddle from "./Paddle";

class PongApp extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    players: PropTypes.array,
    gameWidth: PropTypes.number.isRequired,
    gameHeight: PropTypes.number.isRequired,
    boardColor: PropTypes.string.isRequired
  };

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = event => {
    const { dispatch } = this.props;

    switch (event.keyCode) {
      case 38: // Down Arrow
      case 40: // Up Arrow
      case 65: // a
      case 90: // z
        console.log("Key", event);
        dispatch(keyPress(event.key));
        break;
      default:
        return; // Do nothing
    }
  };

  onKeyUp = event => {
    const { dispatch } = this.props;

    dispatch(keyUp(event.key));
  };

  render() {
    const { boardColor, players, gameWidth, gameHeight } = this.props;
    return (
      <div className="App">
        <div className="intro content">
          <h2>Pong</h2>
          <h3>Single Player Mode</h3>
          <p>Use keys A and Z to move the left paddle up and down</p>
          <button className="button is-primary">
            Start Single Player Mode
          </button>
          <h3>Two Player Mode</h3>
          <p>Player 1: Move the left paddle up and down using keys A and Z</p>
          <p>
            Player 2: Move the right paddle up and down using the Up and Down
            Arrows
          </p>
          <button className="button is-primary">Start Two Player Mode</button>
          <p />
          <p>The first player to reach a score of 10 wins the game</p>
          <h3>GOOD LUCK!</h3>
        </div>
        <Stage width={gameWidth} height={gameHeight}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={gameWidth}
              height={gameHeight}
              fill={boardColor}
              shadowBlur={10}
            />
            {players.map(player => (
              <Paddle player={player} key={player.position} />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { players, gameWidth, gameHeight, boardColor, keysPressed } = state;
  return { players, gameWidth, gameHeight, boardColor, keysPressed };
};

const VisiblePongApp = connect(mapStateToProps)(PongApp);

export default VisiblePongApp;
