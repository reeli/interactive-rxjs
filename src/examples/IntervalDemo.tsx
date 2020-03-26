import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle } from "src/components/Demo";
import { Button } from "src/components/Button";
import { Rect } from "src/components/Rect";
import { ObserverRect } from "src/components/ObserverRect";
import { AnimatedLine } from "src/components/AnimatedLine";
import { Highlight } from "src/components/Highlight";
import { Circle } from "src/components/Circle";
import { Spring } from "react-spring/renderprops-universal";
import { map } from "lodash";
import { Link } from "src/components/Link";

const LINE_CONFIG = {
  LINE1: {
    x1: 100,
    x2: 100,
    y1: 0,
    y2: 250,
  },
};

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
  const [started, setStarted] = useState(false);
  return (
    <>
      <DemoTitle>
        <Link id={"interval"} href={"#interval"} variant={"title"}>
          interval
        </Link>
      </DemoTitle>
      <DemoHeader>
        <Button
          css={{ color: COLORS.BLUE }}
          onClick={() => {
            setStarted(true);
          }}
        >
          开始动画
        </Button>
        <Button css={{ marginLeft: 5 }}>重置动画</Button>
      </DemoHeader>
      <div css={{ display: "flex" }}>
        <div css={{ width: 200 }}>
          <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
            <AnimatedLine {...LINE_CONFIG.LINE1} stroke={COLORS.GREEN} />
            {map(data, (_, i: number) => (
              <Spring
                from={{ y: 18 }}
                to={{ y: started ? 275 : 18 }}
                key={i}
                config={{ duration: 1000 }}
                delay={i * 1000}
              >
                {styles => <Circle translateY={styles.y} text={i} />}
              </Spring>
            ))}
            <Rect width={200} height={40} y={0} text={"Interval$"} />
            <ObserverRect />
          </svg>
        </div>
        <Highlight>{codePieces}</Highlight>
      </div>
      <DemoFooter />
    </>
  );
};
