import React from "react";
import { COLORS } from "src/style";

interface IRectProps {
  text?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  fill?: string;
  textVerticalAlign?: "middle" | "bottom" | "top";
}

const getTextPosition = ({
  textVerticalAlign,
  x,
  y,
  width,
  height,
}: {
  textVerticalAlign: IRectProps["textVerticalAlign"];
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  if (textVerticalAlign === "middle") {
    return {
      x: x + width / 2,
      y: y + height / 2,
    };
  }
  if (textVerticalAlign === "bottom") {
    return {
      x: x + width / 2,
      y: y+height * 0.8
    };
  }

  return {
    x: x + width / 2,
    y: y - height/2,
  };
};

export const Rect: React.FC<IRectProps> = ({
  width = 200,
  height = 50,
  x = 0,
  y = 0,
  fill = COLORS.PRIMARY,
  text = "",
  children,
  textVerticalAlign = "middle",
}) => {
  const { x: textX, y: textY } = getTextPosition({
    textVerticalAlign,
    x,
    y,
    width,
    height,
  });

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
      <text x={textX} y={textY} css={{ fontSize: "1.4rem" }} textAnchor={"middle"} alignmentBaseline={"middle"}>
        {text}
      </text>
      {children}
    </g>
  );
};
