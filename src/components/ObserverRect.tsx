import { COLORS } from "src/style";
import React from "react";
import {Rect} from "src/components/Rect";

export const ObserverRect: React.FC = ({ children }) => (
  <Rect fill={COLORS.OBSERVER} y={250} text={"观察者 Observer"}>
    {children}
  </Rect>
);
