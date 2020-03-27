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
import { Link } from "src/components/Link";
import { LINE_CONFIG_2 } from "src/constants";

const codePieces = `
import { fromEvent } from "rxjs";
import React, { useEffect, useRef } from "react";

export const Demo = () => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    if (btnRef.current) {
      fromEvent(btnRef.current, "click").subscribe(() => {
        counterRef.current = counterRef.current + 1;
        console.log(counterRef.current);
      });
    }
  }, []);

  return <button ref={btnRef}>产生事件（持续点击试试？）</button>;
};
`;

export const FromEventDemo: React.FC = () => {
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
      <DemoTitle>
        <Link id={"fromEvent"} href={"#fromEvent"} variant={"title"}>
          fromEvent
        </Link>
      </DemoTitle>
      <DemoHeader>
        <Button css={{ color: COLORS.BLUE }} ref={btnRef}>
          产生事件（持续点击试试？）
        </Button>
      </DemoHeader>
      <div css={{ display: "flex" }}>
        <div css={{ width: 200 }}>
          <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
            <AnimatedLine {...LINE_CONFIG_2} stroke={COLORS.GREEN} />
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
      <DemoFooter>
        <div>根据事件(DOM 事件、Node EventEmitter 事件等)创建一个 Observable</div>
      </DemoFooter>
    </>
  );
};
