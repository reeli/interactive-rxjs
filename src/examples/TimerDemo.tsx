import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle } from "src/components/Demo";
import { Rect } from "src/components/Rect";
import { ObserverRect } from "src/components/ObserverRect";
import { AnimatedLine } from "src/components/AnimatedLine";
import { Highlight } from "src/components/Highlight";
import { Circle } from "src/components/Circle";
import { Spring } from "react-spring/renderprops-universal";
import { map } from "lodash";
import { Link } from "src/components/Link";
import { CIRCLE_CONFIG, LINE_CONFIG_2 } from "src/constants";
import { ControlButtons } from "src/components/ControlButtons";

const codePieces = `
// 2000 毫秒之后，每隔 1000 毫秒，发射一个递增的数字

const numbers = timer(2000, 1000).pipe(take(4));
numbers.subscribe(x => console.log(x));

// Logs:
// 0
// 1
// 2
// 3  
`;

const data = [0, 1, 2, 3];

export const TimerDemo = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);

  return (
    <>
      <DemoTitle>
        <Link id={"timer"} href={"#timer"} variant={"title"}>
          timer
        </Link>
      </DemoTitle>
      <DemoHeader>
        <ControlButtons
          isStart={subscribed}
          onStart={() => {
            setSubscribed(true);
          }}
          onReset={() => {
            setIsAnimationEnd(false);
            setSubscribed(false);
          }}
        />
      </DemoHeader>
      <div css={{ display: "flex" }}>
        <div css={{ width: 200 }}>
          <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
            <AnimatedLine {...LINE_CONFIG_2} stroke={isAnimationEnd ? COLORS.GREY : COLORS.GREEN} />
            {subscribed &&
              map(data, (_, i: number) => {
                const y1 = CIRCLE_CONFIG.radius + CIRCLE_CONFIG.strokeWidth;
                const y2 = CIRCLE_CONFIG.y - (i + 1) * CIRCLE_CONFIG.radius * 2;

                return (
                  <Spring
                    from={{ y: y1 }}
                    to={{ y: subscribed ? y2 : y1 }}
                    key={i}
                    delay={1000 + (i + 1) * 600}
                    onRest={() => {
                      if (i === data.length - 1) {
                        setIsAnimationEnd(true);
                      }
                    }}
                  >
                    {styles => <Circle translateY={styles.y} text={i} />}
                  </Spring>
                );
              })}
            <Rect text={"Timer$"} fill={COLORS.PURPLE} />
            <ObserverRect />
          </svg>
        </div>
        <Highlight>{codePieces}</Highlight>
      </div>
      <DemoFooter>
        <div>和 interval 类似，不过 timer 可以指定什么时候开始发送数据</div>
      </DemoFooter>
    </>
  );
};
