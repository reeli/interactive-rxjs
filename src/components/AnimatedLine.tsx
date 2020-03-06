import { animated } from "react-spring";
import React from "react";

export const AnimatedLine = animated(({ style, x1 = 100, y1 = 100, strokeWidth = 2, ...otherProps }) => (
  <line x1={x1} x2={y1} strokeWidth={strokeWidth} {...otherProps} {...style} />
));
