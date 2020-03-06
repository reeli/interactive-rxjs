import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader } from "src/components/Demo";
import { Button } from "src/components/Button";
import { useSpring } from "react-spring";
import { AnimatedCircles } from "src/components/AnimatedCircles";
import { AnimatedLine } from "src/components/AnimatedLine";

const data = ["1", "2", "3"];

export const CompleteDemo = () => {
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [reset, setReset] = useState(false);
  const props = useSpring({
    from: {
      y1: 250,
      y2: subscribed ? 50 : 250,
    },
    to: {
      y1: 250,
      y2: subscribed ? 50 : 250,
    },
    onRest: () => {
      if (subscribed) {
        setReset(false);
        setStarted(true);
      }
    },
  });

  return (
    <div css={{ width: 200 }}>
      <h2>Complete</h2>
      <DemoHeader>
        {!subscribed && (
          <Button
            onClick={() => {
              setSubscribed(true);
            }}
            css={{ color: COLORS.BLUE }}
          >
            订阅
          </Button>
        )}

        <Button
          onClick={() => {
            setReset(true);
            setCompleted(false);
            setStarted(false);
            setSubscribed(false);
          }}
          css={{ marginLeft: 5 }}
        >
          重置动画
        </Button>
      </DemoHeader>
      <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
        <AnimatedLine stroke={completed && !reset ? COLORS.GREY : COLORS.GREEN} style={props} />
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
      <DemoFooter>
        {subscribed && <div>已订阅，现在可以向观察者推送数据了</div>}
        {completed && !reset && <div>Observable 已完结，表示「没有更多数据了」，之后也不会再向 Observer 推送数据</div>}
      </DemoFooter>
    </div>
  );
};
