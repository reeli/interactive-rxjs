import { COLORS } from "src/style";
import React from "react";

export const ObserverRect: React.FC = ({ children }) => (
  <g>
    <rect x={0} y={250} width={200} height={50} fill={COLORS.OBSERVER} />
    <text x={100} y={275} css={{ fontSize: "1.4rem" }} textAnchor={"middle"}>
      观察者 Observer
    </text>
    {children}
  </g>
);
