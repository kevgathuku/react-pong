import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Circle, Layer, Rect, Stage, Text, Line } from 'react-konva';
import { connect } from 'react-redux';

import { keyPress, keyUp } from './store/actions';

import './App.css';
import Paddle from './components/Paddle';

class PongApp extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		players: PropTypes.array.isRequired,
		gameWidth: PropTypes.number.isRequired,
		gameHeight: PropTypes.number.isRequired,
		boardColor: PropTypes.string.isRequired,
	};

	componentDidMount() {
		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keyup', this.onKeyUp);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.onKeyDown);
		window.removeEventListener('keyup', this.onKeyUp);
	}

	constructor(props) {
		super(props);

		this.middleX = props.gameWidth / 2;
		this.middleY = props.gameHeight / 2;
	}

	onKeyDown = event => {
		const { dispatch } = this.props;

		switch (event.keyCode) {
			case 87: // W
			case 83: // S
				console.log('Key', event);
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
					<h2>PONG</h2>
					<p>Use keys W and S to move the left paddle up and down</p>
					<button className="button is-primary">START</button>
					<p />
					<p>The first player to reach a score of 5 wins the game</p>
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
						<Line
							dash={
								// dashed stroke 15px long and 10 px apart
								[15, 10]
							}
							points={[this.middleX, 0, this.middleX, gameHeight]}
							stroke="white"
							width={5}
							height={gameHeight}
						/>
						<Circle
							x={gameWidth / 2}
							y={gameHeight / 2}
							fill="#00FFFF"
							radius={10}
						/>
						<Text
							x={this.middleX - 100}
							y={50}
							fontSize={60}
							align="center"
							fontFamily="'Comic Sans MS', cursive, sans-serif"
							fill="#66FF33"
							text="0"
						/>
						<Text
							x={this.middleX + 60}
							y={50}
							fontSize={60}
							align="center"
							fontFamily="'Comic Sans MS', cursive, sans-serif"
							fill="#66FF33"
							text="0"
						/>
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

export default connect(mapStateToProps)(PongApp);
