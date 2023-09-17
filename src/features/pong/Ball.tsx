import React from 'react';
import { Graphics } from '@pixi/react';

type Props = {
  data: {
    x: number;
    y: number;
    radius: number;
  };
};

export default function Ball(props: Props) {
  const {
    data: { x, y, radius },
  } = props;

  return (
    <Graphics
      draw={(g) => {
        // clear the graphics
        g.clear();
        // start drawing
        g.beginFill(0xffffff);
        g.drawCircle(x, y, radius);
        g.endFill();
      }}
    />
  );
}
