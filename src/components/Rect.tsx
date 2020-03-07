import React from "react";
import { COLORS } from "src/style";

interface IRectProps {
  text?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  fill?: string;
}

export const Rect: React.FC<IRectProps> = ({
  width = 200,
  height = 50,
  x = 0,
  y = 0,
  fill = COLORS.GREY,
  text = "",
  children,
}) => (
  <g>
    <rect x={x} y={y} width={width} height={height} fill={fill} />
    <text
      x={x + width / 2}
      y={y + height / 2}
      css={{ fontSize: "1.4rem" }}
      textAnchor={"middle"}
      alignmentBaseline={"middle"}
    >
      {text}
    </text>
    {children}
  </g>
);
