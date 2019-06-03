import { Sprite } from '@inlet/react-pixi';
import React from 'react';

const img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'

class RotatingBunny extends React.Component {
  state = { rotation: 0 };

  componentDidMount() {
    // listen to tick events (raf)
    this.props.app.ticker.add(this.tick);
  }

  componentWillUnmount() {
    // stop listening for tick events
    this.props.app.ticker.remove(this.tick);
  }

  tick = delta => {
    // rotate this sucker 🙌
    this.setState(({ rotation }) => ({
      rotation: rotation + 0.1 * delta,
    }));
  };

  render() {
    return <Sprite image={img} rotation={this.state.rotation} />;
  }
}

export default RotatingBunny;
