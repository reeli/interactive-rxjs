import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle } from "src/components/Demo";
import { Rect } from "src/components/Rect";
import { ObserverRect } from "src/components/ObserverRect";
import { AnimatedLine } from "src/components/AnimatedLine";
import { Highlight } from "src/components/Highlight";
import { Link } from "src/components/Link";
import { ControlButtons } from "src/components/ControlButtons";
import { LINE_CONFIG_2 } from "src/constants";
import { AnimatedCircles } from "src/components/AnimatedCircles";

const codePieces = `
import { interval } from "rxjs";
import { take } from "rxjs/operators";

interval(1000)
  .pipe(take(4))
  .subscribe(value => {
    console.log(value);
  });
  
// Logs:
// 0
// 1
// 2
// 3  
`;

const data = [0, 1, 2, 3];

export const IntervalDemo = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  return (
    <>
      <DemoTitle>
        <Link id={"interval"} href={"#interval"} variant={"title"}>
          interval
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
            {subscribed && (
              <AnimatedCircles
                data={data}
                onAnimationEnd={() => {
                  setIsAnimationEnd(true);
                }}
              />
            )}
            <Rect text={"Interval$"} fill={COLORS.PURPLE} />
            <ObserverRect />
          </svg>
        </div>
        <Highlight>{codePieces}</Highlight>
      </div>
      <DemoFooter>
        <div>创建一个 Observable，这个 Observable 会在每个指定的时间间隔内，发射一个递增的数字</div>
      </DemoFooter>
    </>
  );
};
