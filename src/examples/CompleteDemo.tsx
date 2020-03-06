import React, { useState } from "react";
import { Spring } from "react-spring/renderprops-universal";
import { map } from "lodash";
import { COLORS } from "src/style";

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
          delay={i * 1000}
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

export const CompleteDemo = () => {
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);
  const [reset, setReset] = useState(false);

  return (
    <div css={{ width: 200 }}>
      <button
        onClick={() => {
          setReset(false);
          setStarted(true);
        }}
      >
        开始动画
      </button>
      <button
        onClick={() => {
          setReset(true);
          setCompleted(false);
          setStarted(false);
        }}
      >
        重置动画
      </button>
      <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
        <line
          x1={100}
          x2={100}
          y1={50}
          y2={250}
          stroke={completed && !reset ? COLORS.GREY : COLORS.BLACK}
          strokeWidth={2}
        />
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
            可被观察的对象
          </text>
        </g>
        <g>
          <rect x={0} y={250} width={200} height={50} fill={COLORS.OBSERVER} />
          <text x={100} y={275} css={{ fontSize: "1.4rem" }} textAnchor={"middle"}>
            观察者
          </text>
        </g>
      </svg>
      {completed && !reset && (
        <div>Complete, Observable 已完结，表示「没有更多数据了」，之后也不会再向 Observer 推送数据</div>
      )}
    </div>
  );
};
