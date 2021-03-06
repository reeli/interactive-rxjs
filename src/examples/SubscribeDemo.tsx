import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle, DemoWrapper } from "src/components/Demo";
import { Button } from "src/components/Button";
import { isNull } from "lodash";
import { AnimatedLine } from "src/components/AnimatedLine";
import { ObservableRect } from "src/components/ObservableRect";
import { ObserverRect } from "src/components/ObserverRect";
import { useLineAnimation } from "src/hooks/useLineAnimation";

export const SubscribeDemo = () => {
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const lineAnimationStyle = useLineAnimation(subscribed);

  return (
    <DemoWrapper>
      <DemoTitle>Subscribe and Unsubscribe</DemoTitle>
      <DemoHeader>
        <Button
          onClick={() => {
            setSubscribed(!subscribed);
          }}
          css={{ color: COLORS.BLUE }}
        >
          {subscribed ? "退订 unsubscribe" : "订阅 subscribe"}
        </Button>
      </DemoHeader>
      <div css={{ width: 200 }}>
        <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
          <AnimatedLine style={lineAnimationStyle} stroke={COLORS.GREEN} />
          <ObservableRect />
          <ObserverRect />
        </svg>
      </div>
      <DemoFooter>
        {subscribed && <div>已订阅，现在可以向观察者推送数据了</div>}
        {!subscribed && !isNull(subscribed) && <div>已取消订阅</div>}
      </DemoFooter>
    </DemoWrapper>
  );
};
