import { COLORS } from "src/style";
import React from "react";
import {Rect} from "src/components/Rect";

export const ObservableRect: React.FC = () => <Rect fill={COLORS.OBSERVABLE} text={"可被观察的对象 Observable"} />;
