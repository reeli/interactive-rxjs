import { COLORS } from "src/style";
import React from "react";
import { Rect } from "src/components/Rect";

export const ObserverRect: React.FC<{ y?: number }> = ({ children, y = 250 }) => (
  <Rect fill={COLORS.SECONDARY} y={y} text={"观察者 Observer"}>
    {children}
  </Rect>
);
