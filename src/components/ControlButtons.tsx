import { Button } from "src/components/Button";
import { COLORS } from "src/style";
import React from "react";

interface IControlButtonsProps {
  isStart: boolean | null;
  onReset: () => void;
  onStart: () => void;
}

export const ControlButtons: React.FC<IControlButtonsProps> = ({ isStart, onStart, onReset }) => (
  <>
    {isStart ? (
      <Button onClick={onReset} css={{ marginLeft: 5 }}>
        重置动画
      </Button>
    ) : (
      <Button onClick={onStart} css={{ color: COLORS.BLUE }}>
        开始动画
      </Button>
    )}
  </>
);
