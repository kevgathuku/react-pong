import React, { Component } from 'react';
import { Circle } from 'react-konva';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ball extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		data: PropTypes.object.isRequired,
	};

	render() {
		const {
			data: { x, y, radius },
		} = this.props;

		return <Circle x={x} y={y} fill="#00FFFF" radius={radius} />;
	}
}

const mapStateToProps = state => {
	const { ball } = state;
	return { data: ball };
};

export default connect(mapStateToProps)(Ball);
