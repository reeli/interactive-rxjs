import { useSpring } from "react-spring";
import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle, DemoWrapper } from "src/components/Demo";
import { Button } from "src/components/Button";
import { isNull } from "lodash";
import { AnimatedLine } from "src/components/AnimatedLine";
import { ObservableRect } from "src/components/ObservableRect";
import { ObserverRect } from "src/components/ObserverRect";

const LINE_CONFIG = {
  y1: 250,
  y2: 50,
};

export const SubscribeDemo = () => {
  const [toggle, setToggle] = useState<boolean | null>(null);
  const props = useSpring({
    from: {
      y1: LINE_CONFIG.y1,
      y2: toggle ? LINE_CONFIG.y2 : LINE_CONFIG.y1,
    },
    to: {
      y1: LINE_CONFIG.y1,
      y2: toggle ? LINE_CONFIG.y2 : LINE_CONFIG.y1,
    },
  });

  return (
    <DemoWrapper>
      <DemoTitle>Subscribe and Unsubscribe</DemoTitle>
      <DemoHeader>
        <Button
          onClick={() => {
            setToggle(!toggle);
          }}
          css={{ color: COLORS.BLUE }}
        >
          {toggle ? "退订 unsubscribe" : "订阅 subscribe"}
        </Button>
      </DemoHeader>
      <div css={{ width: 200 }}>
        <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
          <AnimatedLine style={props} stroke={COLORS.GREEN} />
          <ObservableRect />
          <ObserverRect />
        </svg>
      </div>
      <DemoFooter>
        {isNull(toggle) ? null : toggle ? <div>已订阅，现在可以向观察者推送数据了</div> : <div>已取消订阅</div>}
      </DemoFooter>
    </DemoWrapper>
  );
};
