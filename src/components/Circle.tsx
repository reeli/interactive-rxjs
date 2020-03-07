import { COLORS } from "src/style";
import React from "react";

const CIRCLE_CONFIG = {
  radius: 15,
  stroke: COLORS.BLACK,
  strokeWidth: 2,
  animateY: 220,
  fill: COLORS.WHITE,
};

interface ICircleProps {
  text?: string | number;
  r?: number;
  fill?: string;
  strokeWidth?: number;
  translateX?: number;
  translateY?: number;
  stroke?: string;
}

export const Circle: React.FC<ICircleProps> = ({
  r = CIRCLE_CONFIG.radius,
  fill = CIRCLE_CONFIG.fill,
  strokeWidth = CIRCLE_CONFIG.strokeWidth,
  text,
  translateX = 100,
  translateY = 0,
  stroke = CIRCLE_CONFIG.stroke,
}) => (
  <g transform={`translate(${translateX}, ${translateY})`}>
    <circle cx="0" cy="0" r={r} fill={fill} strokeWidth={strokeWidth} stroke={stroke} />
    <text x={0} y={CIRCLE_CONFIG.radius / 2} textAnchor={"middle"} css={{ fontSize: "2rem" }}>
      {text}
    </text>
  </g>
);
