import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle, DemoWrapper } from "src/components/Demo";
import { AnimatedCircles } from "src/components/AnimatedCircles";
import { AnimatedLine } from "src/components/AnimatedLine";
import { ObservableRect } from "src/components/ObservableRect";
import { ObserverRect } from "src/components/ObserverRect";
import { useLineAnimation } from "src/hooks/useLineAnimation";
import { ControlButtons } from "src/components/ControlButtons";

const data = [1, 2, 3];

export const CompleteDemo = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const [reset, setReset] = useState(false);

  const lineAnimationStyle = useLineAnimation(subscribed);

  return (
    <DemoWrapper>
      <DemoTitle>Complete</DemoTitle>
      <DemoHeader>
        <ControlButtons
          isStart={subscribed}
          onStart={() => {
            setReset(false);
            setSubscribed(true);
          }}
          onReset={() => {
            setReset(true);
            setIsAnimationEnd(false);
            setSubscribed(false);
          }}
        />
      </DemoHeader>
      <div css={{ width: 200 }}>
        <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
          <AnimatedLine stroke={isAnimationEnd ? COLORS.GREY : COLORS.GREEN} style={lineAnimationStyle} />
          {subscribed && (
            <AnimatedCircles
              data={data}
              onAnimationEnd={() => {
                setIsAnimationEnd(true);
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
            {subscribed && !isAnimationEnd && <div>已订阅，现在可以向观察者推送数据了</div>}
            {isAnimationEnd && <div>Observable 已完结，表示「没有更多数据了」，之后也不会再向 Observer 推送数据</div>}
          </>
        )}
      </DemoFooter>
    </DemoWrapper>
  );
};
