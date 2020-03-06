import { COLORS } from "src/style";
import React from "react";

export const ObservableRect = () => (
  <g>
    <rect x={0} y={0} width={200} height={50} fill={COLORS.OBSERVABLE} />
    <text x={100} y={25} css={{ fontSize: "1.4rem" }} textAnchor={"middle"}>
      可被观察的对象 Observable
    </text>
  </g>
);
