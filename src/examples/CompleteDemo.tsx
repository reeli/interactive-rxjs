import React, { useState } from "react";
import { Spring } from "react-spring/renderprops-universal";
import { map } from "lodash";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader } from "src/components/Demo";
import { Button } from "src/components/Button";
import { animated, useSpring } from "react-spring";

const data = ["1", "2", "3"];

const calcFromY = (completed: boolean, itemY: number) => {
  if (completed) {
    return itemY;
  }
  return 16;
};

const calcToY = (started: boolean, itemY: number) => {
  if (started) {
    return itemY;
  }
  return 16;
};

const CircleSequence: React.FC<{
  completed: boolean;
  started: boolean;
  onReset?: () => void;
}> = ({ completed, started, onReset }) => (
  <>
    {map(data, (text, i) => {
      const itemY = 220 - i * 30;
      return (
        <Spring
          from={{ y: calcFromY(completed, itemY) }}
          to={{
            y: calcToY(started, itemY),
          }}
          delay={i * 800}
          key={i}
          onRest={() => {
            if (i === data.length - 1) {
              onReset && onReset();
            }
          }}
        >
          {styles => (
            <g transform={`translate(100, ${styles.y})`}>
              <circle cx="0" cy="0" r="15" fill={COLORS.WHITE} strokeWidth={2} stroke={COLORS.BLACK} />
              <text x={0} y={6} css={{ fontSize: "2rem" }} textAnchor={"middle"}>
                {text}
              </text>
            </g>
          )}
        </Spring>
      );
    })}
  </>
);

const ALine = animated(({ style, reset, completed }) => (
  <line
    x1={100}
    x2={100}
    y1={style.y1}
    y2={style.y2}
    stroke={completed && !reset ? COLORS.GREY : COLORS.GREEN}
    strokeWidth={2}
  />
));

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
              // setReset(false);
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
        <ALine reset={reset} completed={completed} style={props} />
        <line />
        {reset ? null : (
          <CircleSequence
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
