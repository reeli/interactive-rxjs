import { AnimatedLine } from "src/components/AnimatedLine";
import { COLORS } from "src/style";
import { Rect } from "src/components/Rect";
import React, { useState } from "react";
import { map } from "lodash";
import { Circle } from "src/components/Circle";
import { useSprings } from "react-spring";
import { DemoFooter, DemoHeader, DemoTitle } from "src/components/Demo";
import { Button } from "src/components/Button";
import { Highlight } from "src/components/Highlight";
import { Link } from "src/components/Link";

const LINE_CONFIG = {
  LINE1: {
    x1: 100,
    x2: 30,
    y1: 15,
    y2: 220,
  },
  LINE2: {
    x1: 100,
    x2: 170,
    y1: 15,
    y2: 220,
  },
};

const data = [1, 2, 3];

const codeExample = `
import { Subject } from 'rxjs';
 
const subject = new Subject<number>();
 
subject.subscribe({
  next: (v) => console.log(\`observerA: \${v}\`)
});
subject.subscribe({
  next: (v) => console.log(\`observerB: \${v}\`)
});
 
subject.next(1);
subject.next(2);
subject.next(3);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
`;

export const SubjectDemo = () => {
  const [started, setStarted] = useState<boolean | null>(null);

  const springs = useSprings(
    data.length,
    data.map((_, i) => ({
      from: { x: 100, y: 20 },
      to: started ? { x: 35, y: 200 } : { x: 100, y: 20 },
      delay: i * 1000,
      config: {
        duration: 1500,
      },
    })),
  );
  const springs2 = useSprings(
    data.length,
    data.map((_, i) => ({
      from: { x: 100, y: 20 },
      to: started ? { x: 165, y: 200 } : { x: 100, y: 20 },
      delay: i * 1000,
      config: {
        duration: 1500,
      },
    })),
  );

  return (
    <>
      <DemoTitle>
        <Link id={"subject"} href={"#subject"} variant={"title"}>
          Subject
        </Link>
      </DemoTitle>
      <DemoHeader>
        <Button
          onClick={() => {
            setStarted(true);
          }}
          css={{ color: COLORS.BLUE }}
        >
          开始动画
        </Button>
        <Button
          onClick={() => {
            setStarted(null);
          }}
          css={{ marginLeft: 5 }}
        >
          重置动画
        </Button>
      </DemoHeader>
      <div css={{ display: "flex" }}>
        <div css={{ width: 200 }}>
          <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
            <AnimatedLine {...LINE_CONFIG.LINE1} stroke={COLORS.GREEN} />
            <AnimatedLine {...LINE_CONFIG.LINE2} stroke={COLORS.GREEN} />
            {map(springs, (style: any, i) => (
              <Circle translateX={style.x} translateY={style.y} key={i} text={() => data[i]} />
            ))}
            {map(springs2, (style: any, i) => (
              <Circle translateX={style.x} translateY={style.y} key={i} text={() => data[i]} />
            ))}
            <Rect width={100} height={40} x={50} text={"Subject$"} />
            <Rect width={80} height={40} y={220} text={"ObserverA"} fill={COLORS.SECONDARY} />
            <Rect width={80} height={40} x={120} y={220} text={"ObserverB"} fill={COLORS.SECONDARY} />
          </svg>
        </div>
        <Highlight>{codeExample}</Highlight>
      </div>
      <DemoFooter />
    </>
  );
};
