import { useSpring } from "react-spring";
import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader } from "src/components/Demo";
import { Button } from "src/components/Button";
import { isNull } from "lodash";
import { AnimatedLine } from "src/components/AnimatedLine";

export const SubscribeDemo = () => {
  const [toggle, setToggle] = useState<boolean | null>(null);
  const props = useSpring({
    from: {
      y1: 250,
      y2: toggle ? 50 : 250,
    },
    to: {
      y1: 250,
      y2: toggle ? 50 : 250,
    },
  });

  return (
    <div css={{ width: 200 }}>
      <h2>Subscribe and Unsubscribe</h2>
      <DemoHeader>
        <Button
          onClick={() => {
            setToggle(!toggle);
          }}
          css={{ color: COLORS.BLUE }}
        >
          {toggle ? "取消订阅 unsubscribe" : "订阅 subscribe"}
        </Button>
      </DemoHeader>
      <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
        <AnimatedLine style={props} stroke={COLORS.GREEN} />
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
          <text
            x={100}
            y={293}
            css={{ fontSize: "1.4rem", cursor: "pointer" }}
            textAnchor={"middle"}
            onClick={() => setToggle(!toggle)}
            fill={COLORS.BLUE}
          >
            {toggle ? "取消订阅 unsubscribe" : "订阅 subscribe"}
          </text>
        </g>
      </svg>
      <DemoFooter>
        {isNull(toggle) ? null : toggle ? <div>已订阅，现在可以向观察者推送数据了</div> : <div>已取消订阅</div>}
      </DemoFooter>
    </div>
  );
};
