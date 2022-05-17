import React from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

import Instructions from "../src/components/Instructions";

const PongContainerWithNoSSR = dynamic(
  () => import("../src/features/pong/PongContainer"),
  {
    ssr: false,
  }
);

export const PongApp: NextPage = (props) => {
  return (
    <div className="appContainer">
      <PongContainerWithNoSSR />
      <Instructions />
    </div>
  );
};

export default PongApp;
