import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle } from "src/components/Demo";
import { Button } from "src/components/Button";
import { Rect } from "src/components/Rect";
import { ObserverRect } from "src/components/ObserverRect";
import { AnimatedLine } from "src/components/AnimatedLine";
import { Highlight } from "src/components/Highlight";
import { fromEvent } from "rxjs";
import { Circle } from "src/components/Circle";
import { Spring } from "react-spring/renderprops-universal";
import { isEmpty, map } from "lodash";

const LINE_CONFIG = {
  LINE1: {
    x1: 100,
    x2: 100,
    y1: 0,
    y2: 250,
  },
};

const codePieces = `
import { of } from "rxjs";
import { map } from "rxjs/operators";

const data = ["A", "B", "C"];
const source$ = of(1, 2, 3).pipe(map((_, idx) => data[idx]));

const observer = {
  next: (val) => console.log(val),
  complete: () => console.log("complete!"),
  error: () => console.log("error!"),
};

source$.subscribe(observer);
`;

export const FromEventDemo = () => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [data, setData] = useState<any[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    if (btnRef.current) {
      fromEvent(btnRef.current, "click").subscribe(() => {
        counterRef.current = counterRef.current + 1;
        setData(prev => [counterRef.current, ...prev]);
      });
    }
  }, []);

  return (
    <>
      <DemoTitle>fromEvent</DemoTitle>
      <DemoHeader>
        <Button css={{ color: COLORS.BLUE }} ref={btnRef}>
          产生事件（持续点击试试？）
        </Button>
        <Button css={{ marginLeft: 5 }}>重置动画</Button>
      </DemoHeader>
      <div css={{ display: "flex" }}>
        <div css={{ width: 200 }}>
          <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
            <AnimatedLine {...LINE_CONFIG.LINE1} stroke={COLORS.GREEN} />
            {isEmpty(data)
              ? null
              : map(data, (_, i: number) => (
                  <Spring from={{ y: 18 }} to={{ y: 275 }} key={i} config={{ duration: 1000 }}>
                    {styles => <Circle translateY={styles.y} text={i} />}
                  </Spring>
                ))}
            <Rect width={200} height={40} y={0} text={"FromEvent$"} />
            <ObserverRect />
          </svg>
        </div>
        <Highlight>{codePieces}</Highlight>
      </div>
      <DemoFooter />
    </>
  );
};
