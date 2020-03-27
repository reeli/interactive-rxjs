import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle, DemoWrapper } from "src/components/Demo";
import { AnimatedCircles } from "src/components/AnimatedCircles";
import { ObservableRect } from "src/components/ObservableRect";
import { ObserverRect } from "src/components/ObserverRect";
import { AnimatedLine } from "src/components/AnimatedLine";
import { useLineAnimation } from "src/hooks/useLineAnimation";
import { ControlButtons } from "src/components/ControlButtons";

const data = ["1", "2"];

export const ErrorDemo = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const [reset, setReset] = useState(false);
  const lineAnimationStyle = useLineAnimation(subscribed);

  return (
    <DemoWrapper>
      <DemoTitle>Error</DemoTitle>
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
          <AnimatedLine stroke={isAnimationEnd ? COLORS.ERROR : COLORS.GREEN} style={lineAnimationStyle} />
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
      <DemoFooter>{isAnimationEnd && !reset && <div>出错了！</div>}</DemoFooter>
    </DemoWrapper>
  );
};
