import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle, DemoWrapper } from "src/components/Demo";
import { Button } from "src/components/Button";
import { AnimatedCircles } from "src/components/AnimatedCircles";
import { AnimatedLine } from "src/components/AnimatedLine";
import { ObservableRect } from "src/components/ObservableRect";
import { ObserverRect } from "src/components/ObserverRect";
import { useLineAnimation } from "src/hooks/useLineAnimation";

const data = [1, 2, 3];

export const CompleteDemo = () => {
  const [completed, setCompleted] = useState<boolean | null>(false);
  const [started, setStarted] = useState<boolean | null>(false);

  const [subscribed, setSubscribed] = useState<boolean | null>(false);
  const [reset, setReset] = useState<boolean | null>(false);

  const props = useLineAnimation(subscribed, () => {
    if (subscribed) {
      setReset(false);
      setStarted(true);
    }
  });

  return (
    <DemoWrapper>
      <DemoTitle>Complete</DemoTitle>
      <DemoHeader>
        {subscribed ? (
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
        ) : (
          <Button
            onClick={() => {
              setSubscribed(true);
            }}
            css={{ color: COLORS.BLUE }}
          >
            订阅
          </Button>
        )}
      </DemoHeader>
      <div css={{ width: 200 }}>
        <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
          <AnimatedLine stroke={completed ? COLORS.GREY : COLORS.GREEN} style={props} />
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
      <DemoFooter>
        {reset ? null : (
          <>
            {subscribed && <div>已订阅，现在可以向观察者推送数据了</div>}
            {completed && <div>Observable 已完结，表示「没有更多数据了」，之后也不会再向 Observer 推送数据</div>}
          </>
        )}
      </DemoFooter>
    </DemoWrapper>
  );
};
