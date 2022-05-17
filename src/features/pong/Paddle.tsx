import React from 'react';
import { Graphics } from '@inlet/react-pixi';

type Props = {
  player: {
    x: number;
    y: number;
    position: string;
    width: number;
    height: number;
  };
};

function Paddle(props: Props) {
  const {
    player: { x, y, position, width, height },
  } = props;

  return (
    <Graphics
      draw={(g) => {
        // clear the graphics
        g.clear();
        // start drawing
        if (position === 'left') g.beginFill(0xf977a3);
        if (position === 'right') g.beginFill(0x66ddd4);
        g.drawRect(x, y, width, height);
      }}
    />
  );
}

export default Paddle;
