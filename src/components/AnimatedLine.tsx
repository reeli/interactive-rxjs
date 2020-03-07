import { animated } from "react-spring";
import React from "react";

export const AnimatedLine = animated(({ style, x1 = 100, x2 = 100, y1 = 100, strokeWidth = 2, ...otherProps }) => (
  <line x1={x1} x2={x2} strokeWidth={strokeWidth} y1={y1} {...otherProps} {...style} />
));
