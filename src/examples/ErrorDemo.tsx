import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader } from "src/components/Demo";
import { Button } from "src/components/Button";
import { AnimatedCircles } from "src/components/AnimatedCircles";

const data = ["1", "2"];

export const ErrorDemo = () => {
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);
  const [reset, setReset] = useState(false);

  return (
    <div css={{ width: 200 }}>
      <h2>Error</h2>
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
            completed={completed}
            started={started}
            onReset={() => {
              setCompleted(true);
            }}
          />
        )}
        <g>
          <rect x={0} y={0} width={200} height={50} fill={COLORS.OBSERVABLE} />
          <text x={100} y={25} css={{ fontSize: "1.4rem" }} textAnchor={"middle"}>
            可被观察的对象 Observable
          </text>
        </g>
        <g>
          <rect x={0} y={250} width={200} height={50} fill={COLORS.OBSERVER} />
          <text x={100} y={275} css={{ fontSize: "1.4rem" }} textAnchor={"middle"}>
            观察者 Observer
          </text>
        </g>
      </svg>
      <DemoFooter>{completed && !reset && <div>出错了！</div>}</DemoFooter>
    </div>
  );
};
