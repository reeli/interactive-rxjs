import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle } from "src/components/Demo";
import { Button } from "src/components/Button";
import { Rect } from "src/components/Rect";
import { ObserverRect } from "src/components/ObserverRect";
import { AnimatedLine, useAnimatedLine } from "src/components/AnimatedLine";
import { useSprings } from "react-spring";
import { Highlight } from "src/components/Highlight";
import { map } from "lodash";
import { Circle } from "src/components/Circle";

const LINE_CONFIG = {
  SUBSCRIBE_LINE: {
    x1: 100,
    x2: 100,
    y1: 120,
    y2: 250,
  },
  LINE1: {
    x1: 40,
    x2: 40,
    y1: 0,
    y2: 120,
  },
  LINE2: {
    x1: 160,
    x2: 160,
    y1: 0,
    y2: 120,
  },
};

const codePieces = `
import { concat, of } from "rxjs";                                    

const source1$ = of(1);
const source2$ = of(2);

const source$ = concat(source1$, source2$);
                                    
source$.subscribe(console.log);
`;

const data1 = ["A1", "A2", "A3"];
const data2 = ["B1", "B2", "B3"];

export const MergeDemo = () => {
  const [started, setStarted] = useState<boolean | null>(null);

  const springs = useSprings(
    data1.length,
    data1.map((_, i) => ({
      from: { x: 40, y: 16 },
      to: async (next: any) => {
        if (started) {
          await next({ x: 40, y: 140, config: { duration: 750 } });
          await next({ x: 100, y: 140, config: { duration: 10 } });
          await next({ x: 100, y: 270, config: { duration: 740 } });
        }
      },
      delay: 2000 + i * 5000,
    })),
  );

  const springs2 = useSprings(
    data1.length,
    data1.map((_, i) => ({
      from: { x: 160, y: 16 },
      to: async (next: any) => {
        if (started) {
          await next({ x: 160, y: 140, config: { duration: 750 } });
          await next({ x: 100, y: 140, config: { duration: 10 } });
          await next({ x: 100, y: 270, config: { duration: 740 } });
        }
      },
      delay: 5000 + i * 5000,
    })),
  );

  const styleSubscribeLine = useAnimatedLine({
    y1: LINE_CONFIG.SUBSCRIBE_LINE.y1,
    y2: LINE_CONFIG.SUBSCRIBE_LINE.y2,
    started,
  });

  const styleLine1 = useAnimatedLine({
    y1: LINE_CONFIG.LINE1.y1,
    y2: LINE_CONFIG.LINE1.y2,
    started,
    delay: 600,
  });

  const styleLine2 = useAnimatedLine({
    y1: LINE_CONFIG.LINE2.y1,
    y2: LINE_CONFIG.LINE2.y2,
    started,
    delay: 4000,
  });

  return (
    <div>
      <DemoTitle>merge</DemoTitle>
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
            <AnimatedLine {...LINE_CONFIG.SUBSCRIBE_LINE} stroke={COLORS.GREEN} style={styleSubscribeLine} />
            <AnimatedLine {...LINE_CONFIG.LINE1} stroke={COLORS.GREEN} style={styleLine1} />
            <AnimatedLine {...LINE_CONFIG.LINE2} stroke={COLORS.GREEN} style={styleLine2} />
            {map(springs, (style: any, i) => (
              <Circle translateX={style.x} translateY={style.y} key={i} text={() => data1[i]} />
            ))}
            {map(springs2, (style: any, i) => (
              <Circle translateX={style.x} translateY={style.y} key={i} text={() => data2[i]} />
            ))}
            <Rect width={80} height={40} text={"SourceA$"} />
            <Rect width={80} height={40} x={120} text={"SourceB$"} />
            <Rect width={200} height={40} y={120} text={"Merge$"} />
            <ObserverRect />
          </svg>
        </div>
        <Highlight>{codePieces}</Highlight>
      </div>
      <DemoFooter />
    </div>
  );
};
