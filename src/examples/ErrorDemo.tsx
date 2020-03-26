import React, { useState } from "react";
import { COLORS } from "src/style";
import {DemoFooter, DemoHeader, DemoTitle, DemoWrapper} from "src/components/Demo";
import { Button } from "src/components/Button";
import { AnimatedCircles } from "src/components/AnimatedCircles";
import { ObservableRect } from "src/components/ObservableRect";
import { ObserverRect } from "src/components/ObserverRect";

const data = ["1", "2"];

export const ErrorDemo = () => {
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);
  const [reset, setReset] = useState(false);

  return (
    <DemoWrapper>
      <DemoTitle>Error</DemoTitle>
      <DemoHeader>
        <Button
          onClick={() => {
            setReset(false);
            setStarted(true);
          }}
          css={{ color: COLORS.BLUE }}
        >
          开始动画
        </Button>
        <Button
          onClick={() => {
            setReset(true);
            setCompleted(false);
            setStarted(false);
          }}
          css={{ marginLeft: 5 }}
        >
          重置动画
        </Button>
      </DemoHeader>
        <div css={{ width: 200 }}>
        <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
        <line
          x1={100}
          x2={100}
          y1={50}
          y2={250}
          stroke={completed && !reset ? COLORS.ERROR : COLORS.GREEN}
          strokeWidth={2}
        />
        {reset ? null : (
          <AnimatedCircles
            data={data}
            started={started}
            onAnimationEnd={() => {
              setCompleted(true);
            }}
          />
        )}
        <ObservableRect />
        <ObserverRect />
      </svg>
        </div>
      <DemoFooter>{completed && !reset && <div>出错了！</div>}</DemoFooter>
    </DemoWrapper>
  );
};
